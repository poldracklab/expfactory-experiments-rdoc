var jsPsychVisualSearchHTML = (function (jspsych) {
  "use strict";

  const info = {
    name: "visual-search-html",
    parameters: {
      target: {
        type: jspsych.ParameterType.HTML_STRING,
        pretty_name: "Target",
        default: undefined,
      },
      distractors: {
        type: jspsych.ParameterType.HTML_STRING,
        pretty_name: "Distractors",
        default: undefined,
        array: true,
      },
      target_present: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Target present",
        default: true,
      },
      choices: {
        type: jspsych.ParameterType.KEYS,
        pretty_name: "Choices",
        default: [],
        array: true,
        description:
          "The keys the participant is allowed to press to respond to the stimulus.",
      },
    },
  };

  class VisualSearchHTMLPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      // Generate HTML for target and distractors
      let targetHTML = trial.target.join("");
      let distractorsHTML = trial.distractors.join("");

      // Create the target and distractors container
      let html =
        '<div id="jspsych-visual-search-target">' +
        targetHTML +
        '</div><div id="jspsych-visual-search-distractors">' +
        distractorsHTML +
        "</div>";

      // Set the HTML content
      display_element.innerHTML = html;
      // Record response time and target presence
      const start_time = performance.now();
      const response = {
        rt: null,
        target_present: trial.target_present,
        key_press: null,
      };

      // Function to handle response
      const handleResponse = (e) => {
        if (response.rt === null) {
          response.rt = performance.now() - start_time;
          response.key_press = e.key;
        }

        // Check if the pressed key is one of the allowed choices
        if (trial.choices.includes(e.key)) {
          // Remove event listener
          document.removeEventListener("keydown", handleResponse);

          // End the trial
          this.jsPsych.finishTrial(response);
        }
      };

      // Add event listener for keydown
      document.addEventListener("keydown", handleResponse);
    }
  }

  VisualSearchHTMLPlugin.info = info;

  return VisualSearchHTMLPlugin;
})(jsPsychModule);
