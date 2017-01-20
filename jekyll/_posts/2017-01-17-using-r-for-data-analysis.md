---
layout: post
title:  "Using R for healthcare data analysis"
date:   2017-01-17 11:12:11 -0700
tags: analysis	
author: Levi Thatcher
categories: blog
---

When working with data in healthcare, business intelligence (BI) folks often turn to tools like Excel, SSMS, Tableau, and Qlik. Typically, multiple tools will be used when analyzing a dataset. Sometimes the analyst will use Excel to look at the data, get a sense for how the columns are distributed, perhaps make a histogram or scatterplot. Often, analysts will later turn to Qlik and/or Tableau to provide an interactive app, often hosted on a dedicated server so folks in other departments can explore the same data. In this same process, the analyst or data architect may start by querying the database in SSMS to do some simple counts and group bys in an effort to understand the data at a high-level.

Is that split workflow the most efficient way of doing things? Is there a tool that might provide a streamlined analysis, both providing a way to understand the high-level, as well as offering interactive apps for entire departments? While the tools mentioned above are certainly fantastic, we feel that **R** could help make life a lot easier for BI professionals.

While we don't want to oversell its abilities, think of how often analysts turn to the above tools to do things like:

- Understanding how data is distributed
- Finding how particular columns are correlated
- Offering pivot tables
- Making histograms or scatterplots
- Grouping by a column of interest and plotting a trend
- Calculating statistics (like standard deviations, t-tests, quantiles)
- Creating interactive visualizations for others

You may be surprised to hear that R can also do those things, and do them *well*.

If you're using Excel for things like financial modeling, and/or have the need to input data frequently, then moving to R won't make sense. We'll be the first to say that Excel can be a super effective tool.

But, if you're often doing analysis using the tools mentioned above, we're excited to help you see what R can do. Besides the above, here are other benefits of R compared to Excel/Qlik:

- Lends itself to source control
- Makes your work easily reproducible
- Enables you to tell a data story (combining process and presentation in a notebook)
- Allows one to more easily find and fix errors
- Makes it easy to work on very large datasets
- Offers machine learning
- It's free

We'll try to illustrate the analytical capabilities of R in a series of blog posts. Each blog post will contain an R notebook that'll have explanations, R code, and R plots to help you get stated. [Here's the first notebook in this series](http://healthcare.ai/notebooks/IntroHealthDataAnalysisInR.nb.html). Enjoy!