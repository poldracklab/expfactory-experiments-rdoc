
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


function assessPerformance() {
  var experimentData = jsPsych.data
    .get()
    .filter({ trialId: "test_trial" }).trials;
  var missedCount = 0;
  var trialCount = 0;
  var rtArray = [];
  // var rt = 0;
  var correct = 0;
  var allTrials = 0;

  // record choices participants made
  var choiceCounts = {};
  choiceCounts[null] = 0;
  choiceCounts[choices[0]] = 0;
  choiceCounts[choices[1]] = 0;

  for (var i = 0; i < experimentData.length; i++) {
    allTrials += 1;
    key = experimentData[i].response;
    choiceCounts[key] += 1;
    if (experimentData[i].stopSignalCondition == "go") {
      trialCount += 1;
    }
    if (
      experimentData[i].stopSignalCondition == "go" &&
      experimentData[i].rt != null
    ) {
      rtArray.push(experimentData[i].rt);
      if (experimentData[i].response == experimentData[i].correctResponse) {
        correct += 1;
      }
    } else if (
      experimentData[i].stopSignalCondition == "stop" &&
      experimentData[i].rt != null
    ) {
      rtArray.push(experimentData[i].rt);
    } else if (
      experimentData[i].stopSignalCondition == "go" &&
      experimentData[i].rt == null
    ) {
      missedCount += 1;
    }
  }
  // calculate average rt
  var avgRt = null;
  if (rtArray.length !== 0 && rtArray.every((value) => value !== undefined)) {
    avgRt = math.median(rtArray);
  }

  // calculate whether response distribution is okay
  var responsesOk = true;
  Object.keys(choiceCounts).forEach(function(key, index) {
    if (choiceCounts[key] > allTrials * 0.85) {
      responsesOk = false;
    }
  });
  var missedPercent = missedCount / trialCount;
  var accuracy = correct / trialCount;
  var creditVar =
    missedPercent < 0.25 && avgRt > 200 && responsesOk && accuracy > 0.6;
  jsPsych.data.get().addToLast({
    final_credit_var: creditVar,
    final_missed_percent: missedPercent,
    final_avg_RT: avgRt,
    final_responses_OK: responsesOk,
    final_accuracy: accuracy,
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
    } else if (last.response == last.correctResponse) {
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
        correctResponse: possibleResponses[j][1],
        stopSignalCondition: stopSignalsConditions[x],
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
    correctResponse = stim.correctResponse;
    stopSignalCondition = "go";
  } else if (expPhase == "test" || expPhase == "practice2") {
    stim = stims.pop();
    shape = stim.stim;
    correctResponse = stim.correctResponse;
    stopSignalCondition = stim.stopSignalCondition;
    if (stopSignalCondition == "stop") {
      correctResponse = null;
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
      stopSignalCondition: stopSignalCondition,
      correctResponse: correctResponse,
    },
  };
  stimData = stim.data;
  return stim.image;
};

function getSSD() {
  return SSD;
}

function getSSType() {
  return stopSignalCondition;
}

function getCorrectResponse() {
  return correctResponse;
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
  data.correctResponse = correctResponse;
  data.current_block = currBlock;
  data.currentTrial = currentTrial;
  data.stopSignalCondition = stimData.stopSignalCondition;

  var correctCurrent = 0;
  if (data.response == data.correctResponse) {
    correctTrial = 1;
  }
  data.correctTrial = correctCurrent;

  if (expPhase == "test" || expPhase == "practice2") {
    if (data.stopSignalCondition == "stop") {
      if (data.response == null && SSD < maxSSD) {
        data.stop_acc = 1;
        SSD += 50;
      } else if (data.response != null && SSD > minSSD) {
        data.stop_acc = 0;
        SSD -= 50;
      }
    } else if (data.stopSignalCondition == "go") {
      if (data.response == data.correctResponse) {
        data.go_acc = 1;
      } else {
        data.go_acc = 0;
      }
    }
  }
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
const stimTrialDuration = 2000;

// generic task variables
var sumInstructTime = 0; // ms
var instructTimeThresh = 1; // /in seconds
// var credit_var = 0;
var runAttentionChecks = true;

var practiceLen = 18; // must be divisible by shapes.length * stopSignalsConditions.length
var numTrialsPerBlock = 72; // must be divisible by shapes.length * stopSignalsConditions.length
var numTestBlocks = 3;

var practiceThresh = 3; // max number of times to repeat practice
var accuracyThresh = 0.75;
var missedResponseThresh = 0.1;
var rtThresh = 1000;

var SSD = 350;
var maxSSD = 1000;
var minSSD = 0;

currentTrial = 0;
correctResponse = null;
stimData = null;
stopSignalCondition = null;

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
  trial_duration: 180000,
};

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
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
  data: {
    trial_id: "feedback",
  },
  stimulus: getFeedback,
  post_trial_gap: 0,
  trial_duration: 180000,
  choices: ['Enter'],
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

/** ******************************************/
/*				Set up nodes				*/
/** ******************************************/

var practiceStopTrials = [];
for (i = 0; i < practiceLen; i++) {
  var practiceBlock = {
    type: jsPoldracklabStopSignal,
    stimulus: getStim,
    SS_stimulus: getStopStim,
    SS_trial_type: getSSType,
    data: {
      trial_id: "practice_trial",
      exp_stage: "practice",
    },
    choices: choices,
    correct_choice: getCorrectResponse,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 2000
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
    practiceBlock,
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

      if (data.trials[i].stopSignalCondition == "go") {
        goLength += 1;
        if (data.trials[i].rt != null) {
          numGoResponses += 1;
          sumGoRT += data.trials[i].rt;
          if (data.trials[i].response == data.trials[i].correctResponse) {
            sumGoCorrect += 1;
          }
        }
      } else if (data.trials[i].stopSignalCondition == "stop") {
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
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";
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
  var testBlock = {
    type: jsPoldracklabStopSignal,
    stimulus: getStim,
    SS_stimulus: getStopStim,
    SS_trial_type: getSSType,
    data: {
      trial_id: "test_trial",
      exp_stage: "test",
    },
    choices: choices,
    correct_choice: correctResponse,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 2000
    timing_duration: 2000,
    response_ends_trial: false,
    SSD: getSSD,
    SS_duration: 500, // 500
    post_trial_gap: 0,
    on_finish: function(data) {
      appendData(data);
    },
  };
  testTrials.push(fixationBlock, testBlock, ITIBlock);
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
      if (data.trials[i].stopSignalCondition == "go") {
        goLength += 1;
        if (data.trials[i].rt != null) {
          numGoResponses += 1;
          sumGoRT += data.trials[i].rt;
          if (data.trials[i].response == data.trials[i].correctResponse) {
            sumGoCorrect += 1;
          }
        }
      } else if (data.trials[i].stopSignalCondition == "stop") {
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
      "<p>Please take this time to read your feedback and to take a short break! Press <i>enter</i> to continue." +
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
