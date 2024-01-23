// question_type	question_text	required	page_number	option_text	option_values	variables
// instruction	Welcome to this survey. Press <strong>next</strong> to begin.	0	1
// instruction	When I was growing up . . .	0	2
// radio	"1. People in my family called me things like stupid, lazy, or ugly."	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_1
// radio	2. I thought that my parents wished I had never been born.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_2
// radio	3. I felt that someone in my family hated me.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_3
// radio	4. People in my family said hurtful or insulting things to me.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_4
// radio	5. I believe I was emotionally abused.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_5
// radio	6. I got hit so hard by someone in my family that I had to see a doctor or go to the hospital.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_6
// radio	7. People in my family hit me so hard that it left me with bruises or marks.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_7
// radio	"8. I was punished with a belt, a board, a cord, or some other hard object."	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_8
// radio	9. I believe that I was physically abused.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_9
// radio	"10. I got hit or beaten so badly that it was noticed by someone like a teacher, neighbour, or doctor."	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_10
// radio	"11. Someone tried to touch me in a sexual way, or tried to make me touch them."	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_11
// radio	12. Someone threatened to hurt me or tell lies about me unless I did something sexual with them.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_12
// radio	13. Someone tried to make me do sexual things or watch sexual things.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_13
// radio	14. Someone molested me.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_14
// radio	15. I believe that I was sexually abused.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_15
// radio	16. There was someone in my family who helped me feel that I was important or special.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_16
// radio	17. I felt loved.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_17
// radio	18. People in my family looked out for each other.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_18
// radio	19. People in my family felt close to each other.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_19
// radio	20. My family was a source of strength and support.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_20
// radio	21. I didnt have enough to eat.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_21
// radio	22. I knew that there was someone to take care of me and protect me.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_22
// radio	23. My parents were too drunk or high to take care of the family.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_23
// radio	24. I had to wear dirty clothes.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_24
// radio	25. There was someone to take me to the doctor if I needed it.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_25
// radio	26. There was nothing I wanted to change about my family.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_26
// radio	27. I had the perfect childhood.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_27
// radio	28. I had the best family in the world.	1	2	"never true, rarely true, sometimes true, often true, very often true"	"1, 2, 3, 4, 5"	ctq_28
// instruction	Congratulations for completing this survey! Press < strong > finish</strong > to continue.0	3

var topStatement = "When I was growing up...";

const createSurveyQuestions = questions => {
  const firstObj = {
    type: "html",
    prompt: `<h1>${topStatement}</h1>`,
    name: topStatement,
  };

  var surveyQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    var questionObj = {
      type: "likert",
      likert_scale_values: [
        { value: 1, text: "Never true" },
        { value: 2, text: "Rarely true" },
        { value: 3, text: "Sometimes true" },
        { value: 4, text: "Often true" },
        { value: 5, text: "Very often true" },
      ],
      prompt: `${questions[i]}`,
      name: `${questions[i]}`,
      required: true,
    };
    surveyQuestions.push(questionObj);
  }

  function chunkArray(array, chunkSize, prependedObj) {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      let chunk = array.slice(i, i + chunkSize);
      chunk.unshift(prependedObj); // Add the object to the start of each chunk
      result.push(chunk);
    }
    return result;
  }

  // this won't chunk the array b/c questions.length, but keeping in case we want to split up questions into different pages
  var preparedQuestionArray = chunkArray(
    surveyQuestions,
    questions.length,
    firstObj
  );

  return preparedQuestionArray;
};

var questions = [
  "People in my family called me things like stupid, lazy, or ugly.",
  "I thought that my parents wished I had never been born.",
  "I felt that someone in my family hated me.",
  "People in my family said hurtful or insulting things to me.",
  "I believe I was emotionally abused.",
  "I got hit so hard by someone in my family that I had to see a doctor or go to the hospital.",
  "People in my family hit me so hard that it left me with bruises or marks.",
  "I was punished with a belt, a board, a cord, or some other hard object.",
  "I believe that I was physically abused.",
  "I got hit or beaten so badly that it was noticed by someone like a teacher, neighbour, or doctor.",
  "Someone tried to touch me in a sexual way, or tried to make me touch them.",
  "Someone threatened to hurt me or tell lies about me unless I did something sexual with them.",
  "Someone tried to make me do sexual things or watch sexual things.",
  "Someone molested me.",
  "I believe that I was sexually abused.",
  "There was someone in my family who helped me feel that I was important or special.",
  "I felt loved.",
  "People in my family looked out for each other.",
  "People in my family felt close to each other.",
  "My family was a source of strength and support.",
  "I didnt have enough to eat.",
  "I knew that there was someone to take care of me and protect me.",
  "My parents were too drunk or high to take care of the family.",
  "I had to wear dirty clothes.",
  "There was someone to take me to the doctor if I needed it.",
  "There was nothing I wanted to change about my family.",
  "I had the perfect childhood.",
  "I had the best family in the world.",
];

var surveyQuestions = createSurveyQuestions(questions);

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
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: instructions,
  choices: ["Enter"],
  post_trial_gap: 0,
};
var trial = {
  type: jsPsychSurvey,
  pages: surveyQuestions,
  button_label_finish: "Submit",
  on_finish: function (data) {
    if (topStatement in data.response) {
      delete data.response[topStatement];
    }
    data.likert_scale_1_label = "Never true";
    data.likert_scale_2_label = "Rarely true";
    data.likert_scale_3_label = "Sometimes true";
    data.likert_scale_4_label = "Often true";
    data.likert_scale_5_label = "Very often true";
    console.log(data);
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
    exp_id: "childhood_trauma_survey_rdoc",
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
};

childhood_trauma_survey_rdoc_experiment = [];
var childhood_trauma_survey_rdoc_init = () => {
  childhood_trauma_survey_rdoc_experiment.push(fullscreen);
  childhood_trauma_survey_rdoc_experiment.push(instructionsBlock);
  childhood_trauma_survey_rdoc_experiment.push(trial);
  childhood_trauma_survey_rdoc_experiment.push(endBlock);
  childhood_trauma_survey_rdoc_experiment.push(exitFullscreen);
};
