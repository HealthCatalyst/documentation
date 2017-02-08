---
layout: post
title:  "Data leakage in healthcare machine learning"
date:   2017-01-06 15:00:00 -0700
tags: overview
author: Taylor Larsen
categories: blog
excerpt: This blog will describe data leakage along with its causes, impacts, and fixes in the context of healthcare machine learning
---

Note: this is a technical post.

To leverage lessons learned during our model building engagements here at Health Catalyst, let’s explore the [subject of data leakage](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.365.7769&rep=rep1&type=pdf). Data leakage occurs when a predictive model is trained using information that is available in training data but not actually available for predicting outcomes in production. Models with data leakage tend to be very accurate in development, but perform poorly in production, where they are ultimately used.

More specifically, leakage in the context of healthcare machine learning occurs when:
- A feature is used to train the model that would *not be available in production at the time of prediction*. An example of this might be using the number of oral medications a patient is currently taking to predict length of stay at admission when medication reconciliation may not take place for up to 24 hours following admission. 

- A feature is used to train the model that would *not be available in production prior to the outcome variable being populated*. An example of this might be using a response from a quality of life phone survey to predict readmissions when the survey is not administered until three months after the discharge. At that point, it would already be known whether the patient had been readmitted or not. When training a model, the algorithm has no idea whether a feature was populated prior to the target variable in the same row.

- A feature is used to train the model that is *outside the scope of the model’s intended use case*. An example of this might exist when trying to predict the probability of a patient having heart failure and using the hospital unit associated with the patient without considering that the hospital unit may be disease or service specific (like a cardiac unit).

- The *correct outcome is leaked into the test data* through a variable that inherently proxies for the outcome. An example of this might be predicting the probability that a patient will pay their balance due on time and using a variable that indicates whether the patient has been contacted by the hospital accounts receivable department which only takes place when a patient is late on payment. 

*What can happen?* Leakage can lead to poor generalization, overfitting, and over-estimation of a model’s performance. The ultimate negative impact of leakage is the deployment of a less useful model than if no leakage was present. Considering the examples described above, leakage can result in the inclusion of a variable that appears predictive during training, but due to missing data and/or imputation in production, the variable is either not predictive, is skewed in power, or only appropriate in certain use cases. Leakage will often raise the accuracy of a model in training, but make predictions that can’t be trusted in deployment.

*How does one prevent it?* Through proactive analysis of potentially predictive variables and direct involvement of subject matter experts (SMEs) during variable selection, leakage can most likely be avoided. It is important to profile each variable to determine when it was generated and how its values are distributed when comparing training data to production data. Involving clinical, operational, and data SMEs will reduce the likelihood of leakage by improving understanding of nuances in the data. It is also important to understand when the prediction needs to take place so that predictive variables can be sourced accordingly; and the timing of the prediction should be based on the use case for the predictive model output. In summary, one must scrutinize the data they are using and keep the business question in mind when building the model.

*Does an existing model have data leakage?* As described above, profiling each variable and consulting with SMEs may help to identify more obvious leakage. Another way of identifying leakage is to compare the model’s actual performance in production to the model’s performance observed during training and testing. This can expose important discrepancies that might be the result of leakage and in depth analysis comparing training data to production data may be required.

*How does one fix an existing model?* If leakage is identified after a model has been developed and/or deployed, it is important to remediate the issue. Redefining a variable and retraining the model can eliminate leakage and allow the variable to remain in the model. Another solution for eliminating leakage is to remove the variable and retrain the model, while exploring other leakage free variables and proxies that could be added. Though perceived model performance might take a hit when data leakage is avoided/eliminated, the predictions on new data in production will be more accurate and useful.

Clearly, leakage is an issue that we face on a regular basis, especially when dealing with all the complexities associated with healthcare data. Through experience and diligent analysis, it is an issue we can easily avoid. [Healthcare.ai](http://healthcare.ai/) has several tools to help understand the timing, scope, and source of variables when model building, which can be used to eliminate data leakage during the model’s initial creation. Taking these steps will mean deploying useful models that are widely adopted, and ultimately improve healthcare outcomes. 

Thanks for reading and please [reach out](/contact.html) with any questions or comments!
