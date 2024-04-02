import random
import csv
import os

random.seed(3)  # Set the random seed so the batteries are reproducible

# Given data
tasks = {
    "ax-cpt": 16.78833333,
    "cuedTS": 10.12166667,
    "flanker": 6.446666667,
    "go-nogo": 9.471666667,
    "nback": 9.271666667,
    "span": 23.68,
    "spatial_cueing": 12.84666667,
    "spatialTS": 10.12166667,
    "stop_signal": 9.046666667,
    "stroop": 6.446666667,
    "visual_search": 11.08,
}

BATTERY_LIMIT = 60  # in minutes
seen_batteries = set()  # Keep track of generated batteries to avoid duplicates


def generate_batteries():
    all_tasks = list(tasks.keys())
    random.shuffle(all_tasks)
    task_order = all_tasks * 5

    # Insert the survey task randomly into the task_order
    survey_position = random.randint(0, len(task_order))
    task_order.insert(survey_position, "survey")

    batteries = []
    current_battery = []
    current_time = 0

    for task in task_order:
        if current_time + (tasks[task] if task in tasks else 40) <= BATTERY_LIMIT:
            current_battery.append(task)
            current_time += tasks[task] if task in tasks else 40
        else:
            batteries.append(current_battery)
            current_battery = [task]
            current_time = tasks[task] if task in tasks else 40

    if current_battery: 
        batteries.append(current_battery)


    battery_tuple = tuple(frozenset(battery) for battery in batteries)

    # Check if these batteries have been seen before
    if battery_tuple in seen_batteries:
        return []

    seen_batteries.add(battery_tuple)
    return batteries

def calculate_battery_time(battery):
    return sum(tasks[task] if task in tasks else 40 for task in battery)

def all_tasks_within_desired_range(all_sets):
    # Step 1: Initialize a dictionary to store the positions of each task across the sets
    task_positions = {task: [] for task in tasks}

    # Step 2: Iterate through each set and each battery to capture the position of the first instance of each task
    for battery_set in all_sets:
        position = 1  # Initialize position for each new set
        seen_tasks_in_set = set()  # Keep track of tasks we've already seen in this set
        for battery in battery_set:
            for task in battery:
                if task in task_positions and task not in seen_tasks_in_set:
                    task_positions[task].append(position)
                    seen_tasks_in_set.add(task)  # Mark the task as seen in this set
                position += 1

    # Step 3: Calculate the average position for each task
    task_avg_positions = {}
    for task, positions in task_positions.items():
        task_avg_positions[task] = sum(positions) / len(positions)

    # Step 4: Check if the average position is between 5 and 7 for all tasks
    return all(5 <= avg <= 7 for avg in task_avg_positions.values()), task_avg_positions


while True:
    all_sets = []

    # Keep trying until 12 batteries are created for each set
    for _ in range(4):
        batteries = []
        while len(batteries) != 12:
            batteries = generate_batteries()
        all_sets.append(batteries)
    flag, task_avg_positions = all_tasks_within_desired_range(all_sets)
    if flag:
        print(f'Average task positions:\n {task_avg_positions}')
        break  # Exit loop if the sets meet the criteria

for set in all_sets:
    for battery in set:
        if 'survey' in battery:
            battery.remove('survey')
            battery.append('survey')

def calculate_mean_indices(array_of_arrays):
    from collections import defaultdict
    import numpy as np
    
    # Track the indices for each unique value
    value_indices = defaultdict(list)
    
    for i, block in enumerate(array_of_arrays):
        for j, sublist in enumerate(block):
            for value in sublist:
                value_indices[value].append(i * len(block) + j)
    
    # Calculate the mean index for each value
    mean_indices = {key: np.mean(indices) for key, indices in value_indices.items()}
    
    return mean_indices

# Flattening the array of arrays into a single list
flattened_arrays = []
for item in all_sets:
    if isinstance(item[0], list): 
        for sublist in item:
            flattened_arrays.extend(sublist)
    else:
        flattened_arrays.extend(item)

# Calculating the average index for each color
indexes = {'ax-cpt': [], 'cuedTS': [], 'flanker': [], 'go-nogo': [], 'nback': [], 'span': [], 'spatial_cueing': [], 'spatialTS': [], 'stop_signal': [], 'stroop': [], 'visual_search': [], 'survey': []}
for i, task in enumerate(flattened_arrays):
    indexes[task].append(i / 4 / 5)

average_indexes = {color: sum(indexes[color])/len(indexes[color]) for color in indexes}


# Base directory
data_dir = "../data/"

# Directories for raw and processed data
raw_data_dir = os.path.join(data_dir, "raw/")
processed_data_dir = os.path.join(data_dir, "processed/")

# Create directory if doesn't exist
def create_dir_if_not_exists(directory):
    try:
        os.makedirs(directory, exist_ok=True)
        print(f"{directory} created or already exists.")
    except Exception as e:
        print(f"Error creating {directory}: {e}")


create_dir_if_not_exists(processed_data_dir)

# Path to the CSV file
csv_file_path = os.path.join(processed_data_dir, 'batteries.csv')

# Check if the file exists 
if os.path.exists(csv_file_path):
    print(f'Overwriting existing {csv_file_path} file.')
else:
    print(f'Creating new {csv_file_path} file.')


# After generating the batteries, write them to a CSV file
with open(csv_file_path, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    
    # Write the header
    writer.writerow(["Set Number", "Battery Number", "Tasks", "Estimated Time (min)"])
    
    # Write the batteries for each set
    for set_num, battery_set in enumerate(all_sets, start=1):
        for i, battery in enumerate(battery_set, start=1):
            time_estimate = calculate_battery_time(battery) 
            writer.writerow([f"Set {set_num}", f"Battery {i}", ', '.join(battery), time_estimate])