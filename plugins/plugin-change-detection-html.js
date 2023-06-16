function addTextToDivs(divsString, targetString, positions, colors) {
  const divs = document.createElement("div");
  divs.innerHTML = divsString;

  const targetDiv = document.createElement("div");
  targetDiv.innerHTML = targetString;

  const allDivs = [...divs.childNodes, ...targetDiv.childNodes];

  const shuffledPositions = shuffleArray(positions);
  let shuffledColors = shuffleArray(colors);
  shuffledColors.pop();
  allDivs.forEach((div, index) => {
    const classIndex = index % shuffledPositions.length;
    const colorIndex = index % shuffledColors.length;

    const class_to_add = shuffledPositions[classIndex];
    const color_to_add = shuffledColors[colorIndex];

    div.classList.add(class_to_add);
    div.classList.add(color_to_add);
  });

  return {
    divs: divs.innerHTML,
    target: targetDiv.innerHTML,
  };
}

function replaceClassValue(string, valuesArray, replacementValue) {
  var regex = /class="([^"]*)"/;
  var match = string.match(regex);

  if (match && match[1]) {
    var classAttribute = match[1];
    var classNames = classAttribute.split(" ");

    for (var i = 0; i < classNames.length; i++) {
      if (valuesArray.includes(classNames[i])) {
        classNames[i] = replacementValue;
      }
    }

    var newClassAttribute = classNames.join(" ");
    var newString = string.replace(classAttribute, newClassAttribute);
    return newString;
  }

  return string;
}

function extractMissingOptions(optionsArray, strings) {
  var usedOptions = [];

  // Extract options from strings
  strings.forEach(function (string) {
    var regex = /class="([^"]*)"/g;
    var matches = string.match(regex);

    if (matches) {
      matches.forEach(function (match) {
        var classAttribute = match.substring(7, match.length - 1); // Remove 'class="' and '"'
        var classNames = classAttribute.split(" ");
        usedOptions.push(...classNames);
      });
    }
  });

  // Find missing options
  var missingOptions = optionsArray.filter(function (option) {
    return !usedOptions.includes(option);
  });

  return missingOptions;
}

function clusterArray(array, groupSize) {
  var clusters = [];
  var currentCluster = [];

  for (var i = 0; i < array.length; i++) {
    currentCluster.push(array[i]);

    if (currentCluster.length === groupSize) {
      clusters.push(currentCluster);
      currentCluster = [];
    }
  }

  if (currentCluster.length > 0) {
    clusters.push(currentCluster);
  }

  return clusters;
}

function extractClassValues(htmlString) {
  // Regular expression to match class values inside each div
  var regex = /class="([^"]*)"/g;

  // Extract class attribute values from the string using global matching
  var matches = htmlString.match(regex);

  // Check if matches are found
  if (matches) {
    // Initialize an empty array to store class names
    var classValues = [];

    // Iterate over each match
    for (var i = 0; i < matches.length; i++) {
      // Extract the class attribute value
      var match = matches[i];
      var classAttribute = match.substring(7, match.length - 1); // Remove 'class="' and '"'

      // Split the class attribute value into an array of class names
      var classNames = classAttribute.split(" ");

      // Add the class names to the array
      classValues.push(...classNames);
    }

    // Return the array of class names
    return classValues;
  }

  // Return an empty array if no class attributes are found
  return [];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const jsPsychChangeDetectionHTML = (function (jspsych) {
  "use strict";

  const info = {
    name: "change-detection-html",
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
      sample_test: {
        type: jspsych.ParameterType.OBJECT,
        pretty_name: "Sample test",
        default: undefined,
        nested: {
          previous_target: {
            type: jspsych.ParameterType.ARRAY,
            pretty_name: "Previous target",
            default: [],
          },
          previous_distractions: {
            type: jspsych.ParameterType.ARRAY,
            pretty_name: "Previous distractions",
            default: [],
          },
          color_will_change: {
            type: jspsych.ParameterType.BOOL,
            pretty_name: "Color will change",
            default: false,
          },
        },
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

  class ChangeDetectionHTMLPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      let targetHTML = trial.target;
      let distractorsHTML = trial.distractors.map((d) => d.stimulus);
      distractorsHTML = distractorsHTML.join("");
      var optionsArray1 = [
        "top_left",
        "top_middle",
        "top_right",
        "bottom_left",
        "bottom_middle",
        "bottom_right",
      ];

      var optionsArray2 = [
        "black",
        "white",
        "red",
        "blue",
        "green",
        "orange",
        "purple",
      ];

      if (trial.sample_test.previous_target == null) {
        var { divs, target } = addTextToDivs(
          distractorsHTML,
          targetHTML,
          optionsArray1,
          optionsArray2
        );

        distractorsHTML = divs;
        targetHTML = target;
      } else {
        var { color_will_change, previous_target, previous_distractors } =
          trial.sample_test;
        if (color_will_change) {
          var missing_color = extractMissingOptions(optionsArray2, [
            previous_target,
            previous_distractors,
          ])[0];

          var temp = previous_target;

          previous_target = replaceClassValue(
            previous_target,
            optionsArray2,
            missing_color
          );

          targetHTML = previous_target;
          distractorsHTML = previous_distractors;
        } else {
          targetHTML = previous_target;
          distractorsHTML = previous_distractors;
        }
      }

      let html = `<div id="jspsych-change-detection-target">${targetHTML}</div><div id="jspsych-change-detection-distractors">${distractorsHTML}</div>`;

      if (trial.prompt !== null) {
        html += trial.prompt;
      }
      display_element.innerHTML = html;

      const start_time = performance.now();
      const response = {
        rt: null,
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
          "#jspsych-change-detection-html-stimulus"
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
            "#jspsych-change-detection-target"
          ).style.visibility = "hidden";
          display_element.querySelector(
            "#jspsych-change-detection-distractors"
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

  ChangeDetectionHTMLPlugin.info = info;

  return ChangeDetectionHTMLPlugin;
})(jsPsychModule);
