---
layout: post
title:  "We Heart Pandas"
date:   2017-02-14 13:43:00 -0700
tags: python
author: Taylor Miller
categories: blog
excerpt: Imagine a tool that can read in columnar data, manipulate, transpose, derive, query, describe, analyze, visualize and more. That's python's <strong>pandas library!</strong> In our <a href='/py'>healthcare.ai</a> python package, we use pandas extensively under the hood since it is robust, fast and proven in data science. It seemed apropos to introduce you to it.
---
# We Heart Pandas

Imagine a tool that can read in columnar data, manipulate, transpose, derive, query, describe, analyze, visualize and more. That's python's [pandas library](http://pandas.pydata.org/)! In our [healthcare.ai python package](/py), we use pandas extensively under the hood since it is robust, fast and proven in data science. It seemed apropos to introduce you to it.

This post is also written as a [juptyer notebook](/notebooks/we_heart_pandas.html) hosted on our github site. You can follow along there or [download it](/notebooks/we_heart_pandas.ipynb) and run it yourself if you prefer.

## What is Pandas?

Pandas is an amazing data manipulation, cleaning, munging and analysis toolkit [library](http://pandas.pydata.org) for python. It is great for working with structured data from many different sources such as:
    
- Flat files such as `.xls` Excel spreadsheets or `.csv` files exported from sundry systems
- Data from SQL queries.
- Time series data.

## Pandas Data Structures

Pandas has two main data structures:

- **Series:** a 1 dimensional structure. Think of this as a row in a table or an list in python. Under the covers it is actually a [numpy ndarray](https://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.html), a highly optimized array of fixed size elements.
    ```python
    ['Doe, John', 54, 23.5, 0, 1, 115]
    ```

- **DataFrame:** a 2 dimensional structure. For those familiar with R dataframes, this is similar. Think of this as a database table, excel spreadsheet or list of lists:
    ```python
    [
        ['Doe, Jane', F, 54, 23.5, 0, 1],
        ['Doe, John', M, 56, 34.2, 0, 0],
        ['Doe, Jenny', F, 11, 77.0, 1, 1],
        ['Doe, Jake', M, 17, 28.3, 0, 1],
        ...
    ]
    ```

## What can pandas do?

The short answer? A lot. The long answer?

- Robust data IO to/from disparate sources, such as CSV, Excel files, databases, and more.
- Missing data handling, aka null handling. When you create a dataframe nulls are repesented by `NaN`.
- Easy creation of new and derived columns, as well as deletion.
- Grouping functions.
- Slicing, joining, and sub-setting datasets
- Reshaping and pivoting
- Descriptive statistics and summaries of large datasets
- Visualization with very little effort

## Examples

Let's load a sample dataset, get some insight into our data with some easy descriptive statistics, manipulate some columns and explore the data. If you don't have any data of your own to play with, you can always find something interesting from the U.S. Government’s [open data initiative](https://www.data.gov/).

I picked up a dataset called [U.S. Chronic Disease Indicators (CDI)
](https://catalog.data.gov/dataset/u-s-chronic-disease-indicators-cdi-e50c9).

### Load the data

First, be sure to import pandas then load the `.csv` file in as a new dataframe:

```python
import pandas
us_cdi_data = pandas.read_csv('U.S._Chronic_Disease_Indicators__CDI_.csv')
```

### Initial exploration

After I've loaded some data to explore, I always run a few quick commands to get an initial peek at the data structure. The first is `dataframe.columns`, which returns a list of all the column names (if your source has named columns). When you import data, pandas infers the datatype. Running `dataframe.ftypes`

The next command I run is `dataframe.head(10)` and `dataframe.tail(5)` to get a peek at the first and last **n** number of rows. This is a good sanity check and an easy way to see some of your data.

Run those now:

```python
us_cdi_data.columns
```
```python
us_cdi_data.ftypes
```
```python
us_cdi_data.head(10)
```
```python
us_cdi_data.tail(5)
```

#### Accessing columns

There are many ways to access a column in your dataframe. Let's say you have a dataframe called `dataframe` that has the following columns:

- Age
- Gender
- State
- Height (inches)
- Weight (pounds)
- Encounter Number

While columns can be access directly as an attribute of the dataframe like this `dataframe.Age`, because you may have columns with spaces or other problematic characters, the preferred way to reference a column is with the item bracket notation like this: `dataframe.['Age']`
 
When you access a column, pandas will return a [pandas Series](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.Series.html).

#### Accessing rows

Rows can be accessed individually or sliced by index (row number). Running `dataframe[5]` would return the 6th row as a Series. If you wanted to access the rows between 100 and 200 you would run `dataframe[100:200]`. This functions the same as python's list syntax.

### Querying Data

Pandas has robust query tools built in. For example, to return a dataframe with just patients over the age of 18 you could run `dataframe[dataframe.Age > 18]`, or select just the patients who live in New Mexico `dataframe[dataframe.State == 'NM']`. Perhaps you yearn for something more complex like selecting all records (rows) who have live in a list of states:

```python
target_states = ['NM', 'TX', 'AK']
dataframe.loc[dataframe['State'].isin(target_states)]
```

Let's pull out all rows where the **State** column is either 'CO', 'CT', or 'CA'

```python
target_sources = ['CO', 'CA', 'CT']
us_cdi_data.loc[us_cdi_data['LocationAbbr'].isin(target_sources)]
```

### Sorting

You can sort a dataframe by any column using the `.sort_by` method. If you have a column named 'Age' you could run `dataframe.sort_values(by='Age')`. For our dataset, let's sort by *YearEnd*:

```python
us_cdi_data.sort_values(by='YearEnd')
```

### Column calculation and feature engineering

Often when you are preparing data for a machine learning model you will want to engineer some features. For example, imagine you had a dataset with patient details and you have weight in pounds and height in inches, but you hypothesise that adding BMI ([body mass index](https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm)) as a feature will help improve your model. Recall that BMI is calculated by dividing a patient's weight in *kg* by the square of their height in *m*. Creating a derived column using pandas is delightfully simple:
   ```python
   height_in_meters = (dataframe['Height'] / 25.4 ) / 1000
   weight_in_kg = dataframe['Weight'] / 2.2
   dataframe['BMI'] = weight_in_kg / (height_in_meters ** 2)
   ```
Using this pattern, columns can be created from arbitrarily complex calculations of other columns (or other data altogether). This makes exploratory feature engineering simple and fast to iterate.

For our dataset, let's make a column that counts the number of years between the start and end dates:

```python
us_cdi_data['YearsDelta'] = us_cdi_data['YearEnd'] - us_cdi_data['YearStart']
```

## Writing data

Once you've done some manipulation, you may want to write the resulting dataframe out to a file or database.

### Writing to a file

- Dumping a dataframe out to a file is trivial with `dataframe.to_csv('my_filename.csv')`.
- Write a dataframe to an excel file is just as easy with `dataframe.to_excel('my_filename.xlsx', sheet_name='My Data'')`

Let's try this with our example:
```python
us_cdi_data.to_csv('US_CDI_manipulated.csv')
```

### Writing to a database

This process is a little more involved since you need to use [sqlalchemy](http://www.sqlalchemy.org/), a python database library that works with many different databases including SQLite, Postgresql, MySQL, Oracle, MS-SQL, Firebird, Sybase and others.

Your code will look something like this (assuming you have a MSSQL database and a dataframe called `my_dataframe`).

```python
import pandas
from sqlalchemy import create_engine
engine = create_engine('mssql+pyodbc://user:password@my_data_source_name')
pandas.to_sql('my_dataframe', engine)
```

To see how to connect to other databases, see the [sqlalchemy connection engine docs](http://docs.sqlalchemy.org/en/latest/core/engines.html)

## How can I learn more?

Pandas is a very robust and mature data tool. While this article has shown you some essential functionality, it is well worth exploring the incredible things that it can do. Take a few minutes and browse through the stellar  [pandas docs](http://pandas.pydata.org/pandas-docs/stable/) to broaden your data horizon.
 
If that's not enough, or if you want some more concise references, here is a list of great resources if you are looking to learn more.

- Start with this [10 Minutes to pandas](http://pandas.pydata.org/pandas-docs/stable/10min.html) tutorial.
- When you've mastered that, run through [Essential Basic Functionality](http://pandas.pydata.org/pandas-docs/stable/basics.html).
- When you are ready to visualize some data, check out the comprehensive [Pandas Visualization docs](http://pandas.pydata.org/pandas-docs/stable/visualization.html).
- For visual learners like myself, I recommend [Jason Wirth's Visual Pandas talk](https://www.youtube.com/watch?v=9d5-Ti6onew) (26 min youtube video)
- For a quick reference card, print out Datacamp's [Pandas Basics Cheatsheet](https://www.datacamp.com/community/blog/python-pandas-cheat-sheet) and tape it to your cubicle.
- For details on connecting to databases, see the [Pandas to_sql docs](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.to_sql.html) and the [sqlalchemy database engine docs](http://docs.sqlalchemy.org/en/latest/core/engines.html).
- To get started with healthcare machine learning now, see [healthcare.ai](/) for R and Python.