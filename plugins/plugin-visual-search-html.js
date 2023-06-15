function addTextToDivs(divsString, targetString, optionsArray) {
  const divs = document.createElement("div");
  divs.innerHTML = divsString;

  const targetDiv = document.createElement("div");
  targetDiv.innerHTML = targetString;

  const allDivs = [...divs.childNodes, ...targetDiv.childNodes];

  const shuffledOptions = shuffleArray(optionsArray);

  allDivs.forEach((div, index) => {
    const optionIndex = index % shuffledOptions.length;
    const option = shuffledOptions[optionIndex];
    div.classList.add(option);
  });

  return {
    divs: divs.innerHTML,
    target: targetDiv.innerHTML,
  };
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
      number_of_targets: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Number of targets",
        default: null,
      },
      number_of_distractors: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Number of distractors",
        default: null,
      },
      trial_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Trial duration",
        default: null,
      },
      /**
       * How long to show the stimulus.
       */
      stimulus_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Stimulus duration",
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

      distractorsHTML = distractorsHTML.join("");

      var optionsArray = [
        "top_left",
        "top_middle",
        "top_right",
        "bottom_left",
        "bottom_middle",
        "bottom_right",
      ];

      var { divs, target } = addTextToDivs(
        distractorsHTML,
        targetHTML,
        optionsArray
      );

      distractorsHTML = divs;
      targetHTML = target;

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

        if (trial.choices.includes(e.key) && trial.response_ends_trial) {
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

      if (!trial.response_ends_trial) {
        // Adjust trial duration if response doesn't end the trial
        const trialDuration = trial.trial_duration || 0;
        this.jsPsych.pluginAPI.setTimeout(end_trial, trialDuration);
      }

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
      document.addEventListener("keydown", handleResponse);
    }

    simulate(trial, simulation_mode, simulation_options, load_callback) {
      if (simulation_mode == "data-only") {
        load_callback();
        this.simulate_data_only(trial, simulation_options);
      }
      if (simulation_mode == "visual") {
        this.simulate_visual(trial, simulation_options, load_callback);
      }
    }
    create_simulation_data(trial, simulation_options) {
      const default_data = {
        stimulus: trial.stimulus,
        rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
        response: this.jsPsych.pluginAPI.getValidKey(trial.choices),
      };
      const data = this.jsPsych.pluginAPI.mergeSimulationData(
        default_data,
        simulation_options
      );
      this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
      return data;
    }
    simulate_data_only(trial, simulation_options) {
      const data = this.create_simulation_data(trial, simulation_options);
      this.jsPsych.finishTrial(data);
    }
    simulate_visual(trial, simulation_options, load_callback) {
      const data = this.create_simulation_data(trial, simulation_options);
      const display_element = this.jsPsych.getDisplayElement();
      this.trial(display_element, trial);
      load_callback();
      if (data.rt !== null) {
        this.jsPsych.pluginAPI.pressKey(data.response, data.rt);
      }
    }
  }

  VisualSearchHTMLPlugin.info = info;

  return VisualSearchHTMLPlugin;
})(jsPsychModule);
