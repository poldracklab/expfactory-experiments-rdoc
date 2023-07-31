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
attentionCheckData = shuffleChecksArray(attentionCheckData)
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
  choiceCounts[null] = 0;
  choiceCounts[possibleResponses[0][1]] = 0;
  choiceCounts[possibleResponses[1][1]] = 0;
  for (var k = 0; k < possibleResponses.length; k++) {
    choiceCounts[possibleResponses[k][1]] = 0;
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
    final_credit_var: creditVar,
    final_missed_percent: missedPercent,
    final_avg_RT: avgRT,
    final_responses_OK: responsesOK,
    final_accuracy: accuracy,
  });
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

var randomDraw = function(lst) {
  var index = Math.floor(Math.random() * lst.length);
  return lst[index];
};

var createTrialTypes = function(numTrialsPerBlock, delay) {
  firstStims = [];
  var correctResponse;
  var nbackCondition;


  for (var i = 0; i < delay; i++) {
    nbackCondition = "N/A";
    probe = randomDraw(letters);
    correctResponse = possibleResponses[1][1];

    firstStim = {
      n_back_condition: nbackCondition,
      probe: probe,
      correct_response: correctResponse,
      delay: delay,
    };
    firstStims.push(firstStim);
  }
  stims = [];

  for (
    var numIterations = 0;
    numIterations < numTrialsPerBlock / nbackConditions.length;
    numIterations++
  ) {
    for (
      var numNBackConds = 0;
      numNBackConds < nbackConditions.length;
      numNBackConds++
    ) {
      // always sampling nbackcondition, for each stim
      const randomIndex = Math.floor(Math.random() * 4) + 1;

      nbackCondition = nbackConditions[randomIndex];

      stim = {
        n_back_condition: nbackCondition,
        correct_response: nbackCondition == 'match' ? possibleResponses[0][1] : possibleResponses[1][1],
      };
      stims.push(stim);
    }
  }

  stims = shuffleArray(stims);
  stims = firstStims.concat(stims);

  stimLen = stims.length;


  newStims = [];
  for (i = 0; i < stimLen; i++) {
    if (i < delay) {
      stim = stims.shift();
      nbackCondition = stim.n_back_condition;
      probe = stim.probe;
      correctResponse = stim.correct_response;
      delay = stim.delay;
    } else {
      stim = stims.shift();
      nbackCondition = stim.n_back_condition;

      if (nbackCondition == "match") {
        probe = randomDraw([
          newStims[i - delay].probe.toUpperCase(),
          newStims[i - delay].probe.toLowerCase(),
        ]);

        correctResponse = possibleResponses[0][1];
      } else if (nbackCondition == "mismatch") {
        probe = randomDraw(
          "bBdDgGtTvV".split("").filter(function(y) {
            return (
              $.inArray(y, [
                newStims[i - delay].probe.toLowerCase(),
                newStims[i - delay].probe.toUpperCase(),
              ]) == -1
            );
          })
        );

        correctResponse = possibleResponses[1][1];
      }
    }

    stim = {
      n_back_condition: nbackCondition,
      probe: probe,
      correct_response: correctResponse,
      delay: delay,
    };

    newStims.push(stim);
  }
  return newStims;
};



var getStim = function() {
  stim = stims.shift();
  nbackCondition = stim.n_back_condition;
  probe = stim.probe;
  correctResponse = stim.correct_response;
  delay = stim.delay;


  if (probe == probe.toUpperCase()) {
    letterCase = "uppercase";
  } else if (probe == probe.toLowerCase()) {
    letterCase = "lowercase";
  }

  return (
    taskBoards[0] +
    preFileType +
    letterCase +
    "_" +
    probe.toUpperCase() +
    fileTypePNG +
    taskBoards[1]
  );
};


var appendData = function() {
  var currentTrial = jsPsych.data.get().last().trials[0];

  var correctTrial = 0;
  if (currentTrial.response == correctResponse) {
    correctTrial = 1;
  }

  jsPsych.data.get().addToLast({
    n_back_condition: nbackCondition,
    probe: probe,
    correct_response: correctResponse,
    delay: delay,
    letter_case: letterCase,
    correct_trial: correctTrial,
  });
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
var letters = "bBdDgGtTvV".split("");

// *: Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 2000;

// generic task variables
var runAttentionChecks = true;
var sumInstructTime = 0; // ms
var instructTimeThresh = 1;
var creditVar = 0;

var expLen = 198;
var practiceLen = 10;
var numTrialsPerBlock = 11;
var numTestBlocks = expLen / numTrialsPerBlock; //  18 blocks total
numTestBlocks = numTestBlocks / 2; // 9 blocks per condition
var practiceThresh = 3;


function shuffleChecksArray(array) {
  // Create a copy of the original array
  const shuffledArray = [...array];

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


var delays = shuffleArray([1, 2]);
delays = [...delays, ...delays, ...delays]

var delay = 1
var nbackConditions = ["mismatch", "mismatch", "match", "mismatch", "mismatch"]
var stims = createTrialTypes(practiceLen, delay);

var accuracyThresh = 0.75;
var rtThresh = 1000;
var missedResponseThresh = 0.1;

var pathSource = "/static/experiments/n_back_rdoc/images/";
var fileTypePNG = ".png'></img>";
var preFileType =
  "<img class = center src='/static/experiments/n_back_rdoc/images/";



var promptTextList =
  '<ul style="text-align:left;">' +
  "<li>Match the current letter to the letter that appeared some number of trials ago</li>" +
  "<li>If they match, press your " +
  possibleResponses[0][0] +
  "</li>" +
  "<li>If they mismatch, press your " +
  possibleResponses[1][0] +
  "</li>" +
  "</ul>";

var getPromptText = function() {
  return "<div class = prompt_box>" +
    `<p class = center-block-text style = "font-size:16px; line-height:80%%;">Match the current letter to the letter that appeared ${delay} trial ago</p>` +
    '<p class = center-block-text style = "font-size:16px; line-height:80%%;">If they match, press your ' +
    possibleResponses[0][0] +
    "</p>" +
    '<p class = center-block-text style = "font-size:16px; line-height:80%%;">If they mismatch, press your ' +
    possibleResponses[1][0] +
    "</p>" +
    "</div>";
}

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

// IMAGES TO PRELOAD
var pathSource = "/static/experiments/n_back_rdoc/images/";
var lettersPreload = ["B", "D", "G", "T", "V"];
var casePreload = ["lowercase", "uppercase"];
var images = [];

for (i = 0; i < lettersPreload.length; i++) {
  for (x = 0; x < casePreload.length; x++) {
    images.push(pathSource + casePreload[x] + "_" + lettersPreload[i] + ".png");
  }
}
// preload them later when we have access to jsPsych variable

/* ************************************ */
/*          Define Game Boards          */
/* ************************************ */

var taskBoards = [
  "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text>",
  "</div></div></div></div>",
];

/* ************************************ */
/*        Set up jsPsych blocks         */
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



// this also functions as the welcome screen!
var feedbackInstructText =
  "<p class=center-block-text>Welcome! This experiment will take around 5 minutes.</p>" +
  "<p class=center-block-text>To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and fullscreen for the whole duration of each task.</p>" +
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

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: "instructions",
  },
  pages: function() {
    return [
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
      "<p class = block-text>In this task, you will see a letter on each trial.</p>" +
      "<p class = block-text>Your task is to match the current letter to the letter that appeared either 1 or 2 trials ago, depending on the delay given to you for that block. </p>" +
      "<p class = block-text>Press your <b>" +
      possibleResponses[0][0] +
      "</b> if the letters match, and your <b>" +
      possibleResponses[1][0] +
      "</b> if they mismatch.</p>" +
      "<p class = block-text>Your delay (the number of trials ago to which you compare the current letter) will change from block to block. You will be given the delay at the start of every block of trials.</p>" +
      '<p class = block-text>Capitalization does not matter, so "T" matches with "t". The first trial(s) will not match, because there was nothing before it.</p> ' +
      `<p class = block-text><b>Your delay for this practice round is ${delay}</b>.</p>` +
      "</div>",
      "<div class = centerbox>" +
      speedReminder +
      "<p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>" +
      "</div>",
    ]
  },
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

/* This function defines stopping criteria */
var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
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
    trial_id: "practice_fixation",
  },
  trial_duration: fixationDuration, // 500
  stimulus_duration: fixationDuration,
  post_trial_gap: 0,
  prompt: function() {
    if (getExpStage() == 'practice') {
      return getPromptText()
    } else {
      return ''
    }
  },
};

var feedbackText =
  `<p class = center-block-text><br>Press <i>enter</i> to begin practice.</p>`;
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
      return getPromptText()
    } else {
      return ''
    }
  },
  post_trial_gap: 0,
  trial_duration: function() {
    var ITIms = sampleFromDecayingExponential(

    );
    return ITIms * 1000;
  },
};

/* ************************************ */
/*        Set up timeline blocks        */
/* ************************************ */
var practiceTrials = [];
for (i = 0; i < practiceLen + delay; i++) {
  var practiceBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: {
      trial_id: "practice_trial",
      exp_stage: "practice",
    },
    choices: choices,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 2000
    post_trial_gap: 0,
    response_ends_trial: false,
    prompt: getPromptText,
    on_finish: appendData,
  };

  var practiceFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.response == null) {
        return "<div class = fb_box><div class = center-text><font size =20>Respond Faster!</font></div></div>";
      } else if (last.correct_trial == 1) {
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
    prompt: getPromptText,
  };

  practiceTrials.push(
    fixationBlock,
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
    var mismatchPress = 0;

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
        if (data.trials[i].response == possibleResponses[1][1]) {
          mismatchPress += 1;
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;
    var mismatchPercent = mismatchPress / totalTrials;

    console.log(accuracy)
    console.log(missedResponses)
    console.log(avgRT)
    console.log(mismatchPercent)

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {

      if (delay == 2) {
        expStage = 'test'
        delay = delays.shift()
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
          "</p>" +
          "<p class = block-text>Once again, match the current letter to the letter that appeared either 1 or 2 trials ago depending on the delay given to you for each block. " +
          "Press your " +
          possibleResponses[0][0] +
          " if they match, and your " +
          possibleResponses[1][0] +
          " if they mismatch.</p>" +
          "<p class=block-text><b>Your delay for this block is " +
          delay +
          "</b>. Please match the current letter to the letter that appeared <b>" +
          delay +
          "</b> trial(s) ago.</p>" +
          '<p class = block-text>Capitalization does not matter, so "T" matches with "t". The first trial(s) will not match, because there was nothing before it.</p> ' +
          "<p class = block-text>You will no longer see the rules, so memorize the instructions before you continue. Press <i>enter</i> to begin.</p>" +
          "</div>";
        stims = createTrialTypes(numTrialsPerBlock, delay);
      } else {
        delay = 2;
        feedbackText =
          "<div class = centerbox>" +
          "<p class=block-text>Your delay for this block is " +
          delay +
          ". Please match the current letter to the letter that appeared " +
          delay +
          " trial(s) ago.</p><p class=block-text>Press <i>enter</i> to begin.</p></div>";
        stims = createTrialTypes(practiceLen, delay);
        practiceCount = 0
      }
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback and to take a short break!</p>";
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
      if (mismatchPercent >= 0.9) {
        feedbackText +=
          "</p><p class = block-text>Please do not simply press your " +
          possibleResponses[1][0] +
          " to every stimulus. Please try to identify the matches and press your " +
          possibleResponses[0][0] +
          " when they occur.";
      }
      feedbackText +=
        "<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p></div>";
      stims = createTrialTypes(practiceLen, delay);
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode)
for (i = 0; i < numTrialsPerBlock + delay; i++) {
  var testBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: {
      trial_id: "test_trial",
      exp_stage: "test",
    },
    choices: choices,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 2000
    post_trial_gap: 0,
    response_ends_trial: false,
    on_finish: appendData,
  };
  testTrials.push(fixationBlock, testBlock, ITIBlock);
}

testCount = 0; // global
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function(data) {
    testCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;
    var mismatchPress = 0;

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
        if (data.trials[i].response == possibleResponses[1][1]) {
          mismatchPress += 1;
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;
    var mismatchPercent = mismatchPress / totalTrials;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

    delay = delays.shift()

    if (testCount == numTestBlocks) {
      feedbackText =
        '</p><p class = block-text>Done with this test. Press <i>enter</i> to continue.</p>';
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
          "<p class = block-text>You have been responding too slowly.</p>";
      }

      if (mismatchPercent >= 0.9) {
        feedbackText +=
          "<p class = block-text>Please do not simply press your " +
          possibleResponses[1][0] +
          " to every stimulus. Please try to identify the matches and press your " +
          possibleResponses[0][0] +
          " when they occur.</p>";
      }
      feedbackText +=
        "<p class = block-text><i>For the next round of trials, your delay is " +
        delay +
        "</i>.  Press <i>enter</i> to continue.</p>";
      stims = createTrialTypes(numTrialsPerBlock, delay);
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
var expID = 'n_back_rdoc'

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

/* ************************************ */
/*          Set up Experiment           */
/* ************************************ */
/* eslint-disable camelcase */
// var delay;
// var delays;
var n_back_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var n_back_rdoc_init = () => {
  jsPsych.pluginAPI.preloadImages(images);
  n_back_rdoc_experiment.push(fullscreen);
  n_back_rdoc_experiment.push(instructionNode);
  // practice node 1 - delay 1
  n_back_rdoc_experiment.push(practiceNode);
  // practice node 2 - delay 2
  n_back_rdoc_experiment.push(practiceNode);

  // test node, 1 then 2
  for (var i = 0; i < numTestBlocks; i++) {
    n_back_rdoc_experiment.push(testNode);
  }

  // post task
  n_back_rdoc_experiment.push(endBlock);
  n_back_rdoc_experiment.push(exitFullscreen);
};
