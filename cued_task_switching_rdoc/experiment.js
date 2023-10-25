// TODO: check -- this had +1 for practiceLen and numTrialsPerBlock in practiceTrials and testTrials

/* ************************************ */
/* Define helper functions */
/* ************************************ */
// common
// PARAMETERS FOR DECAYING EXPONENTIAL FUNCTION
var meanITI = 0.5;

function sampleFromDecayingExponential() {
  // Decay parameter of the exponential distribution λ = 1 / μ
  var lambdaParam = 1 / meanITI;
  var minValue = 0;
  var maxValue = 5;

  /**
   * Sample one value with replacement
   * from a decaying exponential distribution within a specified range.
   *
   * @param {number} lambdaParam
   * - The decay parameter lambda of the exponential distribution.
   * @param {number} minValue - The minimum value of the range.
   * @param {number} maxValue - The maximum value of the range.
   * @returns {number}
   * A single value sampled from the decaying
   * exponential distribution within the specified range.
   */
  var sample;
  do {
    sample = -Math.log(Math.random()) / lambdaParam;
  } while (sample < minValue || sample > maxValue);
  return sample;
}
function shuffleArray(array) {
  // Create a copy of the original array
  const shuffledArray = [...array];

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function evalAttentionChecks() {
  if (runAttentionChecks) {
    var attentionChecksTrials = jsPsych.data
      .get()
      .filter({ trial_id: "test_attention_check" }).trials;

    var checksPassed = 0;
    for (var i = 0; i < attentionChecksTrials.length; i++) {
      if (attentionChecksTrials[i].correct_trial === 1) {
        checksPassed += 1;
      }
    }
    checkPercent = checksPassed / attentionChecksTrials.length;
  }
  jsPsych.data.get().addToLast({ attention_check_percent: checkPercent });
  return checkPercent;
}
var getCurrAttentionCheckQuestion = function () {
  return `${currentAttentionCheckData.Q} <div class=block-text>This screen will advance automatically in 1 minute.</div>`;
};

var getCurrAttentionCheckAnswer = function () {
  return currentAttentionCheckData.A;
};

var attentionCheckData = [
  // key presses
  {
    Q: "<p class='block-text'>Press the Q key</p>",
    A: 81,
  },
  {
    Q: "<p class='block-text'>Press the P key</p>",
    A: 80,
  },
  {
    Q: "<p class='block-text'>Press the R key</p>",
    A: 82,
  },
  {
    Q: "<p class='block-text'>Press the S key</p>",
    A: 83,
  },
  {
    Q: "<p class='block-text'>Press the T key</p>",
    A: 84,
  },
  {
    Q: "<p class='block-text'>Press the J key</p>",
    A: 74,
  },
  {
    Q: "<p class='block-text'>Press the K key</p>",
    A: 75,
  },
  {
    Q: "<p class='block-text'>Press the E key</p>",
    A: 69,
  },
  {
    Q: "<p class='block-text'>Press the M key</p>",
    A: 77,
  },
  {
    Q: "<p class='block-text'>Press the L key</p>",
    A: 76,
  },
  {
    Q: "<p class='block-text'>Press the U key</p>",
    A: 85,
  },
  // alphabet
  // start
  {
    Q: "<p class='block-text'>Press the key for the first letter of the English alphabet.</p>",
    A: 65,
  },
  {
    Q: "<p class='block-text'>Press the key for the second letter of the English alphabet.</p>",
    A: 66,
  },
  {
    Q: "<p class='block-text'>Press the key for the third letter of the English alphabet.</p>",
    A: 67,
  },
  // end
  {
    Q: "<p class='block-text'>Press the key for the third to last letter of the English alphabet.</p>",
    A: 88,
  },
  {
    Q: "<p class='block-text'>Press the key for the second to last letter of the English alphabet.</p>",
    A: 89,
  },
  {
    Q: "<p class='block-text'>Press the key for the last letter of the English alphabet.</p>",
    A: 90,
  },
];

// TODO: change this to only use n number of Qs and As where n is numTestBlocks?
attentionCheckData = shuffleArray(attentionCheckData);
var currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

var getInstructFeedback = function () {
  return `<div class = centerbox><p class = center-block-text>
    ${feedbackInstructText}
    </p></div>`;
};
var getFeedback = function () {
  return `<div class = bigbox><div class = picture_box><p class = block-text>
    ${feedbackText}
    </font></p></div></div>`;
};

var getExpStage = function () {
  return expStage;
};
// Sets the cue-target-interval for the cue block
var setCTI = function () {
  return CTI;
};

var getCTI = function () {
  return CTI;
};

/* Append gap and current trial to data and then recalculate for next trial*/
var appendData = function () {
  var currTrial = jsPsych.getProgress().current_trial_global;
  var trialID = jsPsych.data.get().filter({ trial_index: currTrial })
    .trials[0].trial_id;
  var trialNum = currentTrial - 1; // currentTrial has already been updated with setStims, so subtract one to record data
  var taskSwitch = taskSwitches[trialNum];

  jsPsych.data.get().addToLast({
    cue: currCue,
    trial_id: trialID,
    stim_number: currStim.number,
    task: currTask,
    task_condition: taskSwitch.task_switch,
    cue_condition: taskSwitch.cue_switch,
    current_trial: trialNum,
    correct_response: correctResponse,
    CTI: CTI,
    block_num: getExpStage() == "practice" ? practiceCount : testCount,
  });

  if (trialID == "practice_trial" || trialID == "test_trial") {
    correctTrial = 0;
    if (jsPsych.data.get().last().trials[0].response == correctResponse) {
      correctTrial = 1;
    }
    jsPsych.data.get().addToLast({
      correct_trial: correctTrial,
    });
  }
};

var getCue = function () {
  var cueHTML = `
    <div class="upperbox">
      <div class="center-text" style="color:white;">${currCue}</div>
    </div>
    <div class="lowerbox">
      <div class="fixation">+</div>
    </div>
  `;
  return cueHTML;
};

var getStim = function () {
  var stimHTML = `
    <div class="upperbox">
      <div class="center-text" style="color:white;">${currCue}</div>
    </div>
    <div class="lowerbox">
      <div class="gng_number">
        <div class="cue-text">${preFileType}${currStim.number}${fileTypePNG}</div>
      </div>
    </div>
  `;
  return stimHTML;
};

var getCurrBlockNum = function () {
  if (getExpStage() == "practice") {
    return practiceCount;
  } else {
    return testCount;
  }
};

var randomDraw = function (lst) {
  var index = Math.floor(Math.random() * lst.length);
  return lst[index];
};

// Task Specific Functions
var getKeys = function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
};

var genStims = function (n) {
  stims = [];
  for (var i = 0; i < n; i++) {
    var number = randomDraw("12346789");
    var color = "white"; // randomDraw(['white'])
    var stim = {
      number: parseInt(number),
      color: color,
    };
    stims.push(stim);
  }
  return stims;
};

/* Index into taskSwitches using the global var currentTrial. Using the task_switch and cue_switch
change the task. If "stay", keep the same task but change the cue based on "cue switch".
If "switch new", switch to the task that wasn't the current or last task, choosing a random cue.
If "switch old", switch to the last task and randomly choose a cue.
*/
var setStims = function () {
  var tmp;
  switch (taskSwitches[currentTrial].task_switch) {
    case "na":
      tmp = currTask;
      currTask = randomDraw(getKeys(tasks));
      cueI = randomDraw([0, 1]);
      break;
    case "stay":
      if (currTask == "na") {
        tmp = currTask;
        currTask = randomDraw(getKeys(tasks));
      }
      if (taskSwitches[currentTrial].cue_switch == "switch") {
        cueI = 1 - cueI;
      }
      break;
    case "switch":
      taskSwitches[currentTrial].cue_switch = "switch";
      cueI = randomDraw([0, 1]);
      if (lastTask == "na") {
        tmp = currTask;
        currTask = randomDraw(
          getKeys(tasks).filter(function (x) {
            return x != currTask;
          })
        );
        lastTask = tmp;
      } else {
        tmp = currTask;
        currTask = getKeys(tasks).filter(function (x) {
          return x != currTask;
        })[0];
        lastTask = tmp;
      }
      break;
    case "switch_old":
      taskSwitches[currentTrial].cue_switch = "switch";
      cueI = randomDraw([0, 1]);
      if (lastTask == "na") {
        tmp = currTask;
        currTask = randomDraw(
          getKeys(tasks).filter(function (x) {
            return x != currTask;
          })
        );
        lastTask = tmp;
      } else {
        tmp = currTask;
        currTask = lastTask;
        lastTask = tmp;
      }
      break;
  }
  currCue = tasks[currTask].cues[cueI];
  currStim = stims[currentTrial];
  currentTrial = currentTrial + 1;
  CTI = setCTI();
  correctResponse = getResponse();
  correct = false;
};

// Returns the key corresponding to the correct response for the current
// task and stim
var getResponse = function () {
  switch (currTask) {
    case "magnitude":
      if (currStim.number > 5) {
        return possibleResponses[0][1];
      } else {
        return possibleResponses[1][1];
      }
    case "parity":
      if (currStim.number % 2 === 0) {
        return possibleResponses[0][1];
      } else {
        return possibleResponses[1][1];
      }
  }
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// common variables
const fixationDuration = 500;

const possibleResponses = [
  ["index finger", ",", "comma key (,)"],
  ["middle finger", ".", "period key (.)"],
];

const choices = [possibleResponses[0][1], possibleResponses[1][1]];

var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>
`;

var feedbackInstructText = `
  <p class="center-block-text">
    Welcome! This experiment will take around 11 minutes.
  </p>
  <p class="center-block-text">
    To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and fullscreen for the whole duration of each task.
  </p>
  <p class="center-block-text"> Press <i>enter</i> to begin.</p>
`;

// Speed reminder
var speedReminder = `
  <p class="block-text">
    Try to respond as quickly and accurately as possible.
  </p>
`;

// *: Timing
// stimuli
const stimStimulusDuration = 1000;
const stimTrialDuration = 1500;

/* ******************************* */
/* ATTENTION CHECK STUFF  */
/* ******************************* */

var runAttentionChecks = true;
// var attentionCheckThresh = 0.45;

/* ******************************* */
/* THRESHOLD STUFF  */
/* ******************************* */

var sumInstructTime = 0; // ms
var instructTimeThresh = 1; // /in seconds

/* ******************************* */
/* TASK TEXT */
/* ******************************* */

var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";

var promptTextList = `
  <ul style="text-align:left">
    <li>Cue "Parity" or "Even-Odd": ${possibleResponses[0][0]} if even and ${possibleResponses[1][0]} if odd.</li>
    <li>Cue "Magnitude" or "High-Low": ${possibleResponses[0][0]} if >5 and ${possibleResponses[1][0]} if <5.</li>
  </ul>
`;

var promptText = `
  <div class="prompt_box">
    <p class="center-block-text" style="font-size:16px; line-height:80%;">"Parity" or "Even-Odd": ${possibleResponses[0][0]} if even and ${possibleResponses[1][0]} if odd.</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">"Magnitude" or "High-Low": ${possibleResponses[0][0]} if >5 and ${possibleResponses[1][0]} if <5.</p>
  </div>
`;

var practiceLen = 4; // must be divisible by 4
var numTrialsPerBlock = 64;
var numTestBlocks = 3;

var practiceThresh = 3; // 3 blocks of 16 trials
var rtThresh = 1000;
var missedResponseThresh = 0.1;
var accuracyThresh = 0.75;

var fileTypePNG = ".png'></img>";
var preFileType =
  "<img class = center src='/static/experiments/cued_task_switching_rdoc/images/";

// set up block stim. correctResponses indexed by [block][stim][type]
var tasks = {
  parity: {
    task: "parity",
    cues: ["Parity", "Even-Odd"],
  },
  magnitude: {
    task: "magnitude",
    cues: ["Magnitude", "High-Low"],
  },
};

var taskSwitchTyeps = ["stay", "switch"];
var cueSwitchTypes = ["stay", "switch"];

var taskSwitchesArr = [];
for (var t = 0; t < taskSwitchTyeps.length; t++) {
  for (var c = 0; c < cueSwitchTypes.length; c++) {
    taskSwitchesArr.push({
      task_switch: taskSwitchTyeps[t],
      cue_switch: cueSwitchTypes[c],
    });
  }
}
var practiceStims = genStims(practiceLen);
// var testStims = genStims(numTrialsPerBlock + 1);
var stims = practiceStims;
var currTask = randomDraw(getKeys(tasks));
var lastTask = "na"; // object that holds the last task, set by setStims()
var currCue = "na"; // object that holds the current cue, set by setStims()
var cueI = randomDraw([0, 1]); // index for one of two cues of the current task
var currStim = "na"; // object that holds the current stim, set by setStims()
var currentTrial = 0;
var CTI = 150; // cue-target-interval or cue's length (7/29, changed from 300 to 150; less time to process the cue should increase cue switch costs and task switch costs)

var pageInstruct = [
  `
  <div class="centerbox">
    <p class="block-text">Place your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b></p>
    <p class="block-text">During this task, you will respond to a sequence of numbers.</p>
    <p class="block-text">Your response will depend on the current task, which can change each trial. On some trials, you will have to indicate whether the number is <b>even or odd</b>, and on other trials, you will indicate whether the number is <b>higher or lower than 5</b>. Each trial will start with a cue telling you which task to do on that trial.</p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text">The cue before the number will be a word indicating the task. There will be <b>four</b> different cues indicating <b>two</b> different tasks. The cues and tasks are described below:</p>
    ${promptTextList}
    <p class="block-text">We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    ${speedReminder}
  </div>
  `,
];

// PRE LOAD IMAGES HERE
var pathSource = "/static/experiments/cued_task_switching_rdoc/images/";
var numbersPreload = ["1", "2", "3", "4", "6", "7", "8", "9"];
var images = [];
for (i = 0; i < numbersPreload.length; i++) {
  images.push(pathSource + numbersPreload[i] + ".png");
}

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
var attentionCheckBlock = {
  type: jsPsychAttentionCheckRdoc,
  data: {
    trial_id: "test_attention_check",
    trial_duration: null,
    exp_stage: "test",
  },
  question: getCurrAttentionCheckQuestion,
  key_answer: getCurrAttentionCheckAnswer,
  response_ends_trial: true,
  timing_post_trial: 200,
  timing_duration: 60000,
  on_finish: data => (data["block_num"] = testCount),
};

var attentionNode = {
  timeline: [attentionCheckBlock],
  conditional_function: function () {
    return runAttentionChecks;
  },
};

var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "instruction_feedback",
    trial_duration: 180000,
  },
  choices: ["Enter"],
  stimulus: getInstructFeedback,
  post_trial_gap: 0,
  trial_duration: 180000,
};

var instructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: "instructions",
    trial_duration: null,
  },
  pages: pageInstruct,
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
  loop_function: function () {
    data = jsPsych.data.get().filter({ trial_id: "instructions" }).trials;
    for (i = 0; i < data.length; i++) {
      if (data[i].rt != null) {
        sumInstructTime += data[i].rt;
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedbackInstructText =
        "<p class=block-text>Read through instructions too quickly. Please take your time and make sure you understand the instructions.</p><p class=block-text>Press <i>enter</i> to continue.</p>";
      return true;
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedbackInstructText =
        "<p class=block-text>Done with instructions. Press <i>enter</i> to continue.</p>";
      return false;
    }
  },
};

/* define practice and test blocks */
var setStimsBlock = {
  type: jsPsychCallFunction,
  data: {
    trial_id: "set_stims",
    trial_duration: null,
  },
  func: setStims,
  post_trial_gap: 0,
};

var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: function () {
    if (getExpStage() == "practice") {
      return {
        trial_id: "practice_feedback",
        exp_stage: getExpStage(),
        trial_duration: 60000,
        block_num: practiceCount,
      };
    } else {
      return {
        trial_id: "test_feedback",
        exp_stage: getExpStage(),
        trial_duration: 60000,
        block_num: testCount,
      };
    }
  },
  choices: ["Enter"],
  stimulus: getFeedback,
  trial_duration: 60000,
  post_trial_gap: 0,
  response_ends_trial: true,
};

var practiceTrials = [];
for (var i = 0; i < practiceLen + 1; i++) {
  var practiceFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      "<div class = upperbox><div class = fixation>+</div></div><div class = lowerbox><div class = fixation>+</div></div>",
    choices: ["NO_KEYS"],
    data: {
      trial_id: "practice_fixation",
      exp_stage: "practice",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration, // 500
    trial_duration: fixationDuration, // 500
    prompt: promptText,
    on_finish: function (data) {
      data["block_num"] = practiceCount;
    },
  };

  var practiceCueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "practice_cue",
      exp_stage: "practice",
      trial_duration: getCTI(),
      stimulus_duration: getCTI(),
    },
    trial_duration: getCTI,
    stimulus_duration: getCTI,
    post_trial_gap: 0,
    prompt: promptText,
    on_finish: appendData,
  };

  var ITIms = null;

  // *** ITI *** //
  var ITIBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      "<div class = upperbox><div class = fixation>+</div></div><div class = lowerbox><div class = fixation>+</div></div>",
    is_html: true,
    choices: ["NO_KEYS"],
    data: function () {
      if (getExpStage() == "practice") {
        return {
          trial_id: "practice_ITI",
          ITIParams: {
            min: 0,
            max: 5,
            mean: 0.5,
          },
          block_num: practiceCount,
          exp_stage: "practice",
        };
      } else {
        return {
          trial_id: "test_ITI",
          ITIParams: {
            min: 0,
            max: 5,
            mean: 0.5,
          },
          block_num: testCount,
          exp_stage: "test",
        };
      }
    },
    post_trial_gap: 0,
    trial_duration: function () {
      ITIms = sampleFromDecayingExponential();
      return ITIms * 1000;
    },
    prompt: function () {
      if (getExpStage() == "practice") {
        return promptText;
      } else {
        return "";
      }
    },
    on_finish: function (data) {
      data["trial_duration"] = ITIms * 1000;
      data["stimulus_duration"] = ITIms * 1000;
    },
  };

  var practiceTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: {
      exp_stage: "practice",
      trial_id: "practice_trial",
      choices: choices,
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    post_trial_gap: 0,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    prompt: promptText,
    on_finish: appendData,
  };

  var practiceFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.response == null) {
        return "<div class = fb_box><div class = center-text><font size =20>Respond Faster!</font></div></div>";
      } else if (last.correct_trial == 1) {
        return "<div class = fb_box><div class = center-text><font size =20 >Correct!</font></div></div>";
      } else {
        return "<div class = fb_box><div class = center-text><font size =20 >Incorrect</font></div></div>";
      }
    },
    data: {
      exp_stage: "practice",
      trial_id: "practice_feedback",
      trial_duration: 500,
      block_num: practiceCount,
    },
    choices: ["NO_KEYS"],
    stimulus_duration: 500,
    trial_duration: 500,
    prompt: promptText,
  };

  practiceTrials.push(
    setStimsBlock,
    practiceFixationBlock,
    practiceCueBlock,
    practiceTrial,
    practiceFeedbackBlock,
    ITIBlock
  );
}

var practiceCount = 0;
var practiceNode = {
  timeline: [feedbackBlock].concat(practiceTrials),
  loop_function: function (data) {
    practiceCount += 1;
    currentTrial = 0;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "practice_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].response == data.trials[i].correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      feedbackText = `
        <div class="centerbox">
          <p class="center-block-text">We will now start the test portion.</p>
          <p class="block-text">Keep your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b></p>
          <p class="block-text">Press <i>enter</i> to continue.</p>
        </div>
      `;

      taskSwitches = jsPsych.randomization.repeat(
        taskSwitchesArr,
        numTrialsPerBlock / 4
      );
      taskSwitches.unshift({
        task_switch: "na",
        cue_switch: "na",
      });
      stims = genStims(numTrialsPerBlock + 1);
      expStage = "test";
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText += `
          <p class="block-text">Your accuracy is low. Remember:</p>
          ${promptTextList}
        `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
          <p class="block-text">You have been responding too slowly.</p>
          ${speedReminder}
        `;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
          <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>
        `;
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      taskSwitches = jsPsych.randomization.repeat(
        taskSwitchesArr,
        practiceLen / 4
      );
      taskSwitches.unshift({
        task_switch: "na",
        cue_switch: "na",
      });
      stims = genStims(practiceLen + 1);
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode);
for (i = 0; i < numTrialsPerBlock + 1; i++) {
  var fixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      "<div class = upperbox><div class = fixation>+</div></div><div class = lowerbox><div class = fixation>+</div></div>",
    choices: ["NO_KEYS"],
    data: {
      trial_id: "test_fixation",
      exp_stage: "test",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration, // 500
    trial_duration: fixationDuration, // 500
    on_finish: function (data) {
      data["block_num"] = testCount;
    },
  };

  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "test_cue",
      exp_stage: "test",
      trial_duration: getCTI(),
      stimulus_duration: getCTI(),
    },
    trial_duration: getCTI,
    stimulus_duration: getCTI,
    post_trial_gap: 0,
    on_finish: appendData,
  };

  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: {
      trial_id: "test_trial",
      exp_stage: "test",
      choices: choices,
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    post_trial_gap: 0,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    on_finish: appendData,
  };

  testTrials.push(setStimsBlock, fixationBlock, cueBlock, testTrial, ITIBlock);
}

var testCount = 0;
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function (data) {
    testCount += 1;
    currentTrial = 0;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "test_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].response == data.trials[i].correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

    if (testCount >= numTestBlocks) {
      feedbackText = `<div class=centerbox>
        <p class=block-text>Done with this task.</p>
        <p class=centerbox>Press <i>enter</i> to continue.</p>
        </div>`;

      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      feedbackText += `<p class=block-text>You have completed ${testCount} out of ${numTestBlocks} blocks of trials.</p>`;

      if (accuracy < accuracyThresh) {
        feedbackText += `
          <p class="block-text">Your accuracy is low. Remember:</p>
          ${promptTextList}
        `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
          <p class="block-text">You have been responding too slowly.</p>
          ${speedReminder}
        `;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
          <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>
        `;
      }

      if (
        accuracy >= accuracyThresh &&
        missedResponses <= missedResponseThresh &&
        avgRT <= rtThresh
      ) {
        feedbackText += "<p class = block-text>No feedback on this block.</p>";
      }

      feedbackText +=
        "<p class=block-text>Press <i>enter</i> to continue.</p>" + "</div>";

      taskSwitches = jsPsych.randomization.repeat(
        taskSwitchesArr,
        numTrialsPerBlock / 4
      );

      taskSwitches.unshift({
        task_switch: "na",
        cue_switch: "na",
      });
      stims = genStims(numTrialsPerBlock + 1);
      return true;
    }
  },
};

var fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
};

var exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

var expID = "cued_task_switching_rdoc";

var expStage = "practice";

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: expID,
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function () {
    evalAttentionChecks();
  },
};

var cued_task_switching_rdoc_experiment = [];
var cued_task_switching_rdoc_init = () => {
  jsPsych.pluginAPI.preloadImages(images);

  taskSwitches = jsPsych.randomization.repeat(taskSwitchesArr, practiceLen / 4);
  taskSwitches.unshift({
    task_switch: "na",
    cue_switch: "na",
  });
  stims = genStims(practiceLen + 1);

  cued_task_switching_rdoc_experiment.push(fullscreen);
  cued_task_switching_rdoc_experiment.push(instructionNode);
  cued_task_switching_rdoc_experiment.push(practiceNode);
  cued_task_switching_rdoc_experiment.push(testNode);
  cued_task_switching_rdoc_experiment.push(endBlock);
  cued_task_switching_rdoc_experiment.push(exitFullscreen);
};
