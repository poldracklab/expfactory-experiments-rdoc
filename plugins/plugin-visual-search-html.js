const getRandomPositions = (count) => {
  const screenWidth = 1920;
  const screenHeight = 1080;
  const constrainedWidth = 991.29;
  const constrainedHeight = 607.38;
  const positions = [];
  const diff_width = 28.8 / 0.7;
  const diff_height = 67.2 / 0.7;

  for (let i = 0; i < count; i++) {
    let isValidPosition = false;
    let randomLeft, randomTop;

    while (!isValidPosition) {
      randomLeft = Math.floor(
        screenWidth / 2 -
          constrainedWidth / 2 +
          Math.random() * constrainedWidth
      );
      randomTop = Math.floor(
        screenHeight / 2 -
          constrainedHeight / 2 +
          Math.random() * constrainedHeight
      );

      isValidPosition = positions.every((position) => {
        const diffX = Math.abs(randomLeft - position.left);
        const diffY = Math.abs(randomTop - position.top);
        return diffX >= diff_width && diffY >= diff_height;
      });
    }

    positions.push({ left: randomLeft, top: randomTop });
  }

  return positions;
};

function replaceDivWithStyle(htmlString, leftPosition, topPosition) {
  var modifiedHTML = htmlString.replace("<div", function (match) {
    return `<div style="position: absolute; left: ${leftPosition}px; top: ${topPosition}px;"`;
  });
  return modifiedHTML;
}

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
        nested: {
          stimulus: {
            type: jspsych.ParameterType.HTML_STRING,
            pretty_name: "Stimulus",
            default: undefined,
          },
        },
      },
      target_present: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Target present",
        default: true,
      },
      /**
       * Any content here will be displayed below the stimulus.
       */
      prompt: {
        type: jspsych.ParameterType.HTML_STRING,
        pretty_name: "Prompt",
        default: null,
      },
      choices: {
        type: jspsych.ParameterType.KEYS,
        pretty_name: "Choices",
        default: [],
        array: true,
        description:
          "The keys the participant is allowed to press to respond to the stimulus.",
      },
      /**
       * How long to show the stimulus.
       */
      stimulus_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Stimulus duration",
        default: null,
      },
      /**
       * How long to show trial before it ends.
       */
      trial_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Trial duration",
        default: null,
      },
      /**
       * If true, trial will end when subject makes a response.
       */
      response_ends_trial: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Response ends trial",
        default: true,
      },
    },
  };

  class VisualSearchHTMLPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      // Generate HTML for target and distractors
      let targetHTML = trial.target;
      let distractorsHTML = trial.distractors.map((d) => d.stimulus);
      let allRandomPositions = getRandomPositions(4);

      targetHTML = replaceDivWithStyle(
        targetHTML,
        allRandomPositions[0].left,
        allRandomPositions[0].top
      );

      distractorsHTML[0] = replaceDivWithStyle(
        distractorsHTML[0],
        allRandomPositions[1].left,
        allRandomPositions[1].top
      );
      distractorsHTML[1] = replaceDivWithStyle(
        distractorsHTML[1],
        allRandomPositions[2].left,
        allRandomPositions[2].top
      );
      distractorsHTML[2] = replaceDivWithStyle(
        distractorsHTML[2],
        allRandomPositions[3].left,
        allRandomPositions[3].top
      );

      distractorsHTML = distractorsHTML.join("");

      // Create the target and distractors container
      let html =
        '<div id="jspsych-visual-search-target">' +
        targetHTML +
        '</div><div id="jspsych-visual-search-distractors">' +
        distractorsHTML +
        "</div>";

      // add prompt
      if (trial.prompt !== null) {
        html += trial.prompt;
      }
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
          end_trial();
        }
      };

      // function to end trial when it is time
      const end_trial = () => {
        // kill any remaining setTimeout handlers
        this.jsPsych.pluginAPI.clearAllTimeouts();
        // kill keyboard listeners
        if (typeof keyboardListener !== "undefined") {
          this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }

        // gather the data to store for the trial
        var trial_data = {
          rt: response.rt,
          response: response.key_press,
          targetHTML: targetHTML,
          distractorsHTML: distractorsHTML,
        };
        // clear the display
        display_element.innerHTML = "";
        // move on to the next trial
        this.jsPsych.finishTrial(trial_data);
      };
      // function to handle responses by the subject
      var after_response = (info) => {
        // after a valid response, the stimulus will have the CSS class 'responded'
        // which can be used to provide visual feedback that a response was recorded
        display_element.querySelector(
          "#jspsych-visual-search-html-stimulus"
        ).className += " responded";
        // only record the first response
        if (response.key == null) {
          response = info;
        }
        if (trial.response_ends_trial) {
          end_trial();
        }
      };
      // start the response listener
      if (trial.choices != "NO_KEYS") {
        var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: trial.choices,
          rt_method: "performance",
          persist: false,
          allow_held_key: false,
        });
      }
      // hide stimulus if stimulus_duration is set
      if (trial.stimulus_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(() => {
          display_element.querySelector(
            "#jspsych-visual-search-target"
          ).style.visibility = "hidden";
          display_element.querySelector(
            "#jspsych-visual-search-distractors"
          ).style.visibility = "hidden";
        }, trial.stimulus_duration);
      }
      // end trial if trial_duration is set
      if (trial.trial_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
      }

      // Add event listener for keydown
      document.addEventListener("keydown", handleResponse);
    }
  }

  VisualSearchHTMLPlugin.info = info;

  return VisualSearchHTMLPlugin;
})(jsPsychModule);
