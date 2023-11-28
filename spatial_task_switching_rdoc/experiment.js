/* eslint-disable camelcase */
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

var getCorrectResponse = function (number, predictable_dimension) {
  if (number > 5) {
    magnitude = "high";
  } else if (number < 5) {
    magnitude = "low";
  }

  if (number % 2 === 0) {
    parity = "even";
  } else if (number % 2 !== 0) {
    parity = "odd";
  }

  par_ind = predictable_dimensions_list[0].values.indexOf(parity);
  if (par_ind == -1) {
    par_ind = predictable_dimensions_list[1].values.indexOf(parity);
    mag_ind = predictable_dimensions_list[0].values.indexOf(magnitude);
  } else {
    mag_ind = predictable_dimensions_list[1].values.indexOf(magnitude);
  }

  if (predictable_dimension == "magnitude") {
    correct_response = possibleResponses[mag_ind][1];
  } else if (predictable_dimension == "parity") {
    correct_response = possibleResponses[par_ind][1];
  }
  return [correct_response, magnitude, parity];
};

// added for spatial task
var makeTaskSwitches = function (numTrials) {
  task_switch_arr = [
    "tstay_cstay",
    "tstay_cswitch",
    "tswitch_cswitch",
    "tswitch_cswitch",
  ];
  out = jsPsych.randomization.repeat(task_switch_arr, numTrials / 4);
  return out;
};

// added for spatial task
var getQuad = function (oldQuad, curr_switch) {
  var out;
  switch (curr_switch) {
    case "tstay_cstay":
      out = oldQuad;
      break;
    case "tstay_cswitch":
      if (oldQuad % 2 == 0) {
        // if even (2,4), subtract 1
        out = oldQuad - 1;
      } else {
        out = oldQuad + 1; // if odd (1,3), add 1
      }
      break;
    case "tswitch_cswitch":
      if (oldQuad < 3) {
        // if in top quadrants (1,2)
        out = Math.ceil(Math.random() * 2) + 2; // should return 3 or 4
      } else {
        // if in bottom quadrants (3,4)
        out = Math.ceil(Math.random() * 2); // should return 1 or 2
      }
      break;
  }
  return out;
};
var createTrialTypes = function (task_switches) {
  // make the first trial
  var whichQuadStart = jsPsych.randomization.repeat([1, 2, 3, 4], 1).pop();
  var predictable_dimensions = [
    predictable_dimensions_list[0].dim,
    predictable_dimensions_list[0].dim,
    predictable_dimensions_list[1].dim,
    predictable_dimensions_list[1].dim,
  ];

  numbers_list = [
    [6, 8],
    [7, 9],
    [2, 4],
    [1, 3],
  ];
  numbers = [1, 2, 3, 4, 6, 7, 8, 9];

  predictable_dimension = predictable_dimensions[whichQuadStart - 1];

  number = numbers[Math.floor(Math.random() * 8)];

  response_arr = getCorrectResponse(number, predictable_dimension);

  var stims = [];

  var first_stim = {
    whichQuadrant: whichQuadStart,
    spatial_cue: predictable_dimension,
    number: number,
    magnitude: response_arr[1],
    parity: response_arr[2],
    correct_response: response_arr[0],
  };
  stims.push(first_stim);

  // build remaining trials from task_switches
  oldQuad = whichQuadStart;
  for (var i = 0; i < task_switches.length; i++) {
    whichQuadStart += 1;
    quadIndex = whichQuadStart % 4;
    if (quadIndex === 0) {
      quadIndex = 4;
    }
    quadIndex = getQuad(oldQuad, task_switches[i]); // changed for spatial task

    predictable_dimension = predictable_dimensions[quadIndex - 1];
    number = numbers[Math.floor(Math.random() * 8)];

    response_arr = getCorrectResponse(number, predictable_dimension);

    stim = {
      whichQuadrant: quadIndex,
      spatial_cue: predictable_dimension,
      number: number,
      magnitude: response_arr[1],
      parity: response_arr[2],
      correct_response: response_arr[0],
    };

    stims.push(stim);
    oldQuad = quadIndex; // changed for sptial task
  }
  return stims;
};

var getFixation = function () {
  return "<div class = centerbox><div class = fixation>+</div></div>";
};

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

var getCurrBlockNum = function () {
  if (getExpStage() == "practice") {
    return practiceCount;
  } else {
    return testCount;
  }
};

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
    spatial_cue: predictable_dimension,
    condition: task_switch,
    number: number,
    correct_response: correct_response,
    whichQuadrant: whichQuadrant,
    magnitude: magnitude,
    parity: parity,
    current_trial: current_trial,
    current_block: current_block,
    block_num: getExpStage() == "practice" ? practiceCount : testCount,
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
// common variables
const fixationDuration = 500;

var possibleResponses;

function getKeyMappingForTask(group_index) {
  if (Math.floor(group_index / 2) % 2 === 0) {
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

if (!window.efVars) {
  window.efVars = {}; // Initialize efVars if it's not already defined
}
let group_index = 1; // Example value for group_index

window.efVars.groupIndex = group_index;

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
    <li>Top 2 quadrants: judge number on ${predictable_dimensions_list[0].dim}</li>
    <li>${predictable_dimensions_list[0].values[0]}: ${possibleResponses[0][0]}</li>
    <li>${predictable_dimensions_list[0].values[1]}: ${possibleResponses[1][0]}</li>
    <li>Bottom 2 quadrants: judge number on ${predictable_dimensions_list[1].dim}</li>
    <li>${predictable_dimensions_list[1].values[0]}: ${possibleResponses[0][0]}</li>
    <li>${predictable_dimensions_list[1].values[1]}: ${possibleResponses[1][0]}</li>
  </ul>`;

var prompt_text = `
  <div class="prompt_box">
  <div class='prompt_content' style='margin-bottom: 80px;'>
    <p>Top 2 quadrants, judge number on ${predictable_dimensions_list[0].dim}:</p>
    <ul>
      <li>${predictable_dimensions_list[0].values[0]}: ${possibleResponses[0][0]}</li>
      <li>${predictable_dimensions_list[0].values[1]}: ${possibleResponses[1][0]}</li>
    </ul>
  </div>
  <div class='prompt_content' style='margin-top: 80px;'>
    <p>Bottom 2 quadrants, judge number on ${predictable_dimensions_list[1].dim}:</p>
    <ul>
      <li>${predictable_dimensions_list[1].values[0]}: ${possibleResponses[0][0]}</li>
      <li>${predictable_dimensions_list[1].values[1]}: ${possibleResponses[1][0]}</li>
    </ul>
    </div>
  </div>`;

var pageInstruct = [
  `<div class = centerbox>
    <p class=block-text>Place your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b></p>
    <p class = block-text>During this task, on each trial you will see a single number in one of the four quadrants of the screen.
    Based upon which quadrant the number appears in, you will complete a different task.</p>
    <p class = block-text>In the top two quadrants, please judge the number based on <b>${predictable_dimensions_list[0].dim}${predictable_dimensions_list[0].exp}</b>.
    Press your <b>${possibleResponses[0][0]}</b> if <b>${predictable_dimensions_list[0].values[0]}</b>, and your <b>${possibleResponses[1][0]}</b> if <b>${predictable_dimensions_list[0].values[1]}</b>.</p>
    <p class = block-text>In the bottom two quadrants, please judge the number based on <b>${predictable_dimensions_list[1].dim}${predictable_dimensions_list[1].exp}</b>.
    Press your <b>${possibleResponses[0][0]}</b> if <b>${predictable_dimensions_list[1].values[0]}</b>, and your <b>${possibleResponses[1][0]}</b> if <b>${predictable_dimensions_list[1].values[1]}</b>.</p>
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
  on_finish: function () {
    evalAttentionChecks();
  },
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
    trial_duration: 500, // 500
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
        <p class="block-text">Keep your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b></p>
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
