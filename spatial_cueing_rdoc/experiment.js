/* ************************************ */
/* Define helper functions */
/* ************************************ */

function assessPerformance() {
  /* Function to calculate the "creditVar", which is a boolean used to
     credit individual experiments in expfactory. 
  */

  const { trials: experimentData } = jsPsych.data
    .get()
    .filter({ expStage: "test", trialId: "stim" });

  const rtArray = [];
  let missedCount = 0;
  let trialCount = 0;
  let correct = 0;

  // record choices participants made
  const choiceCounts = { [null]: 0 };
  for (const choice of choices) {
    choiceCounts[choice] = 0;
  }

  for (const { rt, response: key, correctTrial } of experimentData) {
    trialCount++;
    if (correctTrial === 1) {
      correct++;
    }
    choiceCounts[key]++;
    if (rt == null) {
      missedCount++;
    } else {
      rtArray.push(rt);
    }
  }

  // calculate average rt
  let avgRt = null;
  if (rtArray.length !== 0) {
    avgRt = math.median(rtArray);
  }

  // calculate missed percent
  const missedPercent = missedCount / trialCount;

  // calculate whether response distribution is okay
  let responsesOk = true;
  for (const key of Object.keys(choiceCounts)) {
    if (choiceCounts[key] > trialCount * 0.85) {
      responsesOk = false;
      break;
    }
  }

  const creditVar = missedPercent < 0.4 && avgRt > 200 && responsesOk;
  jsPsych.data.get().addToLast({
    finalCreditVar: creditVar,
    finalMissedPercent: missedPercent,
    finalAvgRt: avgRt,
    finalResponsesOk: responsesOk,
    finalAccuracy: correct / trialCount,
  });
}

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

function appendData() {
  var data = jsPsych.data.get().last(1).values()[0];
  console.log('data', data)
  if (data.response == data.correctResponse) {
    correctTrial = 1;
  } else {
    correctTrial = 0;
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

var getCue = function() {
  currStim = blockStims.pop();
  currStim.data.trialNum = trialNum;
  return currStim.cue_stimulus;
};

var getStim = function() {
  return currStim.stimulus;
};

var getStimData = function() {
  return currStim.data;
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// eslint-disable-next-line no-unused-vars
var expStage = 'practice'

// Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 1000;

// generic task variables
var runAttentionChecks = false;
// var attentionCheckThresh = 0.65;
var instructTimeThresh = 0; // /in seconds
var accuracyThresh = 0.75;
var rtThresh = 1000;
var missedResponseThresh = 0.1;
var practiceThresh = 3; // 3 blocks max

var numPracticeTrials = 12; // 12
var numTestBlocks = 3;
var numTrialsPerBlock = 48; // should be multiple of 24

const responseKeys = `<p class='block-text'>Press your <b>${possibleResponses[0][0]}</b> if the star ('+') appears in the left box and press your <b>${possibleResponses[1][0]}</b> if the star ('+') appears in the right box.</p>`;
var currStim = "";

var fixation =
  '<div class = centerbox><div class = fixation style="font-size:100px">+</div></div>';

var images = {
  left: {
    box: "<div class = bigbox><div id = left_box></div></div>",
    bold: '<div class = bigbox><div id = left_box style="border-width:15px"></div></div>',
    star: "<div class = bigbox><div id = left_box><div class='center-text star'>*</div></div></div>",
  },
  right: {
    box: "<div class = bigbox><div id = right_box></div></div>",
    bold: '<div class = bigbox><div id = right_box style="border-width:15px"></div></div>',
    star: "<div class = bigbox><div id = right_box><div class='center-text star'>*</div></div></div>",
  },
};

var stimuli = [];
// making 24 stimuli: 4 nocue left, 4 nocue right; 4 doublecue left, 4 doublecue right; 3 valid left, 1 invalid left, 3 valid right, 1 invalid right
for (let i = 0; i < 2; i++) {
  var loc = ["left", "right"][i];
  var noloc = ["left", "right"].filter((value) => value != loc)[0];
  // for this side, add 4 nocue, 4 double cue, 3 valid, 1 invalid
  noCueTrials = Array(4).fill({
    stimulus: images[loc].star + images[noloc].box + fixation,
    cue_stimulus: images[loc].box + images[noloc].box + fixation,
    data: {
      cue_type: "nocue",
      correctResponse: choices[i],
    },
  });
  doubleCueTrials = Array(4).fill({
    stimulus: images[loc].star + images[noloc].box + fixation,
    cue_stimulus: images[loc].bold + images[noloc].bold + fixation,
    data: {
      cue_type: "doublecue",
      correctResponse: choices[i],
    },
  });
  validTrials = Array(3).fill({
    stimulus: images[loc].star + images[noloc].box + fixation,
    cue_stimulus: images[loc].bold + images[noloc].box + fixation,
    data: {
      cue_type: "valid",
      correctResponse: choices[i],
    },
  });
  invalidTrials = [
    {
      stimulus: images[loc].star + images[noloc].box + fixation,
      cue_stimulus: images[loc].box + images[noloc].bold + fixation,
      data: {
        cue_type: "invalid",
        correctResponse: choices[i],
      },
    },
  ];
  stimuli = stimuli.concat(
    noCueTrials,
    doubleCueTrials,
    validTrials,
    invalidTrials
  );
}

var promptText =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Star in left box: ' +
  possibleResponses[0][0] +
  "</li>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Star in right box: ' +
  possibleResponses[1][0] +
  "</li>" +
  "</div>";

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
// Set up attention check node
// var attention_check_block = {
// 	type: 'attention-check',
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

var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["Enter"],
  stimulus: getInstructFeedback,
  data: {
    trial_id: "instruction_feedback",
  },
  post_trial_gap: 0,
  trial_duration: 180000,
};

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructionsBlock = {
  type: jsPsychInstructions,
  pages: [
    "<div class = centerbox>" +
    "<p class=block-text>Place your <b>" +
    possibleResponses[0][0] +
    "</b> on the <b>" +
    possibleResponses[0][2] +
    "</b> and your <b>" +
    possibleResponses[1][0] +
    "</b> on the <b>" +
    possibleResponses[1][2] +
    "</b> </p>" +
    "<p class = block-text>In this task, you should focus your gaze on the '+' sign in the center of the screen throughout. </p>" +
    "<p class = block-text>There will be two boxes on either side of the screen. On each trial, a star will appear in one of them.</p>" +
    "<p class = block-text>While focusing on the central '+', your task is to press your <b>" +
    possibleResponses[0][0] +
    "</b> if the star appears in the <b>left box</b>, and your <b>" +
    possibleResponses[1][0] +
    "</b> if the star appears in the <b>right box</b>.</p>" +
    "<p class = block-text>On some trials, one or both of the boxes will be highlighted before the star appears. No matter which box(es) are highlighted, it is important that you quickly and accurately indicate where the star appears.</p>" +
    "</div>",
    "<div class = centerbox><p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. " +
    "These will be taken out for test, so make sure you understand the instructions before moving on.</p>" +
    speedReminder +
    "</div>",
  ],
  allow_keys: false,
  data: {
    exp_id: "spatial_cueing_rdoc",
    trial_id: "instructions",
  },
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var sumInstructTime = 0; // ms
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
        sumInstructTime = sumInstructTime + rt;
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedbackInstructBlock =
        "Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <i>enter</i> to continue.";
      return true;
    } else {
      feedbackInstructBlock =
        "Done with instructions. Press <i>enter</i> to continue.";
      return false;
    }
  },
};

var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    // var last = jsPsych.data.get().last(1).values()[0];
    var last = jsPsych.data.get().last(2).trials[0];
    // ^ changed since we added a fixation block after response block
    console.log(last);
    if (last.response == null) {
      return (
        "<div class = fb_box><div class = 'center-text'><font size =20>Respond Faster!</font></div></div>" +
        images.left.box +
        images.right.box +
        fixation
      );
    } else if (last.correctTrial == 1) {
      return (
        "<div class = fb_box><div class = 'center-text'><font size =20>Correct!</font></div></div>" +
        images.left.box +
        images.right.box +
        fixation
      );
    } else {
      return (
        "<div class = fb_box><div class = 'center-text'><font size =20>Incorrect</font></div></div>" +
        images.left.box +
        images.right.box +
        fixation
      );
    }
  },
  data: {
    expStage: "practice",
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

// initialize
var fixationDuration2 = Math.floor(Math.random() * 1200) + 400; // CTI
var blankBlockDuration = 1000;

var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: images.left.box + images.right.box + fixation,
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

var blackPracticeBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "",
  choices: ["NO_KEYS"],
  data: {
    trial_id: "fixation",
    expStage: "practice",
  },
  post_trial_gap: 0,
  stimulus_duration: blankBlockDuration,
  trial_duration: blankBlockDuration,
  prompt: promptText,
};

var blackTestBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "",
  choices: ["NO_KEYS"],
  data: {
    trial_id: "fixation",
    expStage: "practice",
  },
  post_trial_gap: 0,
  stimulus_duration: blankBlockDuration,
  trial_duration: blankBlockDuration,
};
var practiceTrials = [];
var trialNum = 0;
for (let i = 0; i < numPracticeTrials; i++) {
  trialNum += 1;
  var firstFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "fixation",
      expStage: "practice",
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration,
    trial_duration: fixationDuration,
    prompt: promptText,
  };
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: function() {
      return {
        trial_id: getStimData().cue_type,
        expStage: "practice",
      };
    },
    post_trial_gap: 0,
    stimulus_duration: 500,
    trial_duration: 500,
    prompt: promptText,
  };
  var secondFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "fixation",
      expStage: "practice",
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration2,
    trial_duration: fixationDuration2,
    prompt: promptText,
    on_finish: function() {
      fixationDuration2 = Math.floor(Math.random() * 1200) + 400;
    },
  };
  var trialBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function() {
      return Object.assign({}, getStimData(), {
        trial_id: "stim",
        expStage: "practice",
      });
    },
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1000
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
    prompt: promptText,
  };
  practiceTrials.push(
    firstFixationBlock,
    cueBlock,
    secondFixationBlock,
    trialBlock,
    blackPracticeBlock,
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
        "<p class = block-text>Keep your gaze on the central '+', your " +
        possibleResponses[0][0] +
        " on the " +
        possibleResponses[0][2] +
        " and your " +
        possibleResponses[1][0] +
        " on the " +
        possibleResponses[1][2] +
        "</p>" +
        "<p class = center-block-text>Press <i>enter</i> to continue.</p></div>";
      expStage = "test";
      blockStims = jsPsych.randomization.repeat(
        stimuli,
        numTrialsPerBlock / stimuli.length
      );
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
      blockStims = jsPsych.randomization
        .repeat(stimuli, 1)
        .slice(0, numPracticeTrials);
      return true;
    }
  },
};

var trialNum = 0;
var testTrials = [];
for (i = 0; i < numTrialsPerBlock; i++) {
  trialNum += 1;
  var firstFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "fixation",
      expStage: "test",
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration,
    trial_duration: fixationDuration,
  };
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: function() {
      return {
        trial_id: getStimData().cue_type,
        expStage: "test",
      };
    },
    post_trial_gap: 0,
    stimulus_duration: 500,
    trial_duration: 500,
    // prompt: promptText,
  };
  var secondFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "fixation",
      expStage: "test",
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration2,
    trial_duration: fixationDuration2,
    // prompt: promptText,
    on_finish: function() {
      fixationDuration2 = Math.floor(Math.random() * 1200) + 400;
    },
  };
  var trialBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function() {
      return Object.assign({}, getStimData(), {
        trial_id: "stim",
        expStage: "test",
      });
    },
    stimulus_duration: stimStimulusDuration,
    trial_duration: stimTrialDuration,
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
  };
  testTrials.push(
    firstFixationBlock,
    cueBlock,
    secondFixationBlock,
    trialBlock,
    blackTestBlock,
    ITIBlock
  );
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
        data.trials[i].expStage == "test"
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
      blockStims = jsPsych.randomization.repeat(
        stimuli,
        numTrialsPerBlock / stimuli.length
      );
      return true;
    }
  },
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

var fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
};
var exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

var expID = "spatial_cueing_rdoc"
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

/* eslint-disable camelcase */
var spatial_cueing_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var spatial_cueing_rdoc_init = () => {
  /* 24 practice trials. Included all no-cue up trials, center cue up trials, double cue down trials, and 6 spatial trials (3 up, 3 down) */
  blockStims = jsPsych.randomization
    .repeat(stimuli, 1)
    .slice(0, numPracticeTrials);

  spatial_cueing_rdoc_experiment.push(fullscreen);
  spatial_cueing_rdoc_experiment.push(instructionNode);
  spatial_cueing_rdoc_experiment.push(practiceNode);
  spatial_cueing_rdoc_experiment.push(testNode);
  spatial_cueing_rdoc_experiment.push(postTaskBlock);
  spatial_cueing_rdoc_experiment.push(endBlock);
  spatial_cueing_rdoc_experiment.push(exitFullscreen);
};
