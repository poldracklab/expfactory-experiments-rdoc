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

var getExpStage = function () {
  return expStage;
};

/* Append gap and current trial to data and then recalculate for next trial*/
var appendData = function (data) {
  var currentTrial = jsPsych.data.get().last().trials[0];
  var correctTrial = 0;
  if (currentTrial.response == correctResponse) {
    correctTrial = 1;
  }
  jsPsych.data.get().addToLast({
    correct_trial: correctTrial,
  });
  currentTrial += 1;
};

var getFeedback = function () {
  if (stim.key_answer == "NO_KEYS") {
    return (
      "<div class = centerbox><div class = center-text>Correct!</div></div>" +
      promptTextList
    );
  } else {
    return (
      "<div class = centerbox><div class = center-text>The shape was outlined</div></p></div>" +
      promptTextList
    );
  }
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

var getStim = function () {
  stim = blockStims.pop();
  correctResponse = stim.data.correct_response;
  return stim.stimulus;
};

var getData = function () {
  stimData = stim.data;
  stimData["trial_duration"] = stimTrialDuration;
  stimData["stimulus_duration"] = stimStimulusDuration;
  return stimData;
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
const fixationDuration = 500;

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

// Speed reminder
var speedReminder = `
  <p class="block-text">
    Try to respond as quickly and accurately as possible.
  </p>
`;

// eslint-disable-next-line no-unused-vars
var expStage = "practice";
// *: Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 1500;

// generic task variables
var runAttentionChecks = true;
// var attentionCheckThresh = 0.45;
var sumInstructTime = 0; // ms
var instructTimeThresh = 1; // /in seconds
var goResponse = ","; // comma key

// task specific variables
var numGoStim = 6; // per one no-go stim
var correctResponses = [
  ["go", goResponse],
  ["nogo", null],
];

// var stims = jsPsych.randomization.shuffle([["orange", "stim1"],["blue","stim2"]])
var stims = [
  ["solid white", "stim1"],
  ["outlined white", "stim2"],
]; // solid and outlined squares used as stimuli for this task are not png files as in some others, but they are defined in style.css
// var gap = 0;
varcurrentTrial = 0;
var practiceStimuli = [
  {
    // To change go:nogo ratio, add or remove one or more sub-dictionaries within practiceStimuli and testStimuliBlock
    stimulus:
      "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text><div id = " +
      stims[1][1] +
      "></div></div></div></div></div>",
    data: {
      correct_response: correctResponses[1][1],
      condition: correctResponses[1][0],
      trial_id: "practice_trial",
    },
    key_answer: correctResponses[1][1],
  },
].concat(
  Array(numGoStim).fill({
    stimulus:
      "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text><div  id = " +
      stims[0][1] +
      "></div></div></div></div></div>",
    data: {
      correct_response: correctResponses[0][1],
      condition: correctResponses[0][0],
      trial_id: "practice_trial",
    },
    key_answer: correctResponses[0][1],
  })
);

// set up block stim. test_stim_responses indexed by [block][stim][type]
var testStimuliBlock = [
  {
    stimulus:
      "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text><div id = " +
      stims[1][1] +
      "></div></div></div></div></div>",
    data: {
      correct_response: correctResponses[1][1],
      condition: correctResponses[1][0],
      trial_id: "test_trial",
    },
  },
].concat(
  Array(numGoStim).fill({
    stimulus:
      "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text><div  id = " +
      stims[0][1] +
      "></div></div></div></div></div>",
    data: {
      correct_response: correctResponses[0][1],
      condition: correctResponses[0][0],
      trial_id: "test_trial",
    },
  })
);

var accuracyThresh = 0.75;
var rtThresh = 1000;
var missedResponseThresh = 0.1;

var practiceLen = 7;
var practiceThresh = 3;
var numTrialsPerBlock = 84; // multiple of 7 (6go:1nogo)
var numTestBlocks = 3;

var promptTextList = `
  <ul style="text-align:left;">
    <li>${stims[0][0]} square: respond</li>
    <li>${stims[1][0]} square: do not respond</li>
  </ul>
`;

var promptText = `
  <div class="prompt_box">
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${stims[0][0]} square: index finger</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${stims[1][0]} square: do not respond</p>
  </div>
`;

var pageInstruct = `
  <div class="centerbox">
    <p class="block-text">Place your <b>index finger</b> on the <b>comma key (,)</b></p>
    <p class="block-text">In this experiment, on each trial ${stims[0][0]} and ${stims[1][0]} squares will appear on the screen.</p>
    <p class="block-text">If you see the <b>${stims[0][0]} square</b>, you should respond by pressing your <b>index finger</b> as quickly as possible.</p>
    <p class="block-text">If you see the <b>${stims[1][0]} square</b>, you should <b>not respond</b>.</p>
    <p class="block-text">We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    ${speedReminder}
  </div>
`;

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
  trial_duration: 180000,
};
// TODO: add missed count in assess performance
var instructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: "instructions",
    trial_duration: null,
  },
  pages: [pageInstruct],
  allow_keys: false,
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
        sumInstructTime += data.trials[i].rt;
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
      };
    } else {
      return {
        trial_id: "test_feedback",
        exp_stage: getExpStage(),
        trial_duration: 60000,
      };
    }
  },
  choices: ["Enter"],
  stimulus: getFeedback,
  post_trial_gap: 0,
  trial_duration: 60000,
  response_ends_trial: true,
};

var fixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: function () {
    return {
      trial_id: "test_fixation",
      exp_stage: "test",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
      block_num: testCount,
    };
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration,
  trial_duration: fixationDuration,
};

var promptFixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: "none",
  data: function () {
    return {
      trial_id: "practice_fixation",
      exp_stage: "practice",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
      block_num: practiceCount,
    };
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration,
  trial_duration: fixationDuration,
  prompt: promptText,
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

// / need to put these in a function because it has to call jsPsych-dependent stuff
var practiceTrials = [];
for (var i = 0; i < practiceLen; i++) {
  var practiceTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: function () {
      return Object.assign(getData(), {
        exp_stage: "practice",
        choices: [goResponse],
        block_num: practiceCount,
      });
    },
    choices: [goResponse],
    stimulus_duration: stimStimulusDuration, // 1000,
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
    prompt: promptText,
  };

  var practiceFeedbackBlock = {
    // adding this and shortening actual trial to 1000ms
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.condition == "go") {
        if (last.response == last.correct_response) {
          return "<div class = center-box><divp class = center-text>Correct!</div></div>";
        } else {
          return "<div class = center-box><div class = center-text>The shape was solid</div></div>";
        }
      } else {
        if (last.response == last.correct_response) {
          return "<div class = center-box><div class = center-text>Correct!</div></div>";
        } else {
          return "<div class = center-box><div class = center-text>The shape was outlined</div></div>";
        }
      }
    },
    data: {
      trial_id: "practice_feedback",
      trial_duration: 500,
      block_num: practiceCount,
    },
    choices: ["NO_KEYS"],
    prompt: promptText,
    trial_duration: 500,
  };
  practiceTrials.push(
    promptFixationBlock,
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

    var totalGoTrials = 0;
    var missedResponse = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "practice_trial") {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
        }
        if (data.trials[i].response == data.trials[i].correct_response) {
          correct += 1;
        }

        if (data.trials[i].condition == "go") {
          totalGoTrials += 1;
          if (data.trials[i].rt == null) {
            missedResponse += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = missedResponse / totalGoTrials;
    var avgRT = sumRT / sumResponses;

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      feedbackText = `
      <div class="centerbox">
        <p class="center-block-text">We will now start the test portion.</p>
        <p class="block-text">Keep your <b>index finger</b> on the <b>comma key (,)</b></p>
        <p class="block-text">Press <i>enter</i> to continue.</p>
     </div>
    `;

      blockStims = jsPsych.randomization.repeat(
        testStimuliBlock,
        numTrialsPerBlock / testStimuliBlock.length
      );
      expStage = "test";
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText += `
       <p class="block-text">Your accuracy is low. Remember: </p>${promptTextList}
      `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly.${speedReminder}</p>
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

      blockStims = jsPsych.randomization.repeat(
        practiceStimuli,
        practiceLen / practiceStimuli.length
      );
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode);
for (var i = 0; i < numTrialsPerBlock; i++) {
  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: [goResponse],
    data: function () {
      return Object.assign(getData(), {
        exp_stage: "test",
        choices: [goResponse],
        block_num: testCount,
      });
    },
    post_trial_gap: 0,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    on_finish: appendData,
  };
  testTrials.push(fixationBlock, testTrial, ITIBlock);
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
    var totalGoTrials = 0;
    var missedResponse = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "test_trial") {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
        }
        if (data.trials[i].response == data.trials[i].correct_response) {
          correct += 1;
        }
        if (data.trials[i].condition == "go") {
          totalGoTrials += 1;
          if (data.trials[i].rt == null) {
            missedResponse += 1;
          }
        }
      }
    }
    var accuracy = correct / totalTrials;
    var missedResponses = missedResponse / totalGoTrials;
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
       <p class="block-text">Your accuracy is low. Remember: </p>${promptTextList}
      `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly.${speedReminder}</p>
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

      blockStims = jsPsych.randomization.repeat(
        testStimuliBlock,
        numTrialsPerBlock / testStimuliBlock.length
      );
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

// Set up post task questionnaire
var expID = "go_no_go_rdoc";

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

var go_nogo_rdoc_experiment = [];
var go_nogo_rdoc_init = () => {
  blockStims = jsPsych.randomization.repeat(
    practiceStimuli,
    practiceLen / practiceStimuli.length
  );
  go_nogo_rdoc_experiment.push(fullscreen);
  go_nogo_rdoc_experiment.push(instructionNode);
  go_nogo_rdoc_experiment.push(practiceNode);
  go_nogo_rdoc_experiment.push(testNode);
  go_nogo_rdoc_experiment.push(endBlock);
  go_nogo_rdoc_experiment.push(exitFullscreen);
};
