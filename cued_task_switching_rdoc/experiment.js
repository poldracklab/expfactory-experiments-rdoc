/* ************************************ */
/* Define helper functions */
/* ************************************ */
function assessPerformance() {
  /* Function to calculate the "creditVar", which is a boolean used to
  credit individual experiments in expfactory. */

  var experimentData = jsPsych.data.get().filter({ exp_stage: 'test', trial_id: 'test_trial' }).values();
  var missedCount = 0;
  var trialCount = 0;
  var rtArray = [];
  var rt = 0;
  var correct = 0;
  // record choices participants made
  var choiceCounts = {};
  choiceCounts[null] = 0;
  choiceCounts[possibleResponses[0][1]] = 0;
  choiceCounts[possibleResponses[1][1]] = 0;

  for (var i = 0; i < experimentData.length; i++) {
    if (experimentData[i].trial_id === 'test_trial') {
      trialCount += 1;
      rt = experimentData[i].rt;
      key = experimentData[i].response;
      choiceCounts[key] += 1;
      if (rt === null) {
        missedCount += 1;
      } else {
        rtArray.push(rt);
      }

      if (key === experimentData[i].correct_response) {
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
  Object.values(choiceCounts).forEach(function(value) {
    if (value > trialCount * 0.85) {
      responsesOK = false;
    }
  });
  var missedPercent = missedCount / trialCount;
  var accuracy = correct / trialCount;
  creditVar = missedPercent < 0.25 && avgRT > 200 && responsesOK && accuracy > 0.6;

  jsPsych.data.get().addToLast({
    final_creditVar: creditVar,
    final_missedPercent: missedPercent,
    final_avgRT: avgRT,
    final_responsesOK: responsesOK,
    final_accuracy: accuracy,
  });
}

/* Append gap and current trial to data and then recalculate for next trial*/
var appendData = function() {
  var currTrial = jsPsych.getProgress().current_trial_global;
  console.log(currTrial)
  // eslint-disable-next-line camelcase
  var trialID = jsPsych.data.get().filter({ trial_index: currTrial })
    .trials[0].trial_id;
  var trialNum = currentTrial - 1; // currentTrial has already been updated with setStims, so subtract one to record data
  var taskSwitch = taskSwitches[trialNum];

  jsPsych.data.get().addToLast({
    cue: currCue,
    trial_id: trialID,
    stim_number: currStim.number,
    task: currTask,
    task_condition: taskSwitch.task_switch,
    cue_condition: taskSwitch.cue_switch,
    current_trial: trialNum,
    correct_response: correctResponse,
    CTI: CTI,
  });

  if (trialID == 'practice_trial' || trialID == 'test_trial') {
    correctTrial = 0;
    if (jsPsych.data.get().last().trials[0].response == correctResponse) {
      correctTrial = 1;
    }
    jsPsych.data.get().addToLast({
      correct_trial: correctTrial,
    });
  }
};
var getCue = function() {
  var cueHTML =
    '<div class = upperbox><div class = "center-text" style="color:white;" >' +
    currCue +
    '</div></div>' +
    '<div class = lowerbox><div class = fixation>+</div></div>';
  return cueHTML;
};

var getStim = function() {
  var stimHTML =
    '<div class = upperbox><div class = "center-text" style="color:white;" >' +
    currCue +
    '</div></div>' +
    '<div class = lowerbox><div class = gng_number><div class = cue-text>' +
    preFileType +
    currStim.number +
    fileTypePNG +
    '</div></div></div>';
  return stimHTML;
};

var randomDraw = function(lst) {
  var index = Math.floor(Math.random() * lst.length);
  return lst[index];
};

// Task Specific Functions
var getKeys = function(obj) {
  var keys = [];
  // TODO: fix
  // eslint-disable-next-line guard-for-in
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
};

var genStims = function(n) {
  stims = [];
  for (var i = 0; i < n; i++) {
    var number = randomDraw('12346789');
    var color = 'black'; // randomDraw(['white'])
    var stim = {
      number: parseInt(number),
      color: color,
    };
    stims.push(stim);
  }
  return stims;
};

/* Index into taskSwitches using the global var currentTrial. Using the task_switch and cue_switch
change the task. If "stay", keep the same task but change the cue based on "cue switch".
If "switch new", switch to the task that wasn't the current or last task, choosing a random cue.
If "switch old", switch to the last task and randomly choose a cue.
*/
var setStims = function() {
  var tmp;
  switch (taskSwitches[currentTrial].task_switch) {
    case 'na':
      tmp = currTask;
      currTask = randomDraw(getKeys(tasks));
      cueI = randomDraw([0, 1]);
      break;
    case 'stay':
      if (currTask == 'na') {
        tmp = currTask;
        currTask = randomDraw(getKeys(tasks));
      }
      if (taskSwitches[currentTrial].cue_switch == 'switch') {
        cueI = 1 - cueI;
      }
      break;
    case 'switch':
      taskSwitches[currentTrial].cue_switch = 'switch';
      cueI = randomDraw([0, 1]);
      if (lastTask == 'na') {
        tmp = currTask;
        currTask = randomDraw(
          getKeys(tasks).filter(function(x) {
            return x != currTask;
          }),
        );
        lastTask = tmp;
      } else {
        tmp = currTask;
        currTask = getKeys(tasks).filter(function(x) {
          return x != currTask;
        })[0];
        lastTask = tmp;
      }
      break;
    case 'switch_old':
      taskSwitches[currentTrial].cue_switch = 'switch';
      cueI = randomDraw([0, 1]);
      if (lastTask == 'na') {
        tmp = currTask;
        currTask = randomDraw(
          getKeys(tasks).filter(function(x) {
            return x != currTask;
          }),
        );
        lastTask = tmp;
      } else {
        tmp = currTask;
        currTask = lastTask;
        lastTask = tmp;
      }
      break;
  }
  currCue = tasks[currTask].cues[cueI];
  currStim = stims[currentTrial];
  currentTrial = currentTrial + 1;
  CTI = setCTI();
  correctResponse = getResponse();
  correct = false;
};

// Returns the key corresponding to the correct response for the current
// task and stim
var getResponse = function() {
  switch (currTask) {
    case 'magnitude':
      if (currStim.number > 5) {
        return possibleResponses[0][1];
      } else {
        return possibleResponses[1][1];
      }
    case 'parity':
      if (currStim.number % 2 === 0) {
        return possibleResponses[0][1];
      } else {
        return possibleResponses[1][1];
      }
  }
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// *: Timing
// stimuli
const stimStimulusDuration = 1000;
const stimTrialDuration = 2000;

/* ******************************* */
/* ATTENTION CHECK STUFF  */
/* ******************************* */
// eslint-disable-next-line no-unused-vars
var runAttentionChecks = true;
// var attentionCheckThresh = 0.45;

/* ******************************* */
/* THRESHOLD STUFF  */
/* ******************************* */

var sumInstructTime = 0; // ms
var instructTimeThresh = 0; // /in seconds
var creditVar = 0;

/* ******************************* */
/* TASK TEXT */
/* ******************************* */
// eslint-disable-next-line no-unused-vars
var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";

var promptTextList =
  '<ul style=\'text-align:left\'>' +
  '<li>Cue "Parity" or "Even-Odd": ' +
  possibleResponses[0][0] +
  ' if even and ' +
  possibleResponses[1][0] +
  ' if odd.</li>' +
  '<li>Cue "Magnitude" or "High-Low": ' +
  possibleResponses[0][0] +
  ' if >5 and ' +
  possibleResponses[1][0] +
  ' if <5.</li>' +
  '</ul>';

var promptText = '<div class="prompt_box">' +
  '<p class="center-block-text" style="font-size:16px; line-height:80%;">"Parity" or "Even-Odd": ' +
  possibleResponses[0][0] +
  ' if even and ' +
  possibleResponses[1][0] +
  ' if odd.</p>' +
  '<p class="center-block-text" style="font-size:16px; line-height:80%;">"Magnitude" or "High-Low": ' +
  possibleResponses[0][0] +
  ' if >5 and ' +
  possibleResponses[1][0] +
  ' if <5.</p>' +
  '</div>';


var practiceLen = 16; // must be divisible by 4
var numTrialsPerBlock = 64;
var numTestBlocks = 3;

practiceLen = 1
numTrialsPerBlock = 1
numTestBlocks = 1

var practiceThresh = 3; // 3 blocks of 16 trials
var rtThresh = 1000;
var missedResponseThresh = 0.1;
var accuracyThresh = 0.75;

var fileTypePNG = '.png\'></img>';
var preFileType =
  '<img class = center src=\'/static/experiments/cued_task_switching_rdoc/images/';

// set up block stim. correctResponses indexed by [block][stim][type]
var tasks = {
  parity: {
    task: 'parity',
    cues: ['Parity', 'Even-Odd'],
  },
  magnitude: {
    task: 'magnitude',
    cues: ['Magnitude', 'High-Low'],
  },
};

var taskSwitchTyeps = ['stay', 'switch'];
var cueSwitchTypes = ['stay', 'switch'];

var taskSwitchesArr = [];
for (var t = 0; t < taskSwitchTyeps.length; t++) {
  for (var c = 0; c < cueSwitchTypes.length; c++) {
    taskSwitchesArr.push({
      task_switch: taskSwitchTyeps[t],
      cue_switch: cueSwitchTypes[c],
    });
  }
}

var practiceStims = genStims(practiceLen + 1);
// var testStims = genStims(numTrialsPerBlock + 1);
var stims = practiceStims;
var currTask = randomDraw(getKeys(tasks));
var lastTask = 'na'; // object that holds the last task, set by setStims()
var currCue = 'na'; // object that holds the current cue, set by setStims()
var cueI = randomDraw([0, 1]); // index for one of two cues of the current task
var currStim = 'na'; // object that holds the current stim, set by setStims()
var currentTrial = 0;
var CTI = 150; // cue-target-interval or cue's length (7/29, changed from 300 to 150; less time to process the cue should increase cue switch costs and task switch costs)

var pageInstruct = [
  '<div class = centerbox><p class = block-text>In this experiment you will respond to a sequence of numbers.</p>' +
  '<p class=block-text>Place your <b>' +
  possibleResponses[0][0] +
  '</b> on the <i>' +
  possibleResponses[0][2] +
  '</i> and your <b>' +
  possibleResponses[1][0] +
  '</b> on the <i>' +
  possibleResponses[1][2] +
  '</i> </p>' +
  '<p class = block-text>Your response will depend on the current task, which can change each trial. On some trials, you will have to indicate whether the number is <b>even or odd</b>, and on other trials you will indicate whether the number is <b>higher or lower than 5</b>.' +
  'Each trial will start with a cue telling you which task to do on that trial.</p>' +
  '</div > ',
  '<div class = centerbox>' +
  '<p class = block-text>The cue before the number will be a word indicating the task. There will be <b>four</b> different cues indicating <b>two</b> different tasks. The cues and tasks are described below:</p>' +
  promptTextList +
  speedReminder +
  '<p class = block-text>We\'ll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>' + '</div>',
]



// PRE LOAD IMAGES HERE
var pathSource = '/static/experiments/cued_task_switching_rdoc/images/';
var numbersPreload = ['1', '2', '3', '4', '6', '7', '8', '9'];
var images = [];
for (i = 0; i < numbersPreload.length; i++) {
  images.push(pathSource + numbersPreload[i] + '.png');
}

const numTrialsTotal = numTestBlocks * numTrialsPerBlock;

console.log(`Total number of trials: ${numTrialsTotal}`)
console.log(`Total duration of trials:
- Fixation: ${fixationDuration} ms
- Cue duration: ${CTI} ms
- Stimulus: ${stimTrialDuration} ms
- Average ITI duration: ${meanITI * 1000} ms
------------------------
= ${numTrialsTotal * (fixationDuration + CTI + stimTrialDuration + meanITI * 1000) / 1000 / 60} min
`);
// preloaded later, where jsPsych variable is available

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
// Set up attention check node
// var attention_check_block = {
//   type: 'attention-check-rdoc',
//   data: {
//     trialID: "attention_check"
//   },
//   timing_response: 180000,
//   response_ends_trial: true,
//   timing_post_trial: 200
// }

// var attention_node = {
//   timeline: [attention_check_block],
//   conditional_function: function() {
//     return runAttentionChecks
//   }
// }


var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: 'instruction_feedback',
  },
  choices: ['Enter'],
  stimulus: getInstructFeedback,
  post_trial_gap: 0,
  trial_duration: 180000,
};

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: 'instructions',
  },
  pages: pageInstruct,
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
  /* This function defines stopping criteria */
  loop_function: function() {
    data = jsPsych.data.get().filter({ trial_id: 'instructions' }).trials;
    for (i = 0; i < data.length; i++) {
      if (data[i].rt != null) {
        sumInstructTime += data[i].rt;
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedbackInstructText =
        'Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <i>enter</i> to continue.';
      return true;
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedbackInstructText =
        'Done with instructions. Press <i>enter</i> to continue.';
      return false;
    }
  },
};


/* define practice and test blocks */
var setStimsBlock = {
  type: jsPsychCallFunction,
  data: {
    trial_id: 'set_stims',
  },
  func: setStims,
  post_trial_gap: 0,
};


var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: 'feedback',
  },
  choices: ['Enter'],
  stimulus: getFeedback,
  stimulus_duration: 180000,
  trial_duration: 180000,
  post_trial_gap: 0,
  response_ends_trial: true,
};

var practiceTrials = [];
for (var i = 0; i < practiceLen + 1; i++) {
  var practiceFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      '<div class = upperbox><div class = fixation>+</div></div><div class = lowerbox><div class = fixation>+</div></div>',
    choices: ['NO_KEYS'],
    data: {
      trial_id: 'practice_fixation',
      exp_stage: 'practice',
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration, // 500
    trial_duration: fixationDuration, // 500
    prompt: promptText,
  };

  var practiceCueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ['NO_KEYS'],
    data: {
      trial_id: 'practice_cue',
      exp_stage: 'practice',
    },
    trial_duration: getCTI, // getCTI
    stimulus_duration: getCTI, // getCTI
    post_trial_gap: 0,
    prompt: promptText,
    on_finish: appendData,
  };

  var ITIBlock = {
    type: jsPsychHtmlKeyboardResponse,
    // stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
    stimulus:
      '<div class = upperbox><div class = fixation>+</div></div><div class = lowerbox><div class = fixation>+</div></div>',
    is_html: true,
    choices: ['NO_KEYS'],
    data: {
      trial_id: 'wait',
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

  var practiceBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: {
      exp_stage: 'practice',
      trial_id: 'practice_trial',
    },
    post_trial_gap: 0,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 2000
    response_ends_trial: false,
    prompt: promptText,
    on_finish: appendData,
  };

  var practiceFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.response == null) {
        return '<div class = fb_box><div class = center-text><font size =20>Respond Faster!</font></div></div>';
      } else if (last.correct_trial == 1) {
        return '<div class = fb_box><div class = center-text><font size =20 >Correct!</font></div></div>';
      } else {
        return '<div class = fb_box><div class = center-text><font size =20 >Incorrect</font></div></div>';
      }
    },
    data: {
      exp_stage: 'practice',
      trial_id: 'practice_feedback',
    },
    choices: ['NO_KEYS'],
    stimulus_duration: 500,
    trial_duration: 500,
    prompt: promptText,
  };

  practiceTrials.push(
    setStimsBlock,
    practiceFixationBlock,
    practiceCueBlock,
    practiceBlock,
    practiceFeedbackBlock,
    ITIBlock,
  );
}

var practiceCount = 0;
var practiceNode = {
  timeline: [feedbackBlock].concat(practiceTrials),
  loop_function: function(data) {
    practiceCount += 1;
    currentTrial = 0;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == 'practice_trial') {
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
    var avgRT = sumRT / sumResponses;

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      feedbackText =
        '<div class = centerbox>' +
        '<p class = block-text>We will now start the test portion.</p>' +
        '<p class=block-text>Keep your <b>' +
        possibleResponses[0][0] +
        '</b> on the <i>' +
        possibleResponses[0][2] +
        '</i> and your <b>' +
        possibleResponses[1][0] +
        '</b> on the <i>' +
        possibleResponses[1][2] +
        '</i></p>' +
        '<p class = block-text>The cue before the number will be a word indicating the task. There will be four different cues indicating two different tasks. The cues and tasks are described below:</p>' +
        promptTextList +
        speedReminder +
        '<p class = block-text>Press <i>enter</i> to continue.</p>' +
        '</div>';
      taskSwitches = jsPsych.randomization.repeat(
        taskSwitchesArr,
        numTrialsPerBlock / 4,
      );
      taskSwitches.unshift({
        task_switch: 'na',
        cue_switch: 'na',
        go_no_go_type: jsPsych.randomization.repeat(['go', 'nogo'], 1).pop(),
      });
      stims = genStims(numTrialsPerBlock + 1);
      expStage = 'test'
      return false;
    } else {
      feedbackText =
        '<p class = block-text>Please take this time to read your feedback and to take a short break!</p>';
      if (accuracy < accuracyThresh) {
        feedbackText +=
          '<p class = block-text>Your accuracy is low.  Remember: </p>' +
          promptTextList;
      }
      if (avgRT > rtThresh) {
        feedbackText +=
          '<p class = block-text>You have been responding too slowly.' +
          speedReminder +
          '</p>';
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          '<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>';
      }
      feedbackText +=
        '<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p>';
      taskSwitches = jsPsych.randomization.repeat(
        taskSwitchesArr,
        practiceLen / 4,
      );
      taskSwitches.unshift({
        task_switch: 'na',
        cue_switch: 'na',
        go_no_go_type: jsPsych.randomization.repeat(['go', 'nogo'], 1).pop(),
      });
      stims = genStims(practiceLen + 1);
      return true;
    }
  },
};

var testTrials = [];
// testTrials.push(attention_node)
for (i = 0; i < numTrialsPerBlock + 1; i++) {
  var fixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      '<div class = upperbox><div class = fixation>+</div></div><div class = lowerbox><div class = fixation>+</div></div>',
    choices: ['NO_KEYS'],
    data: {
      trial_id: 'test_fixation',
      exp_stage: 'test',
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration, // 500
    trial_duration: fixationDuration, // 500
  };

  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ['NO_KEYS'],
    data: {
      trial_id: 'test_cue',
      exp_stage: 'test',
    },
    trial_duration: getCTI,
    stimulus_duration: getCTI,
    post_trial_gap: 0,
    on_finish: appendData,
  };

  var testBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: {
      trial_id: 'test_trial',
      exp_stage: 'test',
    },
    post_trial_gap: 0,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    on_finish: appendData,
  };

  testTrials.push(
    setStimsBlock,
    fixationBlock,
    cueBlock,
    testBlock,
    ITIBlock,
  );
}

var testCount = 0;
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function(data) {
    testCount += 1;
    currentTrial = 0;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == 'test_trial') {
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
    var avgRT = sumRT / sumResponses;

    if (testCount >= numTestBlocks) {
      feedbackText =
        '</p><p class = block-text>Done with this test. Press <i>enter</i> to continue. <br>If you have been completing tasks continuously for one hour or more, please take a 15-minute break before starting again.';
      return false;
    } else {
      feedbackText =
        '<p class = block-text>Please take this time to read your feedback and to take a short break!<br>';
      feedbackText +=
        'You have completed: ' +
        testCount +
        ' out of ' +
        numTestBlocks +
        ' blocks of trials.</p>';

      if (accuracy < accuracyThresh) {
        feedbackText +=
          '<p class = block-text>Your accuracy is too low.  Remember: </p>' +
          promptTextList;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          '<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>';
      }
      if (avgRT > rtThresh) {
        feedbackText +=
          '<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>';
      }
      feedbackText +=
        '<p class = block-text>Press <i>enter</i> to continue.</p>';
      taskSwitches = jsPsych.randomization.repeat(
        taskSwitchesArr,
        numTrialsPerBlock / 4,
      );
      taskSwitches.unshift({
        task_switch: 'na',
        cue_switch: 'na',
        go_no_go_type: jsPsych.randomization.repeat(['go', 'nogo'], 1).pop(),
      });
      stims = genStims(numTrialsPerBlock + 1);
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

var expID = 'cued_task_switching_rdoc'

// eslint-disable-next-line no-unused-vars
var expStage = 'practice'

// Set up post task questionnaire
var postTaskBlock = {
  type: jsPsychSurveyText,
  data: {
    exp_id: expID,
    trial_id: 'post task questions',
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
    trial_id: 'end',
    exp_id: expID,
  },
  trial_duration: 180000,
  stimulus:
    '<div class = centerbox><p class = center-block-text>Thanks for completing this task!</p>' +
    '<p class = center-block-text>	If you have been completing tasks continuously for an hour or more, please take a 15-minute break before starting again.</p>' +
    '<p class = center-block-text>Press <i>enter</i> to continue.</p>' +
    '</div>',
  choices: ['Enter'],
  post_trial_gap: 0,
  on_finish: function() {
    assessPerformance();
    evalAttentionChecks();
  },
};

/* create experiment definition array */
/* eslint-disable camelcase */
var cued_task_switching_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var cued_task_switching_rdoc_init = () => {
  jsPsych.pluginAPI.preloadImages(images);

  taskSwitches = jsPsych.randomization.repeat(
    taskSwitchesArr,
    practiceLen / 4,
  );
  taskSwitches.unshift({
    task_switch: 'na',
    cue_switch: 'na',
    go_no_go_type: jsPsych.randomization.repeat(['go', 'nogo'], 1).pop(),
  });
  stims = genStims(practiceLen + 1);

  cued_task_switching_rdoc_experiment.push(fullscreen);
  cued_task_switching_rdoc_experiment.push(instructionNode);
  cued_task_switching_rdoc_experiment.push(practiceNode);
  cued_task_switching_rdoc_experiment.push(testNode);
  cued_task_switching_rdoc_experiment.push(postTaskBlock);
  cued_task_switching_rdoc_experiment.push(endBlock);
  cued_task_switching_rdoc_experiment.push(exitFullscreen);
};
