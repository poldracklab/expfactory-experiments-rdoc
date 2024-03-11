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

function appendData() {
  var data = jsPsych.data.get().last(1).values()[0];
  var correctTrial = 0;
  if (data.response == data.correct_response) {
    correctTrial = 1;
  }
  jsPsych.data.get().addToLast({ correct_trial: correctTrial });
}

const getInstructFeedback = () =>
  `<div class="centerbox"><p class="center-block-text">${feedbackInstructText}</p></div>`;

const getFeedback = () =>
  `<div class="bigbox"><div class="picture_box"><p class="block-text">${feedbackText}</p></div></div>`;

var getStim = function () {
  currStim = blockStims.pop();
  return currStim.image;
};

var getStimData = function () {
  return currStim.data;
};

const getCurrBlockNum = () => practiceCount;

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// common variables
const fixationDuration = 500;

var possibleResponses;

function getKeyMappingForTask(group_index) {
  if (Math.floor(group_index / 12) % 2 === 0) {
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

var group_index =
  typeof window.efVars !== "undefined" ? window.efVars.group_index : 1;

getKeyMappingForTask(group_index);

const choices = [possibleResponses[0][1], possibleResponses[1][1]];

var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>
`;

var feedbackInstructText = `
  <p class="center-block-text">
    Welcome! This experiment will take a couple of minutes to complete.
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

var expStage = "practice";
// *: Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 1500;
var sumInstructTime = 0; // ms
var instructTimeThresh = 1; // /in seconds

var accuracyThresh = 0.8;
var practiceAccuracyThresh = 0.75;

var rtThresh = 750;
var missedResponseThresh = 0.1;
var practiceThresh = 3; // 3 blocks of 12 trials

var currStim = "";

var fileTypePNG = '.png"></img>';
var preFileType =
  '<img class = center src="/static/experiments/flanker_rdoc/images/';
var flankerBoards = [
  [
    "<div class = bigbox><div class = centerbox><div class = flankerLeft_2><div class = cue-text>",
  ],
  ["</div></div><div class = flankerLeft_1><div class = cue-text>"],
  ["</div></div><div class = flankerMiddle><div class = cue-text>"],
  ["</div></div><div class = flankerRight_1><div class = cue-text>"],
  ["</div></div><div class = flankerRight_2><div class = cue-text>"],
  ["</div></div></div></div>"],
];

var testStimuli = [
  {
    image:
      flankerBoards[0] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[1] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[2] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[3] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[4] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[5],
    data: {
      correct_response: possibleResponses[0][1],
      condition: "incongruent",
      trial_id: "stim",
      flanker: "F",
      center_letter: "H",
    },
  },
  {
    image:
      flankerBoards[0] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[1] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[2] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[3] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[4] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[5],
    data: {
      correct_response: possibleResponses[1][1],
      condition: "incongruent",
      trial_id: "stim",
      flanker: "H",
      center_letter: "F",
    },
  },
  {
    image:
      flankerBoards[0] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[1] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[2] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[3] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[4] +
      preFileType +
      "H" +
      fileTypePNG +
      flankerBoards[5],
    data: {
      correct_response: possibleResponses[0][1],
      condition: "congruent",
      trial_id: "stim",
      flanker: "H",
      center_letter: "H",
    },
  },
  {
    image:
      flankerBoards[0] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[1] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[2] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[3] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[4] +
      preFileType +
      "F" +
      fileTypePNG +
      flankerBoards[5],
    data: {
      correct_response: possibleResponses[1][1],
      condition: "congruent",
      trial_id: "stim",
      flanker: "F",
      center_letter: "F",
    },
  },
];

var practiceLen = 4; // must be divisible by 4
var numTrialsPerBlock = 40; // must be divisible by 4
var numTestBlocks = 3;

var promptTextList = `
  <ul style="text-align:left;">
    <li>Indicate the identity of the middle letter.</li>
    <li>${
      possibleResponses[0][0] === "index finger" ? "H" : "F"
    }: comma key (,)</li>
    <li>${
      possibleResponses[0][0] === "index finger" ? "F" : "H"
    }: period key (.)</li>
  </ul>
`;

var promptText = `
  <div class="prompt_box">
    <p class="center-block-text" style="font-size:16px; line-height:80%;">Indicate the identity of the middle letter.</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[0][0] === "index finger" ? "H" : "F"
    }: comma key (,)</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[0][0] === "index finger" ? "F" : "H"
    }: period key (.)</p>
  </div>
`;

var pageInstruct = `
  <div class="centerbox">
    <p class="block-text">Place your <b>index finger</b> on the <b>comma key (,)</b> and your <b>middle finger</b> on the <b>period key (.)</b></p>
    <p class="block-text">During this task, on each trial you will see a string of F's and H's. For instance, you might see 'FFFFF' or 'HHFHH'.</p>
    <p class="block-text">Your task is to respond by pressing the key corresponding to the <b>middle</b> letter.</p>
    <p class="block-text">If the middle letter is an <b>${
      possibleResponses[0][0] === "index finger" ? "H" : "F"
    }</b>, press your <b>index finger</b>.</p>
    <p class="block-text">If the middle letter is an <b>${
      possibleResponses[0][0] === "index finger" ? "F" : "H"
    }</b>, press your <b>middle finger</b>.</p>
    <p class="block-text">So, if you see <b>'FFHFF'</b>, you would press your <b>${
      possibleResponses[0][0]
    }</b>.</p>
    <p class="block-text">We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    ${speedReminder}
  </div>
`;

// PRE LOAD IMAGES HERE
var pathSource = "/static/experiments/flanker_rdoc/images/";
var images = [];
images.push(pathSource + "F.png");
images.push(pathSource + "H.png");

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
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
var instructionsBlock = {
  type: jsPsychInstructions,
  pages: [pageInstruct],
  allow_keys: false,
  data: {
    trial_id: "instructions",
    trial_duration: null,
    stimulus: pageInstruct,
  },
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
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
    return {
      trial_id: "practice_feedback",
      exp_stage: "practice",
      trial_duration: 60000,
    };
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

var practiceTrials = [];
for (i = 0; i < practiceLen; i++) {
  var practiceFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
    data: {
      trial_id: "practice_fixation",
      exp_stage: "practice",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
      block_num: practiceCount,
    },
    choices: ["NO_KEYS"],
    stimulus_duration: fixationDuration, // 500
    trial_duration: fixationDuration, // 500
    post_trial_gap: 0,
    prompt: promptText,
  };

  var practiceTrial = {
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
        block_num: practiceCount,
      });
    },
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    post_trial_gap: 0,
    prompt: promptText,
    on_finish: appendData,
  };

  var practiceFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.response == null) {
        return "<div class=center-box><div class=center-text><font size =20>Respond Faster!</font></div></div>";
      } else if (last.correct_trial == 1) {
        return "<div class=center-box><div class=center-text><font size =20>Correct!</font></div></div>";
      } else {
        return "<div class=center-box><div class=center-text><font size =20>Incorrect</font></div></div>";
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
  practiceTrials.push(
    practiceFixationBlock,
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
    var aveRT = sumRT / sumResponses;

    if (accuracy >= practiceAccuracyThresh || practiceCount == practiceThresh) {
      feedbackText = ` <div class="centerbox">
        <p class="center-block-text">We will now start the test portion.</p>
        <p class="block-text">Keep your <b>index finger</b> on the <b>comma key (,)</b> and your <b>middle finger</b> on the <b>period key (.)</b></p>
        <p class="block-text">Press <i>enter</i> to continue.</p>
      </div>`;

      blockStims = jsPsych.randomization.repeat(
        testStimuli,
        numTrialsPerBlock / 4
      );
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < practiceAccuracyThresh) {
        feedbackText += `
       <p class="block-text">Your accuracy is too low. Remember: <br>${promptTextList}</p>
      `;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
        <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>
      `;
      }

      if (aveRT > rtThresh) {
        feedbackText += `
       <p class="block-text">You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>
      `;
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      blockStims = jsPsych.randomization.repeat(testStimuli, practiceLen / 4);
      return true;
    }
  },
};

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

var expID = "flanker_rdoc__screener";

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

flanker_rdoc__screener_experiment = [];
var flanker_rdoc__screener_init = () => {
  jsPsych.pluginAPI.preloadImages(images);
  // globals
  blockStims = jsPsych.randomization.repeat(testStimuli, practiceLen / 4);

  flanker_rdoc__screener_experiment.push(fullscreen);
  flanker_rdoc__screener_experiment.push(instructionNode);
  flanker_rdoc__screener_experiment.push(practiceNode);
  flanker_rdoc__screener_experiment.push(postTaskBlock);
  flanker_rdoc__screener_experiment.push(endBlock);
  flanker_rdoc__screener_experiment.push(exitFullscreen);
};
