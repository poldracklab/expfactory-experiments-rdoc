

/* ************************************ * /
/* Define helper functions */
/* ************************************ */
// common
// PARAMETERS FOR DECAYING EXPONENTIAL FUNCTION
var meanITI = 5;

function sampleFromDecayingExponential() {
  // Decay parameter of the exponential distribution λ = 1 / μ
  var lambdaParam = 1 / meanITI;
  var minValue = 2;
  var maxValue = 20;

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



function generateSpatialTrialValues(n) {
  const randomList = [];

  for (let i = 0; i < n; i++) {
    const randomValue = Math.floor(Math.random() * 16);
    randomList.push(randomValue);
  }

  return randomList;
}

var trialValue;

var getStim = function() {

  let html = '<div class="container">';


  const trialIndex = trialList.shift()

  for (var i = 0; i < 16; i++) {
    if (i === trialIndex) {
      html += '<div class="box active-box"></div>';
    } else {
      html += '<div class="box"></div>';
    }
  }
  trialValue = trialIndex
  html += '</div>';
  return html

}

function generateRandomGrid(size) {
  const grid = new Array(size);
  for (let i = 0; i < size; i++) {
    grid[i] = Math.random() < 0.5 ? 0 : 1;
  }
  return grid;
}

function createSymmetricGrid(leftArray) {
  if (leftArray.length % 4 !== 0) {
    throw new Error('The array length must be a multiple of 4.');
  }

  const symmetricArray = [];


  for (let i = 0; i < leftArray.length; i += 4) {
    const group = leftArray.slice(i, i + 4);
    const symmetricGroup = [group[3], group[2], group[1], group[0]];
    symmetricArray.push(...symmetricGroup);
  }

  return symmetricArray;
}

function makeSymmetricArrays() {
  const size = 32;
  const firstGrid = generateRandomGrid(size);
  const secondGrid = createSymmetricGrid(firstGrid);

  return [{ firstGrid: firstGrid, secondGrid: secondGrid, symmetric: true }];
}

function areArraysAsymmetric(arr1, arr2) {
  // Check if arrays are asymmetric (values at each index are not the same)
  return !arr1.every((val, index) => val === arr2[index]);
}

function makeAsymmetricArrays() {
  const size = 32;
  let firstGrid = generateRandomGrid(size);
  let secondGrid = generateRandomGrid(size);

  while (areArraysAsymmetric(firstGrid, secondGrid) === false) {
    // Keep generating new arrays until they become asymmetric
    firstGrid = generateRandomGrid(size);
    secondGrid = generateRandomGrid(size);
  }
  return [firstGrid, secondGrid];
}


function makeAsymmetricArrays() {
  const size = 32;
  const firstGrid = generateRandomGrid(size);
  const secondGrid = generateRandomGrid(size);

  return [{ firstGrid: firstGrid, secondGrid: secondGrid, symmetric: false }];
}

function generateHalfOnesAndZerosArray(length) {
  if (length % 2 !== 0) {
    throw new Error("Length must be an even number.");
  }

  const halfLength = length / 2;
  return Array.from({ length: halfLength }, () => 1).concat(Array.from({ length: halfLength }, () => 0));
}


var getRandomSpatial = function() {
  if (distractorSpatial.length == 0) {
    distractorSpatial = makeDistractorSpatial()
  }
  const stim = distractorSpatial.shift()
  spatialAns = stim[0].symmetric
  return generateDistractorGrid(stim)
}

var submittedAnswers;



var generateGrid = function() {
  const randomIndex = Math.floor(Math.random() * 16);
  let activeIndex = randomIndex;
  const activeBoxes = [];

  let html = '<div class="container">';
  for (var i = 0; i < 16; i++) {
    if (i === randomIndex) {
      html += '<div class="box response-active"></div>';
      activeBoxes.push(i);
    } else {
      html += '<div class="box"></div>';
    }
  }
  html += '</div>';

  let spacebarCount = 0;
  const selectedIndexes = [];

  // Declare a variable to store the setTimeout ID
  let timeoutId;

  function handleKeyDown(event) {
    const key = event.key;
    const container = document.querySelector(".container");
    const boxes = container.querySelectorAll(".box");

    // Remove active-box class from all boxes
    boxes.forEach(function(box) {
      box.classList.remove("spacebar-box");
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
      // Remove active-box class from all boxes
      boxes.forEach(function(box) {
        box.classList.remove("response-active");
      });
    }

    if (newActiveIndex !== activeIndex) {
      activeIndex = newActiveIndex;
      boxes[activeIndex].classList.add("response-active"); // Add active-box class for arrow key navigation
    }

    if (key === " ") {
      if (spacebarCount < 4) {
        boxes[activeIndex].classList.add("spacebar-box"); // Add spacebar-box class for spacebar selection
        activeBoxes.push(activeIndex);
        selectedIndexes.push(activeIndex);
        spacebarCount++;
      }

      if (spacebarCount === 4) {
        submittedAnswers = activeBoxes;
        // Reset the event listener or perform any other necessary action
      }

      // Clear any existing setTimeout calls
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (key !== " ") {
          boxes[activeIndex].classList.remove("response-active"); // Remove active-box class if the arrow key was pressed
        }
        boxes[activeIndex].classList.remove("spacebar-box"); // Remove spacebar-box class for spacebar selection
      }, 200);
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

function combineArrays(array1, array2) {
  if (array1.length % 4 !== 0 || array2.length % 4 !== 0) {
    throw new Error('Both arrays must have a length that is a multiple of 4.');
  }

  const combinedArray = [];

  for (let i = 0; i < array1.length; i += 4) {
    combinedArray.push(...array1.slice(i, i + 4), ...array2.slice(i, i + 4));
  }

  return combinedArray;
}

var generateDistractorGrid = function(stim) {
  let html = '<div class="container">';
  const gridLen = 64;
  const firstGrid = stim[0].firstGrid;
  const secondGrid = stim[0].secondGrid;
  const gridValues = combineArrays(firstGrid, secondGrid)

  for (let i = 0; i < gridLen; i++) {
    if (gridValues[i] == 1) {
      html += '<div class="distractor-box active-box"></div>';
    } else {
      html += '<div class="distractor-box"></div>';
    }
  }

  html += '</div>';

  return html;
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

// TODO: Change stim block duration?
var getCurrCondition = function() {
  return currCondition;
};

var getExpStage = function() {
  return expStage;
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

var spanResponses = ['left arrow key', 'right arrow key', 'up arrow key', 'down arrow key', 'spacebar']
// *Timing:
// stimulus and fixaiton
// const stimStimulusDuration = 1000;
// const stimTrialDuration = 1000; // no blank screen after stim presented
// // equation
// const equationStimulusDuration = 3000;
// const equationTrialDuration = 3000;
// // wait block (fixation or equation)
// const responseBlockDuration = 8000;

const stimStimulusDuration = 1000
const stimTrialDuration = 1000 // no blank screen after stim presented
// equation
const equationStimulusDuration = 2000;
const equationTrialDuration = 2000;
// wait block (fixation or equation)
const responseBlockDuration = 5000;

// generic task variables
var runAttentionChecks = true;
// var attention_check_thresh = 0.65;
var sumInstructTime = 0; // ms
var instructTimeThresh = 0; // /in seconds

var accuracyThresh = 0.6;
var missedResponseThresh = 0.1;
var practiceThresh = 3;
var equationChoices = ["t", "f"];

var equationAccuracyThresh = .7;
var equationRTThresh = 1000; // 500ms


var practiceLen = 4;
var numTrialsPerBlock = 12;
var numTestBlocks = 3;

practiceLen = 1;
numTrialsPerBlock = 1;
numTestBlocks = 1;
practiceThresh = 1;

var trialList;
trialList = generateSpatialTrialValues(numStimuli)


var booleanArray = shuffleArray(generateHalfOnesAndZerosArray(200))

var spatialAns;


function makeDistractorSpatial() {
  var returnArray = []
  for (var i = 0; i < 200; i++) {
    const symmetric = booleanArray.shift()
    if (symmetric) {
      returnArray.push(makeSymmetricArrays())
    } else {
      returnArray.push(makeAsymmetricArrays())
    }
  }
  return returnArray
}
var distractorSpatial = makeDistractorSpatial()

var allConditions = ['processing-only', 'storage-only', 'same-domain']
allConditions.sort(() => Math.random() - 0.5);
var currCondition = allConditions.shift()
console.log('conditions', allConditions)
console.log('starting condition', currCondition)
const numTotalTrials = numTestBlocks * numTrialsPerBlock;
const trialDuration = fixationDuration + stimTrialDuration + equationTrialDuration

var numStimuli = 4

console.log(`
TOTAL DURATION OF A TRIAL:
------------------------
- Fixation: ${fixationDuration} ms
- Stimulus duration: ${stimTrialDuration} ms
- Equation duration: ${equationTrialDuration} ms
------
${numStimuli} * ${trialDuration} = ${numStimuli * trialDuration}

- Average ITI duration: ${meanITI * 1000} ms
- Response block: ${responseBlockDuration}
------
${meanITI * 1000} + ${responseBlockDuration} = ${meanITI * 1000 + responseBlockDuration}

TOTAL
------------------------
${meanITI * 1000 + responseBlockDuration + trialDuration * numStimuli} ms

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
${practiceLen} trials * ${meanITI * 1000 + responseBlockDuration + trialDuration * numStimuli}ms = ${trialDuration * numStimuli * practiceLen / 1000 / 60} min

# TEST: 
1 condition: ${numTotalTrials} trials * ${meanITI * 1000 + responseBlockDuration + (trialDuration * numStimuli)}ms = ${(meanITI * 1000 + responseBlockDuration + (trialDuration * numStimuli)) * numTotalTrials / 1000 / 60} min
Both conditions: ${2 * (meanITI * 1000 + responseBlockDuration + (trialDuration * numStimuli)) * numTotalTrials / 1000 / 60} min
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
  "<p class = center-block-text style = \"font-size:16px; line-height:80%%;\">'T' if symmetric and 'F' if not.</p>" +
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
  stimulus: function() {
    if (getCurrCondition() == 'processing-only') {
      return "<div class = centerbox><div class = fixation>+</div></div>"
    } else {
      return getStim()
    }
  },
  stimulus_duration: stimStimulusDuration,
  trial_duration: stimTrialDuration,
  post_trial_gap: 0,
  data: function() {
    return {
      trial_id: "stim",
      exp_stage: getExpStage(),
      condition: getCurrCondition(),
    };
  },
  choices: ["NO_KEYS"],
  prompt: function() {
    if (getExpStage() == 'practice' && (getCurrCondition() == 'same-domain' || getCurrCondition() == 'processing-only')) {
      return promptText
    }
    if (getExpStage() == 'practice') {
      return practicePromptText
    }
  },
  on_finish: function(data) {
    console.log(data)
    data['correctAnswer'] = trialValue
  }
};

var equationType = 'complex'


var waitBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    if (getCurrCondition() == 'storage-only') {
      return "<div class = centerbox><div class = fixation>****</div></div>"

    } else {
      return getRandomSpatial()
    }
  },
  choices: equationChoices,
  stimulus_duration: equationStimulusDuration,
  trial_duration: equationTrialDuration,
  response_ends_trial: true,
  on_start: function() {
    var lastTrial = jsPsych.data.get().last(2).trials[0];

    if (lastTrial.trial_id == 'feedback' || lastTrial.trial_id == 'wait' || lastTrial.trial_id == 'attention_check') {
      trialList = generateSpatialTrialValues(numStimuli)
      trialValues = trialList
    }
  },
  data: function() {
    return {
      trial_id: 'wait',
      exp_stage: getExpStage(),
      condition: getCurrCondition()
    };
  },
  post_trial_gap: 0,
  on_finish: function(data) {
    var logResponse;
    if (data.response == 't') {
      if (spatialAns == 1) {
        logResponse = 1;
      } else {
        logResponse = 0;
      }
    } else if (data.response == 'f') {
      if (spatialAns == 0) {
        logResponse = 1;
      } else {
        logResponse = 0;
      }
    }
    data['correct_response'] = logResponse
    data['equationType'] = equationType
  },
  prompt: function() {
    if (getExpStage() == 'practice' && (getCurrCondition() == 'same-domain' || getCurrCondition() == 'processing-only')) {
      return promptText
    }
    if (getExpStage() == 'practice') {
      return practicePromptText
    }
  },
};



var startTime = null;

var waitNode = {
  timeline: [waitBlock],
  loop_function: function(data) {
    if (startTime == null) {
      startTime = performance.now();
    }

    var elapsedTime = (performance.now() - startTime)

    // Continue looping as long as elapsed time is less than 10,000 ms
    if (elapsedTime >= equationTrialDuration) {
      startTime = null; // Reset startTime for the next trial
      return false; // End the loop
    }

    return true; // Continue the loop for the current trial
  },
}


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
  choices: ["NO_KEYS"],
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
  on_finish: function(data) {
    var stimTrials = jsPsych.data.get().filter({ trial_id: 'stim' }).trials
    var lastTrials = stimTrials.slice(-4);
    var correctResponses = lastTrials.map(trial => trial.correctAnswer);

    if (submittedAnswers == undefined) {
      data['correct_trial'] = null
    } else {

      if (submittedAnswers.length == 5) {
        submittedAnswers = submittedAnswers.slice(1, 5);
        console.log(submittedAnswers)
        console.log(correctResponses)
        const correct = arraysAreEqual(correctResponses, submittedAnswers)
        data['correct_trial'] = correct ? 1 : 0
      }
    }
    activeGrid.resetGrid()
  }
};


// var fixation = {
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: function() {
//     if (getCurrCondition() == 'storage-only') {
//       return "<div class = centerbox><div class = fixation>****</div></div>"
//     } else if (getCurrCondition() == 'processing-only') {
//       return "<div class = centerbox><div class = fixation>+</div></div>"
//     }
//   },
//   choices: ["NO_KEYS"],
//   data: {
//     trial_id: "fixation",
//   },
//   trial_duration: fixationDuration,
//   stimulus_duration: fixationDuration,
//   post_trial_gap: 0,
//   on_finish: function() {
//     var lastTrial = jsPsych.data.get().last(2).trials[0];

//     if (lastTrial.trial_id == 'feedback' || lastTrial.trial_id == 'wait' || lastTrial.trial_id == 'attention_check') {
//       trialList = generateSpatialTrialValues(numStimuli)
//       trialValues = trialList
//     }

//     startTime = null;
//   }
// };

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
    if (getExpStage() == 'practice' && (getCurrCondition() == 'same-domain' || getCurrCondition() == 'processing-only')) {
      return promptText
    }
    if (getExpStage() == 'practice') {
      return practicePromptText
    }
  },
};


var practiceTrials = [];
function generatePracticeTrials() {
  console.log('IN PRACTICE TRIALS')
  console.log(getCurrCondition())
  console.log(getCurrCondition())
  var returnArray = []
  if (getCurrCondition() == 'same-domain') {
    for (let i = 0; i < practiceLen; i++) {
      for (let j = 0; j < numStimuli; j++) {
        returnArray.push(
          waitNode,
          stimulusBlock,
        );
      }
      returnArray.push(responseBlock, ITIBlock)
    }
  } else if (getCurrCondition() == 'storage-only') {
    for (let i = 0; i < practiceLen; i++) {
      for (let j = 0; j < numStimuli; j++) {
        returnArray.push(
          waitNode,
          stimulusBlock,
        );
      }
      returnArray.push(responseBlock, ITIBlock)
    }
  } else if (getCurrCondition() == 'processing-only') {

    for (let i = 0; i < practiceLen; i++) {
      for (let j = 0; j < numStimuli; j++) {
        returnArray.push(
          waitNode,
          stimulusBlock,
        );
      }
      returnArray.push(responseBlock, ITIBlock)
    }
  }
  return returnArray
}

practiceTrials = generatePracticeTrials()

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

    var equationTrials = 0;
    var correctEquationTrials = 0;
    var equationRT = 0;
    var sumRT = 0;
    var rtTrials = 0; // trials that have rt

    // TODO: Check this data logging - shuold only be for current condition = same-domain?
    if (getCurrCondition() == 'same-domain' || getCurrCondition() == 'processing-only') {
      for (var i = 0; i < data.trials.length; i++) {
        if (data.trials[i].trial_id == "equation" && data.trials[i].exp_stage == 'practice') {
          equationTrials += 1;
          if (data.trials[i].rt != null) {
            rtTrials += 1;
            sumRT += data.trials[i].rt;
            if (data.trials[i].correct_response == 1) {
              correctEquationTrials += 1;
            }
          }
        }
      }
    }


    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var equationAccuracy = (correctEquationTrials / equationTrials)
    equationRT = sumRT / rtTrials;

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

      if (getCurrCondition() == 'same-domain' || getCurrCondition() == 'processing-only') {
        if (equationAccuracy < equationAccuracyThresh) {
          feedbackText +=
            "<p class = block-text>Your accuracy for the equations is low.</p>" +
            "<p class = block-text>Try your best determining whether a word is an English word (t) or not (f).</p>"
        }
        if (equationRT < equationRTThresh) {
          feedbackText +=
            "<p class = block-text>Your are responding too slowly to the equations when they appear on the screen.</p>" +
            "<p class = block-text>Try to respond (t/f) as quickly as accurately as possible as possible.</p>"
        }
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
function generateTestTrials() {
  var returnArray = []
  if (getCurrCondition() == 'same-domain') {
    returnArray.push(attentionNode)
    for (let i = 0; i < numTrialsPerBlock; i++) { // number of trials
      for (let j = 0; j < numStimuli; j++) {
        returnArray.push(
          waitNode,
          stimulusBlock
        );
      }
      returnArray.push(responseBlock, ITIBlock)
    }
  } else if (getCurrCondition() == 'storage-only') {
    returnArray.push(attentionNode)
    for (let i = 0; i < numTrialsPerBlock; i++) {
      for (let j = 0; j < numStimuli; j++) {
        returnArray.push(
          waitNode,
          stimulusBlock,
        );
      }
      returnArray.push(responseBlock, ITIBlock)
    }
  } else if (getCurrCondition() == 'processing-only') {
    returnArray.push(attentionNode)
    for (let i = 0; i < numTrialsPerBlock; i++) { // number of trials
      for (let j = 0; j < numStimuli; j++) {
        returnArray.push(
          waitNode,
          stimulusBlock
        );
      }
      returnArray.push(responseBlock, ITIBlock)
    }
  }
  return returnArray
}

testTrials = generateTestTrials()

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

    var equationTrials = 0;
    var correctEquationTrials = 0;
    var equationRT = 0;
    var sumRT = 0;
    var rtTrials = 0; // trials that have rt

    if (getCurrCondition() == 'same-domain' || getCurrCondition() == 'processing-only') {
      for (var i = 0; i < data.trials.length; i++) {
        if (data.trials[i].trial_id == "equation" && data.trials[i].exp_stage == 'practice') {
          equationTrials += 1;
          if (data.trials[i].rt != null) {
            rtTrials += 1;
            sumRT += data.trials[i].rt;
            if (data.trials[i].correct_response == 1) {
              correctEquationTrials += 1;
            }
          }
        }
      }
    }

    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var equationAccuracy = (correctEquationTrials / equationTrials)
    equationRT = sumRT / rtTrials;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

    if (testCount == numTestBlocks) {
      feedbackText =
        "<div class = centerbox><p class = center-block-text>Moving onto next task. Press <i>enter</i> to continue.</p>" +
        '</div>';
      currCondition = allConditions.shift()
      practiceTrials = generatePracticeTrials()
      testTrials = generateTestTrials()

      expStage = 'practice'
      testCount = 0;
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";

      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is low.  Remember: </p>" +
          '<p class = block-text>Try to recall all the letters. </p>'
      }

      if (getCurrCondition() == 'same-domain' || getCurrCondition() == 'processing-only') {
        if (equationAccuracy < equationAccuracyThresh) {
          feedbackText +=
            "<p class = block-text>Your accuracy for the equations is low.</p>" +
            "<p class = block-text>Try your best determining whether a word is an English word (t) or not (f).</p>"
        }
        if (equationRT < equationRTThresh) {
          feedbackText +=
            "<p class = block-text>Your are responding too slowly to the equations when they appear on the screen.</p>" +
            "<p class = block-text>Try to respond (t/f) as quickly as accurately as possible as possible.</p>"
        }
      }

      // if (avgRT > rtThresh) {
      //   feedbackText +=
      //     "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      // }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
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
  for (var i = 0; i < 3; i++) {
    // conditions same-domain/storage-only/processing-only
    span_rdoc_experiment.push(practiceNode)
    span_rdoc_experiment.push(testNode)
  }

  span_rdoc_experiment.push(postTaskBlock);
  span_rdoc_experiment.push(endBlock);
  span_rdoc_experiment.push(exitFullscreen);
};
