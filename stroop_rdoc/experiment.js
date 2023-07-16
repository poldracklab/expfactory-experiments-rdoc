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
  var checkPercent = 1;
  if (runAttentionChecks) {
    var attentionChecksTrials = jsPsych.data
      .get()
      .filter({ trial_id: 'attention_check' }).trials;
    var checksPassed = 0;
    for (var i = 0; i < attentionChecksTrials.length; i++) {
      if (attentionChecksTrials[i].correct === true) {
        checksPassed += 1;
      }
    }
    checkPercent = checksPassed / attentionChecksTrials.length;
  }
  jsPsych.data.get().addToLast({ att_checkPercent: checkPercent });
  return checkPercent;
}

var getInstructFeedback = function() {
  return (
    '<div class = centerbox><p class = center-block-text>' +
    feedbackInstructText +
    '</p></div>'
  );
};

var getFeedback = function() {
  return (
    '<div class = bigbox><div class = picture_box><p class = block-text>' +
    feedbackText +
    '</font></p></div></div>'
  ); // <font color="white">
};


var getExpStage = function() {
  return expStage;
};


function assessPerformance() {
  var experimentData = jsPsych.data
    .get()
    .filter({ exp_stage: "test", trial_id: "stim" }).trials;
  var missedCount = 0;
  var trialCount = 0;
  var rtArray = [];
  var rt = 0;
  var correct = 0;

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
      if (key == experimentData[i].correct_response) {
        correct += 1;
      }
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
    "</font></p></div></div>"
  ); // <font color="white">
};

var getStim = function() {
  currStim = blockStims.pop();
  return currStim.stimulus;
};

var getStimData = function() {
  return currStim.data;
};

var getKeyAnswer = function() {
  return currStim.key_answer;
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// common variables
const fixationDuration = 500;

const possibleResponses = [['index finger', ',', 'comma key (,)'],
['middle finger', '.', 'period key (.)']]

const choices = [possibleResponses[0][1], possibleResponses[1][1]]

var endText = '<div class = centerbox>' +
  '<p class = center-block-text>Thanks for completing this task!</p>' +
  '<p class = center-block-text>' +
  'If you have been completing tasks continuously for an hour or more,' +
  'please take a 15-minute break before starting again.</p>' +
  '<p class = center-block-text>Press <i>enter</i> to continue.</p>' +
  '</div>'

var feedbackInstructText =
  '<p class=center-block-text>' +
  'Welcome! This experiment will take around 5 minutes.</p>' +
  '<p class=center-block-text>' +
  'To avoid technical issues,' +
  'please keep the experiment tab (on Chrome or Firefox)' +
  ' active and in full-screen mode for the whole duration of each task.</p>' +
  '<p class=center-block-text> Press <i>enter</i> to begin.</p>';

// speed reminder
var speedReminder =
  '<p class = block-text>' +
  'Try to respond as quickly and accurately as possible.</p> ';
// eslint-disable-next-line no-unused-vars
var expStage = 'practice'
// *: Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 2000;

var creditVar = 0;
// eslint-disable-next-line no-unused-vars
var runAttentionChecks = true;
// var attention_check_thresh = 0.45;
var instructTimeThresh = 1; // /in seconds -- this works, just really fast

var accuracyThresh = 0.7;
var rtThresh = 1000;
var missedResponseThresh = 0.1;
var practiceThresh = 3; // 3 blocks max

var currStim = "";
possibleResponses[2] = ["ring finger", "/", "slash key (/)"]

/*
  Changed this to create stimuli by looping arrays
*/

// creating stimuli for stroop task, string replace XXX and YYY
var stimulusText =
  '<div class = centerbox><div class = stroop-stim style = "color:XXX">YYY</div></div>';

// blank arrays to contain congruent and incongruent stimuli
var congruentStim = [];
var incongruentStim = [];

// arrays for colors and words to be used for stimuli
var colors = ["red", "blue", "green"];
var words = ["red", "blue", "green"];

// Generate congruent stimuli
colors.forEach(function(color, index) {
  var stimulus = stimulusText.replace("XXX", color).replace("YYY", color); // so each color and word are equivalent, can just use color for both
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
colors.forEach(function(color, colorIndex) {
  words.forEach(function(word, wordIndex) {
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
var practiceLen = 18;
var numTrialsPerBlock = 72;
var numTestBlocks = 3;

const numTrialsTotal = numTestBlocks * numTrialsPerBlock;

const totalTrialDuration = fixationDuration + stimTrialDuration + meanITI * 1000

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
= ${practiceLen * totalTrialDuration / 1000 / 60} min (1 block)
= ${practiceLen * totalTrialDuration / 1000 / 60 * 3} min max (3 blocks)

# TEST: 

(${numTrialsTotal} trials * ${numTestBlocks} blocks * ${totalTrialDuration} ms per trial) 
= ${numTrialsTotal * totalTrialDuration / 1000 / 60} min
`);


choices[2] = possibleResponses[2][1]

var responseKeys =
  '<ul class="list-text"><li><span class = "large" style = "color:red">WORD</span>: ' +
  possibleResponses[0][0] +
  '</li><li><span class = "large" style = "color:blue">WORD</span>: ' +
  possibleResponses[1][0] +
  '</li><li><span class = "large" style = "color:green">WORD</span>: ' +
  possibleResponses[2][0] +
  " </li></ul>";

var promptText =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;"><span class = "large" style = "color:red">WORD</span>: ' +
  possibleResponses[0][0] +
  "</p>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;"><span class = "large" style = "color:blue">WORD</span>: ' +
  possibleResponses[1][0] +
  "</p>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;"><span class = "large" style = "color:green">WORD</span>: ' +
  possibleResponses[2][0] +
  "</p>" +
  "</div>";

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
// Set up attention check node
// var attentionCheckBlock = {
//   type: "attention-check-rdoc",
//   data: {
//     trial_id: "attention_check",
//   },
//   timing_response: 180000,
//   response_ends_trial: true,
//   timing_post_trial: 200,
// };

// var attentionNode = {
//   timeline: [attentionCheckBlock],
//   conditional_function: function() {
//     return runAttentionChecks;
//   },
// };



/* define static blocks */

var feedbackInstructText =
  "<p class=center-block-text>Welcome! This experiment will take around 8 minutes.</p>" +
  "<p class=center-block-text>To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in full-screen mode for the whole duration of each task.</p>" +
  "<p class=center-block-text> Press <i>enter</i> to begin.</p>";

var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "instruction_feedback",
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
  },
  pages: [
    "<div class = centerbox>" +
    "<p class=block-text>Place your <b>" +
    possibleResponses[0][0] +
    "</b> on the <b>" +
    possibleResponses[0][2] +
    "</b> your <b>" +
    possibleResponses[1][0] +
    "</b> on the <b>" +
    possibleResponses[1][2] +
    "</b> and your <b>" +
    possibleResponses[2][0] +
    "</b> on the <b>" +
    possibleResponses[2][2] +
    "</b> </p>" +
    '<p class = block-text>In this task, you will see a series of "color" words (RED, BLUE, GREEN). The "ink" of the words will also be colored. For example, you may see: ' +
    '<span class = "large" style = "color:blue">RED</span>, <span class = "large" style = "color:blue">BLUE</span>, or <span class = "large" style = "color:red">BLUE</span>.</p>' +
    "<p class = block-text>Your task is to press the following buttons corresponding to the <b>ink color</b> (not the word itself):" +
    responseKeys +
    "</div>",
    "<div class = centerbox><p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. " +
    "These will be taken out for test, so make sure you understand the instructions before moving on.</p>" +
    "<p class = block-text>Remember, press the key corresponding to the <strong>ink</strong> color of the word: </p>" +
    responseKeys +
    speedReminder +
    "</div>",
  ],
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var sumInstructTime = 0; // ms
var instructionsNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
  /* This function defines stopping criteria */
  loop_function: function(data) {
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
        "Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <i>enter</i> to continue.";
      return true;
    } else {
      feedbackInstructText =
        "Done with instructions. Press <i>enter</i> to continue.";
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
    trial_id: "fixation",
    exp_stage: "test",
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration, // 500
  trial_duration: fixationDuration, // 500 
};

var practiceFixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class="centerbox"><div class="fixation">+</div></div>',
  choices: ["NO_KEYS"],
  data: {
    trial_id: "fixation",
    exp_stage: "practice",
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration, // 500
  trial_duration: fixationDuration, // 1000ms total
  prompt: promptText,
};

var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    var last = jsPsych.data.get().last(1).trials[0];
    console.log(last);
    if (last.response == null) {
      return "<div class = fb_box><div class = center-text><font size =20>Respond Faster!</font></div></div>";
    }
    if (last.correctTrial == 1) {
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

// after each block
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

// create trials and repeat nodes
var practiceTrials = [];
for (i = 0; i < practiceLen; i++) {
  var practiceBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: function() {
      return Object.assign({}, getStimData(), {
        trial_id: "stim",
        exp_stage: "practice",
        correct_response: getKeyAnswer(), // changed this to getKeyAnswer() to fetch correct response
      });
    },
    choices: choices,
    response_ends_trial: false,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 2000
    post_trial_gap: 0,
    prompt: promptText,
    on_finish: appendData,
  };
  practiceTrials.push(
    practiceFixationBlock,
    practiceBlock,
    practiceFeedbackBlock,
    ITIBlock
  );
}

// loop based on criteria
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
      if (data.trials[i].trial_id == "stim") {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].correctTrial == 1) {
            correct += 1;
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
        "<p class = block-text>Keep your " +
        possibleResponses[0][0] +
        " on the " +
        possibleResponses[0][2] +
        " your " +
        possibleResponses[1][0] +
        " on the " +
        possibleResponses[1][2] +
        " and your " +
        possibleResponses[2][0] +
        " on the " +
        possibleResponses[0][2] +
        "</p>" +
        "<p class = center-block-text>Press <i>enter</i> to continue.</p></div>";
      blockStims = jsPsych.randomization.repeat(stims, numTrialsPerBlock / 12);
      expStage = 'test'
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";
      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is low.  Remember: </p>" +
          responseKeys;
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
      blockStims = jsPsych.randomization.repeat(stims, practiceLen / 12);
      return true;
    }
  },
};

var testTrials = [];
// testTrials.push(attentionNode)
for (i = 0; i < numTrialsPerBlock; i++) {
  var testBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: function() {
      return Object.assign({}, getStimData(), {
        trial_id: "stim",
        exp_stage: "test",
        correct_response: this.key_answer,
      });
    },
    choices: choices,
    response_ends_trial: false,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    post_trial_gap: 0,
    on_finish: appendData,
  };

  testTrials.push(fixationBlock, testBlock, ITIBlock);
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
      if (
        data.trials[i].trial_id == "stim" &&
        data.trials[i].exp_stage == "test"
      ) {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].correctTrial == 1) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    if (testCount == numTestBlocks) {
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
          responseKeys;
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
      blockStims = jsPsych.randomization.repeat(stims, numTrialsPerBlock / 12);
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
    exp_id: "stroop_rdoc",
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
    exp_id: "stroop_rdoc",
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function() {
    assessPerformance();
    evalAttentionChecks();
  },
};

/* create experiment definition array */
/* eslint-disable camelcase */
stroop_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var stroop_rdoc_init = () => {
  // globals
  blockStims = jsPsych.randomization.repeat(stims, practiceLen / 12);

  stroop_rdoc_experiment.push(fullscreen);
  stroop_rdoc_experiment.push(instructionsNode);
  stroop_rdoc_experiment.push(practiceNode);
  stroop_rdoc_experiment.push(testNode);
  stroop_rdoc_experiment.push(postTaskBlock);
  stroop_rdoc_experiment.push(endBlock);
  stroop_rdoc_experiment.push(exitFullscreen);
};
