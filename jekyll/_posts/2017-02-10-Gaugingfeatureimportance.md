---
layout: post
title:  "How can feature importance guidance help with model creation?"
date:   2017-02-10 12:00:00 -0700t
tags: algorithms
author: Levi Thatcher
categories: blog
excerpt: Feature importance guidance offers several benefits to those doing machine learning. 
---

In designing healthcare.ai, we are excited to provide practical machine learning (ML) guidance to health data folks, and feature importance guidance is near the top of the practicality list. When combining algorithms and data to create models, often you don't want to keep all of your initial features (i.e., input columns) in your *final* model. You might be wondering why--wouldn't the model be smart enough to adjust for non-helpful features, such that each feature is used appropriately? Certainly! But, it's often the case that production environments are resource-constrained by frequent data loads and transformations.

Typically, when working in healthcare, there will be certain data *sources*--these can be EMRs, payer data, census data, etc. Before using ML to create a model, you'll often create a data mart that will only contain certain columns (that are related) from one or more of those primary databases (i.e., data sources). Health Catalyst calls these source area marts (SAMs). The columns in these SAMs, which can come from different *sources*, are combined via a key column, which could be a unique patient identifier. This way we can get a coherent picture of health system's sepsis patients, for example, using data from several sources. To get to the point, all of these combinations and transformations take significant resources each night, and thus you'll often want to remove unhelpful columns from your SAM. This is where feature importance comes in.

Recall that healthare.ai offers two main practical algorithms. [Lasso][Lasso wiki] is our linear offering, and we chose it over linear regression because the algorithm provides guidance on which features can be removed from a model, without sacrificing much performance. Lasso is actually a recent development, with it being published [first in 1996][Lasso paper]. How does it help with feature selection? Professor Tibshirani explains it [by saying][Lasso paper] "the 'lasso' minimizes the residual sum of squares *subject to the sum of the absolute value of the coefficients* being less than a constant." In simpler terms, the key difference from a plain linear model is that lasso, when converging, takes into account the size of the coefficient weights and drives the smallest of them to zero. 
 
This helps in multiple ways. First, one receives guidance on which features can be removed from the SAM before deploying a final model since they were not used in prediction. The second (related) benefit is that the model is more resistant to overfitting. Finally, the model is more interpretable since a user knows exactly which features were used.

The other pracital algorithm offered by healthcare.ai is the random forest. Whereas lasso is a general linear algorithm, the [random forest][rf wiki] is based on an ensemble of decision trees. Not only is it a workhorse of the machine learning world (due to its flexibility and ease of use), but it's also relatively new. See [here][TinHoPaper] and [here][Breiman paper] for the origin story--note that [Leo Breiman][Leo Breiman link] was involved in the early stages of both lasso and random forests. We chose the random forest for healthcare.ai not only because of its flexibility on various kinds of data, but also because it offers up feature selection guidance. It does this via [Gini importance][Gini importance SO], which takes into account the number of times a particular feature is higher up in each of the 100-200 trees in the random forest. Recall that the feature chosen at the top of the decision tree is the one with the highest impact on the dependent (i.e., output) variable. Note that this guidance [isn't perfect][import bias paper]--it tends to prefer continuous features and those with many categories--but overall, it helps healthcare.ai offer the ability to produce both accurate models *and* unbloated datasets.

We're excited to learn from you how these tools are helping on *your* health data problems and where they can be improved, so please [reach out][contact].

[Lasso wiki]:https://en.wikipedia.org/wiki/Lasso_(statistics)
[Lasso paper]:http://www.jstor.org/stable/2346178?seq=1#fndtn-page_scan_tab_contents
[rf wiki]:https://en.wikipedia.org/wiki/Random_forest#cite_note-ho1998-2
[TinHoPaper]:http://ect.bell-labs.com/who/tkh/publications/papers/odt.pdf
[Breiman paper]:https://www.stat.berkeley.edu/~breiman/randomforests-rev.pdf
[Leo Breiman link]:https://en.wikipedia.org/wiki/Leo_Breiman
[Gini importance SO]:http://stats.stackexchange.com/a/92843/124897
[import bias paper]:http://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-8-25
[contact]:/contact.html