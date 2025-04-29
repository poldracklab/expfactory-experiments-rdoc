var fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
};
var exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

var expID = "post_battery_feedback_rdoc";

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
    exp_id: expID,
    trial_duration: 15000,
  },
  trial_duration: 15000,
  stimulus: endText,
  choices: ["Enter"],
};

var post_task_question =
  "<p><b>Do you have any comments, concerns, or issues pertaining to the battery you just completed?</b></p><p>This screen will advance automatically in 2 minutes.</p>";

var text_box = `
<form>
    <textarea id='feedback_response' rows="10" cols="100"></textarea>
</form>
`;
var trial = {
  type: PostBatteryFeedback,
  data: {
    trial_id: "post_battery_feedback",
    trial_duration: 120000,
  },
  prompt: post_task_question,
  html: text_box,
  response_ends_trial: true,
  trial_duration: 120000,
};

post_battery_feedback_rdoc_experiment = [];
var post_battery_feedback_rdoc_init = () => {
  post_battery_feedback_rdoc_experiment.push(fullscreen);
  post_battery_feedback_rdoc_experiment.push(trial);
  post_battery_feedback_rdoc_experiment.push(endBlock);
  post_battery_feedback_rdoc_experiment.push(exitFullscreen);
};
