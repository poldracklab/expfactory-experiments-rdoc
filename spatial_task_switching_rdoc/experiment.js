/* ************************************ */
/* Define helper functions */
/* ************************************ */
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

const getExpStage = () => expStage;

const getInstructFeedback = () =>
  `<div class="centerbox"><p class="center-block-text">${feedbackInstructText}</p></div>`;

const getFeedback = () =>
  `<div class="bigbox"><div class="picture_box"><p class="block-text">${feedbackText}</p></div></div>`;

const task_switch_arr = [
  "task_stay_cue_stay",
  "task_stay_cue_switch",
  "task_switch_cue_switch",
  "task_switch_cue_switch",
];

var makeTaskSwitches = numTrials =>
  jsPsych.randomization.repeat(task_switch_arr, numTrials / 4);

var createTrialTypes = function (task_switches) {
  // creating stims for trial
  var stims = [];

  // randomly select location of first quadrant
  var whichQuadStart = jsPsych.randomization.repeat([1, 2, 3, 4], 1).pop();
  const quadMapping = {
    1: quadMappings.top,
    2: quadMappings.top,
    3: quadMappings.bottom,
    4: quadMappings.bottom,
  };
  const numbers = [1, 2, 3, 4, 6, 7, 8, 9];
  var number = numbers[Math.floor(Math.random() * 8)];
  var spatial_cue = quadMapping[whichQuadStart];
  var magnitude = number > 5 ? "high" : "low";
  var parity = number % 2 === 0 ? "even" : "odd";

  if (spatial_cue == "parity") {
    if (number % 2 == 0) {
      var correct_response = responseMappings.oddEven.even;
    } else {
      var correct_response = responseMappings.oddEven.odd;
    }
  } else {
    if (number > 5) {
      var correct_response = responseMappings.higherLower.higher;
    } else {
      var correct_response = responseMappings.higherLower.lower;
    }
  }

  var first_stim = {
    whichQuadrant: whichQuadStart,
    spatial_cue: spatial_cue,
    number: number,
    magnitude: magnitude,
    parity: parity,
    correct_response: correct_response,
  };
  stims.push(first_stim);

  var last_quad = whichQuadStart;

  for (i = 0; i < task_switches.length; i++) {
    var current_condition = task_switches[i];
    var number = numbers[Math.floor(Math.random() * 8)];
    var magnitude = number > 5 ? "high" : "low";
    var parity = number % 2 === 0 ? "even" : "odd";
    var current_quad;

    if (current_condition == "task_stay_cue_stay") {
      current_quad = last_quad;
    } else if (current_condition == "task_stay_cue_switch") {
      current_quad = last_quad;
      if (last_quad == 1) {
        current_quad = 2;
      } else if (last_quad == 2) {
        current_quad = 1;
      } else if (last_quad == 3) {
        current_quad = 4;
      } else {
        current_quad = 3;
      }
    } else {
      if (last_quad == 1 || last_quad == 2) {
        var current_quad = jsPsych.randomization.repeat([3, 4], 1).pop();
      } else {
        var current_quad = jsPsych.randomization.repeat([1, 2], 1).pop();
      }
    }
    var spatial_cue = quadMapping[current_quad];

    if (spatial_cue == "parity") {
      if (number % 2 == 0) {
        var correct_response = responseMappings.oddEven.even;
      } else {
        var correct_response = responseMappings.oddEven.odd;
      }
    } else {
      if (number > 5) {
        var correct_response = responseMappings.higherLower.higher;
      } else {
        var correct_response = responseMappings.higherLower.lower;
      }
    }

    var current_stim = {
      whichQuadrant: current_quad,
      spatial_cue: spatial_cue,
      number: number,
      magnitude: magnitude,
      parity: parity,
      correct_response: correct_response,
    };
    stims.push(current_stim);

    last_quad = current_quad;
  }

  return stims;
};

var getFixation = () =>
  "<div class = centerbox><div class = fixation>+</div></div>";

var getCue = function () {
  stim = stims.shift();
  predictable_dimension = stim.predictable_dimension;
  number = stim.number;
  correct_response = stim.correct_response;
  whichQuadrant = stim.whichQuadrant;
  magnitude = stim.magnitude;
  parity = stim.parity;

  return stop_boards[whichQuadrant - 1][0] + stop_boards[whichQuadrant - 1][1];
};

var getStim = function () {
  return (
    task_boards[whichQuadrant - 1][0] +
    preFileType +
    number +
    fileTypePNG +
    task_boards[whichQuadrant - 1][1]
  );
};

const getCurrBlockNum = () =>
  getExpStage() === "practice" ? practiceCount : testCount;

var appendData = function () {
  curr_trial = jsPsych.getProgress().current_trial_global;
  trial_id = jsPsych.data.get().filter({ trial_index: curr_trial })
    .trials[0].trial_id;
  current_trial += 1;
  task_switch = "na";
  if (current_trial > 1) {
    task_switch = task_switches[current_trial - 2]; // this might be off
  }

  if (trial_id == "practice_trial") {
    current_block = practiceCount;
  } else if (trial_id == "test_trial") {
    current_block = testCount;
  }

  jsPsych.data.get().addToLast({
    spatial_cue:
      whichQuadrant === 1
        ? quadMappings.top
        : whichQuadrant === 2
        ? quadMappings.top
        : quadMappings.bottom,
    condition: task_switch,
    number: number,
    correct_response: correct_response,
    whichQuadrant: whichQuadrant,
    magnitude: magnitude,
    parity: parity,
    current_trial: current_trial,
    current_block: current_block,
    block_num: getCurrBlockNum(),
  });

  if (trial_id == "practice_trial" || trial_id == "test_trial") {
    correct_trial = 0;
    if (jsPsych.data.get().last().trials[0].response == correct_response) {
      correct_trial = 1;
    }
    jsPsych.data.get().addToLast({
      correct_trial: correct_trial,
    });
  }
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
const fixationDuration = 500;

var group_index =
  typeof window.efVars !== "undefined" ? window.efVars.group_index : 1;

function getResponseMappings(group_index) {
  var responseMapping;
  var quadMappings;

  if (group_index % 2 == 0) {
    quadMappings = { top: "magnitude", bottom: "parity" };
  } else {
    quadMappings = { top: "parity", bottom: "magnitude" };
  }

  switch (group_index % 4) {
    case 0: // Condition 1
      responseMapping = {
        higherLower: { higher: ",", lower: "." },
        oddEven: { odd: ",", even: "." },
      };
      break;
    case 1: // Condition 2
      responseMapping = {
        higherLower: { higher: ".", lower: "," },
        oddEven: { odd: ",", even: "." },
      };
      break;
    case 2: // Condition 3
      responseMapping = {
        higherLower: { higher: ",", lower: "." },
        oddEven: { odd: ".", even: "," },
      };
      break;
    case 3: // Condition 4
      responseMapping = {
        higherLower: { higher: ".", lower: "," },
        oddEven: { odd: ".", even: "," },
      };
      break;
  }

  return { responseMapping, quadMappings };
}

var responseMappings = getResponseMappings(group_index).responseMapping;
var quadMappings = getResponseMappings(group_index).quadMappings;

const choices = [",", "."];

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
    To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in fullscreen mode for the whole duration of each task.
  </p>
  <p class="center-block-text"> Press <i>enter</i> to begin.</p>
`;

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

var sumInstructTime = 0; // ms
var instructTimeThresh = 1; // /in seconds

var runAttentionChecks = true;

var expStage = "practice";
var practiceLen = 4; // divisible by 4,  2 (switch or stay) by 2 (mag or parity)]
var numTrialsPerBlock = 64; //  divisible by 4
var numTestBlocks = 3;

var accuracy_thresh = 0.8;
var practice_accuracy_thresh = 0.75;

var rt_thresh = 750;
var missed_response_thresh = 0.1;
var practice_thresh = 3;

var predictable_dimensions_list = [
  (stim = {
    dim: "magnitude",
    values: ["high", "low"],
    exp: " (higher or lower than 5)",
  }),
  (stim = { dim: "parity", values: ["even", "odd"], exp: " (odd or even)" }),
];

var fileTypePNG = ".png'></img>";
var preFileType =
  "<img class = center src='/static/experiments/spatial_task_switching_rdoc/images/";

var current_trial = 0;

var task_boards = [
  [
    [
      "<div class = bigbox><div class = quad_box><div class = decision-top-left><div class = gng_number><div class = cue-text>",
    ],
    ["</div></div></div></div></div>"],
  ],
  [
    [
      "<div class = bigbox><div class = quad_box><div class = decision-top-right><div class = gng_number><div class = cue-text>",
    ],
    ["</div></div></div></div></div>"],
  ],
  [
    [
      "<div class = bigbox><div class = quad_box><div class = decision-bottom-right><div class = gng_number><div class = cue-text>",
    ],
    ["</div></div></div></div></div>"],
  ],
  [
    [
      "<div class = bigbox><div class = quad_box><div class = decision-bottom-left><div class = gng_number><div class = cue-text>",
    ],
    ["</div></div></div></div></div>"],
  ],
];

var stop_boards = [
  [
    [
      "<div class = bigbox><div class = quad_box><div class = decision-top-left>",
    ],
    ["</div></div></div>"],
  ],
  [
    [
      "<div class = bigbox><div class = quad_box><div class = decision-top-right>",
    ],
    ["</div></div></div>"],
  ],
  [
    [
      "<div class = bigbox><div class = quad_box><div class = decision-bottom-right>",
    ],
    ["</div></div></div>"],
  ],
  [
    [
      "<div class = bigbox><div class = quad_box><div class = decision-bottom-left>",
    ],
    ["</div></div></div>"],
  ],
];
var prompt_text_list = `
  <ul style="text-align:left;">
    <li>Top 2 quadrants: judge number on <b>${quadMappings.top}</b></li> 
    <li><b>${quadMappings.top == "parity" ? "even" : "high"}</b>: ${
  quadMappings.top == "parity"
    ? responseMappings.oddEven.even == ","
      ? "index finger"
      : "middle finger"
    : responseMappings.higherLower.higher == ","
    ? "index finger"
    : "middle finger"
}</li>
    <li><b>${quadMappings.top == "parity" ? "odd" : "low"}</b>: ${
  quadMappings.top == "parity"
    ? responseMappings.oddEven.odd == ","
      ? "index finger"
      : "middle finger"
    : responseMappings.higherLower.lower == ","
    ? "index finger"
    : "middle finger"
}</li>
    <li>Bottom 2 quadrants: judge number on <b>${quadMappings.bottom}</b></li>
    <li><b>${quadMappings.bottom == "parity" ? "even" : "high"}</b>: ${
  quadMappings.bottom == "parity"
    ? responseMappings.oddEven.even == ","
      ? "index finger"
      : "middle finger"
    : responseMappings.higherLower.higher == ","
    ? "index finger"
    : "middle finger"
}</li>
    <li><b>${quadMappings.bottom == "parity" ? "odd" : "low"}</b>: ${
  quadMappings.bottom == "parity"
    ? responseMappings.oddEven.odd == ","
      ? "index finger"
      : "middle finger"
    : responseMappings.higherLower.lower == ","
    ? "index finger"
    : "middle finger"
}</li>
  </ul>`;

var prompt_text = `
  <div class="prompt_box">
    <div class='prompt_content' style='margin-bottom: 80px;'>
      <p>Top 2 quadrants, judge number on <b>${quadMappings.top}</b>:</p>
      <ul>
        <li><b>${quadMappings.top == "parity" ? "even" : "high"}</b>: ${
  quadMappings.top == "parity"
    ? responseMappings.oddEven.even == ","
      ? "index finger"
      : "middle finger"
    : responseMappings.higherLower.higher == ","
    ? "index finger"
    : "middle finger"
}</li>
        <li><b>${quadMappings.top == "parity" ? "odd" : "low"}</b>: ${
  quadMappings.top == "parity"
    ? responseMappings.oddEven.odd == ","
      ? "index finger"
      : "middle finger"
    : responseMappings.higherLower.lower == ","
    ? "index finger"
    : "middle finger"
}</li>
      </ul>
    </div>
    <div class='prompt_content' style='margin-top: 80px;'>
      <p>Bottom 2 quadrants, judge number on <b>${quadMappings.bottom}</b>:</p>
      <ul>
        <li><b>${quadMappings.bottom == "parity" ? "even" : "high"}</b>: ${
  quadMappings.bottom == "parity"
    ? responseMappings.oddEven.even == ","
      ? "index finger"
      : "middle finger"
    : responseMappings.higherLower.higher == ","
    ? "index finger"
    : "middle finger"
}</li>
        <li><b>${quadMappings.bottom == "parity" ? "odd" : "low"}</b>: ${
  quadMappings.bottom == "parity"
    ? responseMappings.oddEven.odd == ","
      ? "index finger"
      : "middle finger"
    : responseMappings.higherLower.lower == ","
    ? "index finger"
    : "middle finger"
}</li>
      </ul>
    </div>
  </div>`;

var pageInstruct = [
  `<div class = centerbox>
    <p class="block-text">Place your <b>index finger</b> on the <b>comma key (,)</b> and your <b>middle finger</b> on the <b>period key (.)</b></p>
    <p class = block-text>During this task, on each trial you will see a single number in one of the four quadrants of the screen.
    Based upon which quadrant the number is presented, you will complete a different task for that number.
    </p>
    <p class = block-text>In the top two quadrants, please judge the number based on <b>${
      quadMappings.top
    }</b>. Press your <b>${
    responseMappings.oddEven.even == "," ? "index finger" : "middle finger"
  }</b> if 
    <b>${quadMappings.top == "parity" ? "even" : "high"}</b> and your <b>${
    responseMappings.oddEven.odd == "," ? "index finger" : "middle finger"
  }</b> if <b>${quadMappings.top == "parity" ? "odd" : "low"}</b>. 
    </p>
     <p class = block-text>In the bottom two quadrants, please judge the number based on <b>${
       quadMappings.bottom
     }</b>. Press your <b>${
    responseMappings.oddEven.even == "," ? "index finger" : "middle finger"
  }</b> if 
    <b>${quadMappings.bottom == "parity" ? "even" : "high"}</b> and your <b>${
    responseMappings.oddEven.odd == "," ? "index finger" : "middle finger"
  }</b> if <b>${quadMappings.bottom == "parity" ? "odd" : "low"}</b>. 
    </p>
  </div>`,
  `<div class = centerbox>
    <p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    ${speedReminder}
  </div>`,
];

// IMAGES TO PRELOAD
var pathSource = "/static/experiments/spatial_task_switching_rdoc/images/";
var numbersPreload = ["1", "2", "3", "4", "6", "7", "8", "9"];
var images = [];
for (i = 0; i < numbersPreload.length; i++) {
  images.push(pathSource + numbersPreload[i] + ".png");
}

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

var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";

var feedback_block = {
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

var feedback_instruct_block = {
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

// / This ensures that the subject does not read through the instructions too quickly. If they do it too quickly, then we will go over the loop again.
var instructions_block = {
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

/* This function defines stopping criteria */
var instruction_node = {
  timeline: [feedback_instruct_block, instructions_block],
  loop_function: function () {
    data = jsPsych.data.get().filter({ trial_id: "instructions" }).trials;
    for (i = 0; i < data.length; i++) {
      if (data[i].rt != null) {
        sumInstructTime = sumInstructTime + data[i].rt;
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

var end_block = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: "spatial_task_switching_rdoc",
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
};

var practiceTrials = [];
for (i = 0; i < practiceLen + 1; i++) {
  var fixation_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getFixation,
    choices: ["NO_KEYS"],
    data: {
      exp_stage: "practice",
      trial_id: "practice_fixation",
      trial_duration: 500,
      stimulus_duration: 500,
    },
    stimulus_duration: 500,
    trial_duration: 500,
    post_trial_gap: 0,
    prompt: prompt_text,
    on_finish: data => (data["block_num"] = practiceCount),
  };

  var practice_cue_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: {
      exp_stage: "practice",
      trial_id: "practice_cue",
      trial_duration: 150,
      stimulus_duration: 150,
    },
    trial_duration: 150, // getCTI
    stimulus_duration: 150, // getCTI
    post_trial_gap: 0,
    prompt: prompt_text,
    on_finish: data => (data["block_num"] = practiceCount),
  };

  var practiceTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: {
      exp_stage: "practice",
      trial_id: "practice_trial",
      choices: choices,
      trial_duration: 1500,
      stimulus_duration: 1000,
    },
    stimulus_duration: 1000, // 1000
    trial_duration: 1500, // 1500
    post_trial_gap: 0,
    response_ends_trial: false,
    on_finish: appendData,
    prompt: prompt_text,
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
        return prompt_text;
      } else {
        return "";
      }
    },
    on_finish: function (data) {
      data["trial_duration"] = ITIms * 1000;
      data["stimulus_duration"] = ITIms * 1000;
    },
  };

  var practice_feedback_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.response == null) {
        return "<div class = fb_box><div class = center-text><font size =20>Respond Faster!</font></div></div>";
      } else if (last.correct_trial == 1) {
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
    choices: ["NO_KEYS"],
    stimulus_duration: 500,
    trial_duration: 500,
    prompt: prompt_text,
  };
  practiceTrials.push(
    fixation_block,
    practice_cue_block,
    practiceTrial,
    practice_feedback_block,
    ITIBlock
  );
}

var practiceCount = 0;
var practiceNode = {
  timeline: [feedback_block].concat(practiceTrials),
  loop_function: function (data) {
    practiceCount += 1;

    current_trial = 0;

    var sum_rt = 0;
    var sum_responses = 0;
    var correct = 0;
    var total_trials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "practice_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        total_trials += 1;
        if (data.trials[i].rt != null) {
          sum_rt += data.trials[i].rt;
          sum_responses += 1;
          if (data.trials[i].response == data.trials[i].correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / total_trials;
    var missed_responses = (total_trials - sum_responses) / total_trials;
    var ave_rt = sum_rt / sum_responses;

    if (
      accuracy >= practice_accuracy_thresh ||
      practiceCount == practice_thresh
    ) {
      feedbackText = `
      <div class="centerbox">
        <p class="block-text">We will now start the test portion.</p>
        <p class="block-text">Keep your <b>index finger</b> on the <b>comma key (,)</b> and your <b>middle finger</b> on the <b>period key (.)</b></p>
        <p class="block-text">Press <i>enter</i> to continue.</p>
      </div>
      `;

      task_switches = makeTaskSwitches(numTrialsPerBlock);
      stims = createTrialTypes(task_switches);
      expStage = "test";
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < practice_accuracy_thresh) {
        feedbackText += `
          <p class="block-text">Your accuracy is low. Remember:</p>
          ${prompt_text_list}
        `;
      }

      if (ave_rt > rt_thresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly.${speedReminder}</p>
      `;
      }

      if (missed_responses > missed_response_thresh) {
        feedbackText += `
          <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>
        `;
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      task_switches = makeTaskSwitches(practiceLen);
      stims = createTrialTypes(task_switches);
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode);
for (i = 0; i < numTrialsPerBlock + 1; i++) {
  var fixation_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getFixation,
    choices: ["NO_KEYS"],
    data: {
      exp_stage: "test",
      trial_id: "test_fixation",
      trial_duration: 500,
      stimulus_duration: 500,
    },
    stimulus_duration: 500,
    trial_duration: fixationDuration, // 500
    post_trial_gap: 0,
    on_finish: data => (data["block_num"] = practiceCount),
  };

  var cue_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: {
      exp_stage: "test",
      trial_id: "test_cue",
      trial_duration: 150,
      stimulus_duration: 150,
    },
    trial_duration: 150, // getCTI
    stimulus_duration: 150, // getCTI
    post_trial_gap: 0,
    on_finish: data => (data["block_num"] = practiceCount),
  };

  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: {
      exp_stage: "test",
      trial_id: "test_trial",
      choices: choices,
      trial_duration: 1500,
      stimulus_duration: 1000,
    },
    stimulus_duration: 1000, // 1000
    trial_duration: 1500, // 1500
    post_trial_gap: 0,
    response_ends_trial: false,
    on_finish: appendData,
  };
  testTrials.push(fixation_block);
  testTrials.push(cue_block);
  testTrials.push(testTrial);
  testTrials.push(ITIBlock);
}

var testCount = 0;
var testNode = {
  timeline: [feedback_block].concat(testTrials),
  loop_function: function (data) {
    testCount += 1;
    current_trial = 0;

    var sum_rt = 0;
    var sum_responses = 0;
    var correct = 0;
    var total_trials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "test_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        total_trials += 1;
        if (data.trials[i].rt != null) {
          sum_rt += data.trials[i].rt;
          sum_responses += 1;
          if (data.trials[i].response == data.trials[i].correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / total_trials;
    var missed_responses = (total_trials - sum_responses) / total_trials;
    var ave_rt = sum_rt / sum_responses;

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

      if (accuracy < accuracy_thresh) {
        feedbackText += `
          <p class="block-text">Your accuracy is low. Remember:</p>
          ${prompt_text_list}
        `;
      }

      if (ave_rt > rt_thresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly.${speedReminder}</p>
      `;
      }

      if (missed_responses > missed_response_thresh) {
        feedbackText += `
          <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>
        `;
      }

      if (
        accuracy >= accuracy_thresh &&
        missed_responses <= missed_response_thresh &&
        ave_rt <= rt_thresh
      ) {
        feedbackText += "<p class = block-text>No feedback on this block.</p>";
      }

      feedbackText +=
        "<p class=block-text>Press <i>enter</i> to continue.</p>" + "</div>";

      task_switches = makeTaskSwitches(numTrialsPerBlock);
      stims = createTrialTypes(task_switches);
      return true;
    }
  },
};

var fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
};
var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

spatial_task_switching_rdoc_experiment = [];

var spatial_task_switching_rdoc_init = () => {
  jsPsych.pluginAPI.preloadImages(images);
  task_switches = makeTaskSwitches(practiceLen);
  stims = createTrialTypes(task_switches);
  spatial_task_switching_rdoc_experiment.push(fullscreen);
  spatial_task_switching_rdoc_experiment.push(instruction_node);
  spatial_task_switching_rdoc_experiment.push(practiceNode);
  spatial_task_switching_rdoc_experiment.push(testNode);
  spatial_task_switching_rdoc_experiment.push(end_block);
  spatial_task_switching_rdoc_experiment.push(exit_fullscreen);
};
