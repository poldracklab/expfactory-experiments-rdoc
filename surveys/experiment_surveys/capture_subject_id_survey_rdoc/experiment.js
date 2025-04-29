var questions = [
  {
    type: "text",
    prompt:
      'Please enter your subject ID, please include the prefix in your response (e.g., enter "s001" below):',
    name: "subject_id",
    required: true,
  },
];

var instructions = [
  `<div class='instructions'>
    <div>
      <p>Welcome to the study!</p>
      <p>This brief survey is designed to collect your unique subject ID.</p>
      <p>Press <b>enter</b> to continue.</p>
    </div>
  </div>`,
];

var instructionsBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "instructions",
    trial_duration: 30000,
  },
  trial_duration: 30000,
  stimulus: instructions,
  choices: ["Enter"],
  post_trial_gap: 0,
};
var trial = {
  type: jsPsychSurvey,
  pages: [questions],
  button_label_finish: "Submit",
  data: {
    trial_id: "survey",
  },
  on_finish: function (data) {
    data["subject_id"] = data.response.subject_id;
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

var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>
`;

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: "capture_subject_id_survey_rdoc",
    trial_duration: 15000,
  },
  trial_duration: 15000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
};
capture_subject_id_survey_rdoc_experiment = [];
var capture_subject_id_survey_rdoc_init = () => {
  capture_subject_id_survey_rdoc_experiment.push(fullscreen);
  capture_subject_id_survey_rdoc_experiment.push(instructionsBlock);
  capture_subject_id_survey_rdoc_experiment.push(trial);
  capture_subject_id_survey_rdoc_experiment.push(endBlock);
  capture_subject_id_survey_rdoc_experiment.push(exitFullscreen);
};
