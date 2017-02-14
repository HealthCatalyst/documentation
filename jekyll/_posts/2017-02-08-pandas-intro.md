---
layout: post
title:  "Intro to Pandas"
date:   2017-02-08 13:43:00 -0700
tags: python
author: Taylor Miller
categories: blog
---
## TODO

- [ ] Make this a notebook
- [ ] Give examples of each

## What is Pandas?

Pandas is an amazing data analysis, cleaning, munging and analysis toolkit [library](http://pandas.pydata.org) for python. It is great for working with structured data from many different sources such as:
    
- Flat files such as `.xls` Excel spreadsheets or `.csv` files exported from sundry systems
- Data from SQL queries.
- Time series data.

## Pandas Data Structures

In our [healthcare.ai python package](/py) we use pandas extensively under the hood since it is robust, fast and proven in many industries.

Pandas has two main data structures:

- **Series:** a 1 dimensional structure. Think of this as a row in a table or an list in python:
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

Let's load a sample dataset, get some insight into our data with some easy descriptive statistics, manipulate some columns,  and build some quick visualizations.

### Load the data and explore it a bit

After I've loaded some data to explore, I always run `dataframe.head(10)` and `dataframe.tail(5)` to get a peek at the first and last **n** number of rows. This is a good sanity check and an easy way to see some of your data.

#### Accessing columns

There are many ways to access a column in your dataframe. Let's say you have a dataframe called `dataframe` that has the following columns:

- Age
- Gender
- Height
- Encounter Number

While columns can be access directly as an attribute of the dataframe like this `dataframe.Age`, because you may have columns with spaces or other problematic characters, the preferred way to reference a column is with the item bracket notation like this:  `dataframe.['Age']`
 
When you access a column, pandas will return a [pandas Series](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.Series.html), which is actually a one dimensional numpy array.

#### Accessing rows

- TODO write this and maybe talk about iloc vs loc


### Descriptive Stats

Pandas has some brilliant descriptive statistics tools built in. After you've loaded some data into a dataframe, you can run `dataframe.summary()` to get a quick overview of your data.

### Column manipulation

- first...

### Quick and dirty visualization

- first...

## Other tips

- 
## How can I learn more?

It's worth noting that the [pandas docs](http://pandas.pydata.org/pandas-docs/stable/) are stellar. Here's a list of great resources if you are looking to learn more.

- [10 Minutes to pandas](http://pandas.pydata.org/pandas-docs/stable/10min.html)
- [Essential Basic Functionality](http://pandas.pydata.org/pandas-docs/stable/basics.html)
- [Visualization](http://pandas.pydata.org/pandas-docs/stable/visualization.html)
- For the visual learner, I recommend [Jason Wirth's Visual Pandas talk](https://www.youtube.com/watch?v=9d5-Ti6onew) (26 min video)



To get started with healthcare machine learning now, see [healthcare.ai](/) for R and Python.