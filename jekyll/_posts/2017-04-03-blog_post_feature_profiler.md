# Feature Availability Profiler

## Background

Let's say that I developed and trained a predictive machine learning model on retrospective data from an inpatient unit. I may be trying to identfy patients at risk for a certain outcome during their stay in the hospital.

Let's presume that the model is performing well with an [ROC AUC](https://healthcare.ai/model-evaluation-using-roc-curves/) of 0.83.

Things appear to be going smoothly, so I push the model out to production to make predictions on current patient data. I check back in on the model and find that the *in the wild* ROC AUC has fallen to 0.67.

What's happening here? It is likely I might be experiencing some [data leakage](https://healthcare.ai/data-leakage-in-healthcare-machine-learning/). This means that in the retrospective training data I might have had a table like this:

| AdmitDateTime       | MRN  | Height | Weight | Age  | Gender | LabRBC | LabHematocrit |
| ------------------- | ---- | ------ | ------ | ---- | ------ | ------ | ------------- |
| 2017-04-01 00:05:44 | 3    | 156    | 68     | 56   | F      | 5.3    | 47            |
| 2017-04-01 00:06:33 | 4    | 166    | 94     | 33   | M      | 6.1    | 39            |
| 2017-04-02 00:07:59 | 5    | 134    | 47     | 88   | M      | 5.9    | 55            |
| 2017-04-02 00:13:07 | 1    | 180    | 66     | 56   | F      | 5.5    | 41            |
| 2017-04-03 00:21:12 | 2    | 177    | 57     | 45   | M      | 6.3    | 48            |

Let's imagine that the model used height, weight, age, gender, red blood count and hematocrit as features.

However, realtime data is never this clean and available. If I were to look at records of patients who are currently in hospital, I might see something like this:


| AdmitDateTime       | MRN  | Height | Weight | Age  | Gender | LabRBC | LabHematocrit |
| ------------------- | ---- | ------ | ------ | ---- | ------ | ------ | ------------- |
| 2017-04-01 00:05:44 | 1    | 156    | 68     | 56   | F      | 5.3    | 47            |
| 2017-04-01 00:06:33 | 2    | 166    | 94     | 33   | M      | 6.1    | 39            |
| 2017-04-02 00:07:59 | 3    | 134    | 47     | 88   | M      |        |               |
| 2017-04-02 00:13:07 | 4    | 180    | 66     | 56   | F      |        |               |
| 2017-04-03 00:21:12 | 5    | 177    | 57     |      | M      |        |               |

Here I see a few patients (id 1 & 2) have been here for a few days and have had CBC labs done. However if I look at patients 3-5 I see that they have not been admits as long and are missing some labs. Patient 5 was admitted a few hours ago and I don't even have access to his age yet.

When I run the predictive model on these patients with missing values the model has less information about each patient and will therefore make a less accurate prediction.

## A solution

As our team helps users with healthcare.ai, we keep seeing this problem. So, we built a tool to help uncover this problem. We call it the **Feature Availability Profiler**. We would love to hear how you have dealt with (or avoided) this problem.

## How the Feature Availability Profiler works

The profiler is an easy tool you can run on a snapshot of your data. Rather than collecting data over time (which would be more accurate), I opted to look at a table for a single point in time as a quick starting point.

1. Build a dataframe that contains an entire table with all the feature columns you care about. Make sure that the dataframe has a timestamp column that shows when the patient was admitted. You will also need to know the timestamp of the last data load. (This is used to calculate the hours each patient has been admitted.)
2. Run the feature profiler using your **dataframe**, the **admit column name** and the **load timestamp column**.
3. You will see a plot that shows each feature's average availability as time goes on.

This plot can be used to get some insight into when you're features can be used (in other words, when the values are no longer null values). From this insight you can do a few things (and we'd love your ideas...):

- Remove some fields that aren't usually populated by the time you need predictions from the model. This will require retraining the model without those fields.
- Decide on a time threshold that balances your need for timely ML predictions and data availability.
- Set some conditional logic so that your ML model runs only on patients whose admit time is beyond your threshold. This means that they will likely have more values so you can get more accurate predictions.
- Consider clinician workflow and research ways to get fields populated faster.

It's worth noting that none of these solutions are ideal and all involve trade-offs. Sometimes you'll have to delay predictions. Sometimes you'll have to throw away very predictive columns because. Sometimes you'll have to change clinician workflow and processes.

### Use in R - healthcare.ai

```R
library(healthcareai)
library(RODBC)

# Setup the database connection
connection.string = "
driver={SQL Server};
server=localhost;
database=SAM;
trusted_connection=true
"

# Build your query
query = "
SELECT
[AdmitDateTime]
,[ColumnLoadDateTime]
,[patientID]
,[MRN]
,[Height]
,[Weight]
,[Age]
,[Gender]
,[LabRBC]
,[LabHematocrit]
FROM [SAM].[dbo].[Inpatients]
"

# Create a dataframe
dataframe = selectData(connection.string, query)

# Run the profiler
healthcareai::featureAvailabiltyProfiler(dataframe, 'AdmitDateTime', 'LastLoadTime')
```

### Use in Python - healthcare.ai

```python
import pandas as pd
import pyodbc
from healthcareai.common.feature_availability_profiler import feature_availability_profiler

# Connect to the database
db_connection = pyodbc.connect("""DRIVER={SQL Server Native Client 11.0};
                                   SERVER=localhost;
                                   Trusted_Connection=yes;""")
# Build your query
query = """
SELECT
[AdmitDateTime]
,[ColumnLoadDateTime]
,[patientID]
,[MRN]
,[Height]
,[Weight]
,[Age]
,[Gender]
,[LabRBC]
,[LabHematocrit]
FROM [SAM].[dbo].[Inpatients]
"""

# Create a dataframe
dataframe = pd.read_sql(db_connection, query)

# Run the profiler
feature_availability_profiler(dataframe, admit_col_name='AdmitDateTime', last_load_col_name='ColumnLoadDateTime')
```

## Conclusion

If you do not have access to large amounts of 'active' (meaning not retrospective fully populated records) rows, you may want to run this over the course of a few days to get a more clear picture on what the profiles look like.

Data leakage is a real problem. This tool might give you some insight and help you build models that will perform better in the wild.