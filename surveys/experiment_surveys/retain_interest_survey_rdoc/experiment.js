var instructions = [
  `<div class='instructions'>
      <p>Welcome! This survey will take a couple of minutes to complete.</p>
      <p>Press <b>enter</b> to begin.</p>
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
  type: jsPsychSurveyMultiChoice,
  data: {
    trial_id: "instructions",
    trial_duration: 180000,
  },
  trial_duration: 180000,
  questions: [
    {
      prompt: `You've just completed practice sessions for a sample of the cognitive tasks in the 12-hour "main" study. The main study includes 5 repetitions of each of these tasks and 5 repetitions of other, similar tasks. Some subjects find the main study tasks monotonous and/or cognitively demanding.<br><br> 
      Based on your experience with the practice sessions: <br><br>Are you confident that you could complete all 12, 1-hour batteries in the main study?<br><br> If you are reluctant to continue or you think you may not be able to complete all 12 sessions, we ask you to respond “no” to this question. The nature of this study and our planned analyses depend on participants completing the full 12 hours. Therefore, if you are at all unsure about your ability to fulfill this commitment, we encourage you to respond "no" to this question.<br><br> Participating in this study is a serious commitment. By responding "yes," you affirm that you are ready for this commitment and can complete all 12 batteries within 21 days.<br><br> We appreciate your consideration of participating in our study. Should you decide you're unable or unwilling to commit at this time, we understand and, rest assured, you will still receive compensation for the screener and practice sessions that you have already completed.<br><br> If you do choose to proceed with the main study, in addition to your base pay per session, you will receive a reward of $24 when you complete the 12th 1-hour session.`,
      name: "post_practice_question",
      required: true,
      options: ["Yes", "No"],
    },
  ],
  choices: ["Enter"],
  post_trial_gap: 0,
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
    exp_id: "RMR_survey_rdoc",
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
};

retain_interest_survey_rdoc_experiment = [];
var retain_interest_survey_rdoc_init = () => {
  retain_interest_survey_rdoc_experiment.push(fullscreen);
  retain_interest_survey_rdoc_experiment.push(instructionsBlock);
  retain_interest_survey_rdoc_experiment.push(trial);
  retain_interest_survey_rdoc_experiment.push(postTaskBlock);
  retain_interest_survey_rdoc_experiment.push(endBlock);
  retain_interest_survey_rdoc_experiment.push(exitFullscreen);
};
