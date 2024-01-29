function chunkArray(array, chunkSize) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

var questions = [
  {
    type: "multi-choice",
    prompt: "What is your gender?",
    name: "What is your gender?",
    required: true,
    options: [
      "Male",
      "Female",
      "Non-binary/Third gender",
      "Prefer not to answer",
    ],
  },
  {
    type: "text",
    prompt: "How old are you?",
    name: "How old are you?",
    required: true,
    placeholder: "Enter your age in years",
  },
  {
    type: "multi-choice",
    prompt: "What is your race?",
    name: "What is your race?",
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
      'If you chose "Other" for racial background, how would you describe it?',
    name: 'If you chose "Other" for racial background, how would you describe it?',
    required: false,
    placeholder: "Racial background or N/A",
  },
  {
    type: "multi-choice",
    prompt: "Are you of Hispanic, Latino or Spanish origin?",
    name: "Are you of Hispanic, Latino or Spanish origin?",
    required: true,
    options: ["Yes", "No"],
  },
  {
    type: "multi-choice",
    prompt: "What is the highest level of education you have completed?",
    name: "What is the highest level of education you have completed?",
    required: true,
    options: [
      "Did Not Complete High School",
      "High School/GED",
      "Some College",
      "Bachelor's Degree",
      "Master's Degree",
      "Advanced Graduate work or Ph.D",
    ],
  },
  {
    type: "text",
    prompt:
      "How tall are you (in feet and inches)? Enter as X feet Y inches, for example: 5 feet 10 inches.",
    name: "How tall are you (in feet and inches)? Enter as X feet Y inches, for example: 5 feet 10 inches.",
    required: true,
    placeholder: "X feet Y inches",
  },
  {
    type: "text",
    prompt: "How much do you weight (in pounds)?",
    name: "How much do you weight (in pounds)?",
    required: true,
    placeholder: "",
  },
  {
    type: "multi-choice",
    prompt: "What is your relationship status?",
    name: "What is your relationship status?",
    required: true,
    options: ["Single", "Married", "In Committed Relationship"],
  },
  {
    type: "multi-choice",
    prompt: "How many times have you been divorced?",
    name: "How many times have you been divorced?",
    required: true,
    options: ["0", "1", "2", "3", "4", "5", "More than 5"],
  },
  {
    type: "text",
    prompt:
      "How long was/is your longest romantic relationship (in years and months)? Enter as X years Y months.",
    name: "How long was/is your longest romantic relationship (in years and months)? Enter as X years Y months.",
    required: true,
    placeholder: "X years Y months",
  },
  {
    type: "multi-choice",
    prompt: "How many romantic relationships have you had?",
    name: "How many romantic relationships have you had?",
    required: true,
    options: ["0", "1", "2", "3", "4", "5-10", "More than 10"],
  },
  {
    type: "multi-choice",
    prompt: "How many children do you have?",
    name: "How many children do you have?",
    required: true,
    options: ["0", "1", "2", "3", "4", "5-10", "More than 10"],
  },
  {
    type: "text",
    prompt:
      "If you menstruate, when was the date of your last period (Enter as mm/dd/yyyy)? If you do not menstruate, enter N/A.",
    name: "If you menstruate, when was the date of your last period (Enter as mm/dd/yyyy)? If you do not menstruate, enter N/A.",
    required: false,
    placeholder: "",
  },
  {
    type: "text",
    prompt:
      "If you menstruate, what is the length (in days) of your typical cycle? If you do not menstruate, enter N/A.",
    name: "If you menstruate, what is the length (in days) of your typical cycle? If you do not menstruate, enter N/A.",
    required: false,
    placeholder: "",
  },
  {
    type: "multi-choice",
    prompt: "Are you taking any form of hormonal birth control?",
    name: "Are you taking any form of hormonal birth control?",
    required: true,
    options: ["Yes", "No"],
  },
  {
    type: "text",
    prompt:
      'If you chose "Yes" for using hormonal birth control, which type are you using? (List brand and type if known). Enter N/A if not using hormonal birth control.',
    name: 'If you chose "Yes" for using hormonal birth control, which type are you using? (List brand and type if known). Enter N/A if not using hormonal birth control.',
    required: false,
    placeholder: "Brand and type of hormonal birth control",
  },
  {
    type: "text",
    prompt: "What is your household's annual income (in US dollars)?",
    name: "What is your household's annual income (in US dollars)?",
    required: true,
    placeholder: "",
  },
  {
    type: "multi-choice",
    prompt: "Do you have a retirement account?",
    name: "Do you have a retirement account?",
    required: true,
    options: ["Yes", "No"],
  },
  {
    type: "multi-choice",
    prompt:
      "If you do have a retirement account what percent is in stocks? Select N/A if you do not have a retirement account.",
    name: "If you do have a retirement account what percent is in stocks? Select N/A if you do not have a retirement account.",
    required: true,
    options: [
      "N/A",
      "0-10%",
      "10-20%",
      "20-29%",
      "30-39%",
      "40-49%",
      "50-59%",
      "60-69%",
      "70-79%",
      "80-89%",
      "90-100%",
    ],
  },
  {
    type: "multi-choice",
    prompt: "What is your housing status?",
    name: "What is your housing status?",
    required: true,
    options: [
      "Own a home",
      "Rent a home/apartment",
      "Live with someone (no rent)",
      "Residential/halfway house",
      "Shelter",
      "No current home",
    ],
  },
  {
    type: "multi-choice",
    prompt: "How much mortgage debt do you have?",
    name: "How much mortgage debt do you have?",
    required: true,
    options: [
      "0-$499",
      "$500-$2499",
      "$2500-$9999",
      "$10000-$24999",
      "$25000-$49999",
      "$50000-$99999",
      "$100000-$199999",
      "More than $200000",
      "Prefer Not To Say",
    ],
  },
  {
    type: "multi-choice",
    prompt: "How much car-related debt do you have?",
    name: "How much car-related debt do you have?",
    required: true,
    options: [
      "0-$499",
      "$500-$2499",
      "$2500-$9999",
      "$10000-$24999",
      "$25000-$49999",
      "$50000-$99999",
      "$100000-$199999",
      "More than $200000",
      "Prefer Not To Say",
    ],
  },
  {
    type: "multi-choice",
    prompt: "How much education debt do you have?",
    name: "How much education debt do you have?",
    required: true,
    options: [
      "0-$499",
      "$500-$2499",
      "$2500-$9999",
      "$10000-$24999",
      "$25000-$49999",
      "$50000-$99999",
      "$100000-$199999",
      "More than $200000",
      "Prefer Not To Say",
    ],
  },
  {
    type: "multi-choice",
    prompt: "How much credit card debt do you have?",
    name: "How much credit card debt do you have?",
    required: true,
    options: [
      "0-$499",
      "$500-$2499",
      "$2500-$9999",
      "$10000-$24999",
      "$25000-$49999",
      "$50000-$99999",
      "$100000-$199999",
      "More than $200000",
      "Prefer Not To Say",
    ],
  },
  {
    type: "text",
    prompt:
      "Please list any other sources of debt you have (Enter N/A if none):",
    name: "Please list any other sources of debt you have (Enter N/A if none):",
    required: true,
    placeholder: "",
  },
  {
    type: "multi-choice",
    prompt:
      "If you listed any other sources of debt, how much debt do you have from these other sources? Select N/A if do not have any other sources of debt.",
    name: "If you listed any other sources of debt, how much debt do you have from these other sources? Select N/A if do not have any other sources of debt.",
    required: true,
    options: [
      "N/A",
      "0-$499",
      "$500-$2499",
      "$2500-$9999",
      "$10000-$24999",
      "$25000-$49999",
      "$50000-$99999",
      "$100000-$199999",
      "More than $200000",
      "Prefer Not To Say",
    ],
  },
  {
    type: "text",
    prompt: "On average, how many cups of coffee do you have each day?",
    name: "On average, how many cups of coffee do you have each day?",
    required: true,
    placeholder: "",
  },
  {
    type: "text",
    prompt: "On average, how many cups of tea do you have each day?",
    name: "On average, how many cups of tea do you have each day?",
    required: true,
    placeholder: "",
  },
  {
    type: "text",
    prompt:
      "On average, how many cans of caffeinated soda do you have each day?",
    name: "On average, how many cans of caffeinated soda do you have each day?",
    required: true,
    placeholder: "",
  },
  {
    type: "text",
    prompt:
      "What is your daily caffeine intake from other sources each day (in mg)? For reference, a standard 16oz energy drink has about 170mg and a standard milk chocolate bar has about 6mg of caffeine.",
    name: "What is your daily caffeine intake from other sources each day (in mg)? For reference, a standard 16oz energy drink has about 170mg and a standard milk chocolate bar has about 6mg of caffeine.",
    required: true,
    placeholder: "",
  },
  {
    type: "multi-choice",
    prompt: "Do you feel you have a problem with gambling?",
    name: "Do you feel you have a problem with gambling?",
    required: true,
    options: ["No", "Yes in the past but not now", "Yes"],
  },
  {
    type: "multi-choice",
    prompt: "How many traffic tickets have you gotten in the last year?",
    name: "How many traffic tickets have you gotten in the last year?",
    required: true,
    options: ["0", "1", "2", "3", "4", "5-10", "More than 10"],
  },
  {
    type: "multi-choice",
    prompt: "How many traffic accidents have you been in over your life?",
    name: "How many traffic accidents have you been in over your life?",
    required: true,
    options: ["0", "1", "2", "3", "4", "5-10", "More than 10"],
  },
  {
    type: "multi-choice",
    prompt:
      "How many times in your life have you been arrested and/or charged with illegal activities?",
    name: "How many times in your life have you been arrested and/or charged with illegal activities?",
    required: true,
    options: ["0", "1", "2", "3", "4", "5-10", "More than 10"],
  },
  {
    type: "multi-choice",
    prompt: "What are your motivations for participating in this experiment?",
    name: "What are your motivations for participating in this experiment?",
    required: true,
    options: [
      "Money",
      "Tasks are fun",
      "Want to contribute to research",
      "Other",
    ],
  },
  {
    type: "text",
    prompt:
      "If you have other motivations, please list them. Enter N/A if you do not have other motivations for participating.",
    name: "If you have other motivations, please list them. Enter N/A if you do not have other motivations for participating.",
    required: true,
    placeholder: "",
  },
];

var instructions = [
  `<div class='instructions'>
      <p>Welcome to this survey.</p>
      <p>Please answer the following questions regarding your demographics.</p>
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
  pages: [questions],
  button_label_finish: "Submit",
  on_finish: function (data) {
    // if (
    //   "Indicate how much the statement applied to you over the past week" in
    //   data.response
    // ) {
    //   delete data.response[
    //     "Indicate how much the statement applied to you over the past week"
    //   ];
    // }
    // data.likert_scale_1_label = "Did not apply to me at all";
    // data.likert_scale_2_label =
    //   "Applied to me to some degree or some of the time";
    // data.likert_scale_3_label =
    //   "Applied to me to a considerable degree or good part of the time";
    // data.likert_scale_4_label = "Applied to me very much or most of the time";

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
    exp_id: "demographics_survey_rdoc",
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
};

demographics_survey_rdoc_experiment = [];
var demographics_survey_rdoc_init = () => {
  demographics_survey_rdoc_experiment.push(fullscreen);
  demographics_survey_rdoc_experiment.push(instructionsBlock);
  demographics_survey_rdoc_experiment.push(trial);
  demographics_survey_rdoc_experiment.push(endBlock);
  demographics_survey_rdoc_experiment.push(exitFullscreen);
};
