import numpy as np
import random

def create_balanced_array():
    random.seed(0)
    outer_array = []
    for _ in range(4):  # For each outer array
        inner_array = []
        # Ensure at least 2 of each [0, 1] and [1, 0] pairs
        base_pairs = [[0, 1], [1, 0], [0, 1], [1, 0]]
        random.shuffle(base_pairs)  # Shuffle to randomize the placement
        for _ in range(5 - len(base_pairs)):  # Fill the rest to make 5 inner arrays
            pair = [0, 1] if random.choice([True, False]) else [1, 0]
            base_pairs.append(pair)
        random.shuffle(base_pairs)  # Shuffle again for good measure
        inner_array.extend(base_pairs)
        outer_array.append(inner_array)
    return outer_array

# Print the generated 3D array
span_sets = create_balanced_array()

def calculate_proportions(array):
    count_10 = 0
    count_01 = 0
    total_pairs = 0  # Total number of [1,0] and [0,1] pairs

    # Iterate through each level of the array to count [1,0] and [0,1]
    for outer in array:
        for inner in outer:
            if inner == [1, 0]:
                count_10 += 1
            elif inner == [0, 1]:
                count_01 += 1

    total_pairs = count_10 + count_01

    # Calculate proportions if there are any pairs to avoid division by zero
    if total_pairs > 0:
        proportion_10 = count_10 / total_pairs
        proportion_01 = count_01 / total_pairs
    else:
        proportion_10 = 0
        proportion_01 = 0

    return {"[1, 0]": proportion_10, "[0, 1]": proportion_01}
    