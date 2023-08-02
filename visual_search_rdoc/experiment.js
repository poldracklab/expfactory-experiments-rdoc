/* ************************************ */
/* Define helper functions */
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



function assessPerformance() {
  var experimentData = jsPsych.data
    .get()
    .filter({ exp_stage: "test", trial_id: "stim" }).trials;
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
    final_credit_var: creditVar,
    final_missed_percent: missedPercent,
    final_avg_RT: avgRT,
    final_responses_OK: responsesOK,
    final_accuracy: accuracy,
  });
}

const nArray = [8, 24]
var randomIndex = Math.floor(Math.random() * nArray.length);
var n = nArray[randomIndex]


var trialTargetPresent;
function getStim() {
  const containerWidth = window.innerWidth * 0.7; // Adjusted width (90% of window width)
  const containerHeight = window.innerHeight * 0.7; // Adjusted height (90% of window height)
  const boxWidth = 40;
  const boxHeight = 80; // Adjust the height as desired

  const targetIndex = Math.floor(Math.random() * n); // Randomly select an index for the target div
  const targetPresent = isTargetPresent();
  trialTargetPresent = targetPresent
  const html = generateHTML(containerWidth, containerHeight, targetPresent, targetIndex, boxWidth, boxHeight);

  return html;
}

function isTargetPresent() {
  return Math.random() < 0.5; // Modify the condition for your target logic
}



function generateHTML(containerWidth, containerHeight, targetPresent, targetIndex, boxWidth, boxHeight) {
  let html;

  html = '<div class="container" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: ' + containerWidth + 'px; height: ' + containerHeight + 'px;">';
  const positions = [];
  let rows;
  let cols;

  if (n === 8) {
    rows = 4;
    cols = 2;
  } else if (n === 24) {
    rows = 6;
    cols = 4;
  } else {
    throw new Error('Invalid value of n. Only 8 or 24 is supported.');
  }

  const spacingX = (containerWidth - cols * boxWidth) / (cols + 1);
  const spacingY = (containerHeight - rows * boxHeight) / (rows + 1);

  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const left = spacingX * (col + 1) + col * boxWidth;
    const top = spacingY * (row + 1) + row * boxHeight;

    positions.push({ left, top });

    if (i === targetIndex && targetPresent) {
      html += generateTargetElement(left, top, boxWidth, boxHeight);
    } else {
      html += generateDistractorElement(left, top, boxWidth, boxHeight);
    }
  }

  html += '</div>';

  return html;
}


function generateTargetElement(left, top, width, height) {
  return '<div id="target" class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px; height: ' + height + 'px; background-color: white;"></div>';
}

function generateDistractorElement(left, top, width, height) {
  if (getCurrBlockType() === 'color') {
    return '<div id="black-distractor-element" class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px; height: ' + height + 'px; background-color: black;"></div>';
  } else if (getCurrBlockType() === 'orientation') {
    return '<div class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px; height: ' + height + 'px; background-color: white; transform: rotate(90deg); transform-origin: center;"></div>';
  } else if (getCurrBlockType() === 'conjunction') {
    if (Math.random() < 0.5) {
      return '<div id="white-distractor-element"  class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px; height: ' + height + 'px; background-color: white; transform: rotate(90deg); transform-origin: center;"></div>';
    } else {
      return '<div id="black-distractor-element"  class="box" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px; height: ' + height + 'px; background-color: black;"></div>';
    }
  }
}


var getExpStage = function() {
  return expStage;
};


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
  'Welcome! This experiment will take around 15 minutes.</p>' +
  '<p class=center-block-text>' +
  'To avoid technical issues, ' +
  'please keep the experiment tab (on Chrome or Firefox)' +
  ' active and fullscreen for the whole duration of each task.</p>' +
  '<p class=center-block-text> Press <i>enter</i> to begin.</p>';

// speed reminder
var speedReminder =
  '<p class = block-text>' +
  'Try to respond as quickly and accurately as possible.</p> ';
// generic task variables
// const runAttentionChecks = false;
// const attention_check_thresh = 0.65;
const stimStimulusDuration = 2000;
const stimTrialDuration = 2000;
const conditions = ['color', 'conjunction']
conditions.sort(() => Math.random() - 0.5);
// Remove one element without replacement
var blockType = conditions[0];


// eslint-disable-next-line no-unused-vars
var runAttentionChecks = true;
var numConditions = 2;

const instructTimeThresh = 1; // /in seconds
let sumInstructTime = 0; // ms
const accuracyThresh = 0.6;
const rtThresh = 1000;
const missedResponseThresh = 0.1;
// practice
var practiceLen = 6; // num practice trials for each block in each condition
var numTrialsPerBlock = 32; // num test trials for each block in each condition
const numTestBlocks = 3;


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

var promptTextList =
  '<ul style="text-align:left;font-size: 24px;">' +
  "<li>" +
  'Target present: press your ' +
  possibleResponses[0][0] +
  "</li>" +
  "<li>" +
  'Target absent: press your ' +
  possibleResponses[1][0] +
  "</li>" +
  "</ul>";


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
  "<p class=center-block-text>Welcome! This experiment will take around 10 minutes.</p>" +
  "<p class=center-block-text>To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and fullscreen for the whole duration of each task.</p>" +
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
  stimulus_duration: stimStimulusDuration, // 2000,
  trial_duration: stimTrialDuration, // 2000
  post_trial_gap: 0,
  response_ends_trial: false,
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ""
    }
  },
  data: {
    trial_id: "stim",
  },
  on_finish: function(data) {
    data['target_present'] = trialTargetPresent ? 1 : 0
    data['num_stimuli'] = n;
    data['block_type'] = getCurrBlockType()
    data['exp_stage'] = getExpStage()
    if (data.response !== null) {
      if (trialTargetPresent) {
        if (data.response == possibleResponses[0][1]) {
          data['correct_response'] = 1
        } else {
          data['correct_response'] = 0
        }
      } else {
        if (data.response == possibleResponses[0][1]) {
          data['correct_response'] = 0
        } else {
          data['correct_response'] = 1
        }
      }
    } else {
      data['correct_response'] = null
    }
    randomIndex = Math.floor(Math.random() * nArray.length);
    n = nArray[randomIndex]
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
    "<p class = block-text>In this task, you will be presented with a series of rectangles on the screen. The rectangles can be either black or white in color.</p>" +
    "<p class = block-text>On some trials, <b>one</b> of these rectangles will be a <b>vertical white rectangles</b>. We will call this rectangle the 'target'.</p>" +
    "<p class = block-text>Your task is to determine whether a target is present or absent on each trial.</p>" +
    "<p class=block-text>If you determine a target is <b>present</b>, press your <b>" +
    possibleResponses[0][0] +
    "</b>, and if you determine a target is <b>absent</b>, press your <b>" +
    possibleResponses[1][0] +
    "</b>.</p>" +
    "</div>",
    "<div class = centerbox>" +
    "<p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>" +
    speedReminder +
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
  trialDuration: 180000,
  response_ends_trial: true,
};

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
    // ^ changed since we added a fixation block after response block\
    console.log(last)
    if (last.response == null) {
      return '<div class = centerbox><p class = center-block-text>Respond Faster!</div></div>'
    }
    if (last.correct_response == 1) {
      return '<div class = centerbox><p class = center-block-text>Correct!</div></div>'
    } else if (last.correct_response == 0) {
      return '<div class = centerbox><p class = center-block-text>Incorrect!</div></div>'
    }
  },
  data: {
    exp_stage: "practice",
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
for (let i = 0; i < practiceLen; i++) {
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
      if (data.trials[i].exp_stage == 'practice' && data.trials[i].block_type == getCurrBlockType()) {
        if (data.trials[i].trial_id == "stim") {
          totalTrials += 1;
          if (data.trials[i].rt != null) {
            sumRT += data.trials[i].rt;
            sumResponses += 1;
            if (data.trials[i].correct_response == 1) {
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
testTrials.push(attentionNode)
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
      if (data.trials[i].exp_stage == 'test' && data.trials[i].block_type == getCurrBlockType()) {
        if (data.trials[i].trial_id == "stim") {
          totalTrials += 1;
          if (data.trials[i].rt != null) {
            sumRT += data.trials[i].rt;
            sumResponses += 1;
            if (data.trials[i].correct_response == 1) {
              correct += 1
            }
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array


    if (testCount == numTestBlocks) {
      if (getCurrBlockType() == conditions[0]) {
        practiceCount = 0;
        testCount = 0;
        expStage = 'practice'
        feedbackText =
          "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice for the next block.</p></div>"
      } else if (getCurrBlockType() == conditions[1]) {
        practiceCount = 0;
        testCount = 0;
        expStage = 'practice'
        feedbackText =
          "<div class = centerbox><p class = center-block-text>Done this experiment. Press <i>enter</i> to exit.</p></div>"
      }
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>" +
        "<p class=block-text>You have completed: " +
        testCount +
        " out of " +
        numTestBlocks +
        " blocks of trials.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is low.  Remember: </p>" +
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

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: "visual_search_rdoc",
  },
  trialDuration: 180000,
  stimulus: endText,
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
  for (let i = 0; i < numConditions; i++) {

    visual_search_rdoc_experiment.push(practiceNode);
    visual_search_rdoc_experiment.push(testNode);
  }
  visual_search_rdoc_experiment.push(endBlock);
  visual_search_rdoc_experiment.push(exitFullscreen);
};
