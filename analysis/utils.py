# utils.py

import pandas as pd


class TaskData:
    def __init__(self, dataframe):
        # Initialize with a DataFrame
        self.dataframe = dataframe.copy()
        self.exp_id = dataframe["exp_id"].unique()[1]
        self.attention_check_trials = dataframe[
            dataframe["trial_id"] == "test_attention_check"
        ].copy()

        # Filter the DataFrame to include only test trials
        if self.exp_id == "span_rdoc":
            self.test_trials = None
            self.test_response_trials = dataframe[
                dataframe["trial_id"] == "test_response"
            ].copy()
            self.test_inter_stim_trials = dataframe[
                dataframe["trial_id"] == "test_inter-stimulus"
            ].copy()
        else:
            self.test_trials = dataframe[dataframe["trial_id"] == "test_trial"].copy()
            self.test_trials["correct_trial"] = pd.to_numeric(
                self.test_trials["correct_trial"], errors="coerce"
            )

        if self.exp_id == "stop_signal_rdoc":
            self.correct_test_trials = self.test_trials[self.test_trials["go_acc"] == 1]
        elif self.exp_id == "span_rdoc":
            self.correct_test_trials = None
            self.correct_test_inter_stim_trials = self.test_inter_stim_trials[
                self.test_inter_stim_trials["correct_trial"] == 1
            ]
            self.correct_test_response_trials = self.test_response_trials[
                self.test_response_trials["correct_trial"] == 1
            ]
        else:
            self.correct_test_trials = self.test_trials[
                self.test_trials["correct_trial"] == 1
            ]

    def get_id(self):
        return self.exp_id

    def get_total_time(self):
        # Calculate the difference in milliseconds
        total_time_ms = (
            self.dataframe["time_elapsed"].iloc[-1]
            - self.dataframe["time_elapsed"].iloc[0]
        )

        # Convert milliseconds to seconds and round to the nearest whole number
        total_time_seconds = round(total_time_ms / 1000)

        # Convert total seconds to minutes and seconds
        minutes = total_time_seconds // 60
        seconds = total_time_seconds % 60

        # Format the result as "minutes:seconds"
        return f"{minutes} minutes, {seconds} seconds"

    def get_max_time_diff_trial_ids(self):
        # Calculate the difference in 'time_elapsed' between each row and the next
        self.dataframe["time_diff"] = self.dataframe["time_elapsed"].diff(-1).abs()

        # Find the maximum time difference
        max_time_diff = self.dataframe["time_diff"].max()

        # Get 'trial_id' of rows where the time difference is equal to the maximum
        max_diff_trial_ids = self.dataframe[
            self.dataframe["time_diff"] == max_time_diff
        ]["trial_id"]

        return max_diff_trial_ids.tolist()

    def calculate_attention_checks_acc(self):
        # Convert 'correct_trial' to boolean: True if the value is "TRUE", False otherwise
        # Assuming "TRUE" is a string; adjust if it's a different type
        attention_checks_acc = (
            self.attention_check_trials["correct_trial"]
            .apply(lambda x: x.lower() == "true")
            .mean()
        )

        return attention_checks_acc

    def calculate_mean_rts(self):
        """
        desc: Group by 'condition' and calculate the mean rts for each condition
        """
        if self.exp_id == "span_rdoc":  # span task
            rt_by_condition = self.correct_test_inter_stim_trials.groupby("condition")[
                "rt"
            ].mean()
        else:
            rt_by_condition = self.correct_test_trials.groupby("condition")["rt"].mean()

        if self.exp_id == "go_nogo_rdoc":
            del rt_by_condition["nogo"]
        return rt_by_condition

    def calculate_mean_accs(self):
        """
        desc: Group by 'condition' and calculate the mean accuracy for each condition
        """
        if self.exp_id == "span_rdoc":
            group_accuracy = self.test_inter_stim_trials.groupby("condition").apply(
                lambda x: len(x[x["correct_trial"] == 1]) / len(x)
            )
        elif self.exp_id == "stop_signal_rdoc":
            # if condition of row is "go" use "go_acc", if condition of row is "stop" use "stop_acc" instead of "correct_trial"
            group_accuracy = self.test_trials.groupby("condition").apply(
                lambda x: len(x[x["go_acc"] == 1]) / len(x)
                if x.name == "go"
                else len(x[x["stop_acc"] == 1]) / len(x)
            )
        else:
            group_accuracy = self.test_trials.groupby("condition").apply(
                lambda x: len(x[x["correct_trial"] == 1]) / len(x)
            )

        return group_accuracy.to_dict()

    def calculate_mean_omissions(self):
        """
        desc: Group by 'condition' and calculate the mean omissions for each condition
        """
        if self.exp_id == "span_rdoc":
            # Calculate omissions based on 'response' being an empty list
            group_response_omissions = self.test_response_trials.groupby(
                "condition"
            ).apply(lambda x: x["response"].apply(lambda resp: resp == "[]").mean())
            group_inter_stim_omissions = self.test_inter_stim_trials.groupby(
                "condition"
            ).apply(lambda x: x["rt"].isna().mean())

            del group_inter_stim_omissions["simple"]

            group_omissions = {
                "response": group_response_omissions,
                "inter_stimulus": group_inter_stim_omissions,
            }

        else:
            # For other cases, also group by 'condition'
            group_omissions = self.test_trials.groupby("condition").apply(
                lambda x: x["rt"].isna().mean()
            )

        if self.exp_id == "go_nogo_rdoc":
            del group_omissions["nogo"]
        elif self.exp_id == "stop_signal_rdoc":
            del group_omissions["stop"]

        if self.exp_id == "span_rdoc":
            return group_omissions
        else:
            return group_omissions.to_dict()
