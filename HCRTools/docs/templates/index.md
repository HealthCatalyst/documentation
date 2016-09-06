# Welcome to HCRTools

This package will get you started with healthcare machine learning in R.

## What can you do with it?

* Compare models based on your data.
* Save and deploy a model.
* Perform risk-adjusted comparisons.
* Do trend analysis following [Nelson rules](https://en.wikipedia.org/wiki/Nelson_rules).
* Improve sparse data via longitudinal imputation.

------------------

## How is it specific to healthcare?

* Longitudinal algorithms
* Longitudinal imputation
* A focus on SQL Server

------------------

## How to install

Work in the console of RStudio or RGui

* Grab prerequisites
```{r}
install.packages(c('caret','data.table','devtools','doParallel','e1071','grpreg','lubridate',
'pROC','R6','ranger','ROCR','RODBC'),repos = "https://cran.cnr.berkeley.edu/")
```

* Install HCRTools
```{r}
library(devtools)
devtools::install_github(repo='HealthCatalystSLC/HCRTools')
```