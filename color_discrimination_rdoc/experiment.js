// Using images from here: https://www.colorlitelens.com/ishihara-test.html (ishihara test)
var pathSource = "/static/experiments/color_discrimination_rdoc/images/";
var fileTypePNG = ".png'></img>";
var preFileType =
  "<img class = center src='/static/experiments/n_back_rdoc/images/";

var pathSource = "/static/experiments/color_discrimination_rdoc/images/";
var colorblindImages = [
  "colorblind-2",
  "colorblind-3",
  "colorblind-5",
  "colorblind-6",
  "colorblind-7",
  "colorblind-8",
  "colorblind-12",
  "colorblind-16",
  "colorblind-29",
  "colorblind-42",
  "colorblind-45",
  "colorblind-74",
  "colorblind-97",
];

var numTrials = colorblindImages.length;
var html;
var correct_response;

var stims = [];
var images = [];

function generateStims() {
  var stims = [];

  function extractNumber(str) {
    const match = str.match(/-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  for (let i = 0; i < colorblindImages.length; i++) {
    let src = `${pathSource}${colorblindImages[i]}.png`;
    let correct_response = extractNumber(src);
    let stim = {
      prompt: src,
      name: colorblindImages[i],
      correct_response,
    };
    stims.push(stim);
    images.push(src);
  }

  shuffleArray(stims);

  return stims;
}

var stims = generateStims();

const getInstructFeedback = () =>
  `<div class="centerbox"><p class="center-block-text">${feedbackInstructText}</p></div>`;

var currStim;
const getQuestion = () => {
  currStim = stims.shift();

  return [
    {
      type: "text",
      name: currStim.name,
      prompt: `<img src=${currStim.prompt}>`,
      textbox_columns: 5,
      required: true,
      placeholder: "Enter a number",
    },
  ];
};

var feedbackInstructText = `
  <p class=center-block-text>
    Welcome! This experiment will take around 5 minutes.
  </p>
  <p class=center-block-text>
    To avoid technical issues,
    please keep the experiment tab (on Chrome or Firefox)
    active and fullscreen for the whole duration of each task.
  </p>
  <p class=center-block-text> Press <i>enter</i> to begin.</p>
`;

var speedReminder = `
  <p class = block-text>
    Try to respond as quickly and accurately as possible.
  </p>
`;

var instructions = [
  `
  <div class=centerbox>
    <p class=block-text>During this task, on each trial you will see a number displayed on different colored backgrounds.</p>
    <p class=block-text>Below the number, you will see a text box. Please type the number you see on the screen into this box. If you do not see a number, type 0 into the box.</p>
    <p class=block-text>It might be a bit tricky to see the number because of the background color, but try your best to figure out what it is.</p>
    <p class=block-text>Press <b>enter</b> to begin the task.</p>
  </div>
  `,
];

var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>`;

var instructionsBlock = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["Enter"],
  data: {
    trial_id: "instructions",
    trial_duration: 180000,
  },
  stimulus: instructions,
  post_trial_gap: 0,
  trial_duration: 180000,
};

var testTrial = {
  type: jsPsychSurveyText,
  questions: getQuestion,
  response_ends_trial: false,
  on_load: function (trial) {
    const inputField = document.getElementById("input-0");

    if (inputField) {
      inputField.setAttribute("type", "number");
      inputField.setAttribute("placeholder", "Enter a number");
      inputField.setAttribute("min", "0"); // Set minimum value to 0

      // Listen for input events and prevent the value from going below 0
      inputField.addEventListener("input", function () {
        if (parseInt(this.value, 10) < 0) {
          this.value = "0";
        }
      });
    }
  },
  data: {
    trial_id: "test_trial",
  },
  on_finish: function (data) {
    const { correct_response, name } = currStim;

    data.correct_response = correct_response;
    data.center_number = correct_response;
    data.correct_trial =
      correct_response === Number(data.response[name]) ? 1 : 0;
  },
};

var testTrials = [];

for (let i = 0; i < colorblindImages.length; i++) {
  testTrials.push(testTrial);
}

var testNode = {
  timeline: testTrials,
};

var fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  on_finish: function (data) {
    data["group_index"] = group_index;
  },
};
var exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

var expID = "color_blindness_rdoc";

// last block in timeline
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
  on_finish: function (data) {
    const trial_data = jsPsych.data.get().filter({ trial_id: "test_trial" });
    const correct_trials = trial_data.filter({ correct_trial: 1 });
    const accuracy = correct_trials.trials.length / trial_data.trials.length;
    if (accuracy < 0.2) {
      data.include_subject = 0;
    } else {
      data.include_subject = 1;
    }
  },
};

var color_discrimination_rdoc_experiment = [];
var color_discrimination_rdoc_init = () => {
  jsPsych.pluginAPI.preloadImages(images);
  color_discrimination_rdoc_experiment.push(fullscreen);
  color_discrimination_rdoc_experiment.push(instructionsBlock);
  color_discrimination_rdoc_experiment.push(testNode);
  color_discrimination_rdoc_experiment.push(endBlock);
  color_discrimination_rdoc_experiment.push(exitFullscreen);
};
