# Create and compare models via ``Lasso``, ``RandomForest``, and ``LinearMixedModel``

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
* If your data is longitudinal, you may want to try the ``LinearMixedModel`` (detailed below).

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
    - __df__: a data frame. The data your model is based on.
    - __type__: a string. This will either be 'classification' or 'regression'.
    - __impute__: a boolean, defaults to FALSE. Whether to impute by replacing NULLs with column mean (for numeric columns) or column mode (for categorical columns).
    - __grainCol__: a string, defaults to None. Name of possible GrainID column in your dataset. If specified, this column will be removed, as it won't help the algorithm.
    - __predictedCol__: a string. Name of variable (or column) that you want to predict. 
    - __debug__: a boolean, defaults to FALSE. If TRUE, console output when comparing models is verbose for easier debugging.
    - __cores__: an int, defaults to 4. Number of cores on machine to use for model training.

```{r}
p <- SupervisedModelParameters$new()
p$df = df
p$type = 'classification'
p$impute = TRUE
p$grainCol = ''
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
--WHERE InTestWindow = 'N'
"

df <- SelectData(connection.string, query)
head(df)

set.seed(43)
p <- SupervisedModelParameters$new()
p$df = df
p$type = 'classification'
p$impute = TRUE
p$grainCol = ''
p$predictedCol = 'SalariedFlag'
p$debug = FALSE
p$cores = 1

# Run Lasso
lasso <- Lasso$new(p)
lasso$run()

# Run RandomForest
rf <- RandomForest$new(p)
rf$run()

print(proc.time() - ptm)
```

## ``Lasso`` Details

This version of Lasso is based on the Grouped Lasso alogrithm offered by the [grpreg package](https://cran.r-project.org/web/packages/grpreg/grpreg.pdf). We prefer simple models to complicated ones, so for tuning the lambda regularization parameter, we use the 1SE rule, which means that we take the model with fewest coefficients, which is also within one standard error of the best model. This way, we provide guidance as to which features (ie, columns) should be kept in the deployed model. 

## ``RandomForest`` Details

This version of random forest is based on the wonderful [ranger package](https://cran.r-project.org/web/packages/ranger/ranger.pdf).

## ``LinearMixedModel`` Details

This mixed model is designed for longitudinal datasets (ie, those that typically have more than one row per-person). The method is based on the lme4 package. It's not as computationally efficient as the random forest algorithm, so it's best to compare against the other algorithms on smaller datasets, and then scale up from there.

Relevant example code:

```
p <- SupervisedModelParameters$new()
p$df = df
p$type = 'classification'
p$impute = TRUE
p$grainCol = 'PatientEncounterID' # This grain of the dataset (required)
p$personCol = 'PatientID'         # This represents the person (required)
p$predictedCol = 'HighA1C'
p$debug = FALSE
p$cores = 1

lmm <- LinearMixedModel$new(p)
lmm$run()
```

Note: sometimes it's helpful to order your query by the grainCol and/or the personCol. You might find higher accuracy by experimenting with these combinations.

## Associated helper method ``getCutOffs``

- __Return__: Nothing. Prints fall-over probability (ie, cut point) and the false-positive rate associated with the input true-positive rate.

- __Arguments__:
    - __tpr__: numeric. The true-positive rate you want to gather information about.

* After generating a model via the methods above, here's how ``getCutOffs`` is used, depending on which model you want to learn about:

```{r}
lasso$getCutOffs(tpr=0.8) or

rf$getCutOffs(tpr=0.8) or

lmm$getCutOffs(tpr=0.8)
```

