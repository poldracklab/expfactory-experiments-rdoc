# script to convert single task data json output from expfactory_deploy_local to csv

# imports
import json
import pandas as pd

# path to json output
file_path = ''
task_name_timestamped = file_path.split('.json')[0]

# parse json
with open(file_path, "r", encoding="utf-8") as file:
    data = json.load(file)
    trial_data = json.loads(data["trialdata"])
    df = pd.DataFrame(trial_data)

    df.to_csv(f'./{task_name_timestamped}.csv')

    print(f"Converted {task_name_timestamped}.json to {task_name_timestamped}.csv")

print(df.columns)