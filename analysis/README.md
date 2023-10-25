# JSON to CSV Converter: `json_to_csv.ipynb`

1. **Specify Your File**: Replace `filename` with the name of the JSON file you wish to convert.
2. **Execute**: Run the script.
3. **Output**: A CSV file will be generated and saved in the `data/` directory.

# Preliminary Data Quality Control Analysis: \`qc_data.ipynb\`

1. **Data Import**: The notebook is equipped with functions to seamlessly load data files from various cognitive tasks, each structured in a specific way. Ensure that your data files are located in the correct path or adjust the paths as necessary.

2. **Functions Provided**:
   - **Accuracy Calculation**: Determine the mean accuracy across trials or conditions.
   - **Reaction Time (RT) Analysis**: Compute average reaction times, offering insights into response speed.
   - **Omission Rate Analysis**: Identify the percentage of trials that were missed or where participants failed to respond.
   - **Stop Signal Data Analysis**: For tasks with stopping behavior, understand metrics like stop accuracy, go accuracy, and more.
   - ... and various other functions tailored for specific cognitive tasks.

3. **Tailored for Different Tasks**: Each data processing function can handle specificities of different tasks. For instance, there are functions designed for tasks with factorial conditions, those that use a block design, and others.

4. **Execution**:
   - Load your desired dataset using the provided import functions.
   - Select and run the relevant analysis functions for your task. Adjust parameters like \`condition_col\`, \`test_trial\`, etc., based on your dataset's structure.
   - View the printed results for a quick assessment of the key metrics.

5. **Output**: The notebook prints out metrics and statistics relevant for preliminary quality control. This can aid in initial data checks before more in-depth analyses.

6. **Customization**: The notebook is designed to be modular, allowing for easy expansion or modification. Add or adjust functions as your dataset requires.

Note: Ensure dependencies (e.g., \`pandas\`) are installed and up-to-date. Adjust paths and filenames as necessary to fit your directory structure.
