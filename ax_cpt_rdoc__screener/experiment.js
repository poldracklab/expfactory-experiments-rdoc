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

const getInstructFeedback = () =>
  `<div class="centerbox"><p class="center-block-text">${feedbackInstructText}</p></div>`;

const getFeedback = () =>
  `<div class="bigbox"><div class="picture_box"><p class="block-text">${feedbackText}</p></div></div>`;

const getCondition = () => currCondition;

const getCue = () => currCue;

const getStim = () => currStim;

const getCurrBlockNum = () => practiceCount;

function extractTextFromStimulus(obj) {
  // Create a temporary DOM element to parse the HTML string
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = obj.stimulus;

  // Query the desired element and return its text content
  var textElement = tempDiv.querySelector(".centerbox .AX_text");
  return textElement ? textElement.textContent : null;
}

// Data logging
function appendData() {
  var data = jsPsych.data.get().last(1).values()[0];

  correctTrial = 0;
  if (data.response == data.correct_response) {
    correctTrial = 1;
  }

  let parsedLetter = extractTextFromStimulus(data);

  jsPsych.data
    .get()
    .addToLast({ correct_trial: correctTrial, probe_letter: parsedLetter });
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

const createHTML = char =>
  `<div class="centerbox"><div class="AX_text">${char}</div></div>`;

const getChar = () =>
  createHTML(chars[Math.floor(Math.random() * chars.length)]);

function getKeyMappingForTask(group_index) {
  if (group_index % 2 === 0) {
    // Assuming even group_index uses ",", odd group_index uses "."
    possibleResponses = [
      ["index finger", ",", "comma key (,)"],
      ["middle finger", ".", "period key (.)"],
    ];
  } else {
    // Assuming even group_index uses ",", odd group_index uses "."
    possibleResponses = [
      ["middle finger", ".", "period key (.)"],
      ["index finger", ",", "comma key (,)"],
    ];
  }
}

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
const fixationDuration = 500;
const conditionValues = ["AX", "BY", "BX", "AY"];

var group_index =
  typeof window.efVars !== "undefined" ? window.efVars.group_index : 1;

getKeyMappingForTask(group_index);

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
    Welcome! This experiment will take a couple of minutes to complete.
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
    <li>${
      possibleResponses[0][0] === "index finger" ? "A -> X" : "Anything else"
    }: comma key (,)</li>
    <li>${
      possibleResponses[0][0] === "index finger" ? "Anything else" : "A -> X"
    }: period key (.)</li>
  </ul>
`;

var promptText = `
  <div class = prompt_box>
    <p class = center-block-text style = "font-size:16px; line-height:80%;">${
      possibleResponses[0][0] === "index finger" ? "A -> X" : "Anything else"
    }: comma key (,)</p>
    <p class = center-block-text style = "font-size:16px; line-height:80%;">${
      possibleResponses[0][0] === "index finger" ? "Anything else" : "A -> X"
    }: period key (.)</p>
  </div>
`;

var pageInstruct = [
  `
  <div class = centerbox>
    <p class=block-text>Place your <b>index finger</b> on the <b>comma key (,)</b> and your <b>middle finger</b> on the <b>period key (.)</b></p>
    <p class = block-text>During this task, on each trial you will see a letter presented, a short break, and then a second letter. For instance, you may see an "A" followed by an "F".</p>
    <p class = block-text>If the first letter was an "A" <b>AND</b> the second letter is an "X", press your <b>${possibleResponses[0][0]}</b>. Otherwise, press your <b>${possibleResponses[1][0]}</b>.</p>
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
var possibleResponses;

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

/* ******************************* */
/* THRESHOLDS */
/* ******************************* */

var practiceThresh = 3; // 3 blocks max
var accuracyThresh = 0.8; // block-level accuracy feedback
var practiceAccuracyThresh = 0.8; // min accuracy to proceed to test

var rtThresh = 750; // min of 1s on instructions to proceed to practice
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
    return {
      trial_id: "practice_fixation",
      exp_stage: "practice",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
      block_num: practiceCount,
    };
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration, // 500
  trial_duration: fixationDuration, // 500
  prompt: function () {
    return promptText;
  },
};

// *** FIXATION2 *** //
var fixation2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: function () {
    return {
      trial_id: "practice_inter-stimulus",
      exp_stage: "practice",
      trial_duration: fixationDuration + 2500,
      stimulus_duration: fixationDuration + 2500,
      block_num: practiceCount,
    };
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration + 2500, // 3000
  trial_duration: fixationDuration + 2500, // 3000
  prompt: function () {
    return promptText;
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
  },
  post_trial_gap: 0,
  trial_duration: function () {
    ITIms = sampleFromDecayingExponential();
    return ITIms * 1000;
  },
  prompt: function () {
    return promptText;
  },
  on_finish: function (data) {
    data["trial_duration"] = ITIms * 1000;
    data["stimulus_duration"] = ITIms * 1000;
  },
};

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
    stimulus: pageInstruct,
  },
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var sumInstructTime = 0; // ms
var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
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
        "<div class=center-box>" +
        "<div class=center-text>" +
        "<font size =20>Respond Faster!</font></div></div>"
      );
    } else if (last.correct_trial == 1) {
      return (
        "<div class=center-box>" +
        "<div class=center-text><font size =20>Correct!</font></div></div>"
      );
    } else {
      return (
        "<div class=center-box>" +
        "<div class=center-text><font size =20>Incorrect</font></div></div>"
      );
    }
  },
  data: function () {
    return {
      exp_stage: "practice",
      trial_id: "practice_feedback",
      trial_duration: 500,
      stimulus_duration: 500,
      block_num: practiceCount,
    };
  },
  choices: ["NO_KEYS"],
  stimulus_duration: 500,
  trial_duration: 500,
  prompt: promptText,
};

var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: function () {
    return {
      trial_id: "practice_feedback",
      exp_stage: "practice",
      trial_duration: 60000,
      block_num: practiceCount,
    };
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
    on_finish: function (data) {
      data["cue_letter"] = extractTextFromStimulus(data);
    },
  };
  var probeBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function () {
      return {
        trial_id: "practice_trial",
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
        <p class="block-text">Keep your <b>index finger</b> on the <b>comma key (,)</b> and your <b>middle finger</b> on the <b>period key (.)</b></p>
        <p class="block-text">Press <i>enter</i> to continue.</p>
      </div>`;

      blockList = conditionValues.concat(["AX"]);
      blockList = jsPsych.randomization.repeat(blockList, 10);

      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < practiceAccuracyThresh) {
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

      blockList = conditionValues.concat(["AX"]);
      blockList = jsPsych.randomization.repeat(blockList, 1);
      return true;
    }
  },
};

/* ******************************* */
/* JSPSYCH REQUIRED IN ALL SCRIPTS */
/* ******************************* */

var postTaskQuestion =
  "Do you have any comments, concerns, or issues pertaining to this task?";

var postTaskBlock = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: `<h1 class=block-text>${postTaskQuestion}</h1>`,
      name: postTaskQuestion,
      required: false,
      rows: 20,
      columns: 80,
    },
  ],
  response_ends_trial: true,
  data: {
    trial_id: "post_task_feedback",
  },
  on_finish: function (data) {
    data.question = postTaskQuestion;
    data.response = data.response[postTaskQuestion];
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

var expID = "ax_cpt_rdoc__screener"; // for this experiment

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
};

var ax_cpt_rdoc__screener_experiment = [];
var ax_cpt_rdoc__screener_init = () => {
  blockList = conditionValues.concat(["AX"]);
  blockList = jsPsych.randomization.repeat(blockList, 1);
  ax_cpt_rdoc__screener_experiment.push(fullscreen);
  ax_cpt_rdoc__screener_experiment.push(instructionNode);
  ax_cpt_rdoc__screener_experiment.push(practiceNode);
  ax_cpt_rdoc__screener_experiment.push(postTaskBlock);
  ax_cpt_rdoc__screener_experiment.push(endBlock);
  ax_cpt_rdoc__screener_experiment.push(exitFullscreen);
};
