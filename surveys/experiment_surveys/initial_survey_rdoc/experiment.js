var questions = [
  {
    type: "multi-choice",
    prompt:
      'Privacy notice: Your data will not be linked to any identifiable information. If you read and agree with the privacy notice, select "Yes". If you do not agree with the privacy notice, select "No".',
    name: "privacy_notice",
    required: true,
    options: ["Yes", "No"],
  },
  {
    type: "multi-choice",
    prompt:
      "Would you be able to complete a series of 12, 1-hour long batteries of tasks and surveys? At the completion of each 1-hour battery, you will be sent an additional 1-hour battery within 1 day. We expect you to complete the full 12, 1-hour batteries within 21 days. Are you confident that you can complete the study according to this schedule?",
    name: "timing_of_study",
    required: true,
    options: ["Yes", "No"],
  },
  {
    type: "multi-choice",
    prompt:
      "This study includes repeating 11 cognitive tasks 5 times each, and within each task there are many repetitions of each trial type. Though you are free to leave the study at any time, the nature of the study and planned analyses require complete, 12-hour datasets. Given this study structure, are you confident that you will be able to complete all 12 sessions of the main study? If you are reluctant to continue or think you may not be able to complete all 12 sessions, respond “no” to this question.",
    name: "structure_of_study",
    required: true,
    options: ["Yes", "No"],
  },
];

var instructions = [
  `<div class='instructions'>
    <div>
      <p class='block-text'>Welcome to the screener for the 12 hour long cognitive task study.</p>
      <p class='block-text'>This study is the first screener to evaluate your interest and eligibility for a subsequent study (the “main” study) that involves completing around 12 hours of cognitive tasks and survey questionnaires.</p>

      <p class='block-text'>The entirety of the main study will take about 12 hours to complete, and it will be separated into 12, 1-hour batteries. During the main study you will complete 11 different cognitive tasks 5 times each. Once you have completed this brief screener, you may be invited to the second screener, which includes practice sessions for a sample of the cognitive tasks in the main study. If you remain interested after completing both screeners, you may be sent a 1-hour study on Prolific that contains a link to tasks and questionnaires. After the completion of each 1-hour study, you will wait ~16 hours and then you will receive the invitation to the subsequent 1-hour study. This will proceed until the completion of all 12, 1-hour studies.</p>

      <p class='block-text'>You will be compensated $0.30 for the first screener, and completing it may lead to a second screener that compensates $2. Participating in the main study involves 12 sessions, with compensation of $8 per session. Completing all sessions earns a $24 bonus. Together, the compensation for both screeners, all sessions, and the bonus amounts to a total of $122.30.</p>
      <p class='block-text'>You may only use a desktop for this study.</p>
      <p class='block-text'>Press <b>enter</b> to begin the survey.</p>
    </div>
  </div>`,
];

var instructionsBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "instructions",
    trial_duration: 180000,
  },
  trial_duration: 180000,
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
    const { privacy_notice, timing_of_study, structure_of_study } =
      data.response;
    data["privacy_notice"] = privacy_notice;
    data["timing_of_study"] = timing_of_study;
    data["structure_of_study"] = structure_of_study;
  },
};

var postTaskQuestion =
  "Do you have any comments, concerns, or issues pertaining to this survey?";

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
    exp_id: "initial_survey_rdoc",
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function (data) {
    var { privacy_notice, timing_of_study, structure_of_study } = jsPsych.data
      .get()
      .filter({ trial_id: "survey" }).trials[0];
    if (
      privacy_notice === "Yes" &&
      timing_of_study === "Yes" &&
      structure_of_study === "Yes"
    ) {
      data["include_subject"] = 1;
    } else {
      data["include_subject"] = 0;
    }
  },
};

initial_survey_rdoc_experiment = [];
var initial_survey_rdoc_init = () => {
  initial_survey_rdoc_experiment.push(fullscreen);
  initial_survey_rdoc_experiment.push(instructionsBlock);
  initial_survey_rdoc_experiment.push(trial);
  initial_survey_rdoc_experiment.push(postTaskBlock);
  initial_survey_rdoc_experiment.push(endBlock);
  initial_survey_rdoc_experiment.push(exitFullscreen);
};
