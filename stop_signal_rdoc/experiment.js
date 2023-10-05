
/* ************************************ */
/*       Define Helper Functions        */
/* ************************************ */
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


function evalAttentionChecks() {
  var checkPercent = 1;
  if (runAttentionChecks) {
    var attentionChecksTrials = jsPsych.data
      .get()
      .filter({ trial_id: 'test_attention_check' }).trials;
    var checksPassed = 0;
    for (var i = 0; i < attentionChecksTrials.length; i++) {
      if (attentionChecksTrials[i].correct_trial === true) {
        checksPassed += 1;
      }
    }
    checkPercent = checksPassed / attentionChecksTrials.length;
  }
  jsPsych.data.get().addToLast({ attention_check_percent: checkPercent });
  return checkPercent;
}

var getCurrAttentionCheckQuestion = function() {
  return `${currentAttentionCheckData.Q} <div class=block-text>This screen will advance automatically in 1 minute.</div>`
}

var getCurrAttentionCheckAnswer = function() {
  return currentAttentionCheckData.A
}

var attentionCheckData = [
  // key presses
  {
    "Q": "<p class='block-text'>Press the Q key</p>",
    "A": 81
  },
  {
    "Q": "<p class='block-text'>Press the P key</p>",
    "A": 80
  },
  {
    "Q": "<p class='block-text'>Press the R key</p>",
    "A": 82
  }
  ,
  {
    "Q": "<p class='block-text'>Press the S key</p>",
    "A": 83
  }
  ,
  {
    "Q": "<p class='block-text'>Press the T key</p>",
    "A": 84
  }
  ,
  {
    "Q": "<p class='block-text'>Press the J key</p>",
    "A": 74
  },
  {
    "Q": "<p class='block-text'>Press the K key</p>",
    "A": 75
  }
  ,
  {
    "Q": "<p class='block-text'>Press the E key</p>",
    "A": 69
  },
  {
    "Q": "<p class='block-text'>Press the M key</p>",
    "A": 77
  },
  {
    "Q": "<p class='block-text'>Press the L key</p>",
    "A": 76
  },
  {
    "Q": "<p class='block-text'>Press the U key</p>",
    "A": 85
  },
  // alphabet
  // start
  {
    "Q": "<p class='block-text'>Press the key for the first letter of the English alphabet.</p>",
    "A": 65
  },
  {
    "Q": "<p class='block-text'>Press the key for the second letter of the English alphabet.</p>",
    "A": 66
  },
  {
    "Q": "<p class='block-text'>Press the key for the third letter of the English alphabet.</p>",
    "A": 67
  },
  // end
  {
    "Q": "<p class='block-text'>Press the key for the third to last letter of the English alphabet.</p>",
    "A": 88
  },
  {
    "Q": "<p class='block-text'>Press the key for the second to last letter of the English alphabet.</p>",
    "A": 89
  },
  {
    "Q": "<p class='block-text'>Press the key for the last letter of the English alphabet.</p>",
    "A": 90
  },
]
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
attentionCheckData = shuffleArray(attentionCheckData)
var currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

function renameDataProperties() {
  // Fetch the data from the experiment
  var data = jsPsych.data.get().trials;

  data.forEach(function(obj) {
    if (obj.correct === true) {
      obj.correct_trial = 1
    } else if (obj.correct === false) {
      obj.correct_trial = 0
    }
    delete (obj.correct)
  });

}

var getFeedback = function() {
  return (
    "<div class = bigbox><div class = picture_box><p class = block-text>" +
    feedbackText +
    "</p></div></div>"
  ); // <font color="white"></font>
};

var getInstructFeedback = function() {
  return (
    "<div class = centerbox><p class = center-block-text>" +
    feedbackInstructText +
    "</p></div>"
  );
};

var getCategorizeFeedback = function() {
  var last = jsPsych.data.get().last(1).trials[0];
  if (last.SS_trial_type == "go") {
    if (last.response == null) {
      return (
        "<div class = fb_box><div class = center-text><font size = 20>Respond Faster!</font></div></div>" +
        promptText
      );
    } else if (last.response == last.correct_response) {
      return (
        "<div class = fb_box><div class = center-text><font size = 20>Correct!</font></div></div>" +
        promptText
      );
    } else {
      return (
        "<div class = fb_box><div class = center-text><font size = 20>Incorrect</font></div></div>" +
        promptText
      );
    }
  } else {
    // stop
    if (last.rt == null) {
      return (
        "<div class = fb_box><div class = center-text><font size = 20>Correct!</font></div></div>" +
        promptText
      );
    } else {
      return (
        "<div class = fb_box><div class = center-text><font size = 20>There was a star</font></div></div>" +
        promptText
      );
    }
  }
};

var createTrialTypes = function(numTrialsPerBlock) {
  var uniqueCombos = stopSignalsConditions.length * shapes.length;

  var stims = [];
  for (var x = 0; x < stopSignalsConditions.length; x++) {
    for (var j = 0; j < shapes.length; j++) {
      stim = {
        stim: shapes[j],
        correct_response: possibleResponses[j][1],
        condition: stopSignalsConditions[x],
      };
      stims.push(stim);
    }
  }
  var iteration = numTrialsPerBlock / uniqueCombos;
  stims = jsPsych.randomization.repeat(stims, iteration);
  return stims;
};

var getStopStim = function() {
  return preFileType + "stopSignal" + postFileType;
};

var getStim = function() {
  if (expPhase == "practice1") {
    stim = stims.pop();
    shape = stim.stim;
    correct_response = stim.correct_response;
    condition = "go";
  } else if (expPhase == "test" || expPhase == "practice2") {
    stim = stims.pop();
    shape = stim.stim;
    correct_response = stim.correct_response;
    condition = stim.condition;
    if (condition == "stop") {
      correct_response = null;
    }
  }
  stim = {
    image:
      "<div class = centerbox><div class = cue-text>" +
      preFileType +
      shape +
      postFileType +
      "</div></div>",
    data: {
      stim: shape,
      condition: condition,
      correct_response: correct_response,
    },
  };
  stimData = stim.data;
  return stim.image;
};

function getSSD() {
  return SSD;
}

function getSSType() {
  return condition;
}

function getCorrectResponse() {
  return correct_response;
}

var appendData = function(data) {
  currentTrial += 1;

  if (expPhase == "practice1") {
    currBlock = practiceCount;
  } else if (expPhase == "practice2") {
    currBlock = practiceCount;
  } else if (expPhase == "test") {
    currBlock = testCount;
  }

  data.stim = stimData.stim;
  data.correct_response = correct_response;
  data.current_block = currBlock;
  data.currentTrial = currentTrial;
  data.condition = stimData.condition;

  var correctTrial = 0;
  if (data.response == data.correct_response) {
    correctTrial = 1;
  }


  if (expPhase == "test" || expPhase == "practice2") {
    if (data.condition == "stop") {
      if (data.response == null && SSD < maxSSD) {
        data.stop_acc = 1;
        SSD += 50;
      } else if (data.response != null && SSD > minSSD) {
        data.stop_acc = 0;
        SSD -= 50;
      }
    } else if (data.condition == "go") {
      if (data.response == data.correct_response) {
        data.go_acc = 1;
      } else {
        data.go_acc = 0;
      }
    }
  }
  console.log('trial data', data)
};

/* ************************************ */
/*    Define Experimental Variables     */
/* ************************************ */
// common variables
const fixationDuration = 500;

const possibleResponses = [['index finger', ',', 'comma key (,)'],
['middle finger', '.', 'period key (.)']]

const choices = [possibleResponses[0][1], possibleResponses[1][1]]

var endText = '<div class = centerbox>' +
  '<p class = center-block-text>Thanks for completing this task!</p>' +
  '<p class = center-block-text>Press <i>enter</i> to continue.</p>' +
  '</div>'

var feedbackInstructText =
  '<p class=center-block-text>' +
  'Welcome! This experiment will take around 5 minutes.</p>' +
  '<p class=center-block-text>' +
  'To avoid technical issues,' +
  'please keep the experiment tab (on Chrome or Firefox)' +
  ' active and fullscreen for the whole duration of each task.</p>' +
  '<p class=center-block-text> Press <i>enter</i> to begin.</p>';

// speed reminder
var speedReminder =
  '<p class = block-text>' +
  'Try to respond as quickly and accurately as possible.</p> ';
// eslint-disable-next-line no-unused-vars
var expStage = 'practice'
// *: Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 1500;

// generic task variables
var sumInstructTime = 0; // ms
var instructTimeThresh = 1; // /in seconds
var runAttentionChecks = true;

var practiceLen = 18; // must be divisible by shapes.length * stopSignalsConditions.length
var numTrialsPerBlock = 60; // must be divisible by shapes.length * stopSignalsConditions.length
var numTestBlocks = 3;

var practiceThresh = 3; // max number of times to repeat practice
var accuracyThresh = 0.75;
var missedResponseThresh = 0.1;
var rtThresh = 1000;

var SSD = 350;
var maxSSD = 1000;
var minSSD = 0;

currentTrial = 0;
correct_response = null;
stimData = null;
condition = null;

var maxStopCorrect = 0.7;
var minStopCorrect = 0.3;
var maxStopCorrectPractice = 1;
var minStopCorrectPractice = 0;

var stopSignalsConditions = ["go", "go", "stop"];
var shapes = ["circle", "square"];
// var color = "black";
var pathSource = "/static/experiments/stop_signal_rdoc/images/";
var postFileType = ".png'></img>";
var preFileType = "<img class = center src='" + pathSource;

// IMAGES TO PRELOAD
var images = [pathSource + "stopSignal" + ".png"];
for (i = 0; i < shapes.length; i++) {
  images.push(pathSource + shapes[i] + ".png");
}

var promptTextList =
  '<ul style="text-align:left;">' +
  "<li>" +
  shapes[0] +
  ": " +
  possibleResponses[0][0] +
  "</li>" +
  "<li>" +
  shapes[1] +
  ": " +
  possibleResponses[1][0] +
  "</li>" +
  "<li>Do not respond if a star appears.</li>" +
  "</ul>";

var promptText =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">' +
  shapes[0] +
  ": " +
  possibleResponses[0][0] +
  "</p>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">' +
  shapes[1] +
  ": " +
  possibleResponses[1][0] +
  "</p>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Do not respond if a star appears.</p>' +
  "</div>";

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

var expPhase = "practice2";

/* ************************************ */
/*        Set up jsPsych blocks         */
/* ************************************ */
// Set up attention check node
var attentionCheckBlock = {
  type: jsPsychAttentionCheckRdoc,
  data: {
    trial_id: 'test_attention_check',
    trial_duration: null
  },
  question: getCurrAttentionCheckQuestion,
  key_answer: getCurrAttentionCheckAnswer,
  response_ends_trial: true,
  timing_post_trial: 200,
  trial_duration: 60000
};

var attentionNode = {
  timeline: [attentionCheckBlock],
  conditional_function: function() {
    return runAttentionChecks;
  },
};

var feedbackInstructText =
  "<p class=center-block-text>Welcome! This experiment will take around 15 minutes.</p>" +
  "<p class=center-block-text>To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and fullscreen for the whole duration of each task.</p>" +
  "<p class=center-block-text> Press <i>enter</i> to begin.</p>";
var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["Enter"],
  data: {
    trial_id: "instruction_feedback",
    trial_duration: 180000
  },
  stimulus: getInstructFeedback,
  post_trial_gap: 0,
  trial_duration: 180000,
};

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: "instructions",
    trial_duration: null
  },
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
    "<p class = block-text>In this task, you will see shapes appear on the screen one at a time. </p>" +
    "<p class = block-text>If the shape is a <b>" +
    shapes[0] +
    "</b>, press your <b>" +
    possibleResponses[0][0] +
    "</b>.</p>" +
    "<p class = block-text>If the shape is a <b>" +
    shapes[1] +
    "</b>, press your <b>" +
    possibleResponses[1][0] +
    "</b>.</p>" +
    "<p class = block-text>You should respond as quickly and accurately as possible to each shape.</p>" +
    "</div>",
    "<div class = centerbox>" +
    "<p class = block-text>On some trials, a star will appear around the shape, shortly after the shape appears.</p>" +
    "<p class = block-text>If you see the star, please try your best to <b>withhold your response</b> on that trial.</p>" +
    "<p class = block-text>If the star appears and you try your best to withhold your response, you will find that you will be able to stop sometimes, but not always.</p>" +
    "<p class = block-text>Please <b>do not</b> slow down your responses in order to wait for the star.  It is equally important to respond quickly on trials without the star as it is to stop on trials with the star.</p>" +
    "</div>",
    "<div class = centerbox>" +
    speedReminder +
    "<p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>" +
    "</div>",
  ],
  allow_keys: false,
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
        sumInstructTime += data.trials[i].rt;
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

var fixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: {
    trial_id: "fixation",
    trial_duration: fixationDuration,
    stimulus_duration: fixationDuration,
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration, // 500
  trial_duration: fixationDuration, // 500
};

var promptFixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: {
    trial_id: "prompt_fixation",
    trial_duration: 500,
    stimulus_duration: 500,
  },
  post_trial_gap: 0,
  stimulus_duration: 500, // 500
  trial_duration: 500, // 500
  prompt: promptText,
};

var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";
var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: function() {
    if (getExpStage() == 'practice') {
      return {
        trial_id: 'practice_feedback',
        exp_stage: getExpStage(),
        trial_duration: 60000,

      }
    } else {
      return {
        trial_id: 'test_feedback',
        exp_stage: getExpStage(),
        trial_duration: 60000,

      }
    }
  },
  stimulus: getFeedback,
  post_trial_gap: 0,
  trial_duration: 60000,
  choices: ['Enter'],
  response_ends_trial: true,
};


var ITIms = null;

// *** ITI *** //
var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class = centerbox><div class = fixation>+</div></div>',
  is_html: true,
  choices: ['NO_KEYS'],
  data: function() {
    if (getExpStage() == 'practice') {
      return {
        trial_id: 'practice_ITI',
        ITIParams: {
          min: 0,
          max: 5,
          mean: 0.5
        }
      }
    } else {
      return {
        trial_id: 'test_ITI',
        ITIParams: {
          min: 0,
          max: 5,
          mean: 0.5
        }
      }
    }
  },
  post_trial_gap: 0,
  trial_duration: function() {
    ITIms = sampleFromDecayingExponential();
    return ITIms * 1000;
  },
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ''
    }
  },
  on_finish: function(data) {
    data['trial_duration'] = ITIms * 1000;
    data['stimulus_duration'] = ITIms * 1000;
  }
};

/** ******************************************/
/*				Set up nodes				*/
/** ******************************************/

var practiceStopTrials = [];
for (i = 0; i < practiceLen; i++) {
  var practiceTrial = {
    type: jsPoldracklabStopSignal,
    stimulus: getStim,
    SS_stimulus: getStopStim,
    SS_trial_type: getSSType,
    data: {
      trial_id: "practice_trial",
      exp_stage: "practice",
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: choices,
    correct_choice: getCorrectResponse,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    SSD: getSSD,
    SS_duration: 500, // 500
    post_trial_gap: 0,
    on_finish: function(data) {
      appendData(data);
    },
    prompt: promptText,
  };

  var practiceFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    data: {
      trial_id: "practice-stop-feedback",
      exp_stage: "practice",
      trial_duration: 500,
      stimulus_duration: 500,
    },
    choices: ["NO_KEYS"],
    stimulus: getCategorizeFeedback,
    post_trial_gap: 0,
    stimulus_duration: 500, // 500
    trial_duration: 500, // 500
    response_ends_trial: false,
    prompt: promptText,
  };

  practiceStopTrials.push(
    promptFixationBlock,
    practiceTrial,
    practiceFeedbackBlock,
    ITIBlock
  );
}

var practiceCount = 0;
var practiceStopNode = {
  timeline: [feedbackBlock].concat(practiceStopTrials),
  loop_function: function(data) {
    practiceCount += 1;
    currentTrial = 0;

    // var totalTrials = 0;
    // var sumStopRT = 0;
    var sumGoRT = 0;
    var sumGoCorrect = 0;
    // var sumStopCorrect = 0;
    var numGoResponses = 0;
    var numStopResponses = 0;
    var goLength = 0;
    var stopLength = 0;

    for (i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "practice_trial") {
        // totalTrials += 1;
      }

      if (data.trials[i].condition == "go") {
        goLength += 1;
        if (data.trials[i].rt != null) {
          numGoResponses += 1;
          sumGoRT += data.trials[i].rt;
          if (data.trials[i].response == data.trials[i].correct_response) {
            sumGoCorrect += 1;
          }
        }
      } else if (data.trials[i].condition == "stop") {
        stopLength += 1;
        if (data.trials[i].rt != null) {
          numStopResponses += 1;
          // sumStopRT += data.trials[i].rt;
        } else {
          // sumStopCorrect += 1;
        }
      }
    }

    var avgRT = sumGoRT / numGoResponses;
    var missedResponses = (goLength - numGoResponses) / goLength;
    var aveShapeRespondCorrect = sumGoCorrect / goLength;
    var stopSignalRespond = numStopResponses / stopLength;

    if (
      practiceCount == practiceThresh ||
      (aveShapeRespondCorrect > accuracyThresh &&
        stopSignalRespond < maxStopCorrectPractice &&
        stopSignalRespond > minStopCorrectPractice)
    ) {
      feedbackText =
        "<div class = centerbox>" +
        "<p class = block-text>We will now begin the test portion.</p>" +
        "<p class = block-text>Keep your " +
        possibleResponses[0][0] +
        " on the " +
        possibleResponses[0][2] +
        " and your " +
        possibleResponses[1][0] +
        " on the " +
        possibleResponses[1][2] +
        ". " +
        "You will see a shape on every trial. Please respond to each shape as quickly and accurately as possible.</p>" +
        "<p class = block-text>If the shape is a " +
        shapes[0] +
        ", press your " +
        possibleResponses[0][0] +
        ".</p>" +
        "<p class = block-text>If the shape is a " +
        shapes[1] +
        ", press your " +
        possibleResponses[1][0] +
        ".</p>" +
        "<p class = block-text>Do not respond if you see a star.</p>" +
        "<p class = block-text>You will no longer receive the rule prompt, so remember the instructions before you continue. Press <i>enter</i> to begin.</p>" +
        "</div>";
      expPhase = "test";
      expStage = 'test'
      stims = createTrialTypes(numTrialsPerBlock);
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";
      if (aveShapeRespondCorrect < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is low.  Remember: </p>" +
          promptTextList;
      }
      if (avgRT > rtThresh) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly." +
          speedReminder +
          "</p>";
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>We have detected a number of trials that <i>required a response</i>, where no response was made.  Please <i>ensure that you are responding accurately and quickly</i> to the shapes.</p>";
      }
      if (stopSignalRespond === maxStopCorrectPractice) {
        feedbackText +=
          "<p class = block-text>You have not been stopping your response when stars are present.  Please try your best to stop your response if you see a star.</p>";
      }
      if (stopSignalRespond === minStopCorrectPractice) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly. Do not wait for the star. Respond as quickly and accurately to each stimulus that requires a response.</p>";
      }
      feedbackText +=
        "<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p>";
      stims = createTrialTypes(practiceLen);
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode)
for (i = 0; i < numTrialsPerBlock; i++) {
  var testTrial = {
    type: jsPoldracklabStopSignal,
    stimulus: getStim,
    SS_stimulus: getStopStim,
    SS_trial_type: getSSType,
    data: {
      trial_id: "test_trial",
      exp_stage: "test",
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: choices,
    correct_choice: correct_response,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    timing_duration: 1500,
    response_ends_trial: false,
    SSD: getSSD,
    SS_duration: 500, // 500
    post_trial_gap: 0,
    on_finish: function(data) {
      appendData(data);
    },
  };
  testTrials.push(fixationBlock, testTrial, ITIBlock);
}

var testCount = 0;
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function(data) {
    currentTrial = 0;
    testCount += 1;

    // var totalTrials = 0;
    // var sumStopRT = 0;
    var sumGoRT = 0;
    var sumGoCorrect = 0;
    // var sumStopCorrect = 0;
    var numGoResponses = 0;
    var numStopResponses = 0;
    var goLength = 0;
    var stopLength = 0;

    // probably ahould filter before
    for (i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "test_trial") {
        // totalTrials += 1;
      }
      if (data.trials[i].condition == "go") {
        goLength += 1;
        if (data.trials[i].rt != null) {
          numGoResponses += 1;
          sumGoRT += data.trials[i].rt;
          if (data.trials[i].response == data.trials[i].correct_response) {
            sumGoCorrect += 1;
          }
        }
      } else if (data.trials[i].condition == "stop") {
        stopLength += 1;
        if (data.trials[i].rt != null) {
          numStopResponses += 1;
          // sumStopRT += data.trials[i].rt;
        } else {
          // sumStopCorrect += 1;
        }
      }
    }

    var avgRT = sumGoRT / numGoResponses;
    var missedResponses = (goLength - numGoResponses) / goLength;
    var aveShapeRespondCorrect = sumGoCorrect / goLength;
    var stopSignalRespond = numStopResponses / stopLength;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array


    feedbackText =
      "<p>Please take this time to read your feedback! This screen will advance automatically in 1 minute. Press <i>enter</i> to continue." +
      "<br>You have completed " +
      testCount +
      " out of " +
      numTestBlocks +
      " blocks of trials.</p>";

    if (testCount == numTestBlocks) {
      feedbackText =
        '</p><p class = block-text>Done with this test. Press <i>enter</i> to continue.</p>';
      return false;
    } else {
      if (aveShapeRespondCorrect < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is too low. Remember:</p>" +
          promptTextList;
      }
      if (avgRT > rtThresh) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly, please respond to each shape as quickly and as accurately as possible.</p>";
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>We have detected a number of trials that <i>required a response</i>, where no response was made.  Please <i>ensure that you are responding accurately and quickly  </i>to the shapes.</p>";
      }
      if (stopSignalRespond > maxStopCorrect) {
        feedbackText +=
          "<p class = block-text>You have not been stopping your response when stars are present.  Please try your best to stop your response if you see a star.</p>";
      }
      if (stopSignalRespond < minStopCorrect) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly.  Please respond as quickly and accurately to each stimulus that requires a response.</p>";
      }
      stims = createTrialTypes(numTrialsPerBlock);
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

var expID = 'stop_signal_rdoc'



var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: expID,
    trial_duration: 180000
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function() {
    evalAttentionChecks();
    renameDataProperties()
  },
};


/* ************************************ */
/*          Set up Experiment           */
/* ************************************ */
/* eslint-disable camelcase */
var stop_signal_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var stop_signal_rdoc_init = () => {
  jsPsych.pluginAPI.preloadImages(images);

  // globals
  stims = createTrialTypes(practiceLen);

  stop_signal_rdoc_experiment.push(fullscreen);
  stop_signal_rdoc_experiment.push(instructionNode);
  stop_signal_rdoc_experiment.push(practiceStopNode);
  stop_signal_rdoc_experiment.push(testNode);
  stop_signal_rdoc_experiment.push(endBlock);
  stop_signal_rdoc_experiment.push(exitFullscreen);
};
