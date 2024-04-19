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

const getInstructFeedback =
  () => `<div class = centerbox><p class = center-block-text>
    ${feedbackInstructText}
    </p></div>`;

const getFeedback =
  () => `<div class = bigbox><div class = picture_box><p class = block-text>
    ${feedbackText}
    </font></p></div></div>`;

var createTrialTypes = function (numTrialsPerBlock) {
  var uniqueCombos = stopSignalsConditions.length * shapes.length;

  var stims = [];
  for (var x = 0; x < stopSignalsConditions.length; x++) {
    for (var j = 0; j < shapes.length; j++) {
      stim = {
        stim: shapes[j],
        correct_response: possibleResponses[j][1],
        condition: stopSignalsConditions[x],
      };
      stims.push(stim);
    }
  }
  var iteration = numTrialsPerBlock / uniqueCombos;
  stims = jsPsych.randomization.repeat(stims, iteration);
  return stims;
};

var getStopStim = function () {
  return preFileType + "stopSignal" + postFileType;
};

var getStim = function () {
  stim = stims.shift();
  shape = stim.stim;
  correct_response = stim.correct_response;
  condition = stim.condition;

  stim = {
    image:
      "<div class = centerbox><div class = cue-text>" +
      preFileType +
      shape +
      postFileType +
      "</div></div>",
    data: {
      stim: shape,
      condition: condition,
      correct_response: condition === "go" ? correct_response : null,
    },
  };

  stimData = stim.data;
  return stim.image;
};

const getCurrBlockNum = () => practiceCount;

const getSSD = () => SSD;

const getCondition = () => condition;

const getCorrectResponse = () => correct_response;

var appendData = function (data) {
  currentTrial += 1;

  data.stim = stimData.stim;
  data.correct_response = correct_response;
  data.current_trial = currentTrial;
  data.condition = stimData.condition;
  data.block_num = practiceCount;

  if (data.condition == "stop") {
    data.correct_trial = data.response === null ? 1 : 0;
    if (data.response == null && SSD < maxSSD) {
      SSD += 50;
    } else if (data.response != null && SSD > minSSD) {
      SSD -= 50;
    }
  } else {
    data.correct_trial = data.response === data.correct_response ? 1 : 0;
  }
};

/* ************************************ */
/*    Define Experimental Variables     */
/* ************************************ */
const fixationDuration = 500;

var possibleResponses;

function getKeyMappingForTask(group_index) {
  if (Math.floor(group_index / 6) % 2 === 0) {
    // Assuming even group_index uses ",", odd group_index uses "."
    possibleResponses = [
      ["index finger", ",", "comma key (,)"],
      ["middle finger", ".", "period key (.)"],
    ];
  } else {
    // Assuming even group_index uses ",", odd group_index uses "."
    possibleResponses = [
      ["middle finger", ".", "period key (.)"],
      ["index finger", ",", "comma key (,)"],
    ];
  }
}

var group_index =
  typeof window.efVars !== "undefined" ? window.efVars.group_index : 1;

getKeyMappingForTask(group_index);

const choices = [possibleResponses[0][1], possibleResponses[1][1]];

var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>
`;

var feedbackInstructText = `
  <p class="center-block-text">
    Welcome! This experiment will take a couple of minutes.
  </p>
  <p class="center-block-text">
    To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in fullscreen mode for the whole duration of each task.
  </p>
  <p class="center-block-text"> Press <i>enter</i> to begin.</p>
`;

var expStage = "practice";
// *: Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 1500;

// generic task variables
var sumInstructTime = 0; // ms
var instructTimeThresh = 1; // /in seconds
var runAttentionChecks = true;

var practiceLen = 6; // must be divisible by shapes.length * stopSignalsConditions.length
var numTrialsPerBlock = 60; // must be divisible by shapes.length * stopSignalsConditions.length
var numTestBlocks = 3;

var practiceThresh = 3; // max number of times to repeat practice
var accuracyThresh = 0.8;
var practiceAccuracyThresh = 0.75;

var missedResponseThresh = 0.1;
var rtThresh = 750;

var SSD = 250;
var maxSSD = 1000;
var minSSD = 0;

var currentTrial = 0;
var correct_response = null;
var stimData = null;
var condition = null;

var maxStopCorrectPractice = 1;
var minStopCorrectPractice = 0;

var stopSignalsConditions = ["go", "go", "stop"];
var shapes = ["circle", "square"];

// IMAGES
// path info
var pathSource = "/static/experiments/stop_signal_rdoc/images/";
var postFileType = ".png'></img>";
var preFileType = "<img class = center src='" + pathSource;
// append to images array to preload
var images = [pathSource + "stopSignal" + ".png"];
for (i = 0; i < shapes.length; i++) {
  images.push(pathSource + shapes[i] + ".png");
}

var promptTextList = `
  <ul style="text-align:left;">
    <li>${
      possibleResponses[0][0] == "index finger" ? shapes[0] : shapes[1]
    }: comma key (,)</li>
    <li>${
      possibleResponses[1][0] == "middle finger" ? shapes[1] : shapes[0]
    }: period key (.)</li>
    <li>Do not respond if a star appears.</li>
  </ul>
`;

var promptText = `
  <div class="prompt_box">
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[0][0] == "index finger" ? shapes[0] : shapes[1]
    }: comma key (,)</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[1][0] == "middle finger" ? shapes[1] : shapes[0]
    }: period key (.)</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">Do not respond if a star appears.</p>
  </div>
`;

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

var pageInstruct = [
  `
  <div class="centerbox">
    <p class="block-text">Place your <b>index finger</b> on the <b>comma key (,)</b> and your <b>middle finger</b> on the <b>period key (.)</b></p>
    <p class="block-text">During this task, on each trial you will see shapes appear on the screen one at a time.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[0][0] == "index finger" ? shapes[0] : shapes[1]
    }</b>, press your <b>index finger</b>.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[1][0] == "middle finger" ? shapes[1] : shapes[0]
    }</b>, press your <b>middle finger</b>.</p>
    <p class="block-text">You should respond as quickly and accurately as possible to each shape.</p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text">On some trials, a star will appear around the shape, with or shortly after the shape appears.</p>
    <p class="block-text">If you see the star, please try your best to <b>withhold your response</b> on that trial.</p>
    <p class="block-text">If the star appears and you try your best to withhold your response, you will find that you will be able to stop sometimes, but not always.</p>
    <p class="block-text">Please <b>do not</b> slow down your responses in order to wait for the star. It is equally important to respond quickly on trials without the star as it is to stop on trials with the star.</p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text">We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    ${speedReminder}
  </div>
  `,
];

/* ************************************ */
/*        Set up jsPsych blocks         */
/* ************************************ */
var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["Enter"],
  data: {
    trial_id: "instruction_feedback",
    trial_duration: 180000,
  },
  stimulus: getInstructFeedback,
  post_trial_gap: 0,
  trial_duration: 180000,
};

var instructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: "instructions",
    trial_duration: null,
    stimulus: pageInstruct,
  },
  pages: pageInstruct,
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
  loop_function: function (data) {
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
        "<p class=block-text>Read through instructions too quickly. Please take your time and make sure you understand the instructions.</p><p class=block-text>Press <i>enter</i> to continue.</p>";
      return true;
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedbackInstructText =
        "<p class=block-text>Done with instructions. Press <i>enter</i> to continue.</p>";
      return false;
    }
  },
};

var practiceFixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: {
    trial_id: "practice_fixation",
    trial_duration: 500,
    stimulus_duration: 500,
    exp_stage: "practice",
  },
  post_trial_gap: 0,
  stimulus_duration: 500, // 500
  trial_duration: 500, // 500
  prompt: promptText,
  on_finish: data => (data["block_num"] = practiceCount),
};

var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";
var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: function () {
    return {
      trial_id: "practice_feedback",
      exp_stage: "practice",
      trial_duration: 60000,
      block_num: practiceCount,
    };
  },
  stimulus: getFeedback,
  post_trial_gap: 0,
  trial_duration: 60000,
  choices: ["Enter"],
  response_ends_trial: true,
};

var ITIms = null;

// *** ITI *** //
var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  is_html: true,
  choices: ["NO_KEYS"],
  data: function () {
    return {
      trial_id: "practice_ITI",
      ITIParams: {
        min: 0,
        max: 5,
        mean: 0.5,
      },
      block_num: practiceCount,
      exp_stage: "practice",
    };
  },
  post_trial_gap: 0,
  trial_duration: function () {
    ITIms = sampleFromDecayingExponential();
    return ITIms * 1000;
  },
  prompt: function () {
    return promptText;
  },
  on_finish: function (data) {
    data["trial_duration"] = ITIms * 1000;
    data["stimulus_duration"] = ITIms * 1000;
  },
};

/** ******************************************/
/*				Set up nodes				*/
/** ******************************************/

var practiceStopTrials = [];
for (i = 0; i < practiceLen; i++) {
  var practiceTrial = {
    type: jsPoldracklabStopSignal,
    stimulus: getStim,
    SS_stimulus: getStopStim,
    SS_trial_type: getCondition,
    data: {
      trial_id: "practice_trial",
      exp_stage: "practice",
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: choices,
    correct_choice: getCorrectResponse,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    SSD: getSSD,
    SS_duration: 500, // 500
    post_trial_gap: 0,
    on_finish: function (data) {
      appendData(data);
    },
    prompt: promptText,
  };

  var practiceFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    data: function () {
      return {
        exp_stage: "practice",
        trial_id: "practice_feedback",
        trial_duration: 500,
        stimulus_duration: 500,
        block_num: practiceCount,
      };
    },
    choices: ["NO_KEYS"],
    stimulus: function () {
      var last = jsPsych.data.get().last(1).trials[0];
      if (last.condition == "stop") {
        if (last.response === null) {
          return (
            "<div class=center-box><div class=center-text><font size = 20>Correct!</font></div></div>" +
            promptText
          );
        } else {
          return (
            "<div class=center-box><div class=center-text><font size = 20>There was a star</font></div></div>" +
            promptText
          );
        }
      } else {
        if (last.response == null) {
          return (
            "<div class=center-box><div class=center-text><font size = 20>Respond Faster!</font></div></div>" +
            promptText
          );
        } else if (last.response === last.correct_response) {
          return (
            "<div class=center-box><div class=center-text><font size = 20>Correct!</font></div></div>" +
            promptText
          );
        } else {
          return (
            "<div class=center-box><div class=center-text><font size = 20>Incorrect</font></div></div>" +
            promptText
          );
        }
      }
    },
    post_trial_gap: 0,
    stimulus_duration: 500, // 500
    trial_duration: 500, // 500
    response_ends_trial: false,
    prompt: promptText,
  };

  practiceStopTrials.push(
    practiceFixation,
    practiceTrial,
    practiceFeedbackBlock,
    ITIBlock
  );
}

var practiceCount = 0;
var practiceNode = {
  timeline: [feedbackBlock].concat(practiceStopTrials),
  loop_function: function (data) {
    practiceCount += 1;
    currentTrial = 0;

    // go trials
    var goLength = 0;
    var sumGoRT = 0;
    var numGoResponses = 0;
    var sumGoCorrect = 0;
    // stop trials
    var stopLength = 0;
    var numStopResponses = 0;

    for (i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].condition == "go" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        goLength += 1;
        if (data.trials[i].rt != null) {
          numGoResponses += 1;
          sumGoRT += data.trials[i].rt;
          if (data.trials[i].response == data.trials[i].correct_response) {
            sumGoCorrect += 1;
          }
        }
      } else if (
        data.trials[i].condition == "stop" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        stopLength += 1;
        if (data.trials[i].rt != null) {
          numStopResponses += 1;
        }
      }
    }

    var avgRT = sumGoRT / numGoResponses;
    var missedResponses = (goLength - numGoResponses) / goLength;
    var aveShapeRespondCorrect = sumGoCorrect / goLength;
    var stopSignalRespond = numStopResponses / stopLength;

    if (
      practiceCount == practiceThresh ||
      aveShapeRespondCorrect > practiceAccuracyThresh
    ) {
      feedbackText = `
      <div class="centerbox">
        <p class="block-text">We will now begin the test portion.</p>
        <p class="block-text">Keep your <b>index finger</b> on the <b>comma key (,)</b> and your <b>middle finger</b> on the <b>period key (.)</b></p>
        <p class="block-text">Press <i>enter</i> to continue.</p>
      </div>`;

      stims = createTrialTypes(numTrialsPerBlock);
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (aveShapeRespondCorrect <= practiceAccuracyThresh) {
        feedbackText += `
        <p class="block-text">Your accuracy is low. Remember:</p>
        ${promptTextList}`;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly.</p>
        ${speedReminder}`;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
          <p class="block-text">We have detected a number of trials that required a response, where no response was made. Please ensure that you are responding quickly and accurately to the shapes.</p>`;
      }

      if (stopSignalRespond === maxStopCorrectPractice) {
        feedbackText += `
        <p class="block-text">You have not been stopping your response when stars are present.</p>
        <p class="block-text">Please try your best to stop your response if you see a star.</p>`;
      }

      if (stopSignalRespond === minStopCorrectPractice) {
        feedbackText += `
        <p class="block-text">Please do not slow down and wait for the star to appear. Respond as quickly and accurately as possible when a star does not appear.</p>`;
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      stims = createTrialTypes(practiceLen);
      return true;
    }
  },
};

var postTaskQuestion =
  "Do you have any comments, concerns, or issues pertaining to this task?";

var postTaskBlock = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: `<h1 class=block-text>${postTaskQuestion}</h1>`,
      name: postTaskQuestion,
      required: false,
      rows: 20,
      columns: 80,
    },
  ],
  response_ends_trial: true,
  data: {
    trial_id: "post_task_feedback",
  },
  on_finish: function (data) {
    data.question = postTaskQuestion;
    data.response = data.response[postTaskQuestion];
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

var expID = "stop_signal_rdoc__screener";

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: expID,
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: data => {
    const FLAG_ACCURACY_THRESHOLD = 0.6;
    const FLAG_RT_THRESHOLD = 1000;
    const FLAG_OMISSIONS_THRESHOLD = 0.2;
    const MIN_STOP_ACCURACY_THRESHOLD = 0.25;
    const MAX_STOP_ACCURACY_THRESHOLD = 0.75;

    const PRACTICE_ACCURACY_THRESHOLD = practiceAccuracyThresh;
    const PRACTICE_RT_THRESHOLD = rtThresh;
    const PRACTICE_OMISSIONS_THRESHOLD = missedResponseThresh;

    if (practiceCount < practiceThresh) {
      data.include_subject = 1;
      return;
    }

    const goTrials = jsPsych.data
      .get()
      .filter({ trial_id: "practice_trial", condition: "go" }).trials;

    const stopTrials = jsPsych.data
      .get()
      .filter({ trial_id: "practice_trial", condition: "stop" }).trials;

    const finalBlockGoTrials = jsPsych.data.get().filter({
      trial_id: "practice_trial",
      condition: "go",
      block_num: practiceThresh - 1,
    }).trials;

    const finalBlockStopTrials = jsPsych.data.get().filter({
      trial_id: "practice_trial",
      condition: "stop",
      block_num: practiceThresh - 1,
    }).trials;

    const evaluateGoTrials = trials => {
      const correctTrialsCount = trials.filter(
        obj => obj.correct_trial === 1
      ).length;

      const missedTrialsCount = trials.filter(obj => obj.rt === null).length;
      const responseTimes = trials
        .filter(obj => obj.rt !== null && obj.correct_trial === 1)
        .map(obj => obj.rt);
      const meanResponseTime =
        responseTimes.reduce((acc, rt) => acc + rt, 0) / responseTimes.length;

      return {
        accuracy: correctTrialsCount / trials.length,
        omissions: missedTrialsCount / trials.length,
        meanResponseTime,
      };
    };

    const evaluateStopTrials = trials => {
      const correctTrialsCount = trials.filter(
        obj => obj.correct_trial === 1
      ).length;
      return {
        accuracy: correctTrialsCount / trials.length,
      };
    };

    const overallGoPerformance = evaluateGoTrials(goTrials);
    const overallStopPerformance = evaluateStopTrials(stopTrials);

    const finalBlockGoPerformance = evaluateGoTrials(finalBlockGoTrials);

    const isSubjectIncludedFlagGo = performance => {
      return (
        performance.accuracy >= FLAG_ACCURACY_THRESHOLD &&
        performance.meanResponseTime <= FLAG_RT_THRESHOLD &&
        performance.omissions <= FLAG_OMISSIONS_THRESHOLD
      );
    };

    const isSubjectIncludedPracticeGo = performance => {
      return (
        performance.accuracy >= PRACTICE_ACCURACY_THRESHOLD &&
        performance.meanResponseTime <= PRACTICE_RT_THRESHOLD &&
        performance.omissions <= PRACTICE_OMISSIONS_THRESHOLD
      );
    };

    const isSubjectIncludedStop = performance => {
      return (
        performance.accuracy > MIN_STOP_ACCURACY_THRESHOLD &&
        performance.accuracy < MAX_STOP_ACCURACY_THRESHOLD
      );
    };

    data.include_subject =
      (isSubjectIncludedFlagGo(overallGoPerformance) &&
        isSubjectIncludedStop(overallStopPerformance)) ||
      isSubjectIncludedPracticeGo(finalBlockGoPerformance)
        ? 1
        : 0;
  },
};

var stop_signal_rdoc__screener_experiment = [];
var stop_signal_rdoc__screener_init = () => {
  jsPsych.pluginAPI.preloadImages(images);
  stims = createTrialTypes(practiceLen);
  stop_signal_rdoc__screener_experiment.push(fullscreen);
  stop_signal_rdoc__screener_experiment.push(instructionNode);
  stop_signal_rdoc__screener_experiment.push(practiceNode);
  stop_signal_rdoc__screener_experiment.push(postTaskBlock);
  stop_signal_rdoc__screener_experiment.push(endBlock);
  stop_signal_rdoc__screener_experiment.push(exitFullscreen);
};
