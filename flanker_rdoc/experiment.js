/* ************************************ */
/* Define helper functions */
/* ************************************ */

function assessPerformance() {
  var experimentData = jsPsych.data
    .get()
    .filter({ trial_id: "test_trial" }).trials;
  var missedCount = 0;
  var trialCount = 0;
  var rtArray = [];
  var rt = 0;
  var correct = 0;
  // record choices participants made
  var choiceCounts = {};
  choiceCounts[-1] = 0;
  choiceCounts[possibleResponses[0]] = 0;
  choiceCounts[possibleResponses[1]] = 0;
  for (var i = 0; i < experimentData.length; i++) {
    trialCount += 1;
    rt = experimentData[i].rt;
    key = experimentData[i].response;
    choiceCounts[key] += 1;
    if (rt == -1) {
      missedCount += 1;
    } else {
      rtArray.push(rt);
    }

    if (key == experimentData[i].correct_response) {
      correct += 1;
    }
  }

  // calculate average rt
  var avgRT = null;
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
  creditVar =
    missedPercent < 0.25 && avgRT > 200 && responsesOK && accuracy > 0.6;

  jsPsych.data.get().addToLast({
    final_creditVar: creditVar,
    final_missedPercent: missedPercent,
    final_avgRT: avgRT,
    final_responsesOK: responsesOK,
    final_accuracy: accuracy,
  });
}

function appendData() {
  var data = jsPsych.data.get().last(1).values()[0];
  correctTrial = 0;
  if (data.response == data.correct_response) {
    correctTrial = 1;
  }
  jsPsych.data.get().addToLast({ correctTrial: correctTrial });
}

var getInstructFeedback = function() {
  return (
    "<div class = centerbox><p class = center-block-text>" +
    feedbackInstructText +
    "</p></div>"
  );
};

var getFeedback = function() {
  return (
    "<div class = bigbox><div class = picture_box><p class = block-text>" +
    feedbackText +
    "</p></div></div>"
  ); // <font color="white"></font>
};

var getStim = function() {
  currStim = blockStims.pop();
  return currStim.image;
};

var getStimData = function() {
  return currStim.data;
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// eslint-disable-next-line no-unused-vars
var expStage = 'practice'
// *: Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 2000;

var sumInstructTime = 0; // ms
var instructTimeThresh = 0; // /in seconds

var accuracyThresh = 0.75;
var rtThresh = 1000;
var missedResponseThresh = 0.1;
var practiceThresh = 3; // 3 blocks of 12 trials

/* ******************************* */
/* ATTENTION CHECK STUFF  */
/* ******************************* */
// eslint-disable-next-line no-unused-vars
var runAttentionChecks = true;
// var attention_check_thresh = 0.45;

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
      flanker_condition: "incongruent",
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
      flanker_condition: "incongruent",
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
      flanker_condition: "congruent",
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
      flanker_condition: "congruent",
      trial_id: "stim",
      flanker: "F",
      center_letter: "F",
    },
  },
];

var practiceLen = 12; // must be divisible by 4
var numTrialsPerBlock = 72; // must be divisible by 4
var numTestBlocks = 3;

const totalTrialDuration = (fixationDuration + stimTrialDuration + (meanITI * 1000))
const numTrialsTotal = numTestBlocks * numTrialsPerBlock;

console.log(`
TOTAL DURATION OF A TRIAL:
------------------------
- Fixation: ${fixationDuration} ms
- Stimulus: ${stimTrialDuration} ms
- Average ITI duration: ${meanITI * 1000} ms
------------------------
${totalTrialDuration} ms

NUMBER OF PRACTICE TRIALS:
------------------------
${practiceLen} (1 block)
${practiceLen * 3} (3 block)

NUMBER OF TEST TRIALS: 
------------------------
${numTrialsPerBlock} (1 block)
${numTrialsPerBlock * 3} (3 block)


TOTAL DURATIONS:
------------------------

# PRACTICE:

(${practiceLen} trials * ${totalTrialDuration}ms per trial) 
= ${practiceLen * totalTrialDuration / 1000 / 60} min per block
= ${practiceLen * totalTrialDuration / 1000 / 60 * 3} max (3 blocks)

# TEST: 

(${numTrialsTotal} trials * ${numTestBlocks} blocks * ${totalTrialDuration} ms per trial) 
= ${numTrialsTotal * totalTrialDuration / 1000 / 60} min
`);

var promptTextList =
  '<ul style="text-align:left;">' +
  "<li>Indicate the identity of the <i> middle </i> letter.</li>" +
  "<li>H: " +
  possibleResponses[0][0] +
  "</li>" +
  "<li>F: " +
  possibleResponses[1][0] +
  "</li>" +
  "</ul>";

var promptText =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Indicate the identity of the <i> middle </i> letter.</p>' +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">H: ' +
  possibleResponses[0][0] +
  "</p>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">F: ' +
  possibleResponses[1][0] +
  "</p>" +
  "</div>";

// PRE LOAD IMAGES HERE
var pathSource = "/static/experiments/flanker_rdoc/images/";
var images = [];
images.push(pathSource + "F.png");
images.push(pathSource + "H.png");

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
  "<p class=center-block-text>Welcome! This experiment will take around 5 minutes.</p>" +
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
  trial_duration: 180000,
};
// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructionsBlock = {
  type: jsPsychInstructions,
  pages: [
    "<div class = centerbox>" +
    '<p class=block-text>Place your <b>' +
    possibleResponses[0][0] +
    '</b> on the <i>' +
    possibleResponses[0][2] +
    '</i> and your <b>' +
    possibleResponses[1][0] +
    '</b> on the <i>' +
    possibleResponses[1][2] +
    '</i> </p>' +
    "<p class = block-text>On each trial, you will see a string of F's and H's. For instance, you might see 'FFFFF' or 'HHFHH'. </p>" +
    "<p class = block-text>If the middle letter is an <b>H</b>, press your <b>" +
    possibleResponses[0][0] +
    "</b>. <br> If the middle letter is an <b>F</b>, press your <b>" +
    possibleResponses[1][0] +
    "</b>. <br> So, if you see 'FFHFF', you would press your " +
    possibleResponses[0][0] +
    ".</p>" +
    speedReminder +
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



var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";
var feedbackBlock = {
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

var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  is_html: true,
  choices: ["NO_KEYS"],
  data: {
    trial_id: "wait",
  },
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ''
    }
  },
  post_trial_gap: 0,
  trial_duration: function() {
    var ITIms = sampleFromDecayingExponential();
    return ITIms * 1000;
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
    },
    choices: ["NO_KEYS"],
    stimulus_duration: fixationDuration, // 500
    trial_duration: fixationDuration, // 500
    post_trial_gap: 0,
    // on_finish: changeData, // deleted this function. look in old versions if u want it
    prompt: promptText,
  };

  var practiceBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function() {
      return Object.assign({}, getStimData(), {
        trial_id: "practice_trial",
        exp_stage: "practice",
        current_trial: i,
      });
    },
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 2000
    response_ends_trial: false,
    post_trial_gap: 0,
    prompt: promptText,
    on_finish: appendData,
  };

  var practiceFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.response == null) {
        return "<div class = fb_box><div class = center-text><font size =20>Respond Faster!</font></div></div>";
      } else if (last.correctTrial == 1) {
        return "<div class = fb_box><div class = center-text><font size =20>Correct!</font></div></div>";
      } else {
        return "<div class = fb_box><div class = center-text><font size =20>Incorrect</font></div></div>";
      }
    },
    data: {
      exp_stage: "practice",
      trial_id: "practice_feedback",
    },
    choices: ["NO_KEYS"],
    stimulus_duration: 500,
    trial_duration: 500,
    prompt: promptText,
  };
  practiceTrials.push(
    practiceFixationBlock,
    practiceBlock,
    practiceFeedbackBlock,
    ITIBlock
  );
}

var practiceCount = 0;
var practiceNode = {
  timeline: [feedbackBlock].concat(practiceTrials),
  loop_function: function(data) {
    practiceCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "practice_trial") {
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

    feedbackText =
      "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      feedbackText =
        "<div class = centerbox><p class = block-text>We will now start the test portion.</p>" +
        '<p class=block-text>Keep your <b>' +
        possibleResponses[0][0] +
        '</b> on the <i>' +
        possibleResponses[0][2] +
        '</i> and your <b>' +
        possibleResponses[1][0] +
        '</b> on the <i>' +
        possibleResponses[1][2] +
        '</i> </p>' +
        "<p class = block-text>Press <i>enter</i> to begin.</p></div>";

      blockStims = jsPsych.randomization.repeat(
        testStimuli,
        numTrialsPerBlock / 4
      );
      expStage = 'test'
      return false;
    } else {
      // accuracy < accuracyThresh
      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is low.  Remember: </p>" +
          promptTextList;
      }
      if (aveRT > rtThresh) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
      feedbackText +=
        "<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p>";
      blockStims = jsPsych.randomization.repeat(
        testStimuli,
        practiceLen / 4
      );
      return true;
    }
  },
};

var testTrials = [];
// testTrials.push(attention_node)
for (i = 0; i < numTrialsPerBlock; i++) {
  var testFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
    data: {
      trial_id: "test_fixation",
      exp_stage: "test",
    },
    choices: ["NO_KEYS"],
    stimulus_duration: fixationDuration,
    trial_duration: fixationDuration,
    post_trial_gap: 0,
  };

  var testBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function() {
      // wasn't returning before, missed function call before too
      return Object.assign({}, getStimData(), {
        trial_id: "test_trial",
        exp_stage: "test",
        current_trial: i,
        current_block: testCount,
      });
    },
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 2000
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
  };

  testTrials.push(testFixationBlock, testBlock, ITIBlock);
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
      if (data.trials[i].trial_id == "test_trial") {
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

    if (testCount == numTestBlocks) {
      feedbackText =
        "</p><p class = block-text>Done with this test. Press <i>enter</i> to continue.<br> If you have been completing tasks continuously for an hour or more, please take a 15-minute break before starting again.";
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
        feedbackText +=
          "<p class = block-text>Your accuracy is too low.  Remember: <br>" +
          promptTextList;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
      if (aveRT > rtThresh) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      }
      if (
        accuracy >= accuracyThresh &&
        missedResponses <= missedResponseThresh &&
        aveRT <= rtThresh
      ) {
        feedbackText += "<p class = block-text>No feedback on this block.</p>";
      }
      feedbackText +=
        "<p class = block-text>Press <i>enter</i> to continue.</p>";

      blockStims = jsPsych.randomization.repeat(
        testStimuli,
        numTrialsPerBlock / 4
      );

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
    exp_id: expID,
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

var expID = 'flanker_rdoc'

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: expID,
  },
  trial_duration: 180000,
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
flanker_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var flanker_rdoc_init = () => {
  jsPsych.pluginAPI.preloadImages(images);

  // globals
  blockStims = jsPsych.randomization.repeat(testStimuli, practiceLen / 4);

  flanker_rdoc_experiment.push(fullscreen);
  flanker_rdoc_experiment.push(instructionNode);
  flanker_rdoc_experiment.push(practiceNode);
  flanker_rdoc_experiment.push(testNode);
  flanker_rdoc_experiment.push(postTaskBlock);
  flanker_rdoc_experiment.push(endBlock);
  flanker_rdoc_experiment.push(exitFullscreen);
};
