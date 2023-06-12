const getRandomPositions = (count) => {
  const positions = [];
  // Get window resolution
  var screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  var screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const constrainedWidth = screenWidth * 0.2;
  const constrainedHeight = screenHeight * 0.2;

  const isPositionValid = (randomLeft, randomTop) => {
    return !positions.some((position) => {
      const diffX = Math.abs(randomLeft - position.left);
      const diffY = Math.abs(randomTop - position.top);
      return diffX < 28.8 / 0.7 || diffY < 67.2 / 0.7;
    });
  };

  for (let i = 0; i < count; i++) {
    let isValidPosition = false;
    let randomLeft, randomTop;

    while (!isValidPosition) {
      randomLeft = Math.floor(
        screenWidth * 0.2 + Math.random() * (screenWidth * 0.6)
      );
      randomTop = Math.floor(
        screenHeight * 0.2 + Math.random() * (screenHeight * 0.6)
      );

      isValidPosition = isPositionValid(randomLeft, randomTop);
    }

    positions.push({ left: randomLeft, top: randomTop });
  }

  return positions;
};

const replaceDivWithStyle = (htmlString, leftPosition, topPosition) => {
  return htmlString.replace("<div", () => {
    return `<div style="position: absolute; left: ${leftPosition}px; top: ${topPosition}px;"`;
  });
};

const jsPsychVisualSearchHTML = (function (jspsych) {
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
      stimulus_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Stimulus duration",
        default: null,
      },
      trial_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Trial duration",
        default: null,
      },
      response_ends_trial: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Response ends trial",
        default: false,
      },
    },
  };

  class VisualSearchHTMLPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      let targetHTML = trial.target;
      let distractorsHTML = trial.distractors.map((d) => d.stimulus);
      const [targetPosition, ...otherPositions] = getRandomPositions(4);

      targetHTML = replaceDivWithStyle(
        targetHTML,
        targetPosition.left,
        targetPosition.top
      );

      distractorsHTML = otherPositions
        .map(({ left, top }, index) => {
          return replaceDivWithStyle(distractorsHTML[index], left, top);
        })
        .join("");

      let html = `<div id="jspsych-visual-search-target">${targetHTML}</div><div id="jspsych-visual-search-distractors">${distractorsHTML}</div>`;

      if (trial.prompt !== null) {
        html += trial.prompt;
      }

      display_element.innerHTML = html;

      const start_time = performance.now();
      const response = {
        rt: null,
        target_present: trial.target_present,
        key_press: null,
      };

      const handleResponse = (e) => {
        if (response.rt === null) {
          response.rt = performance.now() - start_time;
          response.key_press = e.key;
        }

        if (trial.choices.includes(e.key)) {
          document.removeEventListener("keydown", handleResponse);
          end_trial();
        }
      };

      const end_trial = () => {
        this.jsPsych.pluginAPI.clearAllTimeouts();

        if (typeof keyboardListener !== "undefined") {
          this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }

        var trial_data = {
          rt: response.rt,
          response: response.key_press,
          targetHTML: targetHTML,
          distractorsHTML: distractorsHTML,
        };

        display_element.innerHTML = "";
        this.jsPsych.finishTrial(trial_data);
      };

      var after_response = () => {
        display_element.querySelector(
          "#jspsych-visual-search-html-stimulus"
        ).className += " responded";

        if (response.key == null) {
          response = info;
        }

        if (trial.response_ends_trial) {
          end_trial();
        }
      };

      if (trial.choices != "NO_KEYS") {
        var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: trial.choices,
          rt_method: "performance",
          persist: false,
          allow_held_key: false,
        });
      }

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

      if (trial.trial_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
      }

      document.addEventListener("keydown", handleResponse);
    }
  }

  VisualSearchHTMLPlugin.info = info;

  return VisualSearchHTMLPlugin;
})(jsPsychModule);
