// question_type	question_text	required	page_number	option_text	option_values	variables
// instruction	Welcome to this survey. Press <strong>Next</strong> to begin.	0	1
// instruction	Please answer the following questions regarding your demographics.	0	2
// checkbox	What is your race?	1	3	"American Indian or Alaska Native,Asian,Black or African American,Native Hawaiian or Other Pacific Islander,White,Other (please specify)"	"1,2,3,4,5,6,7"	demographics_3
// textfield	If you chose 'Other' for racial  background how would you describe it?	0	3			demographics_4
// radio	"Are you of Hispanic, Latino or Spanish origin?"	1	3	"Yes, No"	"1,0"	demographics_5

var questions = [
  {
    type: "multi-select",
    prompt: "What is your race?",
    name: "What is your race?",
    key: "race",
    required: true,
    options: [
      "American Indian or Alaska Native",
      "Asian",
      "Black or African American",
      "Native Hawaiian or Other Pacific Islander",
      "White",
      "Other (please specify)",
    ],
  },
  {
    type: "text",
    prompt:
      "If you chose 'Other' for racial background, how would you describe it?",
    name: "If you chose 'Other' for racial background, how would you describe it?",
    key: "race_other",
    required: false,
  },
  {
    type: "multi-choice",
    prompt: "Are you of Hispanic, Latino or Spanish origin?",
    name: "Are you of Hispanic, Latino or Spanish origin?",
    key: "latino",
    required: true,
    options: ["Yes", "No"],
  },
];


var instructions = [
  `<div class='instructions'>
      <p>Welcome to this survey.</p>
      <p>Press <b>enter</b> to begin.</p>
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
  on_finish: function(data) {
  
     Object.keys(data.response).forEach(function (key) {
       var questionItem = questions.find(q => q.name === key);
       if (questionItem) {
         data[questionItem.key] = {
           key: questionItem.key,
           question: questionItem.prompt,
           response: data.response[key],
         };
       }
     });
  }
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
    trial_duration: 15000,
  },
  trial_duration: 15000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
};

race_ethnicity_RMR_survey_rdoc_experiment = [];
var race_ethnicity_RMR_survey_rdoc_init = () => {
  race_ethnicity_RMR_survey_rdoc_experiment.push(fullscreen);
  race_ethnicity_RMR_survey_rdoc_experiment.push(instructionsBlock);
  race_ethnicity_RMR_survey_rdoc_experiment.push(trial);
  race_ethnicity_RMR_survey_rdoc_experiment.push(endBlock);
  race_ethnicity_RMR_survey_rdoc_experiment.push(exitFullscreen);
};
