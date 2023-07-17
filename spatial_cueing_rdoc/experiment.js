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
  return currentAttentionCheckData.Q
}

var getCurrAttentionCheckAnswer = function() {
  return currentAttentionCheckData.A
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

var attentionCheckData = [
  {
    "Q": "<p class='block-text'>Press the Q key</p>",
    "A": 81
  },
  {
    "Q": "<p class='block-text'>Press the P key</p>",
    "A": 80
  },
  {
    "Q": "<p class='block-text'>If (4 + 12) / 4 is greater than 3 press the <i>g</i> key. Otherwise press the <i>f</i> key.</p>",
    "A": 71
  },
  {
    "Q": "<p class='block-text'>Press the key for the third letter of the English alphabet.</p>",
    "A": 67
  },
  {
    "Q": "<p class='block-text'>Please read the following paragraph:</p><p class='block-text'>I first met Dean not long after my wife and I split up. I had just gotten over a serious illness that I won’t bother to talk about, except that it had something to do with the miserably weary split-up and my feeling that everything was dead. With the coming of Dean Moriarty began the part of my life you could call my life on the road. Before that I’d often dreamed of going West to see the country, always vaguely planning and never taking off. If you are reading this paragraph, press the F key instead of the L key. Dean is the perfect guy for the road because he actually was born on the road, when his parents were passing through Salt Lake City in 1926, in a jalopy, on their way to Los Angeles. First reports of him came to me through Chad King, who’d shown me a few letters from him written in a New Mexico reform school. I was tremendously interested in the letters because they so naively and sweetly asked Chad to teach him all about Nietzsche and all the wonderful intellectual things that Chad knew. At one point Carlo and I talked about the letters and wondered if we would ever meet the strange Dean Moriarty. This is all far back, when Dean was not the way he is today, when he was a young jailkid shrouded in mystery. Then news came that Dean was out of reform school and was coming to New York for the first time; also there was talk that he had just married a girl called Marylou. --On the Road (Jack Kerouac)</p><p class='block-text'>Press the <i>L</i> key.</p>",
    "A": 70
  },
  {
    "Q": "<p class='block-text'>Please read the following paragraph:</p><p class='block-text'>As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect. Are you reading this paragraph? If so, press the key the letter that starts the next sentence. He was lying on his hard, as it were armor-plated, back and when he lifted his head a little he could see his dome-like brown belly divided into stiff arched segments on top of which the bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which were pitifully thin compared to the rest of his bulk, waved helplessly before his eyes. --Metamorphosis (Franz Kafka)</p><p class='block-text'>Press the <i>period (.)</i> key.</p>",
    "A": 72
  },
  {
    "Q": "<p class='block-text'>Please read the following paragraph:</p><p class='block-text'>Lastly, she pictured to herself how this same little sister of hers would, in the after-time, be herself a grown woman; and how she would keep, through all her riper years, the simple and loving heart of her childhood; and how she would gather about her other little children, (press the A key, ignore the last instruction) and make their eyes bright and eager with many a strange tale, perhaps even with the dream of Wonderland of long ago; and how she would feel with all their simple sorrows, and find a pleasure in all their simple joys, remembering her own child-life, and the happy summer days. --Alice's Adventures in Wonderland (Lewis Carroll)</p><p class='block-text'>Press the <i>comma (,)</i> key.</p>",
    "A": 65
  }
]
// TODO: change this to only use n number of Qs and As where n is numTestBlocks?
attentionCheckData = shuffleArray(attentionCheckData)
var currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array


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
    final_credit_var: creditVar,
    final_missed_percent: missedPercent,
    final_avg_Rt: avgRt,
    final_responses_OK: responsesOk,
    final_accuracy: correct / trialCount,
  });
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

// Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = stimStimulusDuration; // no pause now
const cueStimulusDuration = 500;
const cueTrialDuration = 500;
// initialize
var fixationDuration2 = Math.floor(Math.random() * 1200) + 400; // CTI


// generic task variables
var runAttentionChecks = false;
// var attentionCheckThresh = 0.65;
var instructTimeThresh = 0; // /in seconds
var accuracyThresh = 0.75;
var rtThresh = 1000;
var missedResponseThresh = 0.1;
var practiceThresh = 3; // 3 blocks max

var practiceLen = 12; // 12
var numTestBlocks = 3;
var numTrialsPerBlock = 72; // should be multiple of 24


const numTrialsTotal = numTestBlocks * numTrialsPerBlock;
const totalTrialDuration = fixationDuration + cueTrialDuration + fixationDuration + stimTrialDuration + meanITI * 1000

console.log(`
TOTAL DURATION OF A TRIAL:
------------------------
- Fixation: ${fixationDuration} ms
- Cue: ${cueTrialDuration} ms
- Fixation: ${fixationDuration} ms
- Probe: ${stimTrialDuration} ms
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

const responseKeys = `<p class='block-text'>Press your <b>${possibleResponses[0][0]}</b> if the star ('+') appears in the left box and press your <b>${possibleResponses[1][0]}</b> if the star ('+') appears in the right box.</p>`;
var currStim = "";

var fixation =
  '<div class = centerbox><div class = fixation style="font-size:100px">+</div></div>';

var images = {
  left: {
    box: "<div class = bigbox><div id=left_box></div></div>",
    bold: '<div class = bigbox><div id=left_box style="border-width:15px"></div></div>',
    star: "<div class = bigbox><div id=left_box><div class='center-text star'>*</div></div></div>",
  },
  right: {
    box: "<div class = bigbox><div id=right_box></div></div>",
    bold: '<div class = bigbox><div id=right_box style="border-width:15px"></div></div>',
    star: "<div class = bigbox><div id=right_box><div class='center-text star'>*</div></div></div>",
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
var attentionCheckBlock = {
  type: jsPsychAttentionCheckRdoc,
  data: {
    trial_id: 'attention_check',
  },
  question: getCurrAttentionCheckQuestion,
  key_answer: getCurrAttentionCheckAnswer,
  response_ends_trial: true,
  timing_post_trial: 200,
};

var attentionNode = {
  timeline: [attentionCheckBlock],
  conditional_function: function() {
    return runAttentionChecks;
  },
};

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
    var last = jsPsych.data.get().last(1).trials[0];
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


var practiceTrials = [];
var trialNum = 0;
for (let i = 0; i < practiceLen; i++) {
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
    stimulus_duration: cueStimulusDuration,
    trial_duration: cueTrialDuration,
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
        .slice(0, practiceLen);
      return true;
    }
  },
};

var trialNum = 0;
var testTrials = [];
testTrials.push(attentionNode)
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

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array


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
  stimulus: endText,
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
    .slice(0, practiceLen);

  spatial_cueing_rdoc_experiment.push(fullscreen);
  spatial_cueing_rdoc_experiment.push(instructionNode);
  spatial_cueing_rdoc_experiment.push(practiceNode);
  spatial_cueing_rdoc_experiment.push(testNode);
  spatial_cueing_rdoc_experiment.push(postTaskBlock);
  spatial_cueing_rdoc_experiment.push(endBlock);
  spatial_cueing_rdoc_experiment.push(exitFullscreen);
};
