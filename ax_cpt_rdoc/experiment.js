/* ************************************ */
/* Define helper functions */
/* ************************************ */

// ITIs
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

// Attention Checks
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

var getCondition = function () {
  return currCondition;
};
var getExpStage = function () {
  return expStage;
};

var getCue = function () {
  return currCue;
};
var getStim = function () {
  return currStim;
};

// Data logging
function appendData() {
  var data = jsPsych.data.get().last(1).values()[0];

  correctTrial = 0;
  if (data.response == data.correct_response) {
    correctTrial = 1;
  }
  jsPsych.data.get().addToLast({ correct_trial: correctTrial });
}

// Task-Specific
var setStims = function () {
  currCondition = blockList.pop();

  switch (currCondition) {
    case "AX":
      currStim = "<div class = centerbox><div class = AX_text>X</div></div>";
      currCue = "<div class = centerbox><div class = AX_text>A</div></div>";
      break;
    case "BY":
      currStim = getChar();
      currCue = getChar();
      break;
    case "BX":
      currStim = "<div class = centerbox><div class = AX_text>X</div></div>";
      currCue = getChar();
      break;
    case "AY":
      currStim = getChar();
      currCue = "<div class = centerbox><div class = AX_text>A</div></div>";
      break;
  }
};

var getChar = function () {
  return (
    "<div class = centerbox><div class = AX_text>" +
    chars[Math.floor(Math.random() * chars.length)] +
    "</div></div>"
  );
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
const fixationDuration = 500;

const possibleResponses = [
  ["index finger", ",", "comma key (,)"],
  ["middle finger", ".", "period key (.)"],
];

const choices = [possibleResponses[0][1], possibleResponses[1][1]];

/* ******************************* */
/* TASK TEXT */
/* ******************************* */
var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>`;

var feedbackInstructText = `
  <p class=center-block-text>
    Welcome! This experiment will take around 17 minutes.
  </p>
  <p class=center-block-text>
    To avoid technical issues,
    please keep the experiment tab (on Chrome or Firefox)
    active and fullscreen for the whole duration of each task.
  </p>
  <p class=center-block-text> Press <i>enter</i> to begin.</p>
`;

var speedReminder = `
  <p class = block-text>
    Try to respond as quickly and accurately as possible.
  </p>
`;

var feedbackText = `
  <div class = centerbox>
    <p class = center-block-text>Press <i>enter</i> to begin practice.</p>
  </div>
`;

var promptTextList = `
  <ul style="text-align:left;">
    <li>A -> X: ${possibleResponses[0][0]}</li>
    <li>Anything else: ${possibleResponses[1][0]}</li>
  </ul>
`;

var promptText = `
  <div class = prompt_box>
    <p class = center-block-text style = "font-size:16px; line-height:80%;">A -> X: ${possibleResponses[0][0]}</p>
    <p class = center-block-text style = "font-size:16px; line-height:80%;">Anything else: ${possibleResponses[1][0]}</p>
  </div>
`;

var pageInstruct = [
  `
  <div class = centerbox>
    <p class=block-text>Place your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b></p>
    <p class = block-text>During this task, on each trial you will see a letter presented, a short break, and then a second letter. For instance, you may see "A," which would then disappear to be replaced by "F".</p>
    <p class = block-text>Your task is to respond by pressing a button during the presentation of the <b>second</b> letter. If the first letter was an "A" <b>AND</b> the second letter is an "X", press your <b>${possibleResponses[0][0]}</b>. Otherwise, press your <b>${possibleResponses[1][0]}</b>.</p>
  </div>
  `,
  `
  <div class = centerbox>
    <p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    <p class = block-text>Remember, press your <b>${possibleResponses[0][0]}</b> after you see "A" followed by an "X", and your <b>${possibleResponses[1][0]}</b> for all other combinations.</p>
    ${speedReminder}
  </div>
  `,
];

/* ******************************* */
/* TIMINGS */
/* ******************************* */

// cue
const cueStimulusDuration = 500;
const cueTrialDuration = 500;
// probe
const probeStimulusDuration = 1000;
const probeTrialDuration = 1500;

// generic task variables
var instructTimeThresh = 1;

/* ******************************* */
/* ATTENTION CHECK STUFF  */
/* ******************************* */
var runAttentionChecks = true;

/* ******************************* */
/* THRESHOLDS */
/* ******************************* */

var practiceThresh = 3; // 3 blocks max
var accuracyThresh = 0.75; // min accuracy to proceed to test
var rtThresh = 1000; // min of 1s on instructions to proceed to practice
var missedResponseThresh = 0.1; // get feedback if missed responses > 10% of trials

/* ******************************* */
/* Conditions/Num Trials */
/* ******************************* */
var chars = "BCDEFGHIJLMNOPQRSTUVWZ";

// 4: 2: 2: 2
var trialProportions = [
  "AX",
  "AX",
  "AX",
  "AX",
  "BX",
  "BX",
  "AY",
  "AY",
  "BY",
  "BY",
];

var numTestBlocks = 3;
var numTrialsPerBlock = trialProportions.length * 5; // 50
var practiceLen = trialProportions.length / 2; // 5
var currCondition = "";

var expStage = "practice";

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */

// *** FIXATION *** //
var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: function () {
    if (getExpStage() == "practice") {
      return {
        trial_id: "practice_fixation",
        exp_stage: getExpStage(),
        trial_duration: fixationDuration,
        stimulus_duration: fixationDuration,
        block_num: practiceCount,
      };
    } else {
      return {
        trial_id: "test_fixation",
        exp_stage: getExpStage(),
        trial_duration: fixationDuration,
        stimulus_duration: fixationDuration,
        block_num: testCount,
      };
    }
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration, // 500
  trial_duration: fixationDuration, // 500
  prompt: function () {
    if (getExpStage() == "practice") {
      return promptText;
    } else {
      return "";
    }
  },
};

// *** FIXATION2 *** //
var fixation2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: function () {
    if (getExpStage() == "practice") {
      return {
        trial_id: "practice_inter-stimulus",
        exp_stage: getExpStage(),
        trial_duration: fixationDuration + 2500,
        stimulus_duration: fixationDuration + 2500,
        block_num: practiceCount,
      };
    } else {
      return {
        trial_id: "test_inter-stimulus",
        exp_stage: getExpStage(),
        trial_duration: fixationDuration + 2500,
        stimulus_duration: fixationDuration + 2500,
        block_num: testCount,
      };
    }
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration + 2500, // 3000
  trial_duration: fixationDuration + 2500, // 3000
  prompt: function () {
    if (getExpStage() == "practice") {
      return promptText;
    } else {
      return "";
    }
  },
};

var ITIms = null;

// *** ITI *** //
var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
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

/* ******************************* */
/* INSTRUCTION STUFF */
/* ******************************* */

var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["Enter"],
  stimulus: getInstructFeedback,
  data: {
    trial_id: "instruction_feedback",
    trial_duration: 180000,
  },
  post_trial_gap: 0,
  trial_duration: 180000,
};

var instructionsBlock = {
  type: jsPsychInstructions,
  pages: pageInstruct,
  allow_keys: false,
  data: {
    exp_id: expID,
    trial_id: "instructions",
    trial_duration: null,
  },
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var sumInstructTime = 0; // ms
var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
  /* This function defines stopping criteria */
  loop_function: function (data) {
    for (i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "instructions" &&
        data.trials[i].rt != null
      ) {
        rt = data.trials[i].rt;
        sumInstructTime = sumInstructTime + rt;
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedbackInstructText =
        "<p class=block-text>Read through instructions too quickly. Please take your time and make sure you understand the instructions.</p><p class=block-text>Press <i>enter</i> to continue.</p>";
      return true;
    } else {
      feedbackInstructText =
        "<p class=block-text>Done with instructions. Press <i>enter</i> to continue.</p>";
      return false;
    }
  },
};
/* ******************************* */
/* PRACTICE FEEDBACK STUFF */
/* ******************************* */
var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    var last = jsPsych.data.get().last(1).values()[0];
    if (last.response == null) {
      return (
        "<div class = fb_box>" +
        "<div class = center-text>" +
        "<font size =20>Respond Faster!</font></div></div>"
      );
    } else if (last.correct_trial == 1) {
      return (
        "<div class = fb_box>" +
        "<div class = center-text><font size =20>Correct!</font></div></div>"
      );
    } else {
      return (
        "<div class = fb_box>" +
        "<div class = center-text><font size =20>Incorrect</font></div></div>"
      );
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
  post_trial_gap: 1000,
  trial_duration: 60000,
  response_ends_trial: true,
};

/* ******************************* */
/* ATTENTION CHECK STUFF */
/* ******************************* */
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
attentionCheckData = shuffleArray(attentionCheckData);
var currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

// Set up attention check node
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
  trial_duration: 60000,
  on_finish: data => (data["block_num"] = testCount),
};

var attentionNode = {
  timeline: [attentionCheckBlock],
  conditional_function: function () {
    return runAttentionChecks;
  },
};

var setStimsBlock = {
  type: jsPsychCallFunction,
  func: setStims,
};

/* ******************************* */
/* PRACTICE TRIALS */
/* ******************************* */

/* trial blocks and nodes */
practiceTrials = [];
for (i = 0; i < practiceLen; i++) {
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    is_html: true,
    choices: ["NO_KEYS"],
    data: function () {
      return {
        trial_id: "practice_cue",
        exp_stage: "practice",
        condition: getCondition(),
        trial_duration: cueTrialDuration,
        stimulus_duration: cueStimulusDuration,
        block_num: practiceCount,
      };
    },
    stimulus_duration: cueStimulusDuration, // 500
    trial_duration: cueTrialDuration, // 500
    response_ends_trial: false,
    post_trial_gap: 0,
    prompt: promptText,
  };
  var probeBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function () {
      return {
        trial_id: "practice_probe",
        exp_stage: "practice",
        condition: getCondition(),
        choices: choices,
        trial_duration: probeTrialDuration,
        stimulus_duration: probeStimulusDuration,
        correct_response:
          getCondition() == "AX"
            ? possibleResponses[0][1]
            : possibleResponses[1][1],
        block_num: practiceCount,
      };
    },
    stimulus_duration: probeStimulusDuration,
    trial_duration: probeTrialDuration,
    post_trial_gap: 0,
    response_ends_trial: false,
    prompt: promptText,
    on_finish: appendData,
  };

  practiceTrials.push(
    setStimsBlock,
    fixation,
    cueBlock,
    fixation2,
    probeBlock,
    practiceFeedbackBlock,
    ITIBlock
  );
}

// loop based on criteria
var practiceCount = 0;
var practiceNode = {
  timeline: [feedbackBlock].concat(practiceTrials),
  loop_function: function (data) {
    practiceCount += 1;
    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "practice_probe") {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].correct_trial == 1) {
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
      </div>`;

      blockList = jsPsych.randomization.repeat(
        trialProportions,
        numTrialsPerBlock / trialProportions.length
      );
      expStage = "test";
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText += `
        <p class = block-text>Your accuracy is low. Remember:</p>
        ${promptTextList}
      `;
      }
      if (avgRT > rtThresh) {
        feedbackText += `
       <p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>
      `;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText += `
        <p class = block-text>You have not been responding to some trials. Please respond on every trial that requires a response.</p>
      `;
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      blockList = jsPsych.randomization.repeat(trialProportions, 1);
      return true;
    }
  },
};

/* ******************************* */
/* TEST TRIALS */
/* ******************************* */
var testTrials = [];
testTrials.push(attentionNode);
for (i = 0; i < numTrialsPerBlock; i++) {
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    is_html: true,
    choices: ["NO_KEYS"],
    data: function () {
      return {
        trial_id: "test_cue",
        exp_stage: "test",
        condition: getCondition(),
        trial_duration: cueTrialDuration,
        stimulus_duration: cueStimulusDuration,
        block_num: testCount,
      };
    },
    stimulus_duration: cueStimulusDuration,
    trial_duration: cueTrialDuration,
    response_ends_trial: false,
    post_trial_gap: 0,
  };
  var probeBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function () {
      return {
        trial_id: "test_probe",
        exp_stage: "test",
        condition: getCondition(),
        choices: choices,
        trial_duration: probeTrialDuration,
        stimulus_duration: probeStimulusDuration,
        correct_response:
          getCondition() == "AX"
            ? possibleResponses[0][1]
            : possibleResponses[1][1],
        block_num: testCount,
      };
    },
    stimulus_duration: probeStimulusDuration,
    trial_duration: probeTrialDuration,
    post_trial_gap: 0,
    response_ends_trial: false,
    on_finish: appendData,
  };
  testTrials.push(
    setStimsBlock,
    fixation,
    cueBlock,
    fixation2,
    probeBlock,
    ITIBlock
  );
}

var testCount = 0;
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function (data) {
    testCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "test_probe") {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].correct_trial == 1) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

    if (testCount == numTestBlocks) {
      feedbackText = `
        <div class=centerbox>
        <p class=block-text>Done with this task.</p> +
        <p class=centerbox>Press <i>enter</i> to continue.</p> +
        </div>
      `;

      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      feedbackText += `<p class=block-text>You have completed ${testCount} out of ${numTestBlocks} blocks of trials.</p>`;

      if (accuracy < accuracyThresh) {
        feedbackText += `
        <p class = block-text>Your accuracy is low. Remember:</p>
        ${promptTextList}
      `;
      }
      if (avgRT > rtThresh) {
        feedbackText += `
       <p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>
      `;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText += `
        <p class = block-text>You have not been responding to some trials. Please respond on every trial that requires a response.</p>
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

      blockList = jsPsych.randomization.repeat(
        trialProportions,
        numTrialsPerBlock / trialProportions.length
      );
      return true;
    }
  },
};

/* ******************************* */
/* JSPSYCH REQUIRED IN ALL SCRIPTS */
/* ******************************* */

var fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
};
var exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

var expID = "ax_cpt_rdoc"; // for this experiment

// last block in timeline
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

var ax_cpt_rdoc_experiment = [];
var ax_cpt_rdoc_init = () => {
  blockList = jsPsych.randomization.repeat(trialProportions, 1);
  ax_cpt_rdoc_experiment.push(fullscreen);
  ax_cpt_rdoc_experiment.push(instructionNode);
  ax_cpt_rdoc_experiment.push(practiceNode);
  ax_cpt_rdoc_experiment.push(testNode);
  ax_cpt_rdoc_experiment.push(endBlock);
  ax_cpt_rdoc_experiment.push(exitFullscreen);
};
