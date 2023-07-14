# From RDoC Grant 
To address our three aims, we propose two large data acquisition efforts that will form the basis for our modeling and validation efforts. In Aim 1, we will acquire behavioral data from 500 subjects who will complete an 15 hour study that consists of 13 attention, cognitive control, and working memory tasks and a suite of real-world surveys. In Aim 2, we will acquire neuroimaging data from 65 subjects who will also complete a 15 hour study (10, 90-minute MRI scans) that consists of the same 13 attention, working memory, and cognitive control tasks and suite of real-world surveys. Aim 3 leverages the data from Aim 2 to evaluate the effect of practice on these key RDoC constructs. Taken together, these 13 tasks capture all 10 constructs and subconstructs currently specified in the cognitive system of the RDoC matrix for attention, cognitive control, and working memory. Given the central role of these 13 tasks to all 3 aims of our proposal, we briefly describe each task before detailing the approach of each of our aims. Note: In the approach section we will use the term “construct” to refer to both top-level constructs and subconstructs unless explicitly noted.

# For analysis 
## For viewing example output
Google Sheets of modified results.txt output:
https://docs.google.com/spreadsheets/d/1mJ4ZCSlJ7E9zrfr6HhoEAed4Dzpn2R57L1Uw7PcNEcY/edit#gid=642158126

## Changing txt to prettier json
to prettier:
jq '.trialdata | fromjson' < results.txt > results.pretty.json

## Output readable data
Ran this command to change data output:
echo '"trial_index","rt","stimulus", "trial_id", "trial_type", "condition", "expStage", "correctResponse"' > results.csv && jq -r '.[] | [.trial_index, .rt, .stimulus, .trial_id, .trial_type] | @csv' results.pretty.json >> results.csv