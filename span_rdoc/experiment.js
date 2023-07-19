

/* ************************************ * /
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

var setBlocks = function() {
  if (getCurrBlockType() == conditions[0]) {
    feedbackText =
      "<div class = centerbox><p class = center-block-text>Done this condition. Moving onto next task. Press <i>enter</i> to continue.</p>" +
      '</div>';
    blockType = conditions[1]
    expStage = 'practice'
    testCount = 0;
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

// var getRandomEquation = function() {
//   const stim = equations.shift()
//   equationAns = equationTruthList.shift()
//   return `<div class=centerbox><div class=center-text>${stim}</div></div>`
// }

var getRandomString = function() {
  const stim = distractorStrings.shift()
  wordAns = stim.real
  return `<div class=centerbox><div class=center-text>${stim.word}</div></div>`
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
        box.classList.remove("active-box");
      });
    }

    if (newActiveIndex !== activeIndex) {
      activeIndex = newActiveIndex;
      boxes[activeIndex].classList.add("active-box"); // Add active-box class for arrow key navigation
    }

    if (key === " ") {
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

      // Clear any existing setTimeout calls
      clearTimeout(timeoutId);

      console.log(boxes[activeIndex]);
      timeoutId = setTimeout(() => {
        if (key !== " ") {
          boxes[activeIndex].classList.remove("active-box"); // Remove active-box class if the arrow key was pressed
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
// var generateGrid = function() {
//   possibleStimuli = shuffleArray(possibleStimuli); // Assuming `possibleStimuli` is a global array
//   const randomIndex = Math.floor(Math.random() * possibleStimuli.length);
//   let activeIndex = randomIndex;
//   const activeBoxes = [];

//   let html = '<div class="container">';
//   possibleStimuli.forEach(function(letter, index) {
//     if (index === randomIndex) {
//       html += '<div class="box active-box">' + letter + '</div>';
//       activeBoxes.push(letter);
//     } else {
//       html += '<div class="box">' + letter + '</div>';
//     }
//   });
//   html += '</div>';

//   let spacebarCount = 0;
//   const selectedIndexes = [];

//   function handleKeyDown(event) {
//     if (spacebarCount === 4) {
//       return; // Ignore any key presses after spacebarCount reaches 4
//     }

//     const key = event.key;
//     const container = document.querySelector(".container");
//     const boxes = container.querySelectorAll(".box");

//     // Remove active-box class from all boxes
//     boxes.forEach(function(box) {
//       box.classList.remove("active-box"); // TODO: Maybe disable coloring
//     });

//     // Update activeIndex based on arrow key input
//     let newActiveIndex = activeIndex;
//     if (key === "ArrowLeft" && activeIndex % 4 !== 0) {
//       newActiveIndex = activeIndex - 1;
//     } else if (key === "ArrowRight" && activeIndex % 4 !== 3) {
//       newActiveIndex = activeIndex + 1;
//     } else if (key === "ArrowUp" && activeIndex >= 4) {
//       newActiveIndex = activeIndex - 4;
//     } else if (key === "ArrowDown" && activeIndex < 12) {
//       newActiveIndex = activeIndex + 4;
//     }

//     if (newActiveIndex !== activeIndex) {
//       activeIndex = newActiveIndex;
//       boxes[activeIndex].classList.add("active-box"); // Add active-box class for arrow key navigation
//     }

//     if (key === " ") {
//       // Perform action when spacebar is pressed
//       // if (selectedIndexes.includes(activeIndex)) {
//       //   return; // Ignore if the box was already selected
//       // }

//       if (spacebarCount < 4) {
//         boxes[activeIndex].classList.add("spacebar-box"); // Add spacebar-box class for spacebar selection
//         activeBoxes.push(possibleStimuli[activeIndex]);
//         selectedIndexes.push(activeIndex);
//         spacebarCount++;
//         setTimeout(function() {
//           boxes[activeIndex].classList.remove("spacebar-box"); // Remove spacebar-box class after 200ms
//         }, 200);
//       }

//       if (spacebarCount === 4) {
//         console.log("Active boxes:", activeBoxes);
//         submittedAnswers = activeBoxes;
//         // Reset the event listener or perform any other necessary action
//       }
//     }
//   }

//   // Attach the event listener
//   document.addEventListener("keydown", handleKeyDown);

//   function resetGrid() {
//     activeBoxes.length = 0; // Clear the activeBoxes array
//     selectedIndexes.length = 0; // Clear the selectedIndexes array
//     spacebarCount = 0;

//     // Remove the event listener
//     document.removeEventListener("keydown", handleKeyDown);

//     // Clear any remaining state or perform other necessary actions
//   }

//   return { html, resetGrid };
// };



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

const wordList = [
  "Angel", "Awake", "Bacon", "Blend", "Brave", "Chain", "Climb", "Cough", "Crash", "Debut",
  "Diver", "Draft", "Early", "Empty", "Fancy", "Field", "Flash", "Flute", "Frost", "Giant",
  "Globe", "Grasp", "Guest", "Hobby", "House", "Image", "Ivory", "Jewel", "Joint", "Knife",
  "Lemon", "Logic", "Lucky", "Maple", "Merry", "Money", "Nerve", "Noble", "Olive", "Order",
  "Paint", "Party", "Peace", "Power", "Press", "Prize", "Quiet", "Razor", "Rebel", "Scale",
  "Shade", "Share", "Shift", "Shout", "Sight", "Skate", "Sleep", "Snack", "Solid", "South",
  "Space", "Spice", "Sport", "Steel", "Store", "Storm", "Swift", "Table", "Taste", "Teach",
  "Toast", "Track", "Train", "Trust", "Unity", "Valid", "Vital", "Voice", "Water", "Wheel",
  "White", "Wound", "Youth", "Abyss", "Beach", "Brave", "Broth", "Chill", "Click", "Cloud",
  "Crown", "Dance", "Dream", "Dress", "Elite", "Faith", "Fence", "Flame", "Fleet", "Flock",
  "Focus", "Frame", "Ghost", "Globe", "Grass", "Happy", "Heart", "Honey", "Hotel", "Human",
  "Ivory", "Juice", "Jumbo", "Knife", "Laser", "Linen", "Magma", "March", "Medal", "Melon",
  "Misty", "Music", "Night", "Noble", "Olive", "Paint", "Peach", "Pearl", "Piano", "Plane",
  "Prank", "Quiet", "Range", "Razor", "Rebel", "Roast", "Sauce", "Sheep", "Shore", "Sight",
  "Skill", "Snack", "Solid", "Sport", "Steal", "Steel", "Sunny", "Taste", "Title", "Torch",
  "Trail", "Trust", "Unity", "Urban", "Valid", "Vital", "Voice", "Water", "Wheel", "White",
  "Wound", "Youth", "Acorn", "Arrow", "Bench", "Bloom", "Bread", "Brick", "Brown", "Bumpy",
  "Carve", "Chase", "Cheek", "Chime", "Clown", "Crane", "Crazy", "Cycle", "Dance", "Ditch",
  "Dream", "Drift", "Eager", "Exact", "Fever", "Fiber", "Flick", "Flour", "Glimp", "Glowy",
  "Greed", "Groov", "Habit", "Hazzy", "Hinge", "Honor", "Human", "Hymen", "Icebox", "Icily",
  "Jazzy", "Joker", "Jolly", "Judge", "Kneel", "Knelt", "Laser", "Lemon", "Limit", "Magic",
  "Mirth", "Moody", "Mouse", "Nacho", "Ninja", "Notch", "Oasis", "Olive", "Pacer", "Party",
  "Plumb", "Quirk", "Racer", "Ranch", "Rifle", "Shiny", "Shock", "Silly", "Skull", "Snack",
  "Sneak", "Solar", "Spicy", "Spine", "Storm", "Sugar", "Swift", "Swirl", "Table", "Tasty",
  "Tenor", "Toxic", "Trail", "Tribe", "Twist", "Unity", "Urban", "Vivid", "Voice", "Wagon",
  "Windy", "Witch", "Woven", "Yeast", "Yodel", "Zebra", "Zesty"
];

function createSetWithObjects(array) {
  const resultSet = new Set();

  array.forEach(word => {
    const obj = {
      word: word.toLowerCase(),
      real: 1
    };
    resultSet.add(obj);
  });

  return resultSet;
}


// Combine the two lists into one big Set called realWords
const realWords = createSetWithObjects(wordList)

const numStimuli = 4;
// const numConditions = 2;
var wordAns;
function generateRandomStrings() {


  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * realWords.size);
    const word = Array.from(realWords)[randomIndex];
    realWords.delete(word); // Remove the selected word from the Set
    return word;
  };

  const getRandomString = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomString += alphabet[randomIndex];
    }

    return { word: randomString.toLowerCase(), real: 0 };
  };

  totalLength = realWords.size * 2
  const randomStrings = Array.from({ length: totalLength }, (_, i) => {
    if (i % 2 === 0) {
      return getRandomWord();
    } else {
      return getRandomString();
    }
  });

  return randomStrings;
}




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

// const stimStimulusDuration = 10;
// const stimTrialDuration = 10;
// // equation
// const equationStimulusDuration = 100;
// const equationTrialDuration = 10;
// // wait block (fixation or equation)
// const responseBlockDuration = 10000;

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

var possibleStimuli = "BCDFGJKLMNPSTVXZ".split("");
var trialStimuli = [];

var practiceLen = 4;
var numTrialsPerBlock = 12;
var numTestBlocks = 3;

const conditions = ['simple', 'operation']
conditions.sort(() => Math.random() - 0.5);

var blockType = conditions[0]


const numTotalTrials = numTestBlocks * numTrialsPerBlock;
const trialDuration = fixationDuration + stimTrialDuration + equationTrialDuration

const distractorStrings = generateRandomStrings()
console.log("distractorStrings", distractorStrings)

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

// var equationTruthList = generateEquationTruthList(practiceLen * numStimuli)
// var equations = generateEquations(practiceLen * numStimuli, equationTruthList)
// console.log(equationTruthList)
// console.log(equations)

// var equationAns;
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
      ? getRandomString()
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
  response_ends_trial: true,
  data: function() {
    return {
      trial_id: getCurrBlockType() == "operation" ? 'equation' : 'simple',
      exp_stage: getExpStage(),
    };
  },
  post_trial_gap: 0,
  on_finish: function(data) {
    var logResponse;
    if (data.response == 't') {
      if (wordAns == 1) {
        logResponse = 1;
      } else {
        logResponse = 0;
      }
    } else if (data.response == 'f') {
      if (wordAns == 0) {
        logResponse = 1;
      } else {
        logResponse = 0;
      }
    }
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

var startTime = null;

var waitNode = {
  timeline: [waitBlock, practiceFeedbackBlock],
  loop_function: function(data) {
    if (startTime == null) {
      startTime = performance.now();
    }

    var elapsedTime = (performance.now() - startTime)

    // Continue looping as long as elapsed time is less than 10,000 ms
    return elapsedTime < equationTrialDuration;
  }
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
    if (jsPsych.data.get().last(2).trials[0].trial_id == 'feedback' || jsPsych.data.get().last(2).trials[0].trial_id == 'wait') {
      trialStimuli = sampleLetters(possibleStimuli, numStimuli)
    }
    startTime = null;
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


// var rtThresh = 1000
var practiceTrials = [];
for (let i = 0; i < practiceLen; i++) { // number of trials
  // length of difficulty 
  for (let j = 0; j < 4; j++) {
    practiceTrials.push(
      fixation,
      stimulusBlock,
      // waitBlock,
      // practiceFeedbackBlock,
      waitNode
    );
  }
  practiceTrials.push(responseBlock, ITIBlock)
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

    var equationTrials = 0;
    var correctEquationTrials = 0;
    var equationRT = 0;
    var sumRT = 0;
    var rtTrials = 0; // trials that have rt

    if (getCurrBlockType() == 'operation') {
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

    console.log(correct)
    console.log(totalTrials)

    var accuracy = correct / totalTrials;
    console.log(accuracy)
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var equationAccuracy = (correctEquationTrials / equationTrials)
    equationRT = sumRT / rtTrials;

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

      if (getCurrBlockType() == 'operation') {
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

      feedbackText +=
        "<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p>";
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
    );
  }
  testTrials.push(responseBlock, ITIBlock)
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



    var equationTrials = 0;
    var correctEquationTrials = 0;
    var equationRT = 0;
    var sumRT = 0;
    var rtTrials = 0; // trials that have rt

    if (getCurrBlockType() == 'operation') {
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

      if (getCurrBlockType() == 'operation') {
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
