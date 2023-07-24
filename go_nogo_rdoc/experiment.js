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
  ,
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
  // paragraphs
  {
    "Q": "<p class='block-text'>Please read the following paragraph:</p><p class='block-text'>I first met Dean not long after my wife and I split up. I had just gotten over a serious illness that I won’t bother to talk about, except that it had something to do with the miserably weary split-up and my feeling that everything was dead. With the coming of Dean Moriarty began the part of my life you could call my life on the road. Before that I’d often dreamed of going West to see the country, always vaguely planning and never taking off. If you are reading this paragraph, press the Q key instead of the P key. Dean is the perfect guy for the road because he actually was born on the road, when his parents were passing through Salt Lake City in 1926, in a jalopy, on their way to Los Angeles. First reports of him came to me through Chad King, who’d shown me a few letters from him written in a New Mexico reform school. I was tremendously interested in the letters because they so naively and sweetly asked Chad to teach him all about Nietzsche and all the wonderful intellectual things that Chad knew. At one point Carlo and I talked about the letters and wondered if we would ever meet the strange Dean Moriarty. This is all far back, when Dean was not the way he is today, when he was a young jailkid shrouded in mystery. Then news came that Dean was out of reform school and was coming to New York for the first time; also there was talk that he had just married a girl called Marylou. --On the Road (Jack Kerouac)</p><p class='block-text'>Press the <i>P</i> key.</p>",
    "A": 81
  },
  {
    "Q": "<p class='block-text'>Please read the following paragraph:</p><p class='block-text'>As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect. Are you reading this paragraph? If so, press the key the letter that starts the next sentence. He was lying on his hard, as it were armor-plated, back and when he lifted his head a little he could see his dome-like brown belly divided into stiff arched segments on top of which the bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which were pitifully thin compared to the rest of his bulk, waved helplessly before his eyes. --Metamorphosis (Franz Kafka)</p><p class='block-text'>Press the <i>Q</i> key.</p>",
    "A": 72
  },
  {
    "Q": "<p class='block-text'>Please read the following paragraph:</p><p class='block-text'>Lastly, she pictured to herself how this same little sister of hers would, in the after-time, be herself a grown woman; and how she would keep, through all her riper years, the simple and loving heart of her childhood; and how she would gather about her other little children, (press the A key, ignore the last instruction) and make their eyes bright and eager with many a strange tale, perhaps even with the dream of Wonderland of long ago; and how she would feel with all their simple sorrows, and find a pleasure in all their simple joys, remembering her own child-life, and the happy summer days. --Alice's Adventures in Wonderland (Lewis Carroll)</p><p class='block-text'>Press the <i>T</i> key.</p>",
    "A": 65
  },
  {
    "Q": "<p class='block-text'>If (5 * 8) / 4 is equal to 10 press the <i>q</i> key. Otherwise press the <i>r</i> key.</p>",
    "A": 81
  },
  {
    "Q": "<p class='block-text'>Zephyr's whisper carried secrets through the twilight haze, where stars winked mischievously. Velvet petals of night bloomed, embracing the lunar glow. Tangled melodies intertwined with the murmurs of forgotten tales. Time danced in a kaleidoscope of fleeting moments. Whispers of autumn's breath brushed against the fiery hues of a distant horizon. Pages turned, revealing ancient wisdom etched upon parchment. Mirthful laughter echoed through the labyrinth of dreams. Press the Q key instead of the K key. Lost constellations weaved celestial tapestries, painting the sky with cosmic hues. Enigmatic shadows whispered promises, while rivers of thought flowed through the mosaic of existence. In this realm of whimsy, the symphony of randomness blossomed, a symphony of infinite possibilities.</p><p class='block-text'>Press the K key.</p>",
    "A": 81
  },
  {
    "Q": "<p class='block-text'>The day was sultry, with the sun casting long shadows upon the ancient cobblestones. If you are reading this, press the A key instead of the B key. A gentle breeze carried the scent of jasmine, mingling with the faint aroma of freshly brewed coffee. Conversations floated through the air, snippets of laughter and hushed whispers. The city pulsated with life, a vibrant tapestry of cultures and stories. Narrow alleys beckoned with hidden treasures, while grand boulevards dazzled with elegant architecture. Time stood still, suspended in the magic of the moment. A solitary violinist played a melancholic melody, his notes weaving through the fabric of the bustling metropolis.</p><p class='block-text'>Press the B key.</p>",
    "A": 65
  },
  {
    "Q": "<p class='block-text'>A dense fog draped over the desolate moor, shrouding ancient secrets in its misty embrace. The wind whispered through gnarled trees, carrying echoes of forgotten whispers. If you are reading this, press the A key instead of the L key. A hound's mournful howl pierced the night, a chilling reminder of the untamed wilderness. Looming in the distance, a decaying manor stood as a testament to the passage of time. Shadows danced on the crumbling walls, playing a macabre symphony. Within those eerie halls, the ghosts of the past whispered tales of love and betrayal. A single candle flickered, casting flickering shadows that seemed to breathe with a life of their own.</p><p class='block-text'>Press the L key.</p>",
    "A": 65
  },
  {
    "Q": "<p class='block-text'>In a distant galaxy, beyond the reaches of imagination, a cosmic war raged between light and darkness. Brilliant nebulae painted the celestial canvas with vibrant hues, while stars ignited like fiery jewels. If you are reading this, press the U key instead of the Y key. Ancient prophecies echoed through the cosmos, foretelling the rise of a chosen hero. Planets aligned in a cosmic dance, their gravitational forces shaping destinies. A spaceship soared through the infinite expanse, its engines humming with untamed power. Alien races collided, their clash echoing through the vacuum of space. In this astral battlefield, hope flickered like a distant star, casting a glimmer of light in the midst of chaos.</p><p class='block-text'>Press the Y key.</p>",
    "A": 85
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

function assessPerformance() {
  /* Function to calculate the "creditVar", which is a boolean used to
  credit individual experiments in expfactory. */

  var experimentData = jsPsych.data.get().filter({ trial_id: "test_trial" }).values();
  var filteredData = [];

  for (var i = 0; i < experimentData.length; i++) {
    filteredData.push({
      rt: experimentData[i].rt,
      response: experimentData[i].response,
      correct_response: experimentData[i].correct_response,
      go_nogo_condition: experimentData[i].go_nogo_condition,
    });
  }

  var missedCount = 0;
  var trialCount = 0;
  var rtArray = [];
  var rt = 0;
  var correct = 0;
  // record choices participants made
  var choiceCounts = {};
  choiceCounts[null] = 0;
  choiceCounts[goResponse] = 0;

  for (var i = 0; i < filteredData.length; i++) {
    trialCount += 1;
    key = filteredData[i].response;
    choiceCounts[key] += 1;
    if (filteredData[i].go_nogo_condition == "go") {
      if (filteredData[i].response == filteredData[i].correct_response) {
        correct += 1;
      }
      if (filteredData[i].rt == null) {
        missedCount += 1;
      } else {
        rt = filteredData[i].rt;
        rtArray.push(rt);
      }
    } else if (filteredData[i].go_nogo_condition == "nogo") {
      if (filteredData[i].rt == null) {
        correct += 1;
      } else {
        rt = filteredData[i].rt;
        rtArray.push(rt);
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
      if (choiceCounts[key] > trialCount * 0.95) {
        responsesOK = false;
      }
    });
    var missedPercent = missedCount / trialCount;
    var accuracy = correct / trialCount;
    creditVar = missedPercent < 0.25 && avgRT > 200 && accuracy > 0.6;
    jsPsych.data.get().addToLast({
      final_credit_var: creditVar,
      final_missed_percent: missedPercent,
      final_avg_RT: avgRT,
      final_responses_OK: responsesOK,
      final_accuracy: accuracy,
    });
  }
}

/* Append gap and current trial to data and then recalculate for next trial*/
var appendData = function(data) {
  var currentTrial = jsPsych.data.get().last().trials[0];
  var correctTrial = 0;
  if (currentTrial.response == correctResponse) {
    correctTrial = 1;
  }
  jsPsych.data.get().addToLast({
    correct_trial: correctTrial,
  });
  currentTrial += 1;
};

var getFeedback = function() {
  if (stim.key_answer == "NO_KEYS") {
    return (
      "<div class = centerbox><div class = center-text>Correct!</div></div>" +
      promptTextList
    );
  } else {
    return (
      "<div class = centerbox><div class = center-text>The shape was outlined</div></p></div>" +
      promptTextList
    );
  }
};

var getFeedback = function() {
  return (
    "<div class = bigbox><div class = picture_box><p class = block-text>" +
    feedbackText +
    "</font></p></div></div>"
  ); // <font color="white">
};

var getInstructFeedback = function() {
  return (
    "<div class = centerbox><p class = center-block-text>" +
    feedbackInstructText +
    "</p></div>"
  );
};

var getStim = function() {
  stim = blockStims.pop();
  correctResponse = stim.data.correct_response;
  return stim.stimulus;
};

var getData = function() {
  stimData = stim.data;
  return stimData;
};


/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// common variables
const fixationDuration = 500;
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

// generic task variables
var runAttentionChecks = true;
// var attentionCheckThresh = 0.45;
var sumInstructTime = 0; // ms
var instructTimeThresh = 0; // /in seconds
var creditVar = 0;
var goResponse = " "; // space bar

// task specific variables
var numGoStim = 6; // per one no-go stim
var correctResponses = [
  ["go", goResponse],
  ["nogo", null],
];

// var stims = jsPsych.randomization.shuffle([["orange", "stim1"],["blue","stim2"]])
var stims = [
  ["solid black", "stim1"],
  ["outlined white", "stim2"],
]; // solid and outlined squares used as stimuli for this task are not png files as in some others, but they are defined in style.css
// var gap = 0;
varcurrentTrial = 0;
var practiceStimuli = [
  {
    // To change go:nogo ratio, add or remove one or more sub-dictionaries within practiceStimuli and testStimuliBlock
    stimulus:
      "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text><div id = " +
      stims[1][1] +
      "></div></div></div></div></div>",
    data: {
      correct_response: correctResponses[1][1],
      go_nogo_condition: correctResponses[1][0],
      trial_id: "practice_trial",
    },
    key_answer: correctResponses[1][1],
  },
].concat(
  Array(numGoStim).fill({
    stimulus:
      "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text><div  id = " +
      stims[0][1] +
      "></div></div></div></div></div>",
    data: {
      correct_response: correctResponses[0][1],
      go_nogo_condition: correctResponses[0][0],
      trial_id: "practice_trial",
    },
    key_answer: correctResponses[0][1],
  })
);

// set up block stim. test_stim_responses indexed by [block][stim][type]
var testStimuliBlock = [
  {
    stimulus:
      "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text><div id = " +
      stims[1][1] +
      "></div></div></div></div></div>",
    data: {
      correct_response: correctResponses[1][1],
      go_nogo_condition: correctResponses[1][0],
      trial_id: "test_trial",
    },
  },
].concat(
  Array(numGoStim).fill({
    stimulus:
      "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text><div  id = " +
      stims[0][1] +
      "></div></div></div></div></div>",
    data: {
      correct_response: correctResponses[0][1],
      go_nogo_condition: correctResponses[0][0],
      trial_id: "test_trial",
    },
  })
);

var accuracyThresh = 0.75;
var rtThresh = 1000;
var missedResponseThresh = 0.1;

var practiceLen = 7;
var practiceThresh = 3;
var numTrialsPerBlock = 70; // multiple of 7 (6go:1nogo)
var numTestBlocks = 3;

numTrialsPerBlock = numTrialsPerBlock / 2

const totalTrialDuration = (fixationDuration + stimTrialDuration + (meanITI * 1000))
const numTrialsTotal = numTestBlocks * numTrialsPerBlock;

console.log(`

TRIAL PROPORTIONS:
------------------------
7 NO-GO: 1 GO
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
  "<li>" +
  stims[0][0] +
  " square: respond</li>" +
  "<li>" +
  stims[1][0] +
  " square: do not respond</li>" +
  "</ul>";

var promptText =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">' +
  stims[0][0] +
  " square: spacebar</p>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">' +
  stims[1][0] +
  " square: do not respond</li>";
("</div>");

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



/* define static blocks */
var feedbackInstructText =
  "<p class=center-block-text>Welcome! This experiment will take around 15 minutes.</p>" +
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
// TODO: add missed count in assess performance
var instructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: "instructions",
  },
  pages: [
    "<div class = centerbox>" +
    "<p class = block-text>Please place your <b>index finger</b> on the <b>space bar</b>.</p>" +
    "<p class = block-text>In this experiment, " +
    stims[0][0] +
    " and " +
    stims[1][0] +
    " squares will appear on the screen. </p>" +
    "<p class = block-text>If you see the <b>" +
    stims[0][0] +
    " square</b>, you should respond by <b>pressing the spacebar as quickly as possible</b>. </p>" +
    "<p class = block-text>If you see the <b>" +
    stims[1][0] +
    " square</b>, you should <b>not respond</b>.</p>" +
    speedReminder +
    "<p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>" +
    "</div>",
  ],
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
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



var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";
var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "feedback",
  },
  choices: ["Enter"],
  stimulus: getFeedback,
  post_trial_gap: 0,
  trial_duration: 180000,
  response_ends_trial: true,
};

var fixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: {
    trial_id: "fixation",
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration,
  trial_duration: fixationDuration,
};

var promptFixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: "none",
  data: {
    trial_id: "prompt_fixation",
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration,
  trial_duration: fixationDuration,
  prompt: promptText,
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
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ''
    }
  },
  trial_duration: function() {
    var ITIms = sampleFromDecayingExponential();
    return ITIms * 1000;
  },
};

// / need to put these in a function because it has to call jsPsych-dependent stuff
var practiceTrials = [];
for (var i = 0; i < practiceLen; i++) {
  var practiceBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: function() {
      return Object.assign(getData(), { exp_stage: "test" });
    },
    choices: [goResponse],
    stimulus_duration: stimStimulusDuration, // 1000,
    trial_duration: stimTrialDuration, // 2000
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
    prompt: promptText,
  };

  var practiceFixationBlock = {
    // adding this and shortening actual trial to 1000ms
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.go_nogo_condition == "go") {
        if (last.response == last.correct_response) {
          return "<div class = center-box><divp class = center-text>Correct!</div></div>";
        } else {
          return "<div class = center-box><div class = center-text>The shape was solid</div></div>";
        }
      } else {
        if (last.response == last.correct_response) {
          return "<div class = center-box><div class = center-text>Correct!</div></div>";
        } else {
          return "<div class = center-box><div class = center-text>The shape was outlined</div></div>";
        }
      }
    },
    data: { trial_id: "practice_post_trial_gap" },
    choices: ["NO_KEYS"],
    prompt: promptText,
    trial_duration: 500,
  };
  practiceTrials.push(
    promptFixationBlock,
    practiceBlock,
    practiceFixationBlock,
    ITIBlock
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

    var totalGoTrials = 0;
    var missedResponse = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "practice_trial") {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
        }
        if (data.trials[i].response == data.trials[i].correct_response) {
          correct += 1;
        }

        if (data.trials[i].go_nogo_condition == "go") {
          totalGoTrials += 1;
          if (data.trials[i].rt == null) {
            missedResponse += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = missedResponse / totalGoTrials;
    var avgRT = sumRT / sumResponses;
    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      feedbackText =
        "<div class = centerbox><p class = block-text>We will now start the test portion.</p>" +
        "<p class = block-text>Remember, keep your index finger on the space bar, and if you see the " +
        stims[0][0] +
        " square you should <i>respond by pressing the spacebar as quickly as possible</i>. " +
        "If you see the " +
        stims[1][0] +
        " square you should <i>not respond</i>.</p><p class = block-text>Press <i>enter</i> to begin.</p></div>";
      blockStims = jsPsych.randomization.repeat(
        testStimuliBlock,
        numTrialsPerBlock / testStimuliBlock.length
      );
      expStage = 'test'
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";

      if (accuracy < accuracyThresh) {
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
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
      feedbackText +=
        "<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p>";
      blockStims = jsPsych.randomization.repeat(
        practiceStimuli,
        practiceLen / practiceStimuli.length
      );
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode)
for (var i = 0; i < numTrialsPerBlock; i++) {
  var testBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: [goResponse],
    data: function() {
      return Object.assign(getData(), { exp_stage: "test" });
    },
    post_trial_gap: 0,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 2000
    response_ends_trial: false,
    on_finish: appendData,
  };
  testTrials.push(fixationBlock, testBlock, ITIBlock);
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
    var totalGoTrials = 0;
    var missedResponse = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "test_trial") {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
        }
        if (data.trials[i].response == data.trials[i].correct_response) {
          correct += 1;
        }
        if (data.trials[i].go_nogo_condition == "go") {
          totalGoTrials += 1;
          if (data.trials[i].rt == null) {
            missedResponse += 1;
          }
        }
      }
    }
    var accuracy = correct / totalTrials;
    var missedResponses = missedResponse / totalGoTrials;
    var avgRT = sumRT / sumResponses;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array


    if (testCount >= numTestBlocks) {
      feedbackText +=
        "</p><p class = block-text>Done with this test. Press <i>enter</i> to continue. <br>If you have been completing tasks continuously for one hour or more, please take a 15-minute break before starting again.";
      return false;
    } else {
      feedbackText =
        "<p>Please take this time to read your feedback and to take a short break! Press <i>enter</i> to continue." +
        "<br>You have completed " +
        testCount +
        " out of " +
        numTestBlocks +
        " blocks of trials.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is too low.  Remember: </p>" +
          promptTextList;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }

      if (avgRT > rtThresh) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      }
      feedbackText +=
        "<p class = block-text>Press <i>enter</i> to continue.</p>";
      blockStims = jsPsych.randomization.repeat(
        testStimuliBlock,
        numTrialsPerBlock / testStimuliBlock.length
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
var expID = 'go_no_go_rdoc'

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

// // initialize the experiment
/* eslint-disable camelcase */
var go_nogo_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var go_nogo_rdoc_init = () => {
  blockStims = jsPsych.randomization.repeat(
    practiceStimuli,
    practiceLen / practiceStimuli.length
  ); // initialize

  go_nogo_rdoc_experiment.push(fullscreen);
  go_nogo_rdoc_experiment.push(instructionNode);
  go_nogo_rdoc_experiment.push(practiceNode);
  go_nogo_rdoc_experiment.push(testNode);
  go_nogo_rdoc_experiment.push(postTaskBlock);
  go_nogo_rdoc_experiment.push(endBlock);
  go_nogo_rdoc_experiment.push(exitFullscreen);
};
