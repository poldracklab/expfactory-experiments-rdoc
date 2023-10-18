/* ************************************ */
/* Define helper functions */
/* ************************************ */
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

attentionCheckData = shuffleArray(attentionCheckData);
var currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

var trialTargetPresent;
function getStim() {
  const containerWidth = window.innerWidth * 0.7; // Adjusted width (90% of window width)
  const containerHeight = window.innerHeight * 0.7; // Adjusted height (90% of window height)
  const boxWidth = 40;
  const boxHeight = 80; // Adjust the height as desired

  const targetIndex = Math.floor(Math.random() * n); // Randomly select an index for the target div
  const targetPresent = isTargetPresent();
  trialTargetPresent = targetPresent;
  const html = generateHTML(
    containerWidth,
    containerHeight,
    targetPresent,
    targetIndex,
    boxWidth,
    boxHeight
  );

  return html;
}

function isTargetPresent() {
  return Math.random() < 0.5; // Modify the condition for your target logic
}

function generateHTML(
  containerWidth,
  containerHeight,
  targetPresent,
  targetIndex,
  boxWidth,
  boxHeight
) {
  let html;

  html =
    '<div class="container" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: ' +
    containerWidth +
    "px; height: " +
    containerHeight +
    'px;">';
  const positions = [];
  let rows;
  let cols;

  if (n === 8) {
    rows = 4;
    cols = 2;
  } else if (n === 24) {
    rows = 6;
    cols = 4;
  } else {
    throw new Error("Invalid value of n. Only 8 or 24 is supported.");
  }

  const spacingX = (containerWidth - cols * boxWidth) / (cols + 1);
  const spacingY = (containerHeight - rows * boxHeight) / (rows + 1);

  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const left = spacingX * (col + 1) + col * boxWidth;
    const top = spacingY * (row + 1) + row * boxHeight;

    positions.push({ left, top });

    if (i === targetIndex && targetPresent) {
      html += generateTargetElement(left, top, boxWidth, boxHeight);
    } else {
      html += generateDistractorElement(left, top, boxWidth, boxHeight);
    }
  }

  html += "</div>";

  return html;
}

function generateTargetElement(left, top, width, height) {
  return (
    '<div id="target" class="box" style="position: absolute; left: ' +
    left +
    "px; top: " +
    top +
    "px; width: " +
    width +
    "px; height: " +
    height +
    'px; background-color: white;"></div>'
  );
}

function generateDistractorElement(left, top, width, height) {
  if (getCurrCondition() === "feature") {
    return (
      '<div id="black-distractor-element" class="box" style="position: absolute; left: ' +
      left +
      "px; top: " +
      top +
      "px; width: " +
      width +
      "px; height: " +
      height +
      'px; background-color: black;"></div>'
    );
  } else if (getCurrCondition() === "conjunction") {
    if (Math.random() < 0.5) {
      return (
        '<div id="white-distractor-element"  class="box" style="position: absolute; left: ' +
        left +
        "px; top: " +
        top +
        "px; width: " +
        width +
        "px; height: " +
        height +
        'px; background-color: white; transform: rotate(90deg); transform-origin: center;"></div>'
      );
    } else {
      return (
        '<div id="black-distractor-element"  class="box" style="position: absolute; left: ' +
        left +
        "px; top: " +
        top +
        "px; width: " +
        width +
        "px; height: " +
        height +
        'px; background-color: black;"></div>'
      );
    }
  }
}

var getExpStage = function () {
  return expStage;
};

var getCurrCondition = function () {
  return condition;
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

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

const pageInstruct = [
  `<div class="centerbox">
    <p class="block-text">Place your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b></p>
    <p class="block-text">During this task, on each trial rectangles will appear on the screen. The rectangles can be either black or white in color.</p>
    <p class="block-text">On some trials, <b>one</b> of these rectangles will be a <b>vertical white rectangle</b>. We will call this rectangle the 'target'.</p>
    <p class="block-text">Your task is to determine whether a target is present or absent on each trial.</p>
    <p class="block-text">If you determine a target is <b>present</b>, press your <b>${possibleResponses[0][0]}</b>, and if you determine a target is <b>absent</b>, press your <b>${possibleResponses[1][0]}</b>.</p>
  </div>`,
  `<div class="centerbox">
    <p class="block-text">We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    ${speedReminder}
  </div>`,
];

const stimStimulusDuration = 1500;
const stimTrialDuration = 2000;

var runAttentionChecks = true;

// thresholds
const instructTimeThresh = 1; // /in seconds
var sumInstructTime = 0; // ms
const accuracyThresh = 0.6;
const rtThresh = 1000;
const missedResponseThresh = 0.1;

// trial nums
var practiceLen = 4;
var numTrialsPerBlock = 64;
var numTestBlocks = 3;

var practiceCount = 0;
var practiceThresh = 3;
var expStage = "practice";

/*  ######## Important text values for display ######## */
const promptText = `
<div class="prompt_box">
  <p class="center-block-text" style="font-size: 16px; line-height: 80%;">Target present: press your ${possibleResponses[0][0]}</p>
  <p class="center-block-text" style="font-size: 16px; line-height: 80%;">Target absent: press your ${possibleResponses[1][0]}</p>
</div>`;

const promptTextList = `
<ul style="text-align: left; font-size: 24px;">
  <li>Target present: press your ${possibleResponses[0][0]}</li>
  <li>Target absent: press your ${possibleResponses[1][0]}</li>
</ul>`;

// setting first value for 8 or 24 stim, random 50/50 after
const nArray = [8, 24];
var randomIndexN = Math.floor(Math.random() * nArray.length);
var n = nArray[randomIndexN];

// setting first value for feature/conjunction condition
const conditionArray = ["feature", "conjunction"];
var randomIndexCondition = Math.floor(Math.random() * conditionArray.length);
var condition = conditionArray[randomIndexCondition];

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
  data: {
    trial_id: "instruction_feedback",
    trial_duration: 180000,
  },
  stimulus: getInstructFeedback,
  post_trial_gap: 0,
  trialDuration: 180000,
};

var testTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: getStim,
  choices: choices,
  stimulus_duration: stimStimulusDuration, // 1500,
  trial_duration: stimTrialDuration, // 1500
  post_trial_gap: 0,
  response_ends_trial: false,
  prompt: function () {
    if (getExpStage() == "practice") {
      return promptText;
    } else {
      return "";
    }
  },
  data: function () {
    if (getExpStage() == "practice") {
      return {
        trial_id: "practice_trial",
        choices: choices,
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
        block_num: practiceCount,
      };
    } else {
      return {
        trial_id: "test_trial",
        choices: choices,
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
        block_num: testCount,
      };
    }
  },
  on_finish: function (data) {
    data["target_present"] = trialTargetPresent ? 1 : 0;
    data["num_stimuli"] = n;
    data["condition"] = getCurrCondition();
    data["exp_stage"] = getExpStage();
    data["correct_response"] = trialTargetPresent
      ? possibleResponses[0][1]
      : possibleResponses[1][1];

    if (data.response !== null) {
      if (trialTargetPresent) {
        if (data.response == possibleResponses[0][1]) {
          data["correct_trial"] = 1;
        } else {
          data["correct_trial"] = 0;
        }
      } else {
        if (data.response == possibleResponses[0][1]) {
          data["correct_trial"] = 0;
        } else {
          data["correct_trial"] = 1;
        }
      }
    } else {
      data["correct_trial"] = null;
    }
    randomIndexN = Math.floor(Math.random() * nArray.length);
    n = nArray[randomIndexN];

    randomIndexCondition = Math.floor(Math.random() * conditionArray.length);
    condition = conditionArray[randomIndexCondition];
  },
};

// / This ensures that the subject does not read through the instructions too quickly. If they do it too quickly, then we will go over the loop again.
// TODO: Change instructions
var instructionsBlock = {
  type: jsPsychInstructions,
  pages: pageInstruct,
  allow_keys: false,
  data: {
    trial_id: "instructions",
    trial_duration: null,
  },
  show_clickable_nav: true,
  post_trial_gap: 0,
};

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
        sumInstructTime += rt;
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
  trialDuration: 60000,
  response_ends_trial: true,
};

var fixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class="centerbox"><div class="fixation">+</div></div>',
  choices: ["NO_KEYS"],
  data: function () {
    if (getExpStage() == "practice") {
      return {
        trial_id: "practice_fixation",
        exp_stage: "practice",
        trial_duration: fixationDuration,
        stimulus_duration: fixationDuration,
        block_num: practiceCount,
      };
    } else {
      return {
        trial_id: "test_fixation",
        exp_stage: "test",
        trial_duration: fixationDuration,
        stimulus_duration: fixationDuration,
        block_num: testCount,
      };
    }
  },
  prompt: function () {
    if (getExpStage() == "practice") {
      return promptText;
    } else {
      return "";
    }
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration, // 500
  trial_duration: fixationDuration, // 500
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
  on_load: function () {
    function preventSlash(event) {
      if (event.key === "/" || event.key === "," || event.key === ".") {
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", preventSlash);
    jsPsych.getCurrentTrial().on_close = function () {
      window.removeEventListener("keydown", preventSlash);
    };
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

var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    // var last = jsPsych.data.get().last(1).values()[0];
    var last = jsPsych.data.get().last(1).trials[0];
    // ^ changed since we added a fixation block after response block\
    if (last.response == null) {
      return "<div class = centerbox><p class = center-block-text>Respond Faster!</div></div>";
    }
    if (last.correct_trial == 1) {
      return "<div class = centerbox><p class = center-block-text>Correct!</div></div>";
    } else if (last.correct_trial == 0) {
      return "<div class = centerbox><p class = center-block-text>Incorrect!</div></div>";
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
  stimulus_duration: 500, // 500
  trial_duration: 500, // 500
  prompt: function () {
    if (getExpStage() == "practice") {
      return promptText;
    } else {
      return "";
    }
  },
};

var practiceTrials = [];
for (let i = 0; i < practiceLen; i++) {
  practiceTrials.push(
    fixationBlock,
    testTrial,
    practiceFeedbackBlock,
    ITIBlock
  );
}

var practiceNode = {
  timeline: [feedbackBlock].concat(practiceTrials),
  loop_function: function (data) {
    practiceCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "practice_trial") {
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

      expStage = "test";
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";
      if (accuracy < accuracyThresh) {
        feedbackText +=
          `<p class="block-text">Your accuracy is low. Remember: </p>` +
          promptTextList;
      }
      if (avgRT > rtThresh) {
        feedbackText += `<p class="block-text">You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>`;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText += `<p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>`;
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode);
for (let i = 0; i < numTrialsPerBlock; i++) {
  testTrials.push(fixationBlock, testTrial, ITIBlock);
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
      if (data.trials[i].trial_id == "test_trial") {
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
        feedbackText +=
          `<p class="block-text">Your accuracy is low. Remember: </p>` +
          promptTextList;
      }
      if (avgRT > rtThresh) {
        feedbackText += `<p class="block-text">You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>`;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText += `<p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>`;
      }

      if (
        accuracy >= accuracyThresh &&
        avgRT <= rtThresh &&
        missedResponses <= missedResponseThresh
      ) {
        feedbackText += "<p class = block-text>No feedback on this block.</p>";
      }

      feedbackText +=
        "<p class=block-text>Press <i>enter</i> to continue.</p>" + "</div>";

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

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: "visual_search_rdoc",
    trial_duration: 180000,
  },
  trialDuration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function () {
    evalAttentionChecks();
  },
};

var visual_search_rdoc_experiment = [];
var visual_search_rdoc_init = () => {
  visual_search_rdoc_experiment.push(fullscreen);
  visual_search_rdoc_experiment.push(instructionNode);
  visual_search_rdoc_experiment.push(practiceNode);
  visual_search_rdoc_experiment.push(testNode);
  visual_search_rdoc_experiment.push(endBlock);
  visual_search_rdoc_experiment.push(exitFullscreen);
};
