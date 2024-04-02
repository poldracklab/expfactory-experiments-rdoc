#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import json
import ast


# In[ ]:


thresholds = {
    "ax_cpt_rdoc": {"accuracy": 0.6, "rt": 1000, "omissions": 0.2},
    "cued_task_switching_rdoc": {"accuracy": 0.6, "rt": 1000, "omissions": 0.2},
    "flanker_rdoc": {"accuracy": 0.6, "rt": 1000, "omissions": 0.2},
    "go_nogo_rdoc": {
        "accuracy": 0.6,
        "rt": 1000,
        "omissions": 0.2,
        "check_response": 0.6,
    },
    "n_back_rdoc": {
        "accuracy": 0.6,
        "rt": 1000,
        "omissions": 0.2,
        "check_response": 0.6,
    },
    "span_rdoc__behavioral": {"accuracy": 0.25, "rt": 1000, "omissions": 0.2},
    "spatial_cueing_rdoc": {"accuracy": 0.6, "rt": 1000, "omissions": 0.2},
    "spatial_task_switching_rdoc": {"accuracy": 0.6, "rt": 1000, "omissions": 0.2},
    "stop_signal_rdoc": {"accuracy": 0.6, "rt": 1000, "omissions": 0.2},
    "stroop_rdoc": {"accuracy": 0.6, "rt": 1000, "omissions": 0.2},
    "visual_search_rdoc": {"accuracy": 0.6, "rt": 1500, "omissions": 0.2},
}


# In[ ]:


def feedback_generator(
    task, attention_check_accuracy, accuracy, rt, omissions, check_response=None
):
    feedbacks = []
    threshold = thresholds[task]

    if attention_check_accuracy < 0.6:
        feedback = f"Overall attention check accuracy of {attention_check_accuracy*100:.2f}% is low for {task}."
        feedbacks.append(feedback)

    if accuracy < threshold['accuracy']:
        feedback = f"Overall task accuracy of {accuracy*100:.2f}% is low for {task}."
        feedbacks.append(feedback)
    if rt > threshold['rt']:
        feedback = f"Overall rt of {rt} is high for {task}."
        feedbacks.append(feedback)
    if omissions > threshold['omissions']:
        feedback = f"Overall omissions of {omissions*100:.2f}% is high for {task}."
        feedbacks.append(feedback)

    if check_response != None:
        if check_response > threshold['check_response']:
            feedback = f"Single response proportion of {check_response} is high for {task}."
            feedbacks.append(feedback)

    return feedbacks


# In[ ]:


def organize_data(file):
    with open(file, "r") as file:
        data = json.load(file)

    data_dict = {}

    for task, task_data in data.items():
        for task_item in task_data:
            sub_id = task_item["subject"]
            dict_obj = ast.literal_eval(task_item["data"])

            # Check if 'trialdata' exists in dict_obj
            if "trialdata" not in dict_obj:
                continue  # Skip to the next iteration if 'trialdata' is not present

            # Check the type of 'trialdata'
            if isinstance(dict_obj["trialdata"], str):
                trial_data = json.loads(dict_obj["trialdata"])
            else:
                trial_data = dict_obj["trialdata"]

            single_sub_df = pd.DataFrame(trial_data)

            if sub_id not in data_dict:
                data_dict[sub_id] = {}

            if task not in data_dict[sub_id]:
                data_dict[sub_id][task] = []

            data_dict[sub_id][task].append(single_sub_df)

    return data_dict


# In[ ]:


json_file = '../data/[subject data file].json'
data_dict = organize_data(json_file)

# In[ ]:


def get_attention_check_accuracy(df):
    attention_checks = df[(df["trial_id"] == "test_attention_check")]
    attention_check_accuracy = attention_checks["correct_trial"].mean()
    return attention_check_accuracy


# In[ ]:


def get_span_processing_rt(df):
    test_trials = df[df["trial_id"] == "test_inter-stimulus"]
    correct_test_trials = test_trials[test_trials["correct_trial"] == 1]
    average_rt = correct_test_trials["rt"].mean()
    return average_rt


# In[ ]:


def get_span_omissions(df):
    test_trials = df[df["trial_id"] == "test_trial"]
    proportion = (test_trials["response"].apply(lambda x: len(x) == 4)).mean()
    return proportion


# In[ ]:


def get_average_rt(df):
    test_trials = df[df["trial_id"] == "test_trial"]
    correct_test_trials = test_trials[test_trials["correct_trial"] == 1]
    average_rt = correct_test_trials['rt'].mean()
    return average_rt


# In[ ]:


def get_accuracy(df):
    test_trials = df[df["trial_id"] == "test_trial"]
    average_accuracy = test_trials['correct_trial'].mean()
    return average_accuracy


# In[ ]:


def get_span_accuracy(df):
    test_trials = df[df["trial_id"] == "test_trial"]

    responses = test_trials["response"]
    correct_spatial_sequences = test_trials["spatial_sequence"]

    # Function to calculate the accuracy for each row
    def calculate_accuracy(response, correct_sequence):
        correct_responses = len(set(response).intersection(correct_sequence))
        return correct_responses / len(correct_sequence)

    # Calculating accuracies for each row
    accuracies = [
        calculate_accuracy(resp, corr_seq)
        for resp, corr_seq in zip(responses, correct_spatial_sequences)
    ]

    # Calculating the mean accuracy for the whole dataframe
    mean_accuracy = sum(accuracies) / len(accuracies)
    return mean_accuracy


# In[ ]:


def get_omissions(df):
    test_trials = df[df["trial_id"] == "test_trial"]
    average_omissions = test_trials["rt"].isna().mean()
    return average_omissions


# In[ ]:


def check_n_back_responses(df):
    test_trials = df[df["trial_id"] == "test_trial"]
    value_counts = test_trials["response"].value_counts()

    proportions = value_counts / test_trials["response"].count()
    mismatch_correct_response = df[
            (df["correct_trial"] == 1) & (df["condition"] == "mismatch")
        ]["response"].unique()[0]

    return proportions[mismatch_correct_response]


# In[ ]:


def check_go_nogo_responses(df):
    test_trials = df[df["trial_id"] == "test_trial"]
    value_counts = test_trials["response"].value_counts()

    proportions = value_counts / test_trials["response"].count()
    mismatch_correct_response = df[
            (df["correct_trial"] == 1) & (df["condition"] == "go")
        ]["response"].unique()[0]

    return proportions[mismatch_correct_response]


# In[ ]:


def get_stopping(df):
    test_trials = df[df["trial_id"] == "test_trial"]
    go_trials = test_trials[test_trials["condition"] == "go"]
    correct_go_trials = go_trials[go_trials["correct_trial"] == 1]
    stop_trials = test_trials[test_trials["condition"] == "stop"]

    go_accuracy = go_trials["correct_trial"].mean()
    go_omissions = go_trials["rt"].isna().mean()
    stop_accuracy = stop_trials["correct_trial"].mean()
    go_rt = correct_go_trials["rt"].mean()

    max_SSD = test_trials["SSD"].max()
    min_SSD = test_trials["SSD"].min()
    mean_SSD = test_trials["SSD"].mean()
    SSD = test_trials["SSD"].iloc[-1]

    return {
        'go_accuracy': go_accuracy, 
        'go_omissions': go_omissions, 
        'stop_accuracy': stop_accuracy, 
        'go_rt': go_rt, 
        'max_SSD': max_SSD, 
        'min_SSD':  min_SSD, 
        'mean_SSD': mean_SSD,
        'SSD': SSD
    }


# In[ ]:


for sub in data_dict:
    for task in data_dict[sub]:
        array_of_task_dfs = data_dict[sub][task]
        for task_df in array_of_task_dfs:
            print(task)
            attention_check_accuracy = get_attention_check_accuracy(task_df)
            average_accuracy = get_accuracy(task_df)

            if task == "span_rdoc__behavioral":
                average_rt = get_span_processing_rt(task_df)
                average_omissions = get_span_omissions(task_df)
                average_accuracy = get_span_accuracy(task_df)
            elif task == "stop_signal_rdoc":
                stopping_data = get_stopping(task_df)
            else:
                average_rt = get_average_rt(task_df)
                average_omissions = get_omissions(task_df)

            if task == "n_back_rdoc":
                check_response = check_n_back_responses(task_df)
            elif task == "go_nogo_rdoc":
                check_response = check_go_nogo_responses(task_df)
            else:
                check_response = None

            feedback = feedback_generator(
                task,
                attention_check_accuracy,
                average_accuracy,
                average_rt,
                average_omissions,
                check_response,
            )

