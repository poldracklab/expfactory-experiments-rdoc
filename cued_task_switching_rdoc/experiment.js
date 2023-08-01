// TODO: check -- this had +1 for practiceLen and numTrialsPerBlock in practiceTrials and testTrials

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
// Sets the cue-target-interval for the cue block
var setCTI = function() {
  return CTI;
};

var getCTI = function() {
  return CTI;
};

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
    final_credit_var: creditVar,
    final_missed_percent: missedPercent,
    final_avg_RT: avgRT,
    final_responses_OK: responsesOK,
    final_accuracy: accuracy,
  });
}

/* Append gap and current trial to data and then recalculate for next trial*/
var appendData = function() {
  var currTrial = jsPsych.getProgress().current_trial_global;
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
    '<div class = upperbox><div class = "center-text" style="color:black;" >' +
    currCue +
    '</div></div>' +
    '<div class = lowerbox><div class = fixation>+</div></div>';
  return cueHTML;
};

var getStim = function() {
  var stimHTML =
    '<div class = upperbox><div class = "center-text" style="color:black;" >' +
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
var instructTimeThresh = 1; // /in seconds
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

var practiceStims = genStims(practiceLen);
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
  '</b> on the <b>' +
  possibleResponses[0][2] +
  '</b> and your <b>' +
  possibleResponses[1][0] +
  '</b> on the <b>' +
  possibleResponses[1][2] +
  '</b> </p>' +
  '<p class = block-text>Your response will depend on the current task, which can change each trial. On some trials, you will have to indicate whether the number is <b>even or odd</b>, and on other trials you will indicate whether the number is <b>higher or lower than 5</b>.' +
  ' Each trial will start with a cue telling you which task to do on that trial.</p>' +
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
testTrials.push(attentionNode)
for (i = 0; i < numTrialsPerBlock; i++) {
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

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array



    if (testCount >= numTestBlocks) {
      feedbackText =
        '</p><p class = block-text>Done with this test. Press <i>enter</i> to continue.</p>';
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
  cued_task_switching_rdoc_experiment.push(endBlock);
  cued_task_switching_rdoc_experiment.push(exitFullscreen);
};
