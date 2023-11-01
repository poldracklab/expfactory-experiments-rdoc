# Overview

### From RDoC Grant

To address our three aims, we propose two large data acquisition efforts that will form the basis for our modeling and validation efforts.

### Aim 1: Behavioral Data Acquisition

We will acquire behavioral data from 500 subjects who will complete a 15-hour study consisting of the following tasks and surveys:

- 13 attention tasks
- Cognitive control tasks
- Working memory tasks
- Suite of real-world surveys

### Aim 2: Neuroimaging Data Acquisition

We will acquire neuroimaging data from 65 subjects who will also complete a 15-hour study, including:

- 10 MRI scans (90 minutes each)
- Same set of 13 attention, working memory, and cognitive control tasks
- Suite of real-world surveys

## Aim 3: Practice Effect Evaluation

Aim 3 leverages the data from Aim 2 to evaluate the effect of practice on the key RDoC constructs.

Taken together, these 13 tasks capture all 10 constructs and subconstructs currently specified in the cognitive system of the RDoC matrix for attention, cognitive control, and working memory. Given the central role of these 13 tasks to all 3 aims of our proposal, we briefly describe each task before detailing the approach of each of our aims. Note: In the approach section, we will use the term "construct" to refer to both top-level constructs and subconstructs unless explicitly noted.

# Instructions to Run Task

## GitHub

### Getting and Using Experiment Factory Repository (Required to Run RDoC Tasks)

See this Google doc for help: [Google Doc Link](https://docs.google.com/document/d/15AqIepUrRgYsvsfRPFhWibXs_mPFBPJ7Oi-HQv4056I/edit)

To run the RDoC tasks, follow these steps:

1. Fork/Clone this repository: [expfactory/expfactory-deploy](https://github.com/expfactory/expfactory-deploy) and download it to your local machine.
2. Open up the terminal (`command + spacebar` on Mac).
3. Change directory (`cd`) to wherever the `expfactory-deploy` directory is located. Then `cd` into `expfactory-deploy-local`.
4. Run `pip install -e .`.
5. Follow the instructions below to get the RDoC repository.

### Getting and Using RDoC Repository

To run the RDoC repository, follow these steps:

1. Fork/Clone the repository and download it onto your local machine.
2. Open up the terminal (`command + spacebar` on Mac).
3. Change directory (`cd`) to wherever the `expfactory-experiments-rdoc` directory is located.
4. Run `expfactory_deploy_local -e [task_name_rdoc]`. For example: `expfactory_deploy_local -e cued_task_switching_rdoc` or `expfactory_deploy_local -e span_rdoc`.
5. Open the web address (likely http://0.0.0.0:8080/) from the terminal where you ran the command. Use Google Chrome or Mozilla Firefox.
6. Optional: Use (`command + option + j`) while in the experiment's window to see important information like durations, number of trials/blocks, total durations, etc.

# See number of trials and trial durations for each task
- [Google Sheets Link](https://docs.google.com/spreadsheets/d/1PxkmaEm0JxRYWNtKBB6u5G4rDwxnE9fjT-OGmx-4i_8/edit?usp=sharing)
- [Google Sheets Link for RDoC Task Timings](https://docs.google.com/spreadsheets/d/1ImGru0qSTaTMwlrOKQUzkmN939SMLWp3EV94Zj4Mgeg/edit?usp=sharing)