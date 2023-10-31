# JSON to CSV Converter: `json_to_csv.ipynb`

1. **Specify Your File**: Replace `filename` with the name of the JSON file you wish to convert.
2. **Execute**: Run the script.
3. **Output**: A CSV file will be generated and saved in the `data/` directory.

# Preliminary Data Quality Control Analysis: \`qc_data.ipynb\`

1. **Data Import**: The notebook is has functions to load data files from the rdoc tasks, each structured in a specific way. Ensure that your data files are located in the correct path or adjust the paths as necessary.

2. **Functions Provided**:
   - **Accuracy Calculation**: Mean accuracy across trials or conditions.
   - **Reaction Time (RT) Analysis**: Average reaction times for correct trials.
   - **Omission Rate Analysis**: Proportion of trials that were missed or where participants failed to respond.
   - **Stop Signal Data Analysis**: For tasks with stopping behavior, metrics like stop accuracy, go accuracy, SSD
   - **Attention Check Analysis**: Checks accuracy on attention checks, which occur before starting each test block

3. **Tailored for Different Tasks**: Each data processing function can handle specificities of different tasks. For instance, there are functions designed for tasks with factorial conditions, those that use a block design, and others.

4. **Execution**:
   - Load the task data csvs.
   - Select and run the relevant analysis functions, adjust parameters like \`condition_col\`, \`test_trial\`, etc., based on your dataset's structure.
   - We should have any data with poor scores (e.g. random-chance accuracy or really high rts) flagged and an email sent to us with information about the data and subject. This will help us QC data during our prolific acquisition

5. **Output**: Right now just prints out metrics, but again we should have this be integrated with expfactory somehow 

Note: Ensure dependencies (e.g., \`pandas\`) are installed and up-to-date. Adjust paths and filenames to read in data, later customize this to work with Prolific data. 
