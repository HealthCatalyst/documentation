---
layout: post
title:  "Feature engineering in healthcare machine learning"
date:   2017-01-24 03:00:00 -0700
tags: overview
author: Taylor Larsen
categories: blog
excerpt: This blog will discuss how domain knowledge of healthcare data can be used to create features that make ML models more accurate and useful
---
In previous blog posts, we’ve discussed specific [applications of machine learning (ML) in healthcare](http://healthcare.ai/blog/2016/12/22/applications-of-healthcare-machine-learning/) and the [available algorithms in healthcare.ai](http://healthcare.ai/blog/2016/12/21/which-algorithms-are-in-healthcareai/). As you build an ML model, creating and selecting the right features can be just as foundationally important as matching the right algorithm with the right use case. In this post, we will discuss how domain knowledge of healthcare data can be used to create features that make your ML models more accurate and useful. This process is known as [feature engineering](https://en.wikipedia.org/wiki/Feature_engineering).


Using an ML model off the shelf is easy but often ineffective. Feature engineering usually makes or breaks it. It’s the creative part of the process that builds the foundation for everything else. Many of the features we use in our ML models can be categorized as demographics, vitals, labs, medications, clinical events, healthcare utilization, visit details, and comorbidities. We can break these categories out more granularly into the specific features that are helpful to our ML model. From here, we often develop multiple transformations of a feature based on the underlying reasons that might inherently make that specific form of the feature more predictive—this is the engineering part.


For example, a patient’s blood pressure could be a clinical event feature that is predictive of their hospital length of stay. However, there are a bunch of things you need to consider before arriving at a truly predictive feature: Should you separate systolic from diastolic? Create a binary feature, hypotension, or hypertension? Or continuous? When multiple records exist, do you use the highest values or the lowest? Earliest or latest? And so on. You might even need to get so specific as to create a binary (Yes/No) feature defined by the question, “Was the patient’s systolic blood pressure 140 mmHg or higher during the first 12 hours following admission to the hospital?” or a continuous feature defined as the “Highest diastolic blood pressure value within the first 24 hours of admission to the hospital.”


For clarity's sake, two additional examples of basic feature engineering that we use regularly are age and home address. A feature containing continuous age values could be helpful to the model on its own, or transformed into 10-year age groups or a binary variable identifying patients age 65 and older. An address can be broken out into its various components like city, state, and zip code, all of which can serve as proxies for helpful information that is not always available in the data, like socioeconomic status. We can also use [geocoding](https://en.wikipedia.org/wiki/Geocoding) to convert addresses into coordinates that can be plotted against relevant maps to pick up additional insight related to things like distance to a provider or local barriers to transportation.


Clearly, you could come up with dozens of versions of a single feature, and some are going to work much better than others. The great thing about ML is that you can use your healthcare domain knowledge to pare down the relevant and potentially useful iterations of your feature, and then let the ML algorithm help isolate the most predictive features and transformations during final [feature selection](https://en.wikipedia.org/wiki/Feature_selection) (a related topic that we’ll dive into in an upcoming post). The ML algorithms in [healthcare.ai](http://healthcare.ai/) can help select the right versions, but you have to do the leg work to get them in there to try. Also, we covered this recently, but don’t forget about [data leakage](http://healthcare.ai/blog/2017/01/06/data-leakage-in-healthcare-machine-learning/) when creating features; you’ll need to make sure you consider your use case so that you don’t train the ML model using features that would not yet be available at your preferred time of prediction.


Feature engineering is a ton of work and underscores the importance of data scientists and data architects having a combination of technical skills and deep domain knowledge. Some good news related to lightening the workload—we’ve already included a couple of feature engineering functions in healthcare.ai that can save a significant amount of time and effort transforming certain features.

- [Longitudinal imputation](http://healthcare.ai/r/model-pre-processing/longitudinal-imputation/) works with longitudinal data to carry a value forward from a patient’s previous record to the fill in a NULL value in the most current record. An example might be using longitudinal imputation to pull a patient’s BMI forward from their previous visit to their current visit if their weight and height have not yet been recorded. Using this function appropriately can improve model accuracy by filling in data that might otherwise be left NULL or imputed with your dataset’s mean or mode for that feature.

- [Seasonality handling](http://healthcare.ai/r/model-pre-processing/seasonality-handling/) transforms date-time columns, which are difficult for ML algorithms to handle, into their various components, ultimately treating them as separate features. Event dates, like date of admission, can hold a lot of helpful information for seasonality handling and proxying for other things that might not be well represented in the data. With minimal effort, you can use this function to test which component(s) of the admit date-time stamp like month, day of week, hour, etc., are most helpful to your model.


Automating feature engineering is difficult to do, especially considering the complexity of healthcare data and the types of healthcare ML problems we are attempting to solve. Deep domain knowledge and human intuition are very difficult to replicate. However, it’s a hot area of research and we’ll definitely continue to explore and post on advances in feature engineering. Algorithms for automatically generating features for relational data sets like the [Deep Feature Synthesis algorithm](http://groups.csail.mit.edu/EVO-DesignOpt/groupWebSite/uploads/Site/DSAA_DSM_2015.pdf) are becoming smarter and more dynamic every day. We look forward to incorporating new techniques and algorithms into healthcare.ai so that we can all focus our efforts on improving healthcare outcomes in new and exciting ways.


Thanks for reading, and please [reach out](/contact.html) with any questions or comments!
