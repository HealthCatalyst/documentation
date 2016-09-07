# Create and compare models via ``GroupLasso`` and ``RandomForest``

# What is this?

These classes let one create and compare custom models on varied datasets.

One can do both classification (ie, predict Y or N) as well as regression (ie, predict a numeric field).

## Is any dataset ready for model creation?

Nope. It'll help if you can follow these guidelines:

* Don't use 0 or 1 for the independent variable when doing classification. Use Y/N instead. The IIF function in T-SQL may help here.
* Don't pull in test data in this step. In other words, to compare models, we don't need to worry about those rows that need a prediction quite yet.

## How can I improve my model performance?

* If you have lots of NULL cells and your data is longitudinal, you may want to try [GroupedLOCF](/model-pre-processing/longitudinal-imputation).
* If you think the phenomenon you're trying to predict has a seasonal or diurnal component, you may need some [feature engineering](/model-pre-processing/seasonality-handling).

## Step 1: Pull in the data via ``SelectData``

- __Return__: a data frame that represents your data.

- __Arguments__:
    - __server__: a server name. You'll pull data from this server.
    - __database__: a database name. You'll pull data from this database.

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
head(df)
str(df)
```

## Step 2: Set your parameters via ``SupervisedModelParameters``

- __Return__: an object representing your specific configuration.

- __Arguments__:
    - __df__: a server name. You'll pull data from this server.
    - __type__: a string. This will either be 'CLASSIFICATION' or 'REGRESSION'
    - __impute__: a boolean, defaults to FALSE. Whether to impute values with column mean (for numeric columns) or column mode (for categorical columns).
    - __grainCol__: a string, defaults to None. Name of possible GrainID column in your dataset. If specified, this column will be removed, as it won't help the algorithm.
    - __predictedCol__: a string. Name of variable (or column) that you want to predict. 
    - __debug__: a boolean, defaults to FALSE. If TRUE, code output is verbose for easier debugging.
    - __cores__: an int, defaults to 4. Number of cores on machine to use for model training.

```{r}
p <- SupervisedModelParameters$new()
p$df = df
p$type = 'CLASSIFICATION'
p$impute = TRUE
p$grainCol = ''
p$predictedCol = 'SalariedFlag'
p$debug = FALSE
p$cores = 1
```