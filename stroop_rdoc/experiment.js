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

function renameDataProperties() {
  // Fetch the data from the experiment
  var data = jsPsych.data.get().trials;
  // rename colors from hex values to color words
  data.forEach(function (obj) {
    if (obj.stim_color === "#FF7070") {
      obj.stim_color = "red";
    } else if (obj.stim_color === "#7070FF") {
      obj.stim_color = "blue";
    } else if (obj.stim_color === "#70FF70") {
      obj.stim_color = "green";
    }
  });
}

// Function to randomly select n elements from an array without replacement
function getRandomElements(arr, n) {
  let result = [];
  let tempArray = [...arr]; // Create a copy of the array to avoid modifying the original array

  for (let i = 0; i < n; i++) {
    if (tempArray.length === 0) {
      break; // Break if there are no more elements to select
    }

    const randomIndex = Math.floor(Math.random() * tempArray.length);
    result.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1); // Remove the selected element from the temporary array
  }

  return result;
}

var getCurrAttentionCheckQuestion = function () {
  return `${currentAttentionCheckData.Q} <div class=block-text>This screen will advance automatically in 1 minute. Do not press shift.</div>`;
};

var getCurrAttentionCheckAnswer = function () {
  return currentAttentionCheckData.A;
};

var attentionCheckData = [
  // key presses
  {
    Q: "<p class='block-text'>Press the q key</p>",
    A: 81,
  },
  {
    Q: "<p class='block-text'>Press the p key</p>",
    A: 80,
  },
  {
    Q: "<p class='block-text'>Press the r key</p>",
    A: 82,
  },
  {
    Q: "<p class='block-text'>Press the s key</p>",
    A: 83,
  },
  {
    Q: "<p class='block-text'>Press the t key</p>",
    A: 84,
  },
  {
    Q: "<p class='block-text'>Press the j key</p>",
    A: 74,
  },
  {
    Q: "<p class='block-text'>Press the k key</p>",
    A: 75,
  },
  {
    Q: "<p class='block-text'>Press the e key</p>",
    A: 69,
  },
  {
    Q: "<p class='block-text'>Press the m key</p>",
    A: 77,
  },
  {
    Q: "<p class='block-text'>Press the i key</p>",
    A: 76,
  },
  {
    Q: "<p class='block-text'>Press the u key</p>",
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

const getExpStage = () => expStage;

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

const getStim = () => {
  currStim = blockStims.pop();
  return currStim.stimulus;
};

const getStimData = () => currStim.data;

const getKeyAnswer = () => currStim.key_answer;

const getCurrBlockNum = () =>
  getExpStage() === "practice" ? practiceCount : testCount;

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
const fixationDuration = 500;

var possibleResponses;

function getKeyMappingForTask(group_index) {
  if (Math.floor(group_index) % 3 === 0) {
    // Assuming even group_index uses ",", odd group_index uses "."
    possibleResponses = [
      ["index finger", ",", "comma key (,)"],
      ["middle finger", ".", "period key (.)"],
      ["ring finger", "/", "forward slash key (/)"],
    ];
  } else if (Math.floor(group_index) % 3 === 1) {
    // Assuming even group_index uses ",", odd group_index uses "."
    possibleResponses = [
      ["middle finger", ".", "period key (.)"],
      ["index finger", ",", "comma key (,)"],
      ["ring finger", "/", "forward slash key (/)"],
    ];
  } else if (Math.floor(group_index) % 3 === 2) {
    possibleResponses = [
      ["middle finger", ".", "period key (.)"],
      ["ring finger", "/", "forward slash key (/)"],
      ["index finger", ",", "comma key (,)"],
    ];
  }
}

var group_index =
  typeof window.efVars !== "undefined" ? window.efVars.group_index : 1;

getKeyMappingForTask(group_index);

const choices = [
  possibleResponses[0][1],
  possibleResponses[1][1],
  possibleResponses[2][1],
];

var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>
`;

var feedbackInstructText = `
  <p class="center-block-text">
    Welcome! This experiment will take around 7 minutes.
  </p>
  <p class="center-block-text">
    To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in fullscreen mode for the whole duration of each task.
  </p>
  <p class="center-block-text"> Press <i>enter</i> to begin.</p>
`;

// speed reminder
var speedReminder =
  "<p class = block-text>" +
  "Try to respond as quickly and accurately as possible.</p> ";

var expStage = "practice";

const stimStimulusDuration = 1000;
const stimTrialDuration = 1500;
var runAttentionChecks = true;
var instructTimeThresh = 1;

var accuracyThresh = 0.8; // threshold for block-level feedback
var practiceAccuracyThresh = 0.75; // threshold to proceed to test, .75 for 3 out of 4 trials
var rtThresh = 750;
var missedResponseThresh = 0.1;
var practiceThresh = 3; // 3 blocks max

var currStim = "";

var stimulusText =
  '<div class = centerbox><div class = stroop-stim style = "color:XXX">YYY</div></div>';

var incongruentStim = [];
var tempStims = [];

// arrays for colors and words to be used for stimuli
var colors = ["#FF7070", "#7070FF", "#70FF70"];
var words = ["red", "blue", "green"];

var congruentStim = [
  {
    stimulus:
      '<div class = centerbox><div class = stroop-stim style = "color:#FF7070">red</div></div>',
    data: {
      trial_id: "stim",
      condition: "congruent",
      stim_color: "#FF7070",
      stim_word: "red",
      correct_response: possibleResponses[0][1],
    },
    key_answer: possibleResponses[0][1],
  },
  {
    stimulus:
      '<div class = centerbox><div class = stroop-stim style = "color:#7070FF">blue</div></div>',
    data: {
      trial_id: "stim",
      condition: "congruent",
      stim_color: "#7070FF",
      stim_word: "blue",
      correct_response: possibleResponses[1][1],
    },
    key_answer: possibleResponses[1][1],
  },
  {
    stimulus:
      '<div class = centerbox><div class = stroop-stim style = "color:#70FF70">green</div></div>',
    data: {
      trial_id: "stim",
      condition: "congruent",
      stim_color: "#70FF70",
      stim_word: "green",
      correct_response: possibleResponses[2][1],
    },
    key_answer: possibleResponses[2][1],
  },
];

const getColorByKey = key => {
  let keyColorMap = {};
  keyColorMap[possibleResponses[0][1]] = { name: "red", color: "#FF7070" };
  keyColorMap[possibleResponses[1][1]] = { name: "blue", color: "#7070FF" };
  keyColorMap[possibleResponses[2][1]] = { name: "green", color: "#70FF70" };

  return keyColorMap[key];
};

var colors = ["#FF7070", "#7070FF", "#70FF70"];
var words = ["red", "blue", "green"];

var incongruentStim = [
  // red word in blue ink
  {
    stimulus:
      '<div class = centerbox><div class = stroop-stim style = "color:#7070FF">red</div></div>',
    data: {
      trial_id: "stim",
      condition: "incongruent",
      stim_color: "#7070FF",
      stim_word: "red",
      correct_response: possibleResponses[1][1],
    },
    key_answer: possibleResponses[1][1],
  },
  // red word in green ink
  {
    stimulus:
      '<div class = centerbox><div class = stroop-stim style = "color:#70FF70">red</div></div>',
    data: {
      trial_id: "stim",
      condition: "incongruent",
      stim_color: "#70FF70",
      stim_word: "red",
      correct_response: possibleResponses[2][1],
    },
    key_answer: possibleResponses[2][1],
  },
  // blue word in red ink
  {
    stimulus:
      '<div class = centerbox><div class = stroop-stim style = "color:#FF7070">blue</div></div>',
    data: {
      trial_id: "stim",
      condition: "incongruent",
      stim_color: "#FF7070",
      stim_word: "blue",
      correct_response: possibleResponses[0][1],
    },
    key_answer: possibleResponses[0][1],
  },
  // blue word in green ink
  {
    stimulus:
      '<div class = centerbox><div class = stroop-stim style = "color:#70FF70">blue</div></div>',
    data: {
      trial_id: "stim",
      condition: "incongruent",
      stim_color: "#70FF70",
      stim_word: "blue",
      correct_response: possibleResponses[2][1],
    },
    key_answer: possibleResponses[2][1],
  },
  // green word in red ink
  {
    stimulus:
      '<div class = centerbox><div class = stroop-stim style = "color:#FF7070">green</div></div>',
    data: {
      trial_id: "stim",
      condition: "incongruent",
      stim_color: "#FF7070",
      stim_word: "green",
      correct_response: possibleResponses[0][1],
    },
    key_answer: possibleResponses[0][1],
  },
  // green word in blue ink
  {
    stimulus:
      '<div class = centerbox><div class = stroop-stim style = "color:#7070FF">green</div></div>',
    data: {
      trial_id: "stim",
      condition: "incongruent",
      stim_color: "#7070FF",
      stim_word: "green",
      correct_response: possibleResponses[1][1],
    },
    key_answer: possibleResponses[1][1],
  },
];

// end generating stimuli
var stims = [].concat(congruentStim, congruentStim, incongruentStim);

var practiceLen = 4;
var numTrialsPerBlock = 40;
var numTestBlocks = 3;

var responseKeys = `
  <ul class="list-text">
    <li>
    <span class="large" style="color:${
      getColorByKey(",").color
    };">WORD</span>: comma key (,)
  </span>
  </li>
   <li>
    <span class="large" style="color:${
      getColorByKey(".").color
    };">WORD</span>: period key (.)
  </span>
  </li>
    <li>
    <span class="large" style="color:${
      getColorByKey("/").color
    };">WORD</span>: forward slash key (/)
  </span>
  </li>
  </ul>`;

var promptText = `
  <div class="prompt_box">
    <p class="center-block-text" style="font-size:16px; line-height:80%;">
      <span class="large" style="color:${
        getColorByKey(",").color
      }">WORD</span>: comma key (,) 
    </p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">
      <span class="large" style="color:${
        getColorByKey(".").color
      }">WORD</span>: period key (.)
    </p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">
      <span class="large" style="color:${
        getColorByKey("/").color
      }">WORD</span>: forward slash key (/) 
    </p>
  </div>`;

var pageInstruct = [
  `<div class='centerbox'>
    <p class="block-text">Place your <b>index finger</b> on the <b>comma key (,)</b>, your <b>middle finger</b> on the <b>period key (.)</b>, and your <b>ring finger</b> on the <b>forward slash key (/)</b></p>
    <p class='block-text'>During this task, on each trial you will be presented with a single word on the screen. This word will be <b>'RED'</b>, <b>'BLUE'</b>, or <b>'GREEN'</b>.</p>
    <p class='block-text'>Each word will appear in colored ink. The color of the word may not match the word itself. For example, you might see the word 'RED' in green ink, like this: <span style='color:#70FF70'>RED</span>.</p>
    <p class='block-text'>Your task is to identify the <b>color of the ink in which the word is displayed</b>, not the word itself. So, if you see the word <b>'RED'</b> in green ink, you should press the key corresponding to <b>green</b>.</p>
    <p class='block-text'>Press your <b>index finger</b> if the color is <span style='color:${
      getColorByKey(",").color
    }'>${getColorByKey(",").name}</span>.</p>
    <p class='block-text'>Press your <b>middle finger</b> if the color is <span style='color:${
      getColorByKey(".").color
    }'>${getColorByKey(".").name}</span>.</p>
    <p class='block-text'>Press your <b>ring finger</b> if the color is <span style='color:${
      getColorByKey("/").color
    }'>${getColorByKey("/").name}</span>.</p>
  </div>`,
  `<div class='centerbox'>
    <p class='block-text'>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    ${speedReminder}
  </div>`,
];

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
attentionCheckData = shuffleArray(attentionCheckData);
var currentAttentionCheckData = attentionCheckData.shift();

// Set up attention check node
var attentionCheckBlock = {
  type: jsPsychAttentionCheckRdoc,
  data: {
    trial_id: "test_attention_check",
    trial_duration: null,
    exp_stage: "test",
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
    stimulus: pageInstruct,
  },
  pages: pageInstruct,
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var sumInstructTime = 0; // ms
var instructionsNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
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
    } else {
      feedbackInstructText =
        "<p class=block-text>Done with instructions. Press <i>enter</i> to continue.</p>";
      return false;
    }
  },
  on_finish: () => "done instruct",
};

var fixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class="centerbox"><div class="fixation">+</div></div>',
  choices: ["NO_KEYS"],
  data: {
    trial_id: "test_fixation",
    exp_stage: "test",
    trial_duration: fixationDuration,
    stimulus_duration: fixationDuration,
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
  post_trial_gap: 0,
  stimulus_duration: fixationDuration, // 500
  trial_duration: fixationDuration, // 500
  on_finish: data => (data["block_num"] = testCount),
};

var practiceFixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class="centerbox"><div class="fixation">+</div></div>',
  choices: ["NO_KEYS"],
  data: {
    trial_id: "practice_fixation",
    exp_stage: "practice",
    trial_duration: 500,
    stimulus_duration: 500,
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
  post_trial_gap: 0,
  stimulus_duration: fixationDuration,
  trial_duration: fixationDuration,
  prompt: promptText,
  on_finish: data => (data["block_num"] = practiceCount),
};

var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    var last = jsPsych.data.get().last(1).trials[0];
    if (last.response == null) {
      return "<div class=center-box><div class=center-text><font size =20>Respond Faster!</font></div></div>";
    }
    if (last.correct_trial == 1) {
      return "<div class=center-box><div class=center-text><font size =20>Correct!</font></div></div>";
    } else {
      return "<div class=center-box><div class=center-text><font size =20>Incorrect</font></div></div>";
    }
  },
  data: {
    exp_stage: "practice",
    trial_id: "practice_feedback",
    trial_duration: 500,
    stimulus_duration: 500,
    block_num: practiceCount,
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
  choices: ["NO_KEYS"],
  stimulus_duration: 500,
  trial_duration: 500,
  prompt: promptText,
  on_finish: data => (data["block_num"] = practiceCount),
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

// create trials and repeat nodes
var practiceTrials = [];
for (i = 0; i < practiceLen; i++) {
  var practiceTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: function () {
      return Object.assign({}, getStimData(), {
        trial_id: "practice_trial",
        exp_stage: "practice",
        correct_response: getKeyAnswer(), // changed this to getKeyAnswer() to fetch correct response
        choices: choices,
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
        block_num: practiceCount,
      });
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
    choices: choices,
    response_ends_trial: false,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    post_trial_gap: 0,
    prompt: promptText,
    on_finish: appendData,
  };
  practiceTrials.push(
    practiceFixationBlock,
    practiceTrial,
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
         <p class="block-text">Keep your <b>index finger</b> on the <b>comma key (,)</b>, your <b>middle finger</b> on the <b>period key (.)</b>, and your <b>ring finger</b> on the <b>forward slash key (/)</b></p>
        <p class="block-text">Press <i>enter</i> to continue.</p>
      </div>`;

      blockStims = allTestStim.splice(0, numTrialsPerBlock);
      expStage = "test";
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < practiceAccuracyThresh) {
        feedbackText += `
          <p class="block-text">Your accuracy is low. Remember:</p>
          ${responseKeys}`;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
          <p class="block-text">You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>`;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
          <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>`;
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      // Randomly select two congruent and two incongruent stimuli
      let selectedCongruent = getRandomElements(congruentStim, 2);
      let selectedIncongruent = getRandomElements(incongruentStim, 2);

      // Combine the selected stimuli into a new array
      let tempArray = selectedCongruent.concat(selectedIncongruent);
      tempArray = jsPsych.randomization.repeat(tempArray, 1);

      blockStims = tempArray;
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode);
for (i = 0; i < numTrialsPerBlock; i++) {
  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: function () {
      return Object.assign({}, getStimData(), {
        trial_id: "test_trial",
        exp_stage: "test",
        choices: choices,
        correct_response: getKeyAnswer(), // changed this to getKeyAnswer() to fetch correct response
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
        block_num: testCount,
      });
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
    choices: choices,
    response_ends_trial: false,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    post_trial_gap: 0,
    on_finish: appendData,
  };

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
          <p class="block-text">Your accuracy is low. Remember:</p>
          ${responseKeys}`;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
          <p class="block-text">You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>`;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
          <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>`;
      }

      feedbackText +=
        "<p class=block-text>Press <i>enter</i> to continue.</p>" + "</div>";

      blockStims = allTestStim.splice(0, numTrialsPerBlock);
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
    exp_id: "stroop_rdoc",
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function () {
    renameDataProperties();
  },
};

function createBalancedBlocks(allTestStim) {
  // Separate the trials into congruent and incongruent
  const congruentTrials = allTestStim.filter(
    trial => trial.data.condition === "congruent"
  );
  const incongruentTrials = allTestStim.filter(
    trial => trial.data.condition === "incongruent"
  );

  // Shuffle both arrays
  const shuffledCongruent = shuffleArray(congruentTrials);
  const shuffledIncongruent = shuffleArray(incongruentTrials);

  const balancedBlocks = [];

  // Create 3 blocks of 40 trials each
  for (let i = 0; i < 3; i++) {
    // Pick 20 trials from each category for each block
    const block = shuffledCongruent
      .slice(i * 20, (i + 1) * 20)
      .concat(shuffledIncongruent.slice(i * 20, (i + 1) * 20));

    // Shuffle the block to mix congruent and incongruent trials
    const shuffledBlock = shuffleArray(block);

    balancedBlocks.push(...shuffledBlock);
  }

  return balancedBlocks;
}

stroop_rdoc_experiment = [];
var stroop_rdoc_init = () => {
  // Randomly select two congruent and two incongruent stimuli
  let selectedCongruent = getRandomElements(congruentStim, 2);
  let selectedIncongruent = getRandomElements(incongruentStim, 2);
  // Combine the selected stimuli into a new array
  let tempArray = selectedCongruent.concat(selectedIncongruent);
  tempArray = jsPsych.randomization.repeat(tempArray, 1);
  blockStims = tempArray;

  testCongruentStim = jsPsych.randomization.repeat(
    congruentStim,
    (numTrialsPerBlock * 3) / 2 / congruentStim.length
  );
  testIncongruentStim = jsPsych.randomization.repeat(
    incongruentStim,
    (numTrialsPerBlock * 3) / 2 / incongruentStim.length
  );

  allTestStim = testCongruentStim.concat(testIncongruentStim);

  allTestStim = createBalancedBlocks(allTestStim);

  stroop_rdoc_experiment.push(fullscreen);
  stroop_rdoc_experiment.push(instructionsNode);
  stroop_rdoc_experiment.push(practiceNode);
  stroop_rdoc_experiment.push(testNode);
  stroop_rdoc_experiment.push(endBlock);
  stroop_rdoc_experiment.push(exitFullscreen);
};
