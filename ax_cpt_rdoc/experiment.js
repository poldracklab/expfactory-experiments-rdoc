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
  );
};

var getCondition = function() {
  return currCondition;
};
var getExpStage = function() {
  return expStage;
};

function assessPerformance() {
  var experimentData = jsPsych.data
    .get()
    .filter({ exp_stage: 'test', trial_id: 'probe' }).trials;
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
  // calculate average rt
  var avgRT = null;
  if (rtArray.length !== 0) {
    avgRT = calculateMedian(rtArray);
  }
  // calculate whether response distribution is okay
  var responsesOK = true;
  Object.keys(choiceCounts).forEach(function(key, index) {
    if (choiceCounts[key] > trialCount * 0.85) {
      responsesOK = false;
    }
  });
  var missedPercent = missedCount / trialCount;
  creditVar = missedPercent < 0.4 && avgRT > 200 && responsesOK;
  var accuracy = correct / trialCount;
  jsPsych.data.get().addToLast({
    final_credit_var: creditVar,
    final_missed_percent: missedPercent,
    final_avg_RT: avgRT,
    final_responses_OK: responsesOK,
    final_accuracy: accuracy,
  });
}

function appendData() {
  var data = jsPsych.data.get().last(1).values()[0];

  correctTrial = 0;
  if (data.response == data.correct_response) {
    correctTrial = 1;
  }
  jsPsych.data.get().addToLast({ correct_trial: correctTrial });
}

function calculateMedian(numbers) {
  if (numbers.length === 0) {
    return null; // Return null if the array is empty
  }

  const sortedNumbers = numbers.slice().sort((a, b) => a - b); // Create a sorted copy of the array
  const middleIndex = Math.floor(sortedNumbers.length / 2); // Calculate the middle index

  if (sortedNumbers.length % 2 === 0) {
    // If the array length is even, return the average of the two middle elements
    return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
  } else {
    // If the array length is odd, return the middle element
    return sortedNumbers[middleIndex];
  }
}


var getCue = function() {
  return currCue;
};
var getStim = function() {
  return currStim;
};

var getCurrAttentionCheckQuestion = function() {
  return currentAttentionCheckData.Q
}

var getCurrAttentionCheckAnswer = function() {
  return currentAttentionCheckData.A
}

var setStims = function() {
  currCondition = blockList.pop();

  switch (currCondition) {
    case 'AX':
      currStim = '<div class = centerbox><div class = AX_text>X</div></div>';
      currCue = '<div class = centerbox><div class = AX_text>A</div></div>';
      break;
    case 'BY':
      currStim = getChar();
      currCue = getChar();
      break;
    case 'BX':
      currStim = '<div class = centerbox><div class = AX_text>X</div></div>';
      currCue = getChar();
      break;
    case 'AY':
      currStim = getChar();
      currCue = '<div class = centerbox><div class = AX_text>A</div></div>';
      break;
  }
};

var getChar = function() {
  return (
    '<div class = centerbox><div class = AX_text>' +
    chars[Math.floor(Math.random() * chars.length)] +
    '</div></div>'
  );
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
  '<p class = center-block-text>Press <i>enter</i> to continue.</p>' +
  '</div>'

var feedbackInstructText =
  '<p class=center-block-text>' +
  'Welcome! This experiment will take around 20 minutes.</p>' +
  '<p class=center-block-text> ' +
  'To avoid technical issues,' +
  ' please keep the experiment tab (on Chrome or Firefox)' +
  ' active and fullscreen for the whole duration of each task.</p>' +
  '<p class=center-block-text> Press <i>enter</i> to begin.</p>';

// speed reminder
var speedReminder =
  '<p class = block-text>' +
  'Try to respond as quickly and accurately as possible.</p> ';

/* ******************************* */
/* TASK TEXT */
/* ******************************* */
// rule reminder for practice
// after each block
// eslint-disable-next-line no-unused-vars
var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";

var promptTextList =
  '<ul style="text-align:left;">' +
  '<li>A -> X: ' +
  possibleResponses[0][0] +
  '</li>' +
  '<li>Anything else: ' +
  possibleResponses[1][0] +
  '</li>' +
  '</ul>';

var promptText =
  '<div class = prompt_box>' +
  '<p class = center-block-text ' +
  'style = "font-size:16px; line-height:80%%;">A -> X: ' +
  possibleResponses[0][0] +
  '</li>' +
  '<p class = center-block-text' +
  'style = "font-size:16px; line-height:80%%;">Anything else: ' +
  possibleResponses[1][0] +
  '</li>' +
  '</div>';

var pageInstruct = [
  '<div class = centerbox>' +
  '<p class=block-text>Place your <b>' +
  possibleResponses[0][0] +
  '</b> on the <b>' +
  possibleResponses[0][2] +
  '</b> and your <b>' +
  possibleResponses[1][0] +
  '</b> on the <b>' +
  possibleResponses[1][2] +
  '</b> </p>' +
  '<p class = block-text>' +
  'In this task, on each trial you will see ' +
  'a letter presented, a short break, and then a second letter. ' +
  'For instance, you may see "A",' +
  ' which would then disappear to be replaced by "F".</p>' +
  '<p class = block-text>' +
  'Your task is to respond by pressing' +
  ' a button during the presentation of the <b>second</b> letter.' +
  ' If the first letter was an "A" <b>AND</b> ' +
  'the second letter is an "X", press your <b>' +
  possibleResponses[0][0] +
  '</b>. Otherwise, press your <b>' +
  possibleResponses[1][0] +
  '</b>.</p>' +
  '</div>',
  '<div class = centerbox>' +
  '<p class = block-text>' +
  'We\'ll start with a practice round. ' +
  'During practice, you will receive feedback ' +
  'and a reminder of the rules.' +
  ' These will be taken out for test, so make sure you understand' +
  ' the instructions before moving on.</p>' +
  '<p class = block-text>Remember, press your <b>' +
  possibleResponses[0][0] +
  '</b> after you see "A" followed by an "X", and your <b>' +
  possibleResponses[1][0] +
  '</b> for all other combinations.</p>' +
  speedReminder +
  '</div>',
]

/* ******************************* */
/* TIMINGS */
/* ******************************* */
// cue
const cueStimulusDuration = 500;
const cueTrialDuration = 500;
// probe
const probeStimulusDuration = 1000;
const probeTrialDuration = 2000;

// generic task variables
var instructTimeThresh = 1;

/* ******************************* */
/* ATTENTION CHECK STUFF  */
/* ******************************* */
// eslint-disable-next-line no-unused-vars
var runAttentionChecks = true;


/* ******************************* */
/* VALUE THRESHOLDS */
/* ******************************* */

var practiceThresh = 3; // 3 blocks max
var accuracyThresh = 0.75;
var rtThresh = 1000;
var missedResponseThresh = 0.1;

/* ******************************* */
/* CHARACTERS USED  IN TASK */
/* ******************************* */
var chars = 'BCDEFGHIJLMNOPQRSTUVWZ';

// 4: 2: 2: 2
var trialProportions = [
  'AX',
  'AX',
  'AX',
  'AX',
  'BX',
  'BX',
  'AY',
  'AY',
  'BY',
  'BY']

var numTestBlocks = 3;
var numTrialsPerBlock = trialProportions.length * 5; // 50
var practiceLen = trialProportions.length; // 10

// set empty and populate later with current trial data
var currCondition = '';
// eslint-disable-next-line no-unused-vars
var expStage = 'practice';

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */

/* ******************************* */
/* STUFF USED IN ALL TASKS */
/* ******************************* */

var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    '<div class = centerbox><div class = fixation>+</div></div>',
  choices: ['NO_KEYS'],
  data: {
    trial_id: 'fixation',
    exp_stage: 'test',
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration, // 500
  trial_duration: fixationDuration, // 500
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ''
    }
  }
};

var fixation2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    '<div class = centerbox><div class = fixation>+</div></div>',
  choices: ['NO_KEYS'],
  data: {
    trial_id: 'fixation',
    exp_stage: 'test',
  },
  post_trial_gap: 0,
  stimulus_duration: fixationDuration + 2500, // 3000
  trial_duration: fixationDuration + 2500, // 3000
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ''
    }
  }
};

var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class = centerbox><div class = fixation>+</div></div>',
  is_html: true,
  choices: ['NO_KEYS'],
  data: {
    trial_id: 'wait',
  },
  post_trial_gap: 0,
  trial_duration: function() {
    var ITIms = sampleFromDecayingExponential();
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

/* ******************************* */
/* INSTRUCTION STUFF */
/* ******************************* */

var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ['Enter'],
  stimulus: getInstructFeedback,
  data: {
    trial_id: 'instruction_feedback',
  },
  post_trial_gap: 0,
  trial_duration: 180000,
};
var instructionsBlock = {
  type: jsPsychInstructions,
  pages: pageInstruct,
  allow_keys: false, // instead clickable pages
  data: {
    exp_id: expID,
    trial_id: 'instructions',
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
        data.trials[i].trial_id == 'instructions' &&
        data.trials[i].rt != null
      ) {
        rt = data.trials[i].rt;
        sumInstructTime = sumInstructTime + rt;
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedbackInstructText =
        'Read through instructions too quickly.' +
        ' Please take your time and make sure you understand the instructions.' +
        ' Press <i>enter</i> to continue.';
      return true;
    } else {
      feedbackInstructText =
        'Done with instructions. Press <i>enter</i> to continue.';
      return false;
    }
  },
};
/* ******************************* */
/* PRACTICE FEEDBACK STUFF */
/* ******************************* */
var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    var last = jsPsych.data.get().last(1).values()[0];
    if (last.response == null) {
      return (
        '<div class = fb_box>' +
        '<div class = center-text>' +
        '<font size =20>Respond Faster!</font></div></div>'
      );
    } else if (last.correct_trial == 1) {
      return (
        '<div class = fb_box>' +
        '<div class = center-text><font size =20>Correct!</font></div></div>'
      );
    } else {
      return (
        '<div class = fb_box>' +
        '<div class = center-text><font size =20>Incorrect</font></div></div>'
      );
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

var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: 'feedback',
  },
  choices: ['Enter'],
  stimulus: getFeedback,
  post_trial_gap: 1000,
  trial_duration: 180000,
  response_ends_trial: true,
};

/* ******************************* */
/* ATTENTION CHECK STUFF */
/* ******************************* */
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

/* ******************************* */
/* TASK-SPECIFIC STUFF */
/* ******************************* */

var setStimsBlock = {
  type: jsPsychCallFunction,
  func: setStims,
};

/* ******************************* */
/* PRACTICE TRIALS */
/* ******************************* */

/* trial blocks and nodes */
practiceTrials = [];
for (i = 0; i < practiceLen; i++) {
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    is_html: true,
    choices: ['NO_KEYS'],
    data: function() {
      return {
        trial_id: 'cue',
        exp_stage: 'practice',
        condition: getCondition(),
      };
    },
    stimulus_duration: cueStimulusDuration, // 500
    trial_duration: cueTrialDuration, // 500
    response_ends_trial: false,
    post_trial_gap: 0,
    prompt: promptText,
  };
  var probeBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function() {
      return {
        trial_id: 'probe',
        exp_stage: 'practice',
        condition: getCondition(),
        correct_response:
          getCondition() == 'AX' ?
            possibleResponses[0][1] :
            possibleResponses[1][1],
      };
    },
    stimulus_duration: probeStimulusDuration,
    trial_duration: probeTrialDuration,
    post_trial_gap: 0,
    response_ends_trial: false,
    prompt: promptText,
    on_finish: appendData,
  };

  practiceTrials.push(
    setStimsBlock,
    fixation,
    cueBlock,
    fixation2,
    probeBlock,
    practiceFeedbackBlock,
    ITIBlock,
  );
}
/* ******************************* */
/* PRACTICE BLOCKS */
/* ******************************* */

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
      if (data.trials[i].trial_id == 'probe') {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].correct_trial == 1) {
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
        '<p class = center-block-text>We will now start the test portion.</p>' +
        '<p class = center-block-text>Keep your ' +
        possibleResponses[0][0] +
        ' on the ' +
        possibleResponses[0][2] +
        ' and your ' +
        possibleResponses[1][0] +
        ' on the ' +
        possibleResponses[1][2] +
        '</p>' +
        '<p class = center-block-text>' +
        'Press <i>enter</i> to continue.</p></div>';
      blockList = jsPsych.randomization.repeat(trialProportions, numTrialsPerBlock / trialProportions.length);
      expStage = 'test'
      return false;
    } else {
      feedbackText =
        '<p class = block-text>' +
        'Please take this time to read your feedback ' +
        'and to take a short break!</p>';
      if (accuracy < accuracyThresh) {
        feedbackText +=
          '<p class = block-text>Your accuracy is low.  Remember: </p>' +
          promptTextList;
      }
      if (avgRT > rtThresh) {
        feedbackText +=
          '<p class = block-text>' +
          'You have been responding too slowly.' +
          ' Try to respond as quickly and accurately as possible.</p>';
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          '<p class = block-text>You have not been responding to some trials.' +
          ' Please respond on every trial that requires a response.</p>';
      }
      feedbackText +=
        '<p class = block-text>We are going to repeat the practice round now.' +
        ' Press <i>enter</i> to begin.</p>';
      blockList = jsPsych.randomization.repeat(trialProportions, 1);
      return true;
    }
  },
};
/* ******************************* */
/* TEST TRIALS */
/* ******************************* */
var testTrials = [];
testTrials.push(attentionNode)
for (i = 0; i < numTrialsPerBlock; i++) {
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    is_html: true,
    choices: ['NO_KEYS'],
    data: function() {
      return {
        trial_id: 'cue',
        exp_stage: 'test',
        condition: getCondition(),
      };
    },
    stimulus_duration: cueStimulusDuration,
    trial_duration: cueTrialDuration,
    response_ends_trial: false,
    post_trial_gap: 0,
  };
  var probeBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function() {
      return {
        trial_id: 'probe',
        exp_stage: 'test',
        condition: getCondition(),
        correct_response:
          getCondition() == 'AX' ?
            possibleResponses[0][1] :
            possibleResponses[1][1],
      };
    },
    stimulus_duration: probeStimulusDuration,
    trial_duration: probeTrialDuration,
    post_trial_gap: 0,
    response_ends_trial: false,
    on_finish: appendData,
  };
  testTrials.push(
    setStimsBlock,
    fixation,
    cueBlock,
    fixation2,
    probeBlock,
    ITIBlock,
  );
}
/* ******************************* */
/* TEST BLOCKS */
/* ******************************* */
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
        data.trials[i].trial_id == 'probe' &&
        data.trials[i].exp_stage == 'test'
      ) {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].correct_trial == 1) {
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
      feedbackText +=
        '</p><p class = block-text>' +
        'Done with this test. Press <i>enter</i>' +
        ' to continue.</p>';
      return false;
    } else {
      feedbackText =
        '<p class = block-text>' +
        'Please take this time to read your feedback ' +
        'and to take a short break!<br>' +
        'You have completed: ' +
        testCount +
        ' out of ' +
        numTestBlocks +
        ' blocks of trials.</p>';

      if (accuracy < accuracyThresh) {
        feedbackText +=
          '<p class = block-text>Your accuracy is too low.  Remember: <br>' +
          promptTextList;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          '<p class = block-text>' +
          'You have not been responding to some trials.' +
          ' Please respond on every trial that requires a response.</p > ';
      }
      if (avgRT > rtThresh) {
        feedbackText +=
          '<p class = block-text>' +
          'You have been responding too slowly.' +
          'Try to respond as quickly and accurately as possible.</p>';
      }
      if (
        accuracy >= accuracyThresh &&
        missedResponses <= missedResponseThresh &&
        avgRT <= rtThresh
      ) {
        feedbackText += '<p class = block-text>No feedback on this block.</p>';
      }
      feedbackText +=
        '<p class = block-text>Press <i>enter</i> to continue.</p>';
      blockList = jsPsych.randomization.repeat(trialProportions, numTrialsPerBlock / trialProportions.length);
      return true;
    }
  },
};

/* ******************************* */
/* JSPSYCH REQUIRED IN ALL SCRIPTS */
/* ******************************* */

var fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
};
var exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

var expID = 'ax_cpt_rdoc' // for this experiment

// last block in timeline
var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: 'end',
    exp_id: expID,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ['Enter'],
  post_trial_gap: 0,
  on_finish: function() {
    assessPerformance();
    evalAttentionChecks();
  },
};

/* ************************************ */
/* Set up experiment */
/* ************************************ */

/* eslint-disable camelcase */
var ax_cpt_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var ax_cpt_rdoc_init = () => {
  blockList = jsPsych.randomization.repeat(trialProportions, 1);
  ax_cpt_rdoc_experiment.push(fullscreen);
  ax_cpt_rdoc_experiment.push(instructionNode);
  ax_cpt_rdoc_experiment.push(practiceNode);
  ax_cpt_rdoc_experiment.push(testNode);
  ax_cpt_rdoc_experiment.push(endBlock);
  ax_cpt_rdoc_experiment.push(exitFullscreen);
};
