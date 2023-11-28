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

function sampleWithoutReplacement(arr, n) {
  let result = [];
  let tempArray = [...arr];

  for (let i = 0; i < n; i++) {
    if (tempArray.length === 0) {
      break;
    }

    const index = Math.floor(Math.random() * tempArray.length);
    result.push(tempArray[index]);
    tempArray.splice(index, 1);
  }

  return result;
}

function getCTIs(blockLen) {
  let result = [];
  let CTIArr = [...CTIVals]; // Create a copy of CTIVals

  while (result.length < blockLen) {
    if (CTIArr.length === 0) {
      CTIArr = [...CTIVals]; // Reset CTIArr by creating a new copy of CTIVals
    }
    let index = Math.floor(Math.random() * CTIArr.length);
    result.push(CTIArr[index]);
    CTIArr.splice(index, 1); // Remove the sampled element
  }
  return result;
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

var getExpStage = function () {
  return expStage;
};

function appendData() {
  var data = jsPsych.data.get().last(1).values()[0];
  if (data.response == data.correct_response) {
    var correctTrial = 1;
  } else {
    var correctTrial = 0;
  }
  jsPsych.data.get().addToLast({
    correct_trial: correctTrial,
    block_num: getExpStage() == "practice" ? practiceCount : testCount,
  });
}

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

var getCue = function () {
  currStim = blockStims.pop();
  return currStim.cue_stimulus;
};

var getStim = function () {
  return currStim.stimulus;
};

var getStimData = function () {
  return currStim.data;
};

var getCurrBlockNum = function () {
  if (getExpStage() == "practice") {
    return practiceCount;
  } else {
    return testCount;
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
    Welcome! This experiment will take around 15 minutes.
  </p>
  <p class="center-block-text">
    To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in fullscreen mode for the whole duration of each task.
  </p>
  <p class="center-block-text"> Press <i>enter</i> to begin.</p>
`;

// eslint-disable-next-line no-unused-vars
var expStage = "practice";

// Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 1500;
const cueStimulusDuration = 500;
const cueTrialDuration = 500;
// initialize
var fixationDuration2;
var CTIVals = [100, 550, 1000];

// generic task variables
var runAttentionChecks = true;

var instructTimeThresh = 1; // in seconds
var accuracyThresh = 0.8;
var practiceAccuracyThresh = 0.83; // 2 wrong, 10 out of 12 is .833
var rtThresh = 750;
var missedResponseThresh = 0.1;
var practiceThresh = 3;

var practiceLen = 12;
var numTestBlocks = 3;
var numTrialsPerBlock = 72; // should be multiple of 24

const responseKeys = `<p class='block-text'>Press your <b>${possibleResponses[0][0]}</b> if the star (*) appears in the left box and your <b>${possibleResponses[1][0]}</b> if the star (*) appears in the right box.</p>`;
var currStim = "";

var fixation =
  '<div class = centerbox><div class = fixation style="font-size:100px">+</div></div>';

var images = {
  left: {
    box: "<div class = bigbox><div id=left_box></div></div>",
    bold: '<div class = bigbox><div id=left_box style="border-width:15px"></div></div>',
    star: "<div class = bigbox><div id=left_box><div class='center-text star'>*</div></div></div>",
  },
  right: {
    box: "<div class = bigbox><div id=right_box></div></div>",
    bold: '<div class = bigbox><div id=right_box style="border-width:15px"></div></div>',
    star: "<div class = bigbox><div id=right_box><div class='center-text star'>*</div></div></div>",
  },
};

var stimuli = [];
var practiceStimuli = [];
// making 24 stimuli: 4 nocue left, 4 nocue right; 4 doublecue left, 4 doublecue right; 3 valid left, 1 invalid left, 3 valid right, 1 invalid right
for (let i = 0; i < 2; i++) {
  var loc = ["left", "right"][i];
  var noloc = ["left", "right"].filter(value => value != loc)[0];
  // for this side, add 4 nocue, 4 double cue, 3 valid, 1 invalid
  noCueTrials = Array(4).fill({
    stimulus: images[loc].star + images[noloc].box + fixation,
    cue_stimulus: images[loc].box + images[noloc].box + fixation,
    data: {
      cue_location: "none",
      stim_location: loc,
      condition: "nocue",
      correct_response: choices[i],
    },
  });
  doubleCueTrials = Array(4).fill({
    stimulus: images[loc].star + images[noloc].box + fixation,
    cue_stimulus: images[loc].bold + images[noloc].bold + fixation,
    data: {
      cue_location: "both",
      stim_location: loc,
      condition: "doublecue",
      correct_response: choices[i],
    },
  });
  validTrials = Array(3).fill({
    stimulus: images[loc].star + images[noloc].box + fixation,
    cue_stimulus: images[loc].bold + images[noloc].box + fixation,
    data: {
      cue_location: loc,
      stim_location: loc,
      condition: "valid",
      correct_response: choices[i],
    },
  });
  invalidTrials = [
    {
      stimulus: images[loc].star + images[noloc].box + fixation,
      cue_stimulus: images[loc].box + images[noloc].bold + fixation,
      data: {
        cue_location: noloc,
        stim_location: loc,
        condition: "invalid",
        correct_response: choices[i],
      },
    },
  ];
  stimuli = stimuli.concat(
    noCueTrials,
    doubleCueTrials,
    validTrials,
    invalidTrials
  );
}

var noCueStim = stimuli.filter(obj => obj.data.condition === "nocue");
var doubleCueStim = stimuli.filter(obj => obj.data.condition === "doublecue");
var validCueStim = stimuli.filter(obj => obj.data.condition === "valid");
var invalidCueStim = stimuli.filter(obj => obj.data.condition === "invalid");

var promptText = `
  <div class="prompt_box">
    <p class="center-block-text" style="font-size:16px; line-height:80%;">Star in left box: ${possibleResponses[0][0]}</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">Star in right box: ${possibleResponses[1][0]}</p>
  </div>
`;

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

var pageInstruct = [
  `
  <div class="centerbox">
    <p class="block-text">
      Place your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b>
    </p>
    <p class="block-text">
      During this task, on each trial you will see two boxes on the screen, and then a star appear in either the left or right box.
    </p>
    <p class="block-text">
      Your task is to press your <b>${possibleResponses[0][0]}</b> if the star appears in the <b>left box</b>, and your <b>${possibleResponses[1][0]}</b> if the star appears in the <b>right box</b>.
    </p>
    <p class="block-text">
      On some trials, one or both of the boxes will be highlighted before the star appears.
    </p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text">
      We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules.
      These will be taken out for the test, so make sure you understand the instructions before moving on.
    </p>
    ${speedReminder}
  </div>
  `,
];

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
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
    exp_id: "spatial_cueing_rdoc",
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
      feedbackInstructBlock =
        "<p class=block-text>Read through instructions too quickly. Please take your time and make sure you understand the instructions.</p><p class=block-text>Press <i>enter</i> to continue.</p>";
      return true;
    } else {
      feedbackInstructBlock =
        "<p class=block-text>Done with instructions. Press <i>enter</i> to continue.</p>";
      return false;
    }
  },
};

var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    // var last = jsPsych.data.get().last(1).values()[0];
    var last = jsPsych.data.get().last(1).trials[0];
    // ^ changed since we added a fixation block after response block
    if (last.response == null) {
      return (
        "<div class = fb_box><div class = 'center-text'><font size =20>Respond Faster!</font></div></div>" +
        images.left.box +
        images.right.box +
        fixation
      );
    } else if (last.correct_trial == 1) {
      return (
        "<div class = fb_box><div class = 'center-text'><font size =20>Correct!</font></div></div>" +
        images.left.box +
        images.right.box +
        fixation
      );
    } else {
      return (
        "<div class = fb_box><div class = 'center-text'><font size =20>Incorrect</font></div></div>" +
        images.left.box +
        images.right.box +
        fixation
      );
    }
  },
  data: {
    exp_stage: "practice",
    trial_id: "practice_feedback",
    trial_duration: 500,
    stimulus_duration: 500,
    block_num: practiceCount,
  },
  choices: ["NO_KEYS"],
  stimulus_duration: 500,
  trial_duration: 500,
  prompt: promptText,
};

// after each block
var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";

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

var ITIms = null;

// *** ITI *** //
var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: images.left.box + images.right.box + fixation,
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

var practiceTrials = [];
for (let i = 0; i < practiceLen; i++) {
  var firstFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "practice_fixation_1",
      exp_stage: "practice",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration,
    trial_duration: fixationDuration,
    prompt: promptText,
    on_finish: data => (data["block_num"] = practiceCount),
  };
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: function () {
      return {
        trial_id: "practice_cue",
        exp_stage: "practice",
        trial_duration: cueTrialDuration,
        stimulus_duration: cueStimulusDuration,
      };
    },
    post_trial_gap: 0,
    stimulus_duration: cueStimulusDuration,
    trial_duration: cueTrialDuration,
    prompt: promptText,
    on_finish: data => (data["block_num"] = practiceCount),
  };
  var secondFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "practice_fixation_2",
      exp_stage: "practice",
    },
    post_trial_gap: 0,
    stimulus_duration: function () {
      return fixationDuration2;
    },
    trial_duration: function () {
      return fixationDuration2;
    },
    prompt: promptText,
    on_finish: function (data) {
      data["block_num"] = practiceCount;
      data["trial_duration"] = fixationDuration2;
      data["stimulus_duration"] = fixationDuration2;
      data["CTI"] = fixationDuration2;
      fixationDuration2 = CTIs.shift();
    },
  };
  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function () {
      return Object.assign({}, getStimData(), {
        trial_id: "practice_trial",
        exp_stage: "practice",
        choices: choices,
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
      });
    },
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1000
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
    prompt: promptText,
  };
  practiceTrials.push(
    firstFixationBlock,
    cueBlock,
    secondFixationBlock,
    testTrial,
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
      if (
        data.trials[i].trial_id == "practice_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
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

    if (accuracy >= practiceAccuracyThresh || practiceCount == practiceThresh) {
      feedbackText = `
        <div class="centerbox">
          <p class="center-block-text">We will now start the test portion.</p>
          <p class="block-text">Keep your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b></p>
          <p class="block-text">Press <i>enter</i> to continue.</p>
        </div>
      `;

      expStage = "test";
      blockStims = jsPsych.randomization.repeat(
        stimuli,
        numTrialsPerBlock / stimuli.length
      );
      CTIs = [];
      CTIs = getCTIs(numTrialsPerBlock);

      expStage = "test";
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < practiceAccuracyThresh) {
        feedbackText += `
        <p class="block-text">Your accuracy is low. Remember: </p>
        ${responseKeys}
      `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>
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

      practiceStimuli.push(
        ...sampleWithoutReplacement(doubleCueStim, 4),
        ...sampleWithoutReplacement(noCueStim, 4),
        ...sampleWithoutReplacement(validCueStim, 3),
        ...sampleWithoutReplacement(invalidCueStim, 1)
      );
      blockStims = jsPsych.randomization.repeat(practiceStimuli, 1);
      CTIs = [];
      CTIs = getCTIs(practiceLen);

      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode);
for (i = 0; i < numTrialsPerBlock; i++) {
  var firstFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "test_fixation_1",
      exp_stage: "test",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
      block_num: testCount,
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration,
    trial_duration: fixationDuration,
  };
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: function () {
      return {
        trial_id: "test_cue",
        exp_stage: "test",
        trial_duration: 500,
        stimulus_duration: 500,
        block_num: testCount,
      };
    },
    post_trial_gap: 0,
    stimulus_duration: 500,
    trial_duration: 500,
  };
  var secondFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "test_fixation_2",
      exp_stage: "test",
      trial_duration: fixationDuration2,
      stimulus_duration: fixationDuration2,
      block_num: testCount,
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration2,
    trial_duration: fixationDuration2,
    // prompt: promptText,
    on_finish: function () {
      fixationDuration2 = Math.floor(Math.random() * 1200) + 400;
    },
  };
  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function () {
      return Object.assign({}, getStimData(), {
        trial_id: "test_trial",
        exp_stage: "test",
        choices: choices,
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
      });
    },
    stimulus_duration: stimStimulusDuration,
    trial_duration: stimTrialDuration,
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
  };
  testTrials.push(
    firstFixationBlock,
    cueBlock,
    secondFixationBlock,
    testTrial,
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
      if (
        data.trials[i].trial_id == "test_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
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
        <p class="block-text">Your accuracy is low. Remember: </p>
        ${responseKeys}
      `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>
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
        feedbackText += "<p class=block-text>No feedback on this block.</p>";
      }

      feedbackText +=
        "<p class=block-text>Press <i>enter</i> to continue.</p>" + "</div>";

      blockStims = jsPsych.randomization.repeat(
        stimuli,
        numTrialsPerBlock / stimuli.length
      );
      CTIs = [];
      CTIs = getCTIs(numTrialsPerBlock);

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

var expID = "spatial_cueing_rdoc";
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

var spatial_cueing_rdoc_experiment = [];
var spatial_cueing_rdoc_init = () => {
  practiceStimuli.push(
    ...sampleWithoutReplacement(doubleCueStim, 4),
    ...sampleWithoutReplacement(noCueStim, 4),
    ...sampleWithoutReplacement(validCueStim, 3),
    ...sampleWithoutReplacement(invalidCueStim, 1)
  );
  blockStims = jsPsych.randomization.repeat(practiceStimuli, 1);
  CTIs = getCTIs(practiceLen);
  fixationDuration2 = CTIs.shift();
  spatial_cueing_rdoc_experiment.push(fullscreen);
  spatial_cueing_rdoc_experiment.push(instructionNode);
  spatial_cueing_rdoc_experiment.push(practiceNode);
  spatial_cueing_rdoc_experiment.push(testNode);
  spatial_cueing_rdoc_experiment.push(endBlock);
  spatial_cueing_rdoc_experiment.push(exitFullscreen);
};
