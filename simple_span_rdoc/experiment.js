/* ************************************ * /
/* Define helper functions */
/* ************************************ */
// common
// PARAMETERS FOR DECAYING EXPONENTIAL FUNCTION
var meanITI = 5;
function sampleFromDecayingExponential() {
  // Decay parameter of the exponential distribution λ = 1 / μ
  var lambdaParam = 1 / meanITI;
  var minValue = 2;
  var maxValue = 20;

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

function shuffleChecksArray(array) {
  // Create a copy of the original array
  const shuffledArray = [...array];

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
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
    A: 73,
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

attentionCheckData = shuffleChecksArray(attentionCheckData);
var currentAttentionCheckData = attentionCheckData.shift();

function shuffleArray(array) {
  // Create a copy of the original array to avoid modifying it directly
  const shuffledArray = array.slice();

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function generateSpatialTrialValues(n) {
  const possibleValues = Array.from({ length: 16 }, (_, i) => i);
  const randomList = [];

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    randomList.push(possibleValues[randomIndex]);
    possibleValues.splice(randomIndex, 1);
  }

  return randomList;
}

var trialValue;

var getStim = function () {
  let html = '<div class="container">';

  const trialIndex = trialList.shift();

  for (var i = 0; i < 16; i++) {
    if (i === trialIndex) {
      html += '<div class="box active-box"></div>';
    } else {
      html += '<div class="box"></div>';
    }
  }
  trialValue = trialIndex;
  html += "</div>";
  return html;
};

function generateRandomGrid(size) {
  const grid = new Array(size);
  for (let i = 0; i < size; i++) {
    grid[i] = Math.random() < 0.5 ? 0 : 1;
  }
  return grid;
}

function areArraysAsymmetric(arr1, arr2) {
  // Check if arrays are asymmetric (values at each index are not the same)
  return !arr1.every((val, index) => val === arr2[index]);
}

function makeAsymmetricArrays() {
  const size = 32;
  let firstGrid = generateRandomGrid(size);
  let secondGrid = generateRandomGrid(size);

  while (areArraysAsymmetric(firstGrid, secondGrid) === false) {
    // Keep generating new arrays until they become asymmetric
    firstGrid = generateRandomGrid(size);
    secondGrid = generateRandomGrid(size);
  }
  return [firstGrid, secondGrid];
}

function makeAsymmetricArrays() {
  const size = 32;
  const firstGrid = generateRandomGrid(size);
  const secondGrid = generateRandomGrid(size);

  return [{ firstGrid: firstGrid, secondGrid: secondGrid, symmetric: false }];
}

function getProcessingStimProperties(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const divs = doc.querySelectorAll(".container > div");
  const classList = Array.from(divs).map(div => div.className);

  const parsedClassList = classList.map(item => {
    if (item === "distractor-box active-box") {
      return "black";
    } else if (item === "distractor-box") {
      return "gray";
    } else {
      return item;
    }
  });

  return parsedClassList;
}

var submittedAnswers = [];
var timestampsSubmissions = [];
var timestampsMovingThroughGrid = [];
var trackingCellMovingThroughGrid = [];
var startingCellInGrid;

var generateGrid = function () {
  const randomIndex = Math.floor(Math.random() * 16);
  startingCellInGrid = randomIndex;
  // Variable to store the initial call time
  let initialCallTime = Date.now();

  let activeIndex = randomIndex;
  const activeBoxes = [];

  let html = '<div class="container">';
  for (var i = 0; i < 16; i++) {
    if (i === randomIndex) {
      html += '<div class="box response-active"></div>';
      activeBoxes.push(i);
    } else {
      html += '<div class="box"></div>';
    }
  }
  html += "</div>";

  let spacebarCount = 0;
  const selectedIndexes = [];

  // Declare a variable to store the setTimeout ID
  let timeoutId;
  function handleKeyDown(event) {
    let currentTime = Date.now();
    let timeDifference = currentTime - initialCallTime;
    timestampsMovingThroughGrid.push(timeDifference); // Store timestamp

    const key = event.key;
    const container = document.querySelector(".container");
    const boxes = container.querySelectorAll(".box");

    // Remove active-box class from all boxes
    boxes.forEach(function (box) {
      box.classList.remove("spacebar-box");
    });

    // Update activeIndex based on arrow key input
    let newActiveIndex = activeIndex;
    if (key === "ArrowLeft" && activeIndex % 4 !== 0) {
      newActiveIndex = activeIndex - 1;
    } else if (key === "ArrowRight" && activeIndex % 4 !== 3) {
      newActiveIndex = activeIndex + 1;
    } else if (key === "ArrowUp" && activeIndex >= 4) {
      newActiveIndex = activeIndex - 4;
    } else if (key === "ArrowDown" && activeIndex < 12) {
      newActiveIndex = activeIndex + 4;
    }

    trackingCellMovingThroughGrid.push(newActiveIndex);

    if (newActiveIndex !== activeIndex) {
      // Remove active-box class from all boxes
      boxes.forEach(function (box) {
        box.classList.remove("response-active");
      });
    }

    if (newActiveIndex !== activeIndex) {
      activeIndex = newActiveIndex;
      boxes[activeIndex].classList.add("response-active"); // Add active-box class for arrow key navigation
    }

    if (key === " ") {
      let currentTime = Date.now();
      let timeDifference = currentTime - initialCallTime;
      timestampsSubmissions.push(timeDifference); // Store timestamp

      if (spacebarCount < 4) {
        boxes[activeIndex].classList.add("spacebar-box"); // Add spacebar-box class for spacebar selection
        activeBoxes.push(activeIndex);
        selectedIndexes.push(activeIndex);
        spacebarCount++;
        submittedAnswers.push(activeIndex);
      }

      // Clear any existing setTimeout calls
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (key !== " ") {
          boxes[activeIndex].classList.remove("response-active"); // Remove active-box class if the arrow key was pressed
        }
        boxes[activeIndex].classList.remove("spacebar-box"); // Remove spacebar-box class for spacebar selection
      }, 200);
    }
  }
  // Attach the event listener
  document.addEventListener("keydown", handleKeyDown);

  function resetGrid() {
    activeBoxes.length = 0; // Clear the activeBoxes array
    selectedIndexes.length = 0; // Clear the selectedIndexes array
    spacebarCount = 0;

    // Remove the event listener
    document.removeEventListener("keydown", handleKeyDown);

    // Clear any remaining state or perform other necessary actions
    submittedAnswers = [];

    // Also reset the initial call time when the grid is reset
    initialCallTime = Date.now();
  }

  return { html, resetGrid };
};

function combineArrays(array1, array2) {
  if (array1.length % 4 !== 0 || array2.length % 4 !== 0) {
    throw new Error("Both arrays must have a length that is a multiple of 4.");
  }

  const combinedArray = [];

  for (let i = 0; i < array1.length; i += 4) {
    combinedArray.push(...array1.slice(i, i + 4), ...array2.slice(i, i + 4));
  }

  return combinedArray;
}

var generateDistractorGrid = function (stim) {
  let html = '<div class="container">';
  const grid = stim.grid;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i] == 1) {
      html += '<div class="distractor-box active-box"></div>';
    } else {
      html += '<div class="distractor-box"></div>';
    }
  }

  html += "</div>";

  return html;
};

const getInstructFeedback = () =>
  `<div class="centerbox"><p class="center-block-text">${feedbackInstructText}</p></div>`;

const getFeedback = () =>
  `<div class="bigbox"><div class="picture_box"><p class="block-text">${feedbackText}</p></div></div>`;

const getCurrSeq = () => currSeq;

const getCurrCondition = () => currCondition;

const getCurrBlockNum = () =>
  getExpStage() === "practice" ? practiceCount : testCount;

const getExpStage = () => expStage;

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// common variables

var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>
`;

var feedbackInstructText = `
  <p class="center-block-text">
    Welcome! This experiment will take around 12 minutes.
  </p>
  <p class="center-block-text">
    To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in fullscreen mode for the whole duration of each task.
  </p>
  <p class="center-block-text"> Press <i>enter</i> to begin.</p>
`;

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

var spanResponses = [
  "left arrow key",
  "right arrow key",
  "up arrow key",
  "down arrow key",
  "spacebar",
];

// *Timing:
// stimulus and fixation
const stimStimulusDuration = 1000;
const stimTrialDuration = 1000;
const processingStimulusDuration = 3000;
const processingTrialDuration = 3000;
const responseBlockDuration = 5000;

var runAttentionChecks = true;
var sumInstructTime = 0; // ms
var instructTimeThresh = 1; // /in seconds

var accuracyThresh = 0.6;

var missedResponseThresh = 0.1;
var practiceThresh = 3;

var processingChoices;

function getKeyMappingForTask(group_index) {
  if (group_index % 2 === 0) {
    processingChoices = [
      { keycode: "ArrowLeft", keyname: "left arrow key" },
      { keycode: "ArrowRight", keyname: "right arrow key" },
    ];
  } else {
    processingChoices = [
      { keycode: "ArrowRight", keyname: "right arrow key" },
      { keycode: "ArrowLeft", keyname: "left arrow key" },
    ];
  }
}

var group_index =
  typeof window.efVars !== "undefined" ? window.efVars.group_index : 1;

getKeyMappingForTask(group_index);

var processingAccThresh = 0.85;
var processingRTThresh = 1000;
var processingMissedThresh = 0.1;

var practiceLen = 1;
var numTrialsPerBlock = 8;
var numTestBlocks = 3;

var trialList;

var currCondition = "simple";

var numStimuli = 4;

var expStage = "practice";
var currSeq = [];

var practicePromptResponse = `<div class = prompt_box_response>
  <p class = center-block-text style = "font-size:16px; line-height:80%%;">Use the <b>arrow keys</b> to navigate the grid and the <b>spacebar</b> to select the cells colored black in the order they were shown.
  </p>
</div>`;

var practicePromptText = `<div class = prompt_box_simple>
  <p class = center-block-text style = "font-size:16px; line-height:80%%;">Memorize all the black colored cells.</p>
  </div>`;

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
// Set up attention check node
var attentionCheckBlock = {
  type: jsPsychAttentionCheckRdoc,
  data: {
    trial_id: "test_attention_check",
    trial_duration: 60000,
    timing_post_trial: 200,
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
  trial_duration: 180000,
};

var simpleSpanInstructions = `
  <div class="centerbox">
    <p class="block-text">Place your fingers on the arrow keys.</p>
    <p class="block-text">
      During this task, you will see a fixation (****) followed by a 4x4 grid. This 4x4 grid will have one cell colored black. Try to remember the location of the black cell.
    </p>
    <p class="block-text">
      This sequence of a fixation (****) and 4x4 grid will alternate four times. After the fourth time, a blank 4x4 grid will be presented.
    </p>
    <p class="block-text">
      On the blank 4x4 grid, use the <b>arrow keys</b> to navigate the grid and the <b>spacebar</b> to select the cells you think were colored black in the preceding 4 4x4 grids. Please select them in the order they were shown (i.e., respond with the location of the first black square in the 4x4 grid, then the 2nd, …).
    </p>
  </div>
`;

var reminderInstruct = `
  <div class="centerbox">
    <p class="block-text">
      During the practice round, you will receive feedback and a reminder of the rules. These will be removed for the actual test, so make sure that you understand the instructions before moving on.
    </p>
    <p class="block-text">${speedReminder}</p>
  </div>
`;

var instructionsBlock = {
  type: jsPsychInstructions,
  pages: [simpleSpanInstructions, reminderInstruct],
  allow_keys: false,
  data: {
    trial_id: "instructions",
    trial_duration: null,
    stimulus: [simpleSpanInstructions, reminderInstruct],
  },
  show_clickable_nav: true,
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
  response_ends_trial: true,
};

var expStage = "practice";

var stimulusBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return getStim();
  },
  stimulus_duration: stimStimulusDuration,
  trial_duration: stimTrialDuration,
  data: function () {
    if (getExpStage() == "practice") {
      return {
        trial_id: "practice_stim",
        exp_stage: getExpStage(),
        condition: getCurrCondition(),
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
        block_num: practiceCount,
      };
    } else {
      return {
        trial_id: "test_stim",
        exp_stage: getExpStage(),
        condition: getCurrCondition(),
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
        block_num: testCount,
      };
    }
  },
  choices: ["NO_KEYS"],
  prompt: function () {
    if (getExpStage() == "practice") {
      return practicePromptText;
    }
  },
  on_finish: function (data) {
    data["spatial_location"] = trialValue;
    data["block_num"] = getExpStage() == "practice" ? practiceCount : testCount;
  },
};

var startTime = null;

var waitBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>****</div></div>",
  choices: "NO_KEYS",
  stimulus_duration: processingStimulusDuration,
  trial_duration: processingTrialDuration,
  response_ends_trial: true,
  on_start: function () {
    // calculate time to last 3000ms then end trial
    if (startTime === null) {
      startTime = performance.now();
    }

    // get last trial
    var lastTrial = jsPsych.data.get().last(1).trials[0];
    // last trials IDs that start new trials
    var trialIDs = [
      "practice_feedback",
      "practice_ITI",
      "test_ITI",
      "test_attention_check",
    ];
    // if id starts new trial then set stimuli for that trial
    if (trialIDs.includes(lastTrial.trial_id)) {
      trialList = generateSpatialTrialValues(numStimuli);
      trialValues = trialList;
    }
  },
  data: function () {
    return {
      trial_id:
        getExpStage() == "practice"
          ? "practice_inter-stimulus"
          : "test_inter-stimulus",
      exp_stage: getExpStage(),
      condition: getCurrCondition(),
      choices: "",
      trial_duration: processingTrialDuration,
      stimulus_duration: processingStimulusDuration,
      block_num: getExpStage() == "practice" ? practiceCount : testCount,
    };
  },
  on_finish: function (data) {
    data["correct_spatial_judgement_key"] = null;

    data["block_num"] = getExpStage() == "practice" ? practiceCount : testCount;

    let processingStimProperties = null;

    data["order_and_color_of_processing_boxes"] = processingStimProperties;
  },
  prompt: function () {
    if (getExpStage() == "practice") {
      return practicePromptText;
    }
  },
};

var waitNode = {
  timeline: [waitBlock],
  loop_function: function (data) {
    var elapsedTime = performance.now() - startTime;

    if (elapsedTime >= processingTrialDuration) {
      startTime = null; // Reset startTime for the next trial
      return false; // End the loop
    }

    return true; // Continue the loop for the current trial
  },
};

function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

var activeGrid;

var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    var last = jsPsych.data.get().last(1).trials[0];
    if (last.correct_trial == null) {
      return "<div class=center-box><div class='center-text'><font size =20>Respond Faster!</font></div></div>";
    } else if (last.correct_trial == 1) {
      return "<div class=center-box><div class='center-text'><font size =20>Correct!</font></div></div>";
    } else {
      return "<div class=center-box><div class='center-text'><font size =20>Incorrect</font></div></div>";
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
};

var testTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    activeGrid = generateGrid();
    return activeGrid.html;
  },
  choices: ["NO_KEYS"],
  data: function () {
    return {
      trial_id: getExpStage() == "test" ? "test_trial" : "practice_trial",
      exp_stage: getExpStage(),
      choices: ["NO_KEYS"],
      trial_duration: responseBlockDuration,
      stimulus_duration: responseBlockDuration,
    };
  },
  trial_duration: responseBlockDuration,
  stimulus_duration: responseBlockDuration,
  prompt: function () {
    if (getExpStage() == "practice") {
      return practicePromptResponse;
    }
  },
  on_finish: function (data) {
    if (getExpStage() == "practice") {
      var stimTrials = jsPsych.data
        .get()
        .filter({ trial_id: "practice_stim" }).trials;
    } else {
      var stimTrials = jsPsych.data
        .get()
        .filter({ trial_id: "test_stim" }).trials;
    }

    var lastTrials = stimTrials.slice(-4);
    var correctResponses = lastTrials.map(trial => trial.spatial_location);

    data["response"] = submittedAnswers;

    if (submittedAnswers.length < 4) {
      data["correct_trial"] = null;
    } else if (submittedAnswers.length == 4) {
      const correct = arraysAreEqual(correctResponses, submittedAnswers);
      data["correct_trial"] = correct ? 1 : 0;
    }

    data["condition"] = getCurrCondition();

    if (getExpStage() == "practice") {
      var lastInterStimTrials = jsPsych.data
        .get()
        .filter({ trial_id: "practice_stim" });

      var lastInterStimTrialsCorrectAnswers = lastInterStimTrials.trials
        .slice(-4)
        .map(trial => trial.spatial_location);
    } else {
      var lastInterStimTrials = jsPsych.data
        .get()
        .filter({ trial_id: "test_stim" });

      var lastInterStimTrialsCorrectAnswers = lastInterStimTrials.trials
        .slice(-4)
        .map(trial => trial.spatial_location);
    }
    data["starting_cell_in_grid"] = startingCellInGrid;

    data["spatial_sequence"] = lastInterStimTrialsCorrectAnswers;
    data["block_num"] = getExpStage() == "practice" ? practiceCount : testCount;
    data["rt_each_spatial_location_response_grid"] =
      timestampsSubmissions.slice(0, 4);

    data["rt_moving_each_spatial_location_response_grid"] =
      timestampsMovingThroughGrid;

    data["moving_order_spatial_location"] = trackingCellMovingThroughGrid;

    trackingCellMovingThroughGrid = [];
    timestampsSubmissions = [];
    timestampsMovingThroughGrid = [];

    activeGrid.resetGrid();
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
          min: 2,
          max: 20,
          mean: 5,
        },
        block_num: practiceCount,
        exp_stage: "practice",
      };
    } else {
      return {
        trial_id: "test_ITI",
        ITIParams: {
          min: 2,
          max: 20,
          mean: 5,
        },
        block_num: testCount,
        exp_stage: "test",
      };
    }
  },
  trial_duration: function () {
    ITIms = sampleFromDecayingExponential();
    return ITIms * 1000;
  },
  on_finish: function (data) {
    data["trial_duration"] = ITIms * 1000;
    data["stimulus_duration"] = ITIms * 1000;
  },
};

var practiceTrials = [];
function generatePracticeTrials() {
  var returnArray = [];

  for (let i = 0; i < practiceLen; i++) {
    for (let j = 0; j < numStimuli; j++) {
      returnArray.push(waitNode, stimulusBlock);
    }
    returnArray.push(testTrial, practiceFeedbackBlock, ITIBlock);
  }

  return returnArray;
}

practiceTrials = generatePracticeTrials();

// loop based on criteria
var practiceCount = 0;
var practiceNode = {
  timeline: [feedbackBlock].concat(practiceTrials),
  loop_function: function () {
    var responseGridData = jsPsych.data.get().filter({
      trial_id: "practice_trial",
      condition: getCurrCondition(),
      block_num: getCurrBlockNum(),
    }).trials;

    practiceCount += 1;
    var correct = 0;
    var totalTrials = responseGridData.length;
    var missedCount = 0;
    var responseCount = 0;

    for (var i = 0; i < responseGridData.length; i++) {
      if (responseGridData[i].correct_trial == null) {
        missedCount += 1;
      } else {
        responseCount += 1;
        if (responseGridData[i].correct_trial == 1) {
          correct += 1;
        }
      }
    }

    var accuracy = correct / responseCount;
    var missedResponses = missedCount / totalTrials;

    if (practiceCount === practiceThresh || accuracy >= accuracyThresh) {
      feedbackText =
        "<div class = centerbox><p class = center-block-text>We will now start the test portion.</p>" +
        '<p class="block-text">Keep your fingers on the arrow keys.</p>';

      feedbackText +=
        "<p class = block-text>Press <i>enter</i> to continue.</p></div>";

      expStage = "test";
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy for the 4x4 grid is low.</p>" +
          "<p class = block-text>Try your best to recall the black colored cells.</p>";
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials. Please respond on every trial that requires a response.</p>";
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      return true;
    }
  },
};

var testTrials = [];
function generateTestTrials() {
  var returnArray = [];

  returnArray.push(attentionNode);
  for (let i = 0; i < numTrialsPerBlock; i++) {
    for (let j = 0; j < numStimuli; j++) {
      returnArray.push(waitNode, stimulusBlock);
    }
    returnArray.push(testTrial, ITIBlock);
  }

  return returnArray;
}

testTrials = generateTestTrials();

// loop based on criteria
var testCount = 0;
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function () {
    var responseGridData = jsPsych.data.get().filter({
      trial_id: "test_trial",
      exp_stage: "test",
      condition: getCurrCondition(),
      block_num: getCurrBlockNum(),
    }).trials;

    testCount += 1;
    var correct = 0;
    var totalTrials = responseGridData.length;
    var missedCount = 0;
    var responseCount = 0;

    for (var i = 0; i < responseGridData.length; i++) {
      if (responseGridData[i].correct_trial == null) {
        missedCount += 1;
      } else {
        responseCount += 1;

        if (responseGridData[i].correct_trial == 1) {
          correct += 1;
        }
      }
    }

    var accuracy = correct / responseCount;
    var missedResponses = missedCount / totalTrials;

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

      // feedback for either simple or operation span
      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy for the 4x4 grid is low. Try your best to recall all the black colored cells.</p>";
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials. Please respond on every trial that requires a response.</p>";
      }

      feedbackText +=
        "<p class=block-text>Press <i>enter</i> to continue.</p>" + "</div>";

      return true;
    }
  },
  on_timeline_finish: function () {
    window.dataSync();
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

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: "simple_span_rdoc",
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
};

simple_span_rdoc_experiment = [];
var simple_span_rdoc_init = () => {
  simple_span_rdoc_experiment.push(fullscreen);
  simple_span_rdoc_experiment.push(instructionNode);
  simple_span_rdoc_experiment.push(practiceNode);
  simple_span_rdoc_experiment.push(testNode);
  simple_span_rdoc_experiment.push(postTaskBlock);
  simple_span_rdoc_experiment.push(endBlock);
  simple_span_rdoc_experiment.push(exitFullscreen);
};
