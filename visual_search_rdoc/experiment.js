/* ************************************ */
/* Define helper functions */
/* ************************************ */

function evalAttentionChecks() {
  var checkPercent = 1;
  if (runAttentionChecks) {
    var attentionCheckTrials = jsPsych.data
      .get()
      .filter({ trialId: "attention_check" }).trials;
    var checksPassed = 0;
    for (var i = 0; i < attentionCheckTrials.length; i++) {
      if (attentionCheckTrials[i].correct === true) {
        checksPassed += 1;
      }
    }
    checkPercent = checksPassed / attentionCheckTrials.length;
  }
  jsPsych.data.get().addToLast({ attCheckPercent: checkPercent });
  return checkPercent;
}

function assessPerformance() {
  var experimentData = jsPsych.data
    .get()
    .filter({ expStage: "test", trial_id: "stim" }).trials;
  var missedCount = 0;
  var trialCount = 0;
  var rtArray = [];
  var rt = 0;
  var correct = 0;
  // var key = null;

  // record choices participants made
  var choiceCounts = {};
  choiceCounts[null] = 0;

  for (var k = 0; k < choices.length; k++) {
    choiceCounts[choices[k]] = 0;
  }

  for (var i = 0; i < experimentData.length; i++) {
    if (experimentData[i].possibleResponses != "none") {
      trialCount += 1;
      rt = experimentData[i].rt;
      key = experimentData[i].response;
      choiceCounts[key] += 1;
      if (rt == null) {
        missedCount += 1;
      } else {
        rtArray.push(rt);
      }
      if (key == experimentData[i].correctResponse) {
        correct += 1;
      }
    }
  }
  // calculate average rt
  var avgRT = -1;
  if (rtArray.length !== 0) {
    avgRT = math.median(rtArray);
  }
  // calculate whether response distribution is okay
  var responsesOK = true;
  Object.keys(choiceCounts).forEach(function(key, index) {
    if (choiceCounts[key] > trialCount * 0.85) {
      responsesOK = false;
    }
  });
  var missedPercent = missedCount / trialCount;
  var accuracy = correct / trialCount;
  creditVar = missedPercent < 0.4 && avgRT > 200 && responsesOK;
  jsPsych.data.get().addToLast({
    final_creditVar: creditVar,
    final_missedPercent: missedPercent,
    final_avgRT: avgRT,
    final_responsesOK: responsesOK,
    final_accuracy: accuracy,
  });
}


function appendData() {
  jsPsych.data.get().addToLast({
    correct_trial: 'fix this',
  });
}

var n;
var trialTargetPresent;
function getStim() {
  const containerWidth = window.innerWidth * 0.9; // Adjusted width (90% of window width)
  const containerHeight = window.innerHeight * 0.9; // Adjusted height (90% of window height)
  const boxWidth = 40;
  const boxHeight = 80; // Adjust the height as desired
  const boxSpacing = boxHeight; // Use the height for spacing

  const positions = [];
  const targetIndex = Math.floor(Math.random() * n); // Randomly select an index for the target div
  let targetPresent = false; // Initialize targetPresent as false
  let html = '<div class="container" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: ' + containerWidth + 'px; height: ' + containerHeight + 'px;">';

  for (let i = 0; i < n; i++) {
    let left; let top;
    let overlaps = true;

    while (overlaps) {
      left = Math.floor(Math.random() * (containerWidth - boxWidth));
      top = Math.floor(Math.random() * (containerHeight - boxHeight));

      overlaps = positions.some(function(position) {
        return (
          Math.abs(left - position.left) < boxSpacing &&
          Math.abs(top - position.top) < boxSpacing
        );
      });
    }

    positions.push({ left, top });

    if (i === targetIndex && Math.random() < 0.5) {
      if (getCurrBlockType() === 'feature') {
        html += '<div id="target" class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + boxWidth + 'px; height: ' + boxHeight + 'px; background-color: white;"></div>';
        targetPresent = true; // Set targetPresent to true if the condition is met
      } else if (getCurrBlockType() === 'conjunction') {
        if (Math.random() < 0.5) {
          // Switch width and height for a white rectangle
          html += '<div id="target" class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + boxHeight + 'px; height: ' + boxWidth + 'px; background-color: white;"></div>';
          targetPresent = true; // Set targetPresent to true if the condition is met
        } else {
          // Black rectangles with same width and height
          html += '<div class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + boxWidth + 'px; height: ' + boxHeight + 'px; background-color: black;"></div>';
        }
      }
    } else {
      if (getCurrBlockType() === 'feature') {
        html += '<div class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + boxWidth + 'px; height: ' + boxHeight + 'px; background-color: black;"></div>';
      } else if (getCurrBlockType() === 'conjunction') {
        if (Math.random() < 0.5) {
          // White rectangles with switched width and height
          html += '<div class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + boxHeight + 'px; height: ' + boxWidth + 'px; background-color: white;"></div>';
        } else {
          // Black rectangles with same width and height
          html += '<div class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + boxWidth + 'px; height: ' + boxHeight + 'px; background-color: black;"></div>';
        }
      }
    }
  }

  trialTargetPresent = targetPresent;
  html += '</div>';

  return html;
}




var getExpStage = function() {
  return expStage;
};


var blockType = 'feature' // starting with feature
var getCurrBlockType = function() {
  return blockType;
};

var getInstructFeedback = function() {
  return (
    "<div class = centerbox><p class = center-block-text>" +
    feedbackInstructText +
    "</p></div>"
  );
};

var getFeedback = function() {
  return (
    "<div class = centerbox><div class = center-text>" +
    feedbackText +
    "</div></div>"
  );
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// generic task variables
// const runAttentionChecks = false;
// const attention_check_thresh = 0.65;
const instructTimeThresh = 0; // /in seconds
let sumInstructTime = 0; // ms
const accuracyThresh = 0.6;
const rtThresh = 1000;
const missedResponseThresh = 0.1;
// practice
// const numPracticeTrials = 8;
// const numTrialsPerBlock = 72;
// const numTestBlocks = 3;

const numPracticeTrials = 1;
const numTrialsPerBlock = 1;
const numTestBlocks = 2;

const stimStimulusDuration = 1000;
const stimTrialDuration = 1000;


var practiceCount = 0;
var practiceThresh = 3;
var expStage = "practice"


/*  ######## Important text values for display ######## */
// prompt text saying , for target present and . if target absent
var promptText =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Target present: press your ' +
  possibleResponses[0][0] +
  "</p>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Target absent: press your ' +
  possibleResponses[1][0] +
  "</p>" +
  "</div>";
var speedReminder =
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
// 		return runAttentionChecks
// 	}
// }


/* define static blocks */
var feedbackInstructText =
  "<p class=center-block-text>Welcome! This experiment will take around 10 minutes.</p>" +
  "<p class=center-block-text>To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in full-screen mode for the whole duration of each task.</p>" +
  "<p class=center-block-text> Press <i>enter</i> to begin.</p>";

var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["Enter"],
  data: {
    trial_id: "instruction_feedback",
  },
  stimulus: getInstructFeedback,
  post_trial_gap: 0,
  trialDuration: 180000,
};


var stimulusBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: getStim,
  choices: choices,
  stimulus_duration: stimStimulusDuration, // 1000,
  trial_duration: stimTrialDuration, // 2000
  response_ends_trial: true,
  post_trial_gap: 0,
  on_finish: appendData,
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ""
    }
  },
  data: {
    trial_id: "stim",
    expStage: getExpStage(),
    blockType: getCurrBlockType()
  },
  on_finish: function(data) {
    data['targetPresent'] = trialTargetPresent ? 1 : 0
    data['numElements'] = n;
    if (trialTargetPresent) {
      if (data.response == possibleResponses[0][1]) {
        data['correctResponse'] = 1
      } else if (data.response == possibleResponses[1][1]) {
        data['correctResponse'] = 0
      }
    } else {
      if (data.response == possibleResponses[0][1]) {
        data['correctResponse'] = 0
      } else if (data.response == possibleResponses[1][1]) {
        data['correctResponse'] = 1
      }
    }
  }
};

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
// TODO: Change instructions
var instructionsBlock = {
  type: jsPsychInstructions,
  pages: [
    "<div class = centerbox>" +
    `<p class=block-text>Place your ${possibleResponses[0][0]} on the <b>` +
    possibleResponses[0][2] +
    `</b> and your ${possibleResponses[1][0]} on the <b>` +
    possibleResponses[1][2] +
    "</b>.</p>" +
    "<p class = block-text>In this experiment, on each trial you will see several black and white rectangles at various angles.</p>" +
    "<p class = block-text>On some trials, <b>one</b> of these rectangles will be angled differently than all others of its color. We will call this rectangle the 'target'.</p>" +
    "<p class = block-text>A target will only be present on some trials -- your task is to determine whether a target is present or absent on each trial. You will only have a few seconds to do so.</p>" +
    "<p class=block-text>If you determine a target is <b>present</b>, press your <b>" +
    possibleResponses[0][0] +
    "</b>, and if you determine a target is <b>absent</b>, press your <b>" +
    possibleResponses[1][0] +
    "</b>.</p>" +
    speedReminder +
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

var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
  /* This function defines stopping criteria */
  loop_function: function(data) {
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
        "Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <i>enter</i> to continue.";
      return true;
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedbackInstructText =
        "Done with instructions. Press <i>enter</i> to continue.";
      return false;
    }
  },
};

var feedbackText;
var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "feedback",
  },
  choices: ["Enter"],
  stimulus: getFeedback,
  post_trial_gap: 1000,
  trialDuration: 180000,
  response_ends_trial: true,
};

function generateRandomValue(minNum, maxNum) {
  return Math.floor(Math.random() * maxNum) + minNum;
}


var fixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class="centerbox"><div class="fixation">+</div></div>',
  choices: ["NO_KEYS"],
  data: {
    trial_id: "fixation",
    exp_stage: getExpStage(),
  },
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ''
    }
  },
  on_finish: function() {
    n = generateRandomValue(2, 20)
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration, // 500
  trial_duration: fixationDuration, // 500 
};

var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  is_html: true,
  choices: ["NO_KEYS"],
  data: {
    trial_id: "wait",
  },
  post_trial_gap: 0,
  trial_duration: function() {
    var ITIms = sampleFromDecayingExponential(
    );
    return ITIms * 1000;
  },
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ''
    }
  }
};
var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    // var last = jsPsych.data.get().last(1).values()[0];
    var last = jsPsych.data.get().last(1).trials[0];
    // ^ changed since we added a fixation block after response block
    console.log(last);
    if (last.correctResponse == 1) {
      return '<div class = centerbox><p class = center-block-text>Correct!</div></div>'
    } else if (last.correctResponse == 0) {
      return '<div class = centerbox><p class = center-block-text>Incorrect!</div></div>'
    } else {
      return '<div class = centerbox><p class = center-block-text>Respond Faster!</div></div>'
    }
  },
  data: {
    expStage: "practice",
    trial_id: "practice_feedback",
  },
  choices: ["NO_KEYS"],
  stimulus_duration: 500, // 500 
  trial_duration: 500, // 500
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ""
    }
  },
};

var practiceTrials = [];
for (let i = 0; i < numPracticeTrials; i++) {
  practiceTrials.push(
    fixationBlock,
    stimulusBlock,
    practiceFeedbackBlock,
    ITIBlock
  );
}

var practiceNode = {
  timeline: [feedbackBlock].concat(practiceTrials),
  loop_function: function(data) {
    practiceCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].expStage == 'practice' && data.trials[i].blockType == getCurrBlockType()) {
        if (data.trials[i].trial_id == "stim") {
          totalTrials += 1;
          if (data.trials[i] != null) {
            sumRT += data.trials[i].rt;
            sumResponses += 1;
            if (data.trials[i].correctResponse == 1) {
              correct += 1
            }
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      feedbackText =
        "<div class = centerbox><p class = center-block-text>We will now start the test portion.</p>" +
        `<p class = block-text>Keep your gaze on the central '+', your ${possibleResponses[0][0]} on the ${possibleResponses[0][2]} and your ${possibleResponses[1][0]} on the ${possibleResponses[1][2]}.` +
        "<p class = center-block-text> Press <i>enter</i> to continue.</p></div>";
      expStage = "test";
      practiceCount = 0;
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";
      if (accuracy < accuracyThresh) {
        feedbackText += `<p class = block-text>Your accuracy is low.</p>`;
      }
      if (avgRT > rtThresh) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
      feedbackText +=
        "<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p>";
      return true;
    }
  },
};

var testTrials = [];
for (let i = 0; i < numTrialsPerBlock; i++) {
  testTrials.push(fixationBlock, stimulusBlock, ITIBlock);
}
var testCount = 0;
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function(data) {
    testCount += 1;
    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].expStage == 'test' && data.trials[i].blockType == getCurrBlockType()) {
        if (data.trials[i].trial_id == "stim") {
          totalTrials += 1;
          if (data.trials[i] != null) {
            sumRT += data.trials[i].rt;
            sumResponses += 1;
            if (data.trials[i].correctResponse == 1) {
              correct += 1
            }
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    if (testCount == numTestBlocks) {
      if (getCurrBlockType() == 'feature') {
        testCount = 0;
        blockType = 'conjunction'
        feedbackText =
          "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice for the next task.</p></div>"
      } else if (getCurrBlockType() == 'conjunction') {
        feedbackText =
          "<div class = centerbox><p class = center-block-text>Done this task.</p>" +
          '</div>';
      }
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!<br>" +
        "You have completed: " +
        testCount +
        " out of " +
        numTestBlocks +
        " blocks of trials.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText += `<p class = block-text>Your accuracy is too low.  Remember: <br> ${promptText}</p>`;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
      if (avgRT > rtThresh) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      }
      if (
        accuracy >= accuracyThresh &&
        missedResponses <= missedResponseThresh &&
        avgRT <= rtThresh
      ) {
        feedbackText += "<p class = block-text>No feedback on this block.</p>";
      }
      feedbackText +=
        "<p class = block-text>Press <i>enter</i> to continue.</p>";
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
var postTaskBlock = {
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

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: "visual_search_rdoc",
  },
  trialDuration: 180000,
  stimulus:
    "<div class = centerbox><p class = center-block-text>Thanks for completing this task!</p>" +
    "<p class = center-block-text>	If you have been completing tasks continuously for an hour or more, please take a 15-minute break before starting again.</p>" +
    "<p class = center-block-text>Press <i>enter</i> to continue.</p>" +
    "</div>",
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function() {
    assessPerformance();
    evalAttentionChecks();
  },
};

// Set up experiment
/* eslint-disable camelcase */
var visual_search_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var visual_search_rdoc_init = () => {
  visual_search_rdoc_experiment.push(fullscreen);
  visual_search_rdoc_experiment.push(instructionNode);
  // feature
  visual_search_rdoc_experiment.push(practiceNode);
  visual_search_rdoc_experiment.push(testNode);
  // conjunction
  visual_search_rdoc_experiment.push(practiceNode);
  visual_search_rdoc_experiment.push(testNode);
  // post-task
  visual_search_rdoc_experiment.push(postTaskBlock);
  visual_search_rdoc_experiment.push(endBlock);
  visual_search_rdoc_experiment.push(exitFullscreen);
};
