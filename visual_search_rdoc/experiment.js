//TODO: add random or non random positions in other file based on parameter,
// make it through test trials with each block
/* 

### From the literature ###

The stimuli were generated on an IBM PC system. The
display was presented on a colour monitor on which just
the green phosphor was activated. The area used to display
the stimuli subtended 17.3 × 10.6◦ at a viewing distance of
80 cm in front of the display monitor. The participant’s eye
level was at that of the centre of the display. The luminance
of the uniform green screen was 5.6 cd m−2

See here: https://seis.bristol.ac.uk/~psidg/download/TBF2002.pdf

For the pop-out task the target was a vertical dark bar, the
distractors were horizontal dark bars (Fig. 1a). For the size
task, the target was a vertical dark bar, the distractors were
smaller vertical dark bars (Fig. 1b). For the conjunction task,
the target was a vertical dark bar, the distracters were vertical
light bars and horizontal dark bars (Fig. 1c). The luminance
of the dark bars (in the pop-out, conjunction and size conditions) was 4.3 cd m−2. The luminance of the light bars in the
conjunction condition was 7.3 cd m−2 (giving a Michelson
contrast of 13% for both light and dark stimuli). Each bar
in the pop-out and conjunction task subtended 0.3 × 0.7◦.
For the size task in which the target was a dark vertical
large bar the target subtended 0.3 × 0.7◦ and the distractors were dark vertical bars which had 70% of the height
and width of the target bar—see Figs. 1a–c for examples of
the target present stimuli. Each bar was located in an imaginary grid box but with a random internal perturbation and
no bars touched each other. The target could appear at any
location amid three possible arrays of items (containing 16,
36, or 81 elements). There were 30 trials for each of the six
1852 A. Tales et al. / Neuropsychologia 40 (2002) 1849–1857
conditions, i.e. 16, 36 and 81 items with the target present
and the same for the target absent. The conditions appeared
in a random order of presentation.

Estimated size of rect stimuli: 

28.8 pixels wide and 67.2 pixels tall when viewed from a distance of 80 cm on a display with a pixel density of 96 PPI.

Specifically, we found that
a size ratio of 0.7 (distractor-to-target) in the “size” task
matched the search difficulty of this task and the conjunction task. 

For standard resolution, 1920x1080 stimuli limited to this much of screen:
991.29 pixels in width and 607.38 pixels in height.

*/

const number_of_distractors = 5;
const number_of_targets = 1;
var testCount;
var practiceCount;

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

function combineArrays(...arrays) {
  var combinedArray = [];

  // Combine objects from each array
  for (var i = 0; i < arrays.length; i++) {
    var currentArray = arrays[i];
    for (var j = 0; j < currentArray.length; j++) {
      combinedArray.push(currentArray[j]);
    }
  }

  return combinedArray;
}

/* ************************************ */
/* Define helper functions */
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
  var num_of_target_or_control_trials_per_condition = 1;

  var distractor_trial_size = [];
  var distractor_trial_pop_out = [];
  var distractor_trial_conjunction = [];

  // create outer loop with num_of_target_or_control_trials_per_condition
  for (var i = 0; i < num_of_target_or_control_trials_per_condition; i++) {
    var random_array1 = Array.from(generateRandomBooleans(number_of_targets));
    var random_array2 = Array.from(
      generateRandomBooleans(number_of_distractors)
    );

    // creater inner loop for target trials
    // #### TARGETS ACROSS TRIAL TYPES ####
    for (var j = 0; j < number_of_targets; j++) {
      var target_trial_pop_out = [];
      var control_trial_pop_out = [];

      var target_trial_size = [];
      var control_trial_size = [];

      var target_trial_conjunction = [];
      var control_trial_conjunction = [];

      var stim_target_pop_out = {
        stimulus: `<div id="target" class='rectangle black pop_out'></div>`, // stays same
        trial_id: "pop_out",
        correct_response: ",",
      };

      var stim_target_size = {
        stimulus: `<div id="target" class='rectangle black size'></div>`, // bigger
        trial_id: "size",
        correct_response: ",",
      };

      var stim_target_conjunction = {
        stimulus: `<div id="target" class='rectangle black pop_out'></div>`, // stays same
        trial_id: "conjunction",
        correct_response: ",",
      };

      var control_target_pop_out = {
        stimulus: `<div id="control" class='rectangle black'></div>`,
        trial_id: "control_pop_out",
        correct_response: ".",
      };
      var control_target_size = {
        stimulus: `<div id="control" class='rectangle black'></div>`,
        trial_id: "control_size",
        correct_response: ".",
      };

      var control_target_conjunction = {
        stimulus: random_array1[j]
          ? `<div id="control" class='rectangle black'></div>`
          : `<div id="control" class='rectangle white'></div>`, //pop_out and black or not pop out and white
        trial_id: "control_conjunction",
        correct_response: ".",
      };

      target_trial_pop_out.push(stim_target_pop_out);
      target_trial_size.push(stim_target_size);
      target_trial_conjunction.push(stim_target_conjunction);
      control_trial_pop_out.push(control_target_pop_out);
      control_trial_size.push(control_target_size);
      control_trial_conjunction.push(control_target_conjunction);
    }

    // #### DISTRACTORS ACROSS TRIAL TYPES ####
    var temp1 = [];
    var temp2 = [];
    var temp3 = [];

    for (var j = 0; j < number_of_distractors; j++) {
      var stim_distraction_pop_out = {
        stimulus: `<div class="rectangle black"></div>`,
      };

      var stim_distraction_size = {
        stimulus: `<div class="rectangle black"></div>`,
      };

      var stim_distraction_conjunction = {
        stimulus: `<div class="rectangle ${
          random_array2[j] ? "black" : "white pop_out"
        }"></div>`,
      };

      temp1.push(stim_distraction_pop_out);
      temp2.push(stim_distraction_size);
      temp3.push(stim_distraction_conjunction);
    }
    distractor_trial_pop_out.push(temp1);
    distractor_trial_size.push(temp2);
    distractor_trial_conjunction.push(temp3);
  }

  // combining target and control trials for each condition
  target_trial_pop_out = combineArrays(
    target_trial_pop_out,
    control_trial_pop_out
  );

  target_trial_size = combineArrays(target_trial_size, control_trial_size);
  target_trial_conjunction = combineArrays(
    target_trial_conjunction,
    control_trial_conjunction
  );

  // combining distractor and control trials for each condition
  distractor_trial_pop_out = combineArrays(
    distractor_trial_pop_out,
    distractor_trial_pop_out
  );
  distractor_trial_size = combineArrays(
    distractor_trial_size,
    distractor_trial_size
  );
  distractor_trial_conjunction = combineArrays(
    distractor_trial_conjunction,
    distractor_trial_conjunction
  );

  target_trial_pop_out = shuffleArray(target_trial_pop_out);
  target_trial_size = shuffleArray(target_trial_size);
  target_trial_conjunction = shuffleArray(target_trial_conjunction);
  distractor_trial_pop_out = shuffleArray(distractor_trial_pop_out);
  distractor_trial_size = shuffleArray(distractor_trial_size);
  distractor_trial_conjunction = shuffleArray(distractor_trial_conjunction);

  return {
    target_trial_pop_out,
    target_trial_size,
    target_trial_conjunction,
    distractor_trial_pop_out,
    distractor_trial_size,
    distractor_trial_conjunction,
  };
};

var {
  target_trial_pop_out,
  target_trial_size,
  target_trial_conjunction,
  distractor_trial_pop_out,
  distractor_trial_size,
  distractor_trial_conjunction,
} = createAllStims();

var setBlockStims = function (index) {
  if (index == 0) {
    return {
      block_targets: target_trial_pop_out,
      block_distractions: distractor_trial_pop_out,
    };
  } else if (index == 1) {
    return {
      block_targets: target_trial_size,
      block_distractions: distractor_trial_size,
    };
  } else {
    return {
      block_targets: target_trial_conjunction,
      block_distractions: distractor_trial_conjunction,
    };
  }
};

// var getStim = function () {
//   currStim = block_stims.shift();
//   return currStim.stimulus;
// };

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

var getStageInstruction = function (index) {
  if (index == 0) {
    exp_stage_instruction =
      "<div style='text-align:left;'>" +
      "<h2>Instructions:</h2>" +
      "<ol>" +
      "<li>If you see a tilted black rectangle among the other rectangles, press the ',' key on your keyboard.</li>" +
      "<li>If you do not see a tilted black rectangle and all the rectangles are aligned in the same direction, press the '.' key on your keyboard.</li>" +
      "<li>Pay close attention to the orientation of the rectangles and scan the screen thoroughly before making your decision.</li>" +
      "<li>Respond quickly and accurately. Try to minimize any errors while maintaining a fast pace.</li>" +
      "</ol>" +
      "<p>Remember, your goal is to identify the presence or absence of a tilted black rectangle in each screen. Use the ',' key to indicate its presence and the '.' key to indicate its absence. Good luck!</p></div>";
  } else if (index == 1) {
    exp_stage_instruction =
      "<div style='text-align:left;'>" +
      "<h2>Instructions:</h2>" +
      "<ol>" +
      "<li>If you see a larger black rectangle among the other rectangles, press the ',' key on your keyboard.</li>" +
      "<li>If you do not see a larger black rectangle and all the rectangles are aligned in the same direction, press the '.' key on your keyboard.</li>" +
      "<li>Pay close attention to the orientation of the rectangles and scan the screen thoroughly before making your decision.</li>" +
      "<li>Respond quickly and accurately. Try to minimize any errors while maintaining a fast pace.</li>" +
      "</ol>" +
      "<p>Remember, your goal is to identify the presence or absence of a larger black rectangle in each screen. Use the ',' key to indicate its presence and the '.' key to indicate its absence. Good luck!</p></div>";
  } else if (index == 2) {
    exp_stage_instruction =
      "<div style='text-align:left;'>" +
      "<h2>Instructions:</h2>" +
      "<ol>" +
      "<li>If you see a straight vertical black rectangle among the other rectangles, press the ',' key on your keyboard.</li>" +
      "<li>If you do not see a straight vertical black rectangle and all the rectangles are aligned in the same direction or are white, press the '.' key on your keyboard.</li>" +
      "<li>Pay close attention to the orientation of the rectangles and scan the screen thoroughly before making your decision.</li>" +
      "<li>Respond quickly and accurately. Try to minimize any errors while maintaining a fast pace.</li>" +
      "</ol>" +
      "<p>Remember, your goal is to identify the presence or absence of a straight vertical black rectangle in each screen. Use the ',' key to indicate its presence and the '.' key to indicate its absence. Good luck!</p></div>";
  }
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

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// generic task variables
const run_attention_checks = false;
const attention_check_thresh = 0.65;
let sumInstructTime = 0; //ms
const instructTimeThresh = 0; ///in seconds

const accuracy_thresh = 0.6;
const rt_thresh = 20000;
const missed_response_thresh = 0.1;
const practice_thresh = 3; // max repetitions

// task specific variables
var possible_responses = {
  key: [",", "."],
  key_name: ["index finger", "middle finger"],
  key_description: ["comma key (,)", "period key (.)"],
};
var choices = possible_responses.key;

const target_present_prob = 0.5;

// const numPracticeTrials = 12; // 2 simple, 2 operation
// const numTrialsPerBlock = 48;
// const numTestBlocks = 4;
// testing
const numPracticeTrials = 2; // 2 simple, 2 operation
const numPracticeBlocks = 3;

const stimulus_duration = 1000;
const trial_duration = 1500;

const numTrialsPerBlock = 2;
const numTestBlocks = 2;
const numConditions = 3;

var block_index = 0;

var exp_stage = "practice";
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
/* Set up jsPsych blocks */
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
    return getStageInstruction(block_index);
  },
  post_trial_gap: 0,
  trial_duration: 180000,
  on_finish: function (data) {
    feedback_text =
      "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";
    data.condition_index = block_index;
  },
};

/// This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
//TODO: Change instructions
var instructions_block = {
  type: jsPsychInstructions,
  pages: [
    "<div class = centerbox>" +
      "<p class=block-text>Place your index finger on the <b>" +
      possible_responses.key_name[0] +
      "</b> key, your middle finger on the <b>" +
      possible_responses.key_description[0] +
      "</b> key, and your ring finger on the <b>" +
      possible_responses.key_name[1] +
      "</b> key.</p>" +
      "<p class = block-text>In this experiment, on each trial you will see several black and white rectangles at various angles.</p>" +
      "<p class = block-text>On some trials, <b>one</b> of these rectangles will be angled differently than all others of its color. We will call this rectangle the 'target'.</p>" +
      "<p class = block-text>A target will only be present on some trials -- your task is to determine whether a target is present or absent on each trial. You will only have a few seconds to do so.</p>" +
      "<p class=block-text>If you determine a target is <b>present</b>, press your <b>" +
      possible_responses.key_name[0] +
      "</b>, and if you determine a target is <b>absent</b>, press your <b>" +
      possible_responses.key_name[1] +
      "</b>.</p>" +
      speed_reminder +
      "</div>",
    "<div class = centerbox>" +
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
  stimulus_duration: 500,
  trial_duration: 1000,
  prompt: function () {
    return getExpStage() == "practice" ? prompt_text : "";
  },
};

var stimulus_block = {
  //TODO: check null response if corr/incorrect
  type: jsPsychVisualSearchHTML,
  target_present: true,
  target_index: 0,
  distraction_index: 0,
  stimulus_duration: stimulus_duration,
  trial_duration: trial_duration,
  number_of_targets: number_of_targets,
  number_of_distractors: number_of_distractors,
  target_present: true,
  choices: [",", "."],
  response_ends_trial: false,
  target: function () {
    var trial_index = block_index - 1;
    var call_function = jsPsych.data
      .get()
      .filter({ trial_type: "call-function" }).trials[trial_index];

    var { block_targets } = call_function.value;

    return getTarget(block_targets);
  },
  distractors: function () {
    var trial_index = block_index - 1;
    var call_function = jsPsych.data
      .get()
      .filter({ trial_type: "call-function" }).trials[trial_index];
    var { block_distractions } = call_function.value;
    return getDistraction(block_distractions);
  },
  prompt: function () {
    return getExpStage() == "practice" ? prompt_text : "";
  },
  data: function () {
    return {
      trial_id: "stim",
      exp_stage: getExpStage(),
    };
  },
  on_finish: function (data) {
    // might not need this
    let { response, targetHTML, distractorsHTML } = data;
    const regex = /id="([^"]+)"/;
    const match = targetHTML.match(regex);

    if (match && match.length > 1) {
      const id_of_trial = match[1];
      switch (id_of_trial) {
        case "pop_out":
          var correct_response = ",";
          break;
        case "size":
          var correct_response = ".";
          break;
        case "conjunction":
          var correct_response = "/";
        default:
          break;
      }
      data.id_of_trial = id_of_trial;
      data.correct_response = correct_response;
    } else {
      console.log("No id value found.");
    }
  },
};

// var set_stims_block = {
//   type: jsPsychCallFunction,
//   func: setBlockStims,
// };

// var create_stims_block = {
//   type: jsPsychCallFunction,
//   func: createAllStims,
//   on_finish: function (data) {
//     console.log(data);
//     // var stimuli = data.all_trials;
//     // stimulus_block.target = function () {
//     //   return getTarget(stimuli.block_targets);
//     // };
//     // stimulus_block.distractors = function () {
//     //   return getDistraction(stimuli.block_distractions);
//     // };
//   },
// };

var set_stims_block = {
  type: jsPsychCallFunction,
  func: function () {
    var condition_instruct = jsPsych.data
      .get()
      .filter({ trial_id: "condition_instruct" });
    var { condition_index } = condition_instruct.trials[block_index];

    return setBlockStims(condition_index); //only running first condition
  },
  on_finish: function (data) {
    testCount = 0;
    practiceCount = 0;
    var stimuli = data.all_trials;
    stimulus_block.target = function () {
      return getTarget(stimuli.block_targets);
    };
    stimulus_block.distractors = function () {
      return getDistraction(stimuli.block_distractions);
    };
    block_index += 1;
  },
};

var practiceTrials = [];
for (let i = 0; i < numPracticeTrials; i++) {
  practiceTrials.push(fixation_block, stimulus_block, practice_feedback_block);
}

var practiceCount;
var practiceNode = {
  timeline: [feedback_block].concat(practiceTrials),
  loop_function: function (data) {
    practiceCount += 1;

    var sum_rt = 0;
    var sum_responses = 0;
    var correct = 0;
    var total_trials = 0;
    var correct_response;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "stim") {
        var current_trial = data.trials[i];
        try {
          total_trials += 1;
          var targetHTML = current_trial.targetHTML;

          if (targetHTML.includes("target")) {
            correct_response = ",";
          } else if (targetHTML.includes("control")) {
            correct_response = ".";
          } else {
            // nothing
            console.log("Error: Neither target nor control stimuli");
          }
          if (current_trial.rt != null) {
            sum_rt += current_trial.rt;
            sum_responses += 1;
            if (current_trial.response == correct_response) {
              correct += 1;
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    var accuracy = correct / total_trials;
    var missed_responses = (total_trials - sum_responses) / total_trials;
    var ave_rt = sum_rt / sum_responses;

    if (accuracy > accuracy_thresh) {
      feedback_text =
        "<div class = centerbox><p class = center-block-text>We will now start the test portion.</p>" +
        "<p class = block-text>Keep your gaze on the central '+', your index finger on the ',' key and your middle finger on the '.' key." +
        "<p class = center-block-text> Press <i>enter</i> to continue.</p></div>";
      exp_stage = "test";
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
for (let i = 0; i < numTrialsPerBlock; i++) {
  testTrials.push(fixation_block, stimulus_block);
}

var testNode = {
  timeline: [feedback_block].concat(testTrials),
  loop_function: function (data) {
    testCount += 1;
    var sum_rt = 0;
    var sum_responses = 0;
    var correct = 0;
    var total_trials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "test_trial") {
        total_trials += 1;
        var targetHTML = data.trials[i].targetHTML;
        if (data.trials[i].rt != null) {
          sum_rt += data.trials[i].rt;
          sum_responses += 1;

          if (targetHTML.includes("target")) {
            correct_response = ",";
          } else if (targetHTML.includes("control")) {
            correct_response = ".";
          } else {
            // nothing
            console.log("Error: Neither target nor control stimuli");
          }

          if (data.trials[i].response == correct_response) {
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
        "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice for the next task.</p></div>";
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
visual_search_rdoc_experiment = [];
var visual_search_rdoc_init = () => {
  document.body.style.background = "gray"; //// CHANGE THIS

  visual_search_rdoc_experiment.push(fullscreen);
  visual_search_rdoc_experiment.push(instruction_node);

  // condition 1
  visual_search_rdoc_experiment.push(condition_instruct);
  visual_search_rdoc_experiment.push(set_stims_block);
  visual_search_rdoc_experiment.push(practiceNode);
  visual_search_rdoc_experiment.push(testNode);

  // condition 2
  visual_search_rdoc_experiment.push(condition_instruct);
  visual_search_rdoc_experiment.push(set_stims_block);
  visual_search_rdoc_experiment.push(practiceNode);
  visual_search_rdoc_experiment.push(testNode);

  // // condition 3
  visual_search_rdoc_experiment.push(condition_instruct);
  visual_search_rdoc_experiment.push(set_stims_block);
  visual_search_rdoc_experiment.push(practiceNode);
  visual_search_rdoc_experiment.push(testNode);

  // post-task
  visual_search_rdoc_experiment.push(post_task_block);
  visual_search_rdoc_experiment.push(end_block);
  visual_search_rdoc_experiment.push(exit_fullscreen);
};
