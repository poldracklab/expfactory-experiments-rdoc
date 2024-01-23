const createSurveyQuestions = questions => {
  const firstObj = {
    type: "html",
    prompt:
      "<h2>Indicate how much the statement applied to you <b>over the past week</b></h2>",
    name: "Indicate how much the statement applied to you over the past week",
  };

  var surveyQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    var questionObj = {
      type: "likert",
      likert_scale_values: [
        { value: 1, text: "Did not apply to me at all" },
        { value: 2, text: "Applied to me to some degree, or some of the time" },
        {
          value: 3,
          text: "Applied to me to a considerable degree or good part of the time",
        },
        { value: 4, text: "Applied to me very much or most of the time" },
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
  "I found it hard to wind down.",
  "I was aware of dryness of my mouth.",
  "I couldn't seem to experience any positive feeling at all.",
  "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion).",
  "I found it difficult to work up the initiative to do things.",
  "I tended to over-react to situations.",
  "I experienced trembling (e.g. in the hands).",
  "I felt that I was using a lot of nervous energy.",
  "I was worried about situations in which I might panic and make a fool of myself.",
  "I felt that I had nothing to look forward to.",
  "I found myself getting agitated.",
  "I found it difficult to relax.",
  "I felt down-hearted and blue.",
  "I was intolerant of anything that kept me from getting on with what I was doing.",
  "I felt I was close to panic.",
  "I was unable to become enthusiastic about anything.",
  "I felt I wasn't worth much as a person.",
  "I felt I was rather touchy.",
  "I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat).",
  "I felt scared without any good reason.",
  "I felt that life was meaningless.",
];

var surveyQuestions = createSurveyQuestions(questions);

var instructions = [
  `<div class='instructions'>
      <p>Welcome to this survey.</p>
      <p>Please read each statement and select the option which indicates how much the statement applied to you <b>over the past week</b>. There are no right or wrong answers. Do not spend too much time on any statement.</p>
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
    if (
      "Indicate how much the statement applied to you over the past week" in
      data.response
    ) {
      delete data.response[
        "Indicate how much the statement applied to you over the past week"
      ];
    }
    data.likert_scale_1_label = "Did not apply to me at all";
    data.likert_scale_2_label =
      "Applied to me to some degree, or some of the time";
    data.likert_scale_3_label =
      "Applied to me to a considerable degree or good part of the time";
    data.likert_scale_4_label = "Applied to me very much or most of the time";

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
    exp_id: "dass21_survey_rdoc",
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
};

dass21_survey_rdoc_experiment = [];
var dass21_survey_rdoc_init = () => {
  dass21_survey_rdoc_experiment.push(fullscreen);
  dass21_survey_rdoc_experiment.push(instructionsBlock);
  dass21_survey_rdoc_experiment.push(trial);
  dass21_survey_rdoc_experiment.push(endBlock);
  dass21_survey_rdoc_experiment.push(exitFullscreen);
};
