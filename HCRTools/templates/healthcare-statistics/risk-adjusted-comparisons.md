# Risk-adjusted comparisons via ``RiskAdjustedComparisons``

## What is this?

In healthcare one often wants to compare the performance of two or more groups, or compare the performance of one group from year to year. What makes this difficult is that department heads often say, "Yeah our mortality rate was high, but we have sicker patients than those other guys."

Risk-adjusted comparisons are thus important because they let you compare two healthcare groups on a particular measure (like mortality rate), adjusting for the health of the patients.


## Why is it helpful?

This functionality helps because it allows you to make apples to apples comparisons across groups or units of time.

## So, how do we do it?

First, get some data organized (in via SQL or Excel) that has the following:

* A measure column, such as mortality rate or readmission rate
* A groupby column, such as a HospitalUnit column, that'd have categories like GroupA, GroupB, etc
    This column could also be years or months. R will group the data by this column for the comparisons.

## Class specs for ``RiskAdjustedComparisons``

- __Return__: a data frame that represents your data.

- __Arguments__:
    - __server__: a server name. You'll pull data from this server.
    - __database__: a database name. You'll pull data from this database

## Step 1: Pull in the data via ``SelectData``

```{r}
ptm <- proc.time()
library(HCRTools)

connection.string = "
driver={SQL Server};
server=localhost;
database=AdventureWorks2012;
trusted_connection=true
"

query = "
SELECT
[OrganizationLevel]
,[MaritalStatus]
,[Gender]
,IIF([SalariedFlag]=0,'N','Y') AS SalariedFlag
,[VacationHours]
,[SickLeaveHours]
FROM [AdventureWorks2012].[HumanResources].[Employee]
"

df <- SelectData(connection.string, query)
head(df) # Look at the data you read in
str(df)
```

## Step 2: Set your parameters via ``SupervisedModelParameters``

- __Return__: an object representing your specific configuration.

- __Arguments__:
    - __df__: a data frame. The data your model is based on.
    - __groupCol__: a string. R will group your data by this coulmn for the comparison. Could be a list of units in the hospital. Years or months would also work.
    - __impute__: a boolean, defaults to FALSE. Whether to impute by replacing NULLs with column mean (for numeric columns) or column mode (for categorical columns).
    - __predictedCol__: a string. Name of variable (or column) that you want to compare the groups by. This could be mortality or readmission, for example.
    - __debug__: a boolean, defaults to FALSE. If TRUE, console output when comparing models is verbose for easier debugging.
    - __cores__: an int, defaults to 4. Number of cores on machine to use for model training.

```{r}
p <- SupervisedModelParameters$new()
p$df = df
p$groupCol = 'Gender'
p$impute = TRUE
p$predictedCol = 'SalariedFlag'
p$debug = FALSE
p$cores = 1
```

## Step 3: Create the models via the ``Lasso`` and ``RandomForest`` algorithms.

```{r}
# Run Lasso
lasso <- Lasso$new(p)
lasso$run()

# Run RandomForest
rf <- RandomForest$new(p)
rf$run()
```

## Full example code

```{r}
library(HCRTools)

connection.string = "
driver={SQL Server};
server=localhost;
database=AdventureWorks2012;
trusted_connection=true
"

query = "
SELECT
[OrganizationLevel]
,[MaritalStatus]
,[Gender]
,IIF([SalariedFlag]=0,'N','Y') AS SalariedFlag
,[VacationHours]
,[SickLeaveHours]
FROM [AdventureWorks2012].[HumanResources].[Employee]
WHERE OrganizationLevel <> 0
"

df <- SelectData(connection.string, query)

p <- SupervisedModelParameters$new()
p$df = df
p$groupCol = 'OrganizationLevel'
p$impute = TRUE
p$predictedCol = 'SalariedFlag'
p$debug = FALSE
p$cores = 1

riskAdjComp <- RiskAdjustedComparisons$new(p)
riskAdjComp$run()
```