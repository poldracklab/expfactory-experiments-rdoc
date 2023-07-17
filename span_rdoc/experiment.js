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


function assessPerformance() {
  var experimentData = jsPsych.data
    .get()
    .filter({ exp_stage: "test", trial_id: "response" }).trials;
  var missedCount = 0;
  var trialCount = experimentData.length;
  var rtArray = [];
  var correct = 0;

  for (var i = 0; i < experimentData.length; i++) {
    correct += experimentData[i].correct_trial;
    missedCount += experimentData[i].response == null;
    rtArray.push(experimentData[i].rt);
  }
  var avgRT = math.median(rtArray);
  var missedPercent = missedCount / trialCount;
  var accuracy = correct / trialCount;

  var equations = jsPsych.data
    .get()
    .filter({ exp_stage: "test", trial_id: "equation" }).trials;
  var equationCount = equations.length;
  var equationCorrect = 0;
  var missedEquations = 0;
  var complexCount = 0;

  for (var i = 0; i < equations.length; i++) {
    equationCorrect += equations[i].correct_trial;
    missedEquations += equations[i].response == null;
    if (equations[i].equationType == 'complex') {
      complexCount += 1
    }
  }

  var equationAccuracy = equationCorrect / equationCount;
  var equationMissed = missedEquations / equationCount;

  creditVar = missedPercent < 0.3 && avgRT > 200 && equationMissed < 0.3;
  jsPsych.data.get().addToLast({
    final_credit_var: creditVar,
    final_missed_percent: missedPercent,
    final_avg_RT: avgRT,
    final_accuracy: accuracy,
    final_equation_accuracy: equationAccuracy,
    final_equation_missed_percent: equationMissed,
    final_num_complex_equation: complexCount
  });
}

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
  // Create a copy of the original array to avoid modifying it directly
  const shuffledArray = array.slice();

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

var setBlocks = function() {
  if (getCurrBlockType() == conditions[0]) {
    feedbackText =
      "<div class = centerbox><p class = center-block-text>Done this condition. Moving onto next task. Press <i>enter</i> to continue.</p>" +
      '</div>';
    blockType = conditions[1]
    expStage = 'practice'
    testCount = 0;
    equationTruthList = generateEquationTruthList(practiceLen * numStimuli)
    equations = generateEquations(practiceLen * numStimuli, equationTruthList)
  } else {
    feedbackText =
      "<div class = centerbox><p class = center-block-text>Done this task. Press <i>enter</i> to continue.</p>" +
      '</div>';
  }
}

var getStim = function() {
  const stim = trialStimuli.shift()
  const stimHTML = `<div class = centerbox><div class = center-text>${stim}</div></div>`
  return stimHTML
}

// var getStim = function() {
//   const randomIndex = Math.floor(Math.random() * possibleStimuli.length);
//   const randomValue = possibleStimuli[randomIndex];
//   const randomValueHTML = `<div class = centerbox><div class = center-text>${randomValue}</div></div>`
//   return randomValueHTML
// }

var getRandomEquation = function() {
  const stim = equations.shift()
  equationAns = equationTruthList.shift()
  return `<div class=centerbox><div class=center-text>${stim}</div></div>`
}

var submittedAnswers;

var generateGrid = function() {
  possibleStimuli = shuffleArray(possibleStimuli); // Assuming `possibleStimuli` is a global array
  const randomIndex = Math.floor(Math.random() * possibleStimuli.length);
  let activeIndex = randomIndex;
  const activeBoxes = [];

  let html = '<div class="container">';
  possibleStimuli.forEach(function(letter, index) {
    if (index === randomIndex) {
      html += '<div class="box active-box">' + letter + '</div>';
      activeBoxes.push(letter);
    } else {
      html += '<div class="box">' + letter + '</div>';
    }
  });
  html += '</div>';

  let spacebarCount = 0;
  const selectedIndexes = [];

  function handleKeyDown(event) {
    if (spacebarCount === 4) {
      return; // Ignore any key presses after spacebarCount reaches 4
    }

    const key = event.key;
    const container = document.querySelector(".container");
    const boxes = container.querySelectorAll(".box");

    // Remove active-box class from all boxes
    boxes.forEach(function(box) {
      box.classList.remove("active-box");
    });

    // Update activeIndex based on arrow key input
    let newActiveIndex = activeIndex;
    if (key === "ArrowLeft" && activeIndex % 4 !== 0) {
      newActiveIndex = activeIndex - 1;
    } else if (key === "ArrowRight" && activeIndex % 4 !== 3) {
      newActiveIndex = activeIndex + 1;
    } else if (key === "ArrowUp" && activeIndex >= 4) {
      newActiveIndex = activeIndex - 4;
    } else if (key === "ArrowDown" && activeIndex < 12) {
      newActiveIndex = activeIndex + 4;
    }

    if (newActiveIndex !== activeIndex) {
      activeIndex = newActiveIndex;
      boxes[activeIndex].classList.add("active-box"); // Add active-box class for arrow key navigation
    }

    if (key === " ") {
      // Perform action when spacebar is pressed
      if (selectedIndexes.includes(activeIndex)) {
        return; // Ignore if the box was already selected
      }

      if (spacebarCount < 4) {
        boxes[activeIndex].classList.add("spacebar-box"); // Add spacebar-box class for spacebar selection
        activeBoxes.push(possibleStimuli[activeIndex]);
        selectedIndexes.push(activeIndex);
        spacebarCount++;
      }

      if (spacebarCount === 4) {
        console.log("Active boxes:", activeBoxes);
        submittedAnswers = activeBoxes;
        // Reset the event listener or perform any other necessary action
      }
    }
  }

  // Attach the event listener
  document.addEventListener("keydown", handleKeyDown);

  function resetGrid() {
    activeBoxes.length = 0; // Clear the activeBoxes array
    selectedIndexes.length = 0; // Clear the selectedIndexes array
    spacebarCount = 0;

    // Remove the event listener
    document.removeEventListener("keydown", handleKeyDown);

    // Clear any remaining state or perform other necessary actions
  }

  return { html, resetGrid };
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

var getCurrSeq = function() {
  return currSeq;
};
var getCurrBlockType = function() {
  return blockType;
};

var getExpStage = function() {
  return expStage;
};

function sampleLetters(characters, sampleSize) {
  const sampledLetters = [];

  // Make a copy of the characters array to avoid modifying the original
  const availableLetters = [...characters];

  for (let i = 0; i < sampleSize; i++) {
    // Generate a random index within the available letters
    const randomIndex = Math.floor(Math.random() * availableLetters.length);

    // Extract and remove the letter at the random index
    const sampledLetter = availableLetters.splice(randomIndex, 1)[0];

    // Add the sampled letter to the result array
    sampledLetters.push(sampledLetter);
  }

  return sampledLetters;
}


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

var spanResponses = ['left arrow key', 'right arrow key', 'up arrow key', 'down arrow key', 'spacebar']
// *Timing:
// stimulus and fixaiton
const stimStimulusDuration = 1000;
const stimTrialDuration = 2000;
// equation
const equationStimulusDuration = 3000;
const equationTrialDuration = 3000;
// wait block (fixation or equation)
const responseBlockDuration = 10000;
const numStimuli = 4;

// generic task variables
var runAttentionChecks = true;
// var attention_check_thresh = 0.65;
var sumInstructTime = 0; // ms
var instructTimeThresh = 0; // /in seconds

var accuracyThresh = 0.6;
var missedResponseThresh = 0.1;
var practiceThresh = 3;
var equationChoices = ["t", "f"];


var possibleStimuli = "BCDFGJKLMNPSTVXZ".split("");
var trialStimuli = [];

var practiceLen = 4;
var numTrialsPerBlock = 12;
var numTestBlocks = 3;

const conditions = ['simple', 'operation']
conditions.sort(() => Math.random() - 0.5);

var blockType = conditions[0]


const numTrialsTotal = numTestBlocks * numTrialsPerBlock;
const totalTrialDuration = fixationDuration + stimTrialDuration + equationTrialDuration + meanITI * 1000 + responseBlockDuration

console.log(`
TOTAL DURATION OF A TRIAL:
------------------------
- Fixation: ${fixationDuration} ms
- Stimulus duration: ${stimTrialDuration} ms
- Equation duration: ${equationTrialDuration} ms
- Average ITI duration: ${meanITI * 1000} ms
- Response block: ${responseBlockDuration}
------------------------
${totalTrialDuration} ms

NUMBER OF PRACTICE TRIALS:
------------------------
${practiceLen} (for span or operation)
${practiceLen * 3} (max for span or operation)
${practiceLen * 2 * 3} (max for both span and operation)

NUMBER OF TEST TRIALS: 
------------------------
${numTrialsPerBlock} (1 block)
${numTrialsPerBlock * 3} (3 block per span/operation)
${numTrialsPerBlock * 3 * 2} (6 block total)


TOTAL DURATIONS:
------------------------

# PRACTICE:

(${practiceLen} trials * ${totalTrialDuration}ms per trial) 
= ${practiceLen * totalTrialDuration / 1000 / 60} min per block
= ${practiceLen * totalTrialDuration / 1000 / 60 * 3} max (3 blocks per span/operation)
= ${practiceLen * totalTrialDuration / 1000 / 60 * 3 * 2} max (6 blocks total)

# TEST: 

(${numTrialsTotal} trials * ${numTestBlocks} blocks * ${totalTrialDuration} ms per trial) 
= ${numTrialsTotal * totalTrialDuration / 1000 / 60} min
= ${numTrialsTotal * totalTrialDuration / 1000 / 60 * 2} min total (all trials for all test blocks of both span and operation)

`);

// important variables used throughout
var expStage = "practice";
var currSeq = [];


var practicePromptText =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Memorize all the letters!</p>' +
  "</div>";

var promptText =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Memorize all the letters!</p>' +
  "<p class = center-block-text style = \"font-size:16px; line-height:80%%;\">Equations: 'T' for True and 'F' for False.</p>" +
  "</div>";

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

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructionsBlock = {
  type: jsPsychInstructions,
  pages: [
    '<div class="centerbox">' +
    '<p class="block-text">In this task, you will be presented with a sequence of letters. Each letter will appear one at a time, and a fixation symbol ' + ' will appear between each letter.</p>' +
    '<p class="block-text">After each trial, a grid will appear with 16 letters on it. Your goal is to move through the grid using the left, right, up, and down arrow keys to select the letters in the order they appeared during the trial.</p>' +
    '<p class="block-text">To select a letter, press the spacebar.</p>' + '</div>',
    '<div class="centerbox">' +
    "<p class = block-text>On some trials, the '+' in between each letter will be replaced by a mathematical equation. You will have a few seconds to decide if the equation is true or false.</p>" +
    "<p class = block-text><b>If the equation is true, press the " +
    equationChoices[0] +
    " key. If the equation is false, press the " +
    equationChoices[1] +
    " key.</b></p>" +
    "<p class = block-text>You will still need to remember and report the sequence of letters!</p>" +
    speedReminder +
    '<p class = block-text>We\'ll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>' + '</div>'
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
  trial_duration: 180000,
  response_ends_trial: true,
};

var expStage = 'practice'

var stimulusBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: getStim,
  stimulus_duration: stimStimulusDuration,
  trial_duration: stimTrialDuration,
  post_trial_gap: 0,
  data: function() {
    return {
      trial_id: "stim",
      exp_stage: getExpStage(),
    };
  },
  choices: ["NO_KEYS"],
  prompt: function() {
    if (getExpStage() == 'practice' && getCurrBlockType() == 'operation') {
      return promptText
    }
    if (getExpStage() == 'practice') {
      return practicePromptText
    }
  },
  on_finish: (data) => console.log(extractValueFromHTML(data.stimulus))
};


function generateEquationTruthList(length) {
  const equationTruthList = [];

  for (let i = 0; i < length; i++) {
    const binaryDigit = Math.floor(Math.random() * 2);
    equationTruthList.push(binaryDigit);
  }

  return equationTruthList;
}

var generateEquations = function(length, equationTruthList) {
  var equations = []
  let tempEquation;

  for (let i = 0; i < length; i++) {
    const truthValue = equationTruthList[i]

    let A = Math.floor(Math.random() * 5) + 2;
    let B = Math.floor(Math.random() * (A - 1)) + 1;
    let C = Math.floor(Math.random() * 5) + 1;

    const operator1 = Math.random() < 0.5 ? '+' : '-';
    const operator2 = Math.random() < 0.5 ? '*' : '/';

    let evalValue = eval(`(${A} ${operator1} ${B}) ${operator2} ${C}`)


    if (operator2 === '/') {
      do {
        A = Math.floor(Math.random() * 9) + 2;
        B = Math.floor(Math.random() * (A - 1)) + 1;
        C = Math.floor(Math.random() * 9) + 1;
        evalValue = eval(`(${A} ${operator1} ${B}) ${operator2} ${C}`)
        console.log(evalValue)
      } while (!Number.isInteger(evalValue));
    }


    console.log(evalValue)
    let D;

    if (truthValue === 1) {
      D = evalValue
    } else if (truthValue === 0) {
      D = Math.floor(Math.random() * 9) + 1;
    }

    tempEquation = `Does (${A} ${operator1} ${B}) ${operator2} ${C} = ${D}?`
    equations.push(tempEquation)
  }
  return equations
}

var equationTruthList = generateEquationTruthList(practiceLen * numStimuli)
var equations = generateEquations(practiceLen * numStimuli, equationTruthList)
console.log(equationTruthList)
console.log(equations)

var equationAns;
var equationType = 'complex'


function extractValueFromHTML(html) {
  const divElement = document.createElement('div');
  divElement.innerHTML = html;

  const centerTextElement = divElement.querySelector('.center-text');
  const value = centerTextElement.textContent.trim();

  return value;
}


var waitBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return getCurrBlockType() == "operation"
      ? getRandomEquation()
      : "<div class = centerbox><div class = fixation>+</div></div>";
  },
  choices: function() {
    if (getCurrBlockType() == 'operation') {
      return equationChoices
    } else {
      return ["NO_KEYS"]
    }
  },
  stimulus_duration: equationStimulusDuration,
  trial_duration: equationTrialDuration,
  response_ends_trial: false,
  data: function() {
    return {
      trial_id: getCurrBlockType() == "operation" ? 'equation' : 'simple',
      exp_stage: getExpStage(),
    };
  },
  post_trial_gap: 0,
  on_finish: function(data) {
    var logResponse;
    console.log('equation answer', equationAns)
    if (data.response == 't') {
      if (equationAns == 1) {
        logResponse = 1;
      } else {
        logResponse = 0;
      }
    } else if (data.response == 'f') {
      if (equationAns == 0) {
        logResponse = 1;
      } else {
        logResponse = 0;
      }
    }
    console.log(logResponse)
    data['correct_response'] = logResponse
    data['equationType'] = equationType
  },
  prompt: function() {
    if (getExpStage() == 'practice' && getCurrBlockType() == 'operation') {
      return promptText
    }
    if (getExpStage() == 'practice') {
      return practicePromptText
    }
  },
};

function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

// eslint-disable-next-line no-unused-vars
var activeGrid;

var responseBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    activeGrid = generateGrid()
    return activeGrid.html
  },
  choices: [",", "."],
  data: function() {
    return {
      trial_id: "response",
      exp_stage: getExpStage(),
      correct_response: getCurrSeq(),
    };
  },
  trial_duration: responseBlockDuration,
  stimulus_duration: responseBlockDuration,
  post_trial_gap: 0,
  // prompt: '',
  on_finish: function(data) {
    var stimTrials = jsPsych.data.get().filter({ trial_id: 'stim' }).trials
    var lastTrials = stimTrials.slice(-4);
    var correctAnswerArray = []

    for (let i = 0; i < lastTrials.length; i++) {
      correctAnswerArray.push(extractValueFromHTML(lastTrials[i].stimulus))
    }

    if (submittedAnswers == undefined) {
      data['correct_trial'] = null
    } else {
      if (submittedAnswers.length == 5) {
        submittedAnswers = submittedAnswers.slice(1, 5);
        const correct = arraysAreEqual(correctAnswerArray, submittedAnswers)
        data['correct_trial'] = correct ? 1 : 0
      }
    }
    console.log('trial grid data', data)
    activeGrid.resetGrid()
  }
};


var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: {
    trial_id: "fixation",
  },
  trial_duration: fixationDuration,
  stimulus_duration: fixationDuration,
  post_trial_gap: 0,
  prompt: function() {
    if (getExpStage() == 'practice' && getCurrBlockType() == 'operation') {
      return promptText
    }
    if (getExpStage() == 'practice') {
      return practicePromptText
    }
  },
  on_finish: function() {
    if (jsPsych.data.get().last(2).trials[0].trial_id == 'response' || jsPsych.data.get().last(2).trials[0].trial_id == 'feedback') {
      trialStimuli = sampleLetters(possibleStimuli, numStimuli)
    }
  }
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
    var ITIms = sampleFromDecayingExponential();
    return ITIms * 1000;
  },
  prompt: function() {
    if (getExpStage() == 'practice' && getCurrBlockType() == 'operation') {
      return promptText
    }
    if (getExpStage() == 'practice') {
      return practicePromptText
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
    if (getCurrBlockType() !== 'operation') return "<div class = centerbox><div class = fixation>+</div></div>"

    if (last.trial_id == 'response') {
      if (last.correct_trial == 1) {
        return '<div class = centerbox><p class = center-block-text>Correct!</div></div>'
      } else if (last.correct_trial == 0) {
        return '<div class = centerbox><p class = center-block-text>Incorrect!</div></div>'
      } else {
        return '<div class = centerbox><p class = center-block-text>Respond Faster!</div></div>'
      }
    } else if (last.trial_id == 'equation') {
      if (last.correct_response == 1) {
        return '<div class = centerbox><p class = center-block-text>Correct!</div></div>'
      } else if (last.correct_response == 0) {
        return '<div class = centerbox><p class = center-block-text>Incorrect!</div></div>'
      } else {
        return '<div class = centerbox><p class = center-block-text>Respond Faster!</div></div>'
      }
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
    if (getExpStage() == 'practice' && getCurrBlockType() == 'operation') {
      return promptText
    }
    if (getExpStage() == 'practice') {
      return practicePromptText
    }
  },
};
// var rtThresh = 1000
var practiceTrials = [];
for (let i = 0; i < practiceLen; i++) { // number of trials
  // length of difficulty 
  for (let j = 0; j < 4; j++) {
    practiceTrials.push(
      fixation,
      stimulusBlock,
      waitBlock,
      practiceFeedbackBlock,
      ITIBlock,
    );
  }
  practiceTrials.push(responseBlock)
}

// loop based on criteria
var practiceCount = 0;
var practiceNode = {
  timeline: [feedbackBlock].concat(practiceTrials),
  loop_function: function(data) {
    practiceCount += 1;

    // set rts for this task
    // var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "response" && data.trials[i].exp_stage == 'practice') {
        console.log(data.trials[i])
        totalTrials += 1;
        // if (data.trials[i].rt != null) {
        // sumRT += data.trials[i].rt;
        sumResponses += 1;
        if (data.trials[i].correct_trial == 1) {
          correct += 1;
        }
        // }
      }
    }
    console.log(correct)
    console.log(totalTrials)

    var accuracy = correct / totalTrials;
    console.log(accuracy)
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    // var avgRT = sumRT / sumResponses;

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      feedbackText =
        "<div class = centerbox><p class = center-block-text>We will now start the test portion.</p>" +
        "<p class = block-text>Keep your gaze on the central '+', your right index finger on the " +
        spanResponses[0] +
        " and your right middle finger on the " +
        spanResponses[1] +
        " and your right ring finger on the " +
        spanResponses[2] +
        " and your left index finger on the " +
        spanResponses[3] +
        ".</p>" +
        "<p class = center-block-text>Press <i>enter</i> to continue.</p></div>";
      equationTruthList = generateEquationTruthList(numTrialsPerBlock * numStimuli)
      equations = generateEquations(numTrialsPerBlock * numStimuli, equationTruthList)
      expStage = 'test'
      practiceCount = 0;
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";

      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is low.</p>" +
          "<p class = block-text>Try your best to recall the letters.</p>"
      }

      // if (avgRT > rtThresh) {
      //   feedbackText +=
      //     "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      // }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }

      feedbackText +=
        "<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p>";
      equationTruthList = generateEquationTruthList(practiceLen * numStimuli)
      equations = generateEquations(practiceLen * numStimuli, equationTruthList)
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode)
for (let i = 0; i < numTrialsPerBlock; i++) { // number of trials
  // length of difficulty 
  for (let j = 0; j < numStimuli; j++) {
    testTrials.push(
      fixation,
      stimulusBlock,
      waitBlock,
      ITIBlock,
    );
  }
  testTrials.push(responseBlock)
}

// loop based on criteria
var testCount = 0;
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function(data) {
    testCount += 1;

    // var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "response") {
        totalTrials += 1;
        // if (data.trials[i].rt != null) {
        // sumRT += data.trials[i].rt;
        sumResponses += 1;
        if (data.trials[i].correct_trial == 1) {
          correct += 1;
        }
        // }
      }
    }
    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    // var avgRT = sumRT / sumResponses;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array


    if (testCount == numTestBlocks) {
      setBlocks()
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";

      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is low.  Remember: </p>" +
          '<p class = block-text>Try to recall all the letters. </p>'
      }

      // if (avgRT > rtThresh) {
      //   feedbackText +=
      //     "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      // }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
      equationTruthList = generateEquationTruthList(numTrialsPerBlock * numStimuli)
      equations = generateEquations(numTrialsPerBlock * numStimuli, equationTruthList)
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
var postTaskBlock = {
  type: jsPsychSurveyText,
  data: {
    exp_id: "span_rdoc",
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
    exp_id: "span_rdoc",
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

// Set up experiment
/* eslint-disable camelcase */
span_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var span_rdoc_init = () => {
  span_rdoc_experiment.push(fullscreen);
  span_rdoc_experiment.push(instructionNode);
  // simple
  span_rdoc_experiment.push(practiceNode);
  span_rdoc_experiment.push(testNode);
  // operation
  span_rdoc_experiment.push(practiceNode);
  span_rdoc_experiment.push(testNode);
  span_rdoc_experiment.push(postTaskBlock);
  span_rdoc_experiment.push(endBlock);
  span_rdoc_experiment.push(exitFullscreen);
};
