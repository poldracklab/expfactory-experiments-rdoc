// %%%%%%% number of trials %%%%%%%
const number_of_test_trials = 1;
const number_of_practice_trials = 1;
const number_of_total_trials =
  number_of_test_trials + number_of_practice_trials;
const number_of_distractors = 5;
const number_of_targets = 1;

/* %%%%%%%% HELPER FUNCTIONS %%%%%% */
function has_trial_id(array, property) {
  return array.some(function (obj) {
    return obj.hasOwnProperty("trial_id") && obj.trial_id === property;
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function* generateRandomBooleans(length) {
  for (let i = 0; i < length; i++) {
    yield Math.random() < 0.5;
  }
}
function extractValueAfterId(html) {
  const div = document.createElement("div");
  div.innerHTML = html;

  const targetDiv = div.querySelector("#size");
  if (targetDiv) {
    const classes = targetDiv.getAttribute("class");
    const value = classes.split(" ")[0]; // Extract the value after the id
    return value;
  }

  return null;
}

/* ************************************ */
/* TRIAL HELPER FUNCTIONS */
/* ************************************ */

function addID() {
  jsPsych.data.get().addToLast({ exp_id: "visual_search_rdoc" });
}

function evalAttentionChecks() {
  var check_percent = 1;
  if (run_attention_checks) {
    var attention_check_trials = jsPsych.data
      .get()
      .filter({ trial_id: "attention_check" }).trials;
    var checks_passed = 0;
    for (var i = 0; i < attention_check_trials.length; i++) {
      if (attention_check_trials[i].correct === true) {
        checks_passed += 1;
      }
    }
    check_percent = checks_passed / attention_check_trials.length;
  }
  jsPsych.data.get().addToLast({ att_check_percent: check_percent });
  return check_percent;
}

function assessPerformance() {
  var experiment_data = jsPsych.data
    .get()
    .filter({ exp_stage: "test", trial_id: "stim" }).trials;
  var missed_count = 0;
  var trial_count = 0;
  var rt_array = [];
  var rt = 0;
  var correct = 0;
  // var key = null;

  //record choices participants made
  var choice_counts = {};
  choice_counts[null] = 0;

  for (var k = 0; k < choices.length; k++) {
    choice_counts[choices[k]] = 0;
  }

  for (var i = 0; i < experiment_data.length; i++) {
    if (experiment_data[i].possible_responses != "none") {
      trial_count += 1;
      rt = experiment_data[i].rt;
      key = experiment_data[i].response;
      choice_counts[key] += 1;
      if (rt == null) {
        missed_count += 1;
      } else {
        rt_array.push(rt);
      }
      if (key == experiment_data[i].correct_response) {
        correct += 1;
      }
    }
  }
  //calculate average rt
  var avg_rt = -1;
  if (rt_array.length !== 0) {
    avg_rt = math.median(rt_array);
  }
  //calculate whether response distribution is okay
  var responses_ok = true;
  Object.keys(choice_counts).forEach(function (key, index) {
    if (choice_counts[key] > trial_count * 0.85) {
      responses_ok = false;
    }
  });
  var missed_percent = missed_count / trial_count;
  var accuracy = correct / trial_count;
  credit_var = missed_percent < 0.4 && avg_rt > 200 && responses_ok;
  jsPsych.data.get().addToLast({
    final_credit_var: credit_var,
    final_missed_percent: missed_percent,
    final_avg_rt: avg_rt,
    final_responses_ok: responses_ok,
    final_accuracy: accuracy,
  });
}

function appendData() {
  jsPsych.data.get().addToLast({
    correct_trial: data.response == data.correct_response ? 1 : 0,
  });
}

var createAllStims = function () {
  var all_stimuli = [];
  var practice_stimuli;
  var test_stimuli;

  for (var i = 0; i < number_of_total_trials; i++) {
    var stimuli_target_or_control = {
      stimulus: `<div id=${
        i % 2 == 0 ? "target" : "control"
      } class='rectangle'></div>`,
      stimuli_id: `${i % 2 == 0 ? "target" : "control"}`,
      correct_response: `${i % 2 == 0 ? "," : "."} `,
    };

    all_stimuli.push(stimuli_target_or_control);

    for (var j = 0; j < number_of_distractors; j++) {
      all_stimuli.push({
        stimulus: "<div class='rectangle'></div>",
        stimuli_id: "distraction",
      });
    }
  }

  const ret_all_stimuli = all_stimuli;

  practice_stimuli = all_stimuli.slice(
    0,
    number_of_practice_trials * (number_of_targets + number_of_distractors)
  );
  test_stimuli = all_stimuli;

  return {
    practice_stimuli,
    test_stimuli,
    all_stimuli: ret_all_stimuli,
  };
};

var setBlockStims = function () {
  var filtered_targets = all_stimuli.filter(
    (obj) => obj.stimuli_id === "target" || obj.stimuli_id === "control"
  );
  var filtered_distraction = all_stimuli.filter(
    (obj) => obj.stimuli_id === "distraction"
  );

  // Cluster the array into arrays of arrays with length 5
  const clustered_filtered_distraction = [];
  for (let i = 0; i < filtered_distraction.length; i += 5) {
    clustered_filtered_distraction.push(filtered_distraction.slice(i, i + 5));
  }

  filtered_targets = shuffleArray(filtered_targets);
  return {
    block_targets: filtered_targets,
    block_distractions: clustered_filtered_distraction,
  };
};

var getTarget = function (targets) {
  var currentIndex = stimulus_block.target_index;
  stimulus_block.target_index = (currentIndex + 1) % targets.length;

  return targets[currentIndex].stimulus;
};

var getDistraction = function (distractions) {
  var currentIndex = stimulus_block.distraction_index;
  stimulus_block.distraction_index = (currentIndex + 1) % distractions.length;
  return distractions[currentIndex];
};

var getStimData = function () {
  return currStim.data;
};

var getExpStage = function () {
  return exp_stage;
};

var getStageInstruction = function () {
  // in case want other conditions, see visual search
  exp_stage_instruction =
    "<div style='text-align:left; font-family: Arial, sans-serif;'>" +
    "<h2 style='font-size: 1.2em; margin-bottom: 10px;'>Instructions:</h2>" +
    "<ol style='margin-left: 20px;'>" +
    "<li style='margin-bottom: 5px;'>You will see a fixation point displayed on the screen as a reference point to focus your attention.</li>" +
    "<li style='margin-bottom: 5px;'>After the fixation, six squares of different colors will appear on the screen, each square representing a unique color.</li>" +
    "<li style='margin-bottom: 5px;'>Another fixation point will be presented briefly on the screen.</li>" +
    "<li style='margin-bottom: 5px;'>Following the second fixation, the same assortment of colored squares will be displayed again.</li>" +
    "<li style='margin-bottom: 5px;'>Pay close attention to the colors of the squares in both displays.</li>" +
    "<li style='margin-bottom: 5px;'>If, and only if, any one of the squares in the second display is replaced by a color that was not originally in the array, press the ',' (comma) key on your keyboard to indicate a change.</li>" +
    "<li style='margin-bottom: 5px;'>On the other hand, if all the squares in the second display remain the same as the first display, press the '.' (period) key to indicate no change.</li>" +
    "<li style='margin-bottom: 5px;'>Take your time to carefully observe and make your decision before pressing the corresponding key.</li>" +
    "<li style='margin-bottom: 5px;'>The task will continue with different variations, so stay attentive and focused throughout.</li>" +
    "</ol>" +
    "<p style='margin-top: 10px;'>Remember, press the ',' key if there is a change, and the '.' key if there is no change between the two displays.</p></div>";

  return exp_stage_instruction;
};

var getInstructFeedback = function () {
  return (
    "<div class = centerbox><p class = center-block-text>" +
    feedback_instruct_text +
    "</p></div>"
  );
};

var getFeedback = function () {
  return (
    "<div class = centerbox><div class = center-text>" +
    feedback_text +
    "</div></div>"
  );
};

// %%%%%% END HELPER FUNCTIONS

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// generic task variables
const run_attention_checks = false;
const attention_check_thresh = 0.65;
let sumInstructTime = 1;
const instructTimeThresh = 1; ///in seconds

const accuracy_thresh = 0.6;
const rt_thresh = 20000;
const missed_response_thresh = 0.1;
const practice_thresh = 1; // max repetitions
// stimuli arrays
var { practice_stimuli, test_stimuli, all_stimuli } = createAllStims();

// task specific variables
var possible_responses = {
  key: [",", "."],
  key_name: ["index finger", "middle finger"],
  key_description: ["comma key (,)", "period key (.)"],
};
var choices = possible_responses.key;

const numPracticeBlocks = 1;

// %%%%% timings based on papers, by experiment phases %%%%%
const fixation_duration = 100;
const sample_duration = 200;
const blank_duration = 900;
const test_stimuli_duration = 1300;
const test_trial_duration = 2500;

// %%%%% testing timings
// const fixation_duration = 100;
// const sample_duration = 1000;
// const blank_duration = 900;
// const test_duration = 1000;
// const trial_duration = 1000;

// %%%%%%% %%%%%%%
const number_of_trials_per_test_block = 2;
const numTestBlocks = 1;
const numConditions = 1;

var exp_stage = "";
var exp_stage_instruction = "";
var currStim = "";

/*  ######## Important text values for display ######## */
// prompt text saying , for target present and . if target absent
var prompt_text =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Target present: press your' +
  possible_responses.key_name[0] +
  "</p>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Target absent: press your' +
  possible_responses.key_name[1] +
  "</p>" +
  "</div>";
var speed_reminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

/* ************************************ */
/* SETTING UP JSPSYCH BLOCKS */
/* ************************************ */
// Set up attention check node
// var attention_check_block = {
// 	type: 'attention-check-rdoc',
// 	data: {
// 		trial_id: "attention_check"
// 	},
// 	timing_response: 180000,
// 	response_ends_trial: true,
// 	timing_post_trial: 200
// }

// var attention_node = {
// 	timeline: [attention_check_block],
// 	conditional_function: function() {
// 		return run_attention_checks
// 	}
// }

//Set up post task questionnaire
var post_task_block = {
  type: jsPsychSurveyText,
  data: {
    exp_id: "visual_search_rdoc",
    trial_id: "post task questions",
  },
  questions: [
    {
      prompt:
        '<p class = center-block-text style = "font-size: 20px">You have completed this task! Please summarize what you were asked to do in this task.</p>',
      rows: 15,
      columns: 60,
    },
    {
      prompt:
        '<p class = center-block-text style = "font-size: 20px">Do you have any comments about this task?</p>',
      rows: 15,
      columns: 60,
    },
  ],
};

var end_block = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: "visual_search_rdoc",
  },
  trial_duration: 180000,
  stimulus:
    "<div class = centerbox><p class = center-block-text>Thanks for completing this task!</p>" +
    "<p class = center-block-text>	If you have been completing tasks continuously for an hour or more, please take a 15-minute break before starting again.</p>" +
    "<p class = center-block-text>Press <i>enter</i> to continue.</p>" +
    "</div>",
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function () {
    assessPerformance();
    evalAttentionChecks();
  },
};

/* define static blocks */
var feedback_instruct_text =
  "<p class=center-block-text>Welcome! This experiment will take around 10 minutes.</p>" +
  "<p class=center-block-text>To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in full-screen mode for the whole duration of each task.</p>" +
  "<p class=center-block-text> Press <i>enter</i> to begin.</p>";
var feedback_instruct_block = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["Enter"],
  data: {
    trial_id: "instruction_feedback",
  },
  stimulus: getInstructFeedback,
  post_trial_gap: 0,
  trial_duration: 180000,
};

var condition_instruct = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["Enter"],
  data: {
    trial_id: "condition_instruct",
  },
  stimulus: function () {
    return getStageInstruction();
  },
  post_trial_gap: 0,
  trial_duration: 180000,
  on_finish: function (data) {
    feedback_text =
      "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";
  },
};

/// This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
//TODO: Change instructions
var instructions_block = {
  type: jsPsychInstructions,
  pages: [
    "<div class = centerbox>" +
      "<p class=block-text>Place your index finger on the <b>" +
      "," +
      "</b> key, your middle finger on the <b>" +
      "." +
      "</b> key. " +
      "<p class = block-text>In this experiment, on each trial you will see a fixation, then several rectangles of different colors, then a fixation, then several rectangles of different colors.</p>" +
      "<p class = block-text>On some trials, <b>one</b> rectangle in the second set will be a different color than in the first set.</p>" +
      "<p class = block-text>Your task is to press ',' if it changed from the first set or '.' if it did not change.</p>" +
      "<p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>" +
      "</div>",
  ],
  allow_keys: false,
  data: {
    trial_id: "instructions",
  },
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var instruction_node = {
  timeline: [feedback_instruct_block, instructions_block],
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
      feedback_instruct_text =
        "Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <i>enter</i> to continue.";
      return true;
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedback_instruct_text =
        "Done with instructions. Press <i>enter</i> to continue.";
      return false;
    }
  },
};

var feedback_text;

var feedback_block = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "feedback",
  },
  choices: ["Enter"],
  stimulus: getFeedback,
  post_trial_gap: 1000,
  trial_duration: 180000,
  response_ends_trial: true,
};

var practice_feedback_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    var last = jsPsych.data.get().last(1).trials[0];
    var { response } = last;

    if (response == null) {
      return "<div class = fb_box><div class = center-text><font size =20>Repond faster!</font></div></div>";
    }
    var targetHTML = last.targetHTML;

    if (targetHTML.includes("target")) {
      correct_response = ",";
    } else if (targetHTML.includes("control")) {
      correct_response = ".";
    } else {
      // nothing
      console.log("Error: Neither target nor control stimuli");
    }

    if (response == correct_response) {
      return "<div class = fb_box><div class = center-text><font size =20>Correct!</font></div></div>";
    } else if (response !== correct_response) {
      return "<div class = fb_box><div class = center-text><font size =20>Incorrect!</font></div></div>";
    } else {
      console.log("Error: Neither correct nor incorrect response");
    }
  },
  data: {
    exp_stage: "practice",
    trial_id: "practice_feedback",
  },
  choices: ["NO_KEYS"],
  stimulus_duration: 500,
  trial_duration: 500,
  prompt: function () {
    return getExpStage() == "practice" ? prompt_text : "";
  },
};

var fixation_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  data: function () {
    return {
      trial_id: "practice_fixation",
      exp_stage: getExpStage(),
    };
  },
  choices: ["NO_KEYS"],
  post_trial_gap: 0,
  stimulus_duration: fixation_duration,
  trial_duration: fixation_duration,
  prompt: function () {
    return getExpStage() == "practice" ? prompt_text : "";
  },
};

var blank_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "",
  data: function () {
    return {
      trial_id: "blank_block",
      exp_stage: getExpStage(),
    };
  },
  choices: ["NO_KEYS"],
  post_trial_gap: 0,
  stimulus_duration: fixation_duration,
  trial_duration: 900,
  prompt: function () {
    return getExpStage() == "practice" ? prompt_text : "";
  },
};
var stimulus_block = {
  type: jsPsychChangeDetectionHTML,
  target_index: 0,
  distraction_index: 0,
  stimulus_duration: function () {
    var last_two = jsPsych.data.get().last(2).trials;
    var trialId = getExpStage() == "practice" ? "stim" : "blank_block";
    var has_stim_trial = has_trial_id(last_two, trialId);
    return has_stim_trial ? test_stimuli_duration : sample_duration;
  },
  trial_duration: function () {
    var last_two = jsPsych.data.get().last(2).trials;
    var trialId = getExpStage() == "practice" ? "stim" : "blank_block";
    var has_stim_trial = has_trial_id(last_two, trialId);
    return has_stim_trial ? test_trial_duration : sample_duration;
  },
  number_of_targets: number_of_targets,
  number_of_distractors: number_of_distractors,
  sample_test: function () {
    var last_two = jsPsych.data.get().last(2).trials;
    var trialId = getExpStage() == "practice" ? "stim" : "blank_block";
    var has_stim_trial = has_trial_id(last_two, trialId);

    if (has_stim_trial) {
      var { targetHTML, distractorsHTML } = last_two[0];
      var was_target = targetHTML.includes("target");

      return {
        previous_target: targetHTML,
        previous_distractors: distractorsHTML,
        color_will_change: was_target,
      };
    } else {
      return {
        previous_target: null,
        previous_distractors: null,
        color_will_change: null,
      };
    }
  },
  choices: function () {
    var last_two = jsPsych.data.get().last(2).trials;
    var trialId = getExpStage() == "practice" ? "stim" : "blank_block";
    var has_stim_trial = has_trial_id(last_two, trialId);
    return has_stim_trial ? [",", "."] : [];
  },
  response_ends_trial: false,
  target: function () {
    var call_function = jsPsych.data
      .get()
      .filter({ trial_type: "call-function" }).trials[0];
    var { block_targets } = call_function.value;
    return getTarget(block_targets);
  },
  distractors: function () {
    var call_function = jsPsych.data
      .get()
      .filter({ trial_type: "call-function" }).trials[0];
    var { block_distractions } = call_function.value;
    return getDistraction(block_distractions);
  },
  prompt: getExpStage() == "practice" ? prompt_text : "",
  data: function () {
    var last_two = jsPsych.data.get().last(2).trials;
    var trialId = getExpStage() == "practice" ? "stim" : "blank_block";
    var has_stim_trial = has_trial_id(last_two, trialId);

    return {
      trial_id: "stim",
      sample_or_test: has_stim_trial ? "test" : "sample",
      exp_stage: getExpStage(),
    };
  },
  on_finish: function () {
    console.log(getExpStage());
  },
};

var set_stims_block = {
  type: jsPsychCallFunction,
  func: function () {
    return setBlockStims(); //only running first condition
  },
  on_finish: function (data) {
    testCount = 0;
    practiceCount = 0;
    stimulus_block.target = function () {
      return getTarget(stimuli.block_targets);
    };
    stimulus_block.distractors = function () {
      return getDistraction(stimuli.block_distractions);
    };
  },
};

var practiceTrials = [];
for (let i = 0; i < number_of_practice_trials; i++) {
  practiceTrials.push(
    fixation_block,
    stimulus_block,
    blank_block,
    stimulus_block,
    practice_feedback_block
  );
}

var practiceCount;
var practiceNode = {
  timeline: [feedback_block].concat(practiceTrials),
  on_start: function (trial) {
    // Set exp_stage to "practice" before the trial starts
    exp_stage = "practice";
  },
  loop_function: function (data) {
    practiceCount += 1;

    var sum_rt = 0;
    var sum_responses = 0;
    var correct = 0;
    var total_trials = 0;
    var correct_response;

    for (var i = 0; i < data.trials.length; i++) {
      var current_trial = data.trials[i];
      var { trial_id, sample_or_test, exp_stage, targetHTML, rt, response } =
        current_trial;
      if (
        trial_id == "stim" &&
        sample_or_test == "test" &&
        exp_stage == "practice"
      ) {
        total_trials += 1;

        if (targetHTML.includes("target")) {
          correct_response = ",";
        } else if (targetHTML.includes("control")) {
          correct_response = ".";
        }
        if (rt != null) {
          sum_rt += rt;
          sum_responses += 1;
          if (response == correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / total_trials;
    var missed_responses = (total_trials - sum_responses) / total_trials;
    var ave_rt = sum_rt / sum_responses;

    if (accuracy > accuracy_thresh || practiceCount == practice_thresh) {
      feedback_text =
        "<div class = centerbox><p class = center-block-text>We will now start the test portion.</p>" +
        "<p class = block-text>Keep your gaze on the central '+', your index finger on the ',' key and your middle finger on the '.' key." +
        "<p class = center-block-text> Press <i>enter</i> to continue.</p></div>";

      return false;
    } else {
      feedback_text =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";
      if (accuracy < accuracy_thresh) {
        feedback_text += `<p class = block-text>Your accuracy is low.</p>`;
      }
      if (ave_rt > rt_thresh) {
        feedback_text +=
          "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      }
      if (missed_responses > missed_response_thresh) {
        feedback_text +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
      feedback_text +=
        "<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p>";
      return true;
    }
  },
};

var testTrials = [];
for (let i = 0; i < number_of_trials_per_test_block; i++) {
  testTrials.push(fixation_block, stimulus_block, blank_block, stimulus_block);
}

var testNode = {
  timeline: [feedback_block].concat(testTrials),
  on_start: function (trial) {
    // Set exp_stage to "practice" before the trial starts
    exp_stage = "test";
  },
  loop_function: function (data) {
    testCount += 1;
    var sum_rt = 0;
    var sum_responses = 0;
    var correct = 0;
    var total_trials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      var current_trial = data.trials[i];
      var { trial_id, sample_or_test, exp_stage, targetHTML, rt, response } =
        current_trial;
      if (
        trial_id == "stim" &&
        sample_or_test == "test" &&
        exp_stage == "test"
      ) {
        total_trials += 1;

        if (targetHTML.includes("target")) {
          correct_response = ",";
        } else if (targetHTML.includes("control")) {
          correct_response = ".";
        }
        if (rt != null) {
          sum_rt += rt;
          sum_responses += 1;
          if (response == correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / total_trials;
    var missed_responses = (total_trials - sum_responses) / total_trials;
    var ave_rt = sum_rt / sum_responses;

    if (testCount == numTestBlocks) {
      feedback_text =
        "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to end this task.</p></div>";
      //If you have been completing tasks continuously for an hour or more, please take a 15-minute break before starting again.
      return false;
    } else {
      feedback_text =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!<br>" +
        "You have completed: " +
        testCount +
        " out of " +
        numTestBlocks +
        " blocks of trials.</p>";

      if (accuracy < accuracy_thresh) {
        feedback_text += `<p class = block-text>Your accuracy is too low.  Remember: <br> ${prompt_text}</p>`;
      }
      if (missed_responses > missed_response_thresh) {
        feedback_text +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
      if (ave_rt > rt_thresh) {
        feedback_text +=
          "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      }
      if (
        accuracy >= accuracy_thresh &&
        missed_responses <= missed_response_thresh &&
        ave_rt <= rt_thresh
      ) {
        feedback_text += "<p class = block-text>No feedback on this block.</p>";
      }
      feedback_text +=
        "<p class = block-text>Press <i>enter</i> to continue.</p>";
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

//Set up experiment
var change_detection_rdoc_experiment = [];

var change_detection_rdoc_init = () => {
  document.body.style.background = "gray"; //// CHANGE THIS

  change_detection_rdoc_experiment.push(fullscreen);
  change_detection_rdoc_experiment.push(instruction_node);
  // condition 1
  change_detection_rdoc_experiment.push(condition_instruct);
  change_detection_rdoc_experiment.push(set_stims_block);
  change_detection_rdoc_experiment.push(practiceNode);
  change_detection_rdoc_experiment.push(testNode);
  // post-task
  change_detection_rdoc_experiment.push(post_task_block);
  change_detection_rdoc_experiment.push(end_block);
  change_detection_rdoc_experiment.push(exit_fullscreen);
};
