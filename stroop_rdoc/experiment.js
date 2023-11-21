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

// Function to randomly select n elements from an array with replacement
function getRandomElements(arr, n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    result.push(arr[randomIndex]);
  }
  return result;
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
// TODO: change this to only use n number of Qs and As where n is numTestBlocks?
attentionCheckData = shuffleArray(attentionCheckData);
var currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

var getExpStage = function () {
  return expStage;
};

function appendData() {
  var data = jsPsych.data.get().last(1).values()[0];
  var correctTrial = 0;
  if (data.response == data.correct_response) {
    correctTrial = 1;
  }
  jsPsych.data.get().addToLast({ correct_trial: correctTrial });
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

var getStim = function () {
  currStim = blockStims.pop();
  return currStim.stimulus;
};

var getStimData = function () {
  return currStim.data;
};

var getKeyAnswer = function () {
  return currStim.key_answer;
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
const fixationDuration = 500;

const possibleResponses = [
  ["index finger", ",", "comma key (,)"],
  ["middle finger", ".", "period key (.)"],
  ["ring finger", "/", "slash key (/)"],
];

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

var congruentStim = [];
var incongruentStim = [];
var tempStims = [];

// arrays for colors and words to be used for stimuli
var colors = ["#FF7070", "#7070FF", "#70FF70"];
var words = ["red", "blue", "green"];

// Generate congruent stimuli
colors.forEach(function (color, index) {
  var tempWord = "";
  switch (color) {
    case colors[0]:
      tempWord = words[0];
      break;
    case colors[1]:
      tempWord = words[1];
      break;
    case colors[2]:
      tempWord = words[2];
      break;
    default:
      break;
  }
  var stimulus = stimulusText.replace("XXX", color).replace("YYY", tempWord); // so each color and word are equivalent, can just use color for both
  var data = {
    trial_id: "stim",
    condition: "congruent",
    stim_color: color,
    stim_word: words[index],
    correct_response: possibleResponses[index][1],
  };

  congruentStim.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: stimulus,
    data: data,
    key_answer: possibleResponses[index][1],
  });
});

// Generate incongruent stimuli
colors.forEach(function (color, colorIndex) {
  words.forEach(function (word, wordIndex) {
    if (color !== word) {
      var stimulus = stimulusText.replace("XXX", color).replace("YYY", word);
      var data = {
        trial_id: "stim",
        condition: "incongruent",
        stim_color: color,
        stim_word: word,
        correct_response: possibleResponses[colorIndex][1],
      };

      incongruentStim.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: stimulus,
        data: data,
        key_answer: possibleResponses[colorIndex][1],
      });
    }
  });
});

// end generating stimuli

var stims = [].concat(congruentStim, congruentStim, incongruentStim);

var practiceLen = 4;
var numTrialsPerBlock = 40;
var numTestBlocks = 3;

var responseKeys = `
  <ul class="list-text">
    <li><span class="large" style="color:#FF7070">${possibleResponses[0][0]}</span></li>
    <li><span class="large" style="color:#7070FF">${possibleResponses[1][0]}</span></li>
    <li><span class="large" style="color:#70FF70">${possibleResponses[2][0]}</span></li>
  </ul>`;

var promptText = `
  <div class="prompt_box">
    <p class="center-block-text" style="font-size:16px; line-height:80%;">
      <span class="large" style="color:#FF7070">WORD</span>: ${possibleResponses[0][0]}
    </p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">
      <span class="large" style="color:#7070FF">WORD</span>: ${possibleResponses[1][0]}
    </p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">
      <span class="large" style="color:#70FF70">WORD</span>: ${possibleResponses[2][0]}
    </p>
  </div>`;

var pageInstruct = [
  `<div class='centerbox'>
    <p class='block-text'>Place your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b>, your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b>, and your <b>${possibleResponses[2][0]}</b> on the <b>${possibleResponses[2][2]}</b></p>
    <p class='block-text'>During this task, on each trial you will be presented with a single word on the screen. This word will be <b>'RED'</b>, <b>'BLUE'</b>, or <b>'GREEN'</b>.</p>
    <p class='block-text'>Each word will appear in colored ink. The color of the word may not match the word itself. For example, you might see the word 'RED' in green ink, like this: <span style='color:#70FF70'>RED</span>.</p>
    <p class='block-text'>Your task is to identify the <b>color ink in which the word is displayed</b>, not the word itself. So, if you see the word <b>'RED'</b> in green ink, you should press the key corresponding to <b>green</b>.</p>
    <p class='block-text'>Press your <b>${possibleResponses[0][0]}</b> if the color is <span style='color:${colors[0]}'>red</span>.</p>
    <p class='block-text'>Press your <b>${possibleResponses[1][0]}</b> if the color is <span style='color:${colors[1]}'>blue</span>.</p>
    <p class='block-text'>Press your <b>${possibleResponses[2][0]}</b> if the color is <span style='color:${colors[2]}'>green</span>.</p>
  </div>`,
  `<div class='centerbox'>
    <p class='block-text'>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    ${speedReminder}
  </div>`,
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
  on_load: function () {
    function preventSlash(event) {
      if (event.key === "/" || event.key === "," || event.key === ".") {
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", preventSlash);
    jsPsych.currentTrial().on_close = function () {
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
  },
  pages: pageInstruct,
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var sumInstructTime = 0; // ms
var instructionsNode = {
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
    jsPsych.currentTrial().on_close = function () {
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
    jsPsych.currentTrial().on_close = function () {
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
      return "<div class = fb_box><div class = center-text><font size =20>Respond Faster!</font></div></div>";
    }
    if (last.correct_trial == 1) {
      return "<div class = fb_box><div class = center-text><font size =20>Correct!</font></div></div>";
    } else {
      return "<div class = fb_box><div class = center-text><font size =20>Incorrect</font></div></div>";
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
    jsPsych.currentTrial().on_close = function () {
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
    jsPsych.currentTrial().on_close = function () {
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
      jsPsych.currentTrial().on_close = function () {
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
        <p class="block-text">Keep your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b>, your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b>, and your <b>${possibleResponses[2][0]}</b> on the <b>${possibleResponses[0][2]}</b></p>
        <p class="block-text">Press <i>enter</i> to continue.</p>
      </div>`;

      // Randomly select two congruent and two incongruent stimuli
      let selectedCongruent = getRandomElements(
        congruentStim,
        numTrialsPerBlock / 2
      );
      let selectedIncongruent = getRandomElements(
        incongruentStim,
        numTrialsPerBlock / 2
      );

      // Combine the selected stimuli into a new array
      let tempArray = selectedCongruent.concat(selectedIncongruent);
      tempArray = jsPsych.randomization.repeat(tempArray, 1);

      blockStims = tempArray;

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
      jsPsych.currentTrial().on_close = function () {
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

      if (
        accuracy >= accuracyThresh &&
        missedResponses <= missedResponseThresh &&
        avgRT <= rtThresh
      ) {
        feedbackText += "<p class = block-text>No feedback on this block.</p>";
      }

      feedbackText +=
        "<p class=block-text>Press <i>enter</i> to continue.</p>" + "</div>";

      // Randomly select two congruent and two incongruent stimuli
      let selectedCongruent = getRandomElements(
        congruentStim,
        numTrialsPerBlock / 2
      );
      let selectedIncongruent = getRandomElements(
        incongruentStim,
        numTrialsPerBlock / 2
      );

      // Combine the selected stimuli into a new array
      let tempArray = selectedCongruent.concat(selectedIncongruent);
      tempArray = jsPsych.randomization.repeat(tempArray, 1);

      blockStims = tempArray;

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
    evalAttentionChecks();
    renameDataProperties();
  },
};

stroop_rdoc_experiment = [];
var stroop_rdoc_init = () => {
  // Randomly select two congruent and two incongruent stimuli
  let selectedCongruent = getRandomElements(congruentStim, 2);
  let selectedIncongruent = getRandomElements(incongruentStim, 2);

  // Combine the selected stimuli into a new array
  let tempArray = selectedCongruent.concat(selectedIncongruent);
  tempArray = jsPsych.randomization.repeat(tempArray, 1);

  blockStims = tempArray;

  stroop_rdoc_experiment.push(fullscreen);
  stroop_rdoc_experiment.push(instructionsNode);
  stroop_rdoc_experiment.push(practiceNode);
  stroop_rdoc_experiment.push(testNode);
  stroop_rdoc_experiment.push(endBlock);
  stroop_rdoc_experiment.push(exitFullscreen);
};
