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
  on_finish: data => {
    data["proceed_to_main_study"] = data.response.post_practice_question;
    if (data.response.post_practice_question == "Yes") {
      data["include_subject"] = 1;
    } else {
      data["include_subject"] = 0;
    }
  },
};

var followUpTrial = {
  type: jsPsychSurveyText,
  preamble: `<div style='max-width:1000px; text-align:left;'>
  <p>Thank you for your honesty. You chose <b>not to proceed</b> to the main study.</p>
    <p>We understand that this study requires a significant commitment, and it's important to us that our participants feel confident in their ability to complete all sessions.</p>
    <p>We appreciate the time you've invested in the practice sessions.</p>
    <p>Please be assured that you will still receive compensation for the screener and any practice sessions you've completed.</p> 
    <p>Choosing not to proceed allows us to ensure that all participants in the main study can fully commit to the required schedule, which is crucial for the integrity of our research findings. We hope that you found the experience insightful and that you might consider participating in future studies that better fit your schedule or interests.</p>
    <p>Thank you again for your participation and understanding.</p>
    </div>`,
  questions: [
    {
      prompt: `<div style='max-width:1000px; text-align:left;'>
      <p><b>We Value Your Feedback</b></p>
    <p>We would greatly appreciate it if you could tell us more about your decision not to proceed to the main study. Your feedback is crucial for us to understand your concerns and to improve the experience for all participants in the future.</p>
    <p>Please share any thoughts or reasons for your decision in the box below:</p>
    </div>`,
      rows: 10,
      columns: 60,
      required: false,
      placeholder:
        "Please share your reasons for not continuing, or any feedback you have about the study so far.",
    },
  ],
  trial_duration: 60000,
  on_finish: function (data) {
    data.question =
      "Please share your reasons for not continuing, or any feedback you have about the study so far.";
    data.response = data.response["Q0"];
  },
};

var conditionalTrial = {
  timeline: [followUpTrial],
  conditional_function: function () {
    var response = jsPsych.data.get().last(1).values()[0].proceed_to_main_study;
    if (response === "No") {
      return true;
    } else {
      return false;
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
    exp_id: "retain_interest_survey_rdoc",
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
  retain_interest_survey_rdoc_experiment.push(conditionalTrial);
  retain_interest_survey_rdoc_experiment.push(endBlock);
  retain_interest_survey_rdoc_experiment.push(exitFullscreen);
};
