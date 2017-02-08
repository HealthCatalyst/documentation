---
layout: post
title:  "How should you divide your data?"
date:   2017-01-26 03:00:00 -0700t
tags: overview
author: Mike Mastanduno
categories: blog
excerpt: This is an overview of training and testing data sets. And of ML models in development and deployment.
---

At the most basic level, Machine Learning (ML) is a category of algorithms that learn from historical data and generalize to future data. Having good data is becoming more and more important to successful organizations today. It’s almost [becoming a form of currency][nyt]. But having access to big data is only the first step. Using it effectively is another matter entirely. Healthcare organizations have collected data for years, but data will always be a finite resource. This post seeks to help you decide how to best allocate your data resource for ML training, testing, and "in-the-wild" evaluation.

When developing or training an ML model, you are trying to feed an algorithm as much data as possible to learn from. This is called the *training set*. The model learns the patterns within that dataset and uses them to predict the outcome variable. When working on the training set, you will [engineer features][feat], [tune hyperparameters][hyp], and select the [ML algorithm][algo]. It might be possible to get your model to be perfectly [accurate][roc] on the training set. But remember, that is not the ultimate goal! You want your model to be perfect on **all** data. In other words, you want it to generalize well to new data.

To generalize to new data, you must reserve some of your data for validation, or testing. A typical distribution is to use 60-80% of the data for training and the remaining for testing. If the model performs comparably well on the testing data, you can be fairly confident that the model will generalize well to new data. When splitting data into training and testing sets, it is ideal to have similarly distributed datasets in both groups. To do so, there are several things to keep in mind:
-	Randomize row numbers for training and testing. This avoids complications resulting from using separate blocks of time for training vs. testing. As an example, flu symptoms would be more common in the winter and you’d want those to appear at the same rate in both sets.
-	Keep positive and negative examples balanced. If you have a data set with 10% positive examples, try to divide those evenly. You don’t want your model to learn from only one type of example. For example, it is much more common for a patient to NOT be readmitted. [Imbalanced classes][imba] are a common difficulty that we’ll cover more thoroughly in a future post. 
-	Think about the distributions within individual columns and whether random sampling is likely to result in similarly distributed training and test sets. If it won’t, you might need to manually sample.
In practice, a good first step is to randomly assign groups and [evaluate your model’s performance][roc] on 80% training and 20% testing sets. If the model is highly accurate across both data sets, it is ready to move on to the *deployment* step. 

In the deployment step, the model is put into production and left to make new predictions on new data examples. We sometimes refer to this period as “in-the-wild” testing, where the model is deployed on the servers and is interacting with real data. We aren’t using the model to inform decisions yet, but it’s in the last stage of evaluations. It’s worth noting that we are not changing the model here, but using the saved model from development. In this phase, we are looking to see that the performance is the same in the wild as it was in development training and testing. If it’s not, the model must be debugged for issues like [data leakage][leak] or [overfitting][over]. The length of time required for this step depends on the target variable. For example, a 30-day readmission model will require at least 30 days of in-the-wild testing. If testing in the wild is successful, the model is ready to move into production and help guide decisions.

 Building an ML model is often a difficult process. A large dataset is the first step, but it must be cleaned and prepared. The model must be trained while keeping many small things in mind. It can be a tiresome process of guess and check, but experience with ML and domain knowledge of the data can speed things up. Additionally, many of these steps, such as randomizing data, can be automated. One focus of [healthcare.ai][hcai] is helping to reduce the number of things a user has to keep track of while model building. 
 
 Hopefully this post helps you get the most out of your dataset, and you can use it to build models that generalize well to new data. As always, feel free to [reach out with questions][contact], and thanks for reading.

[feat]:/blog/2017/01/24/feature-engineering/ 
[roc]:/blog/2016/12/15/model-evaluation-using-roc-curves/
[nyt]:http://www.nytimes.com/2012/02/12/sunday-review/big-datas-impact-in-the-world.html
[algo]:/blog/2016/12/21/which-algorithms-are-in-healthcareai/
[hyp]:https://www.quora.com/What-are-hyperparameters-in-machine-learning
[sample]:http://docs.aws.amazon.com/machine-learning/latest/dg/splitting-types.html
[leak]:/blog/2017/01/06/data-leakage-in-healthcare-machine-learning/
[over]:http://machinelearningmastery.com/overfitting-and-underfitting-with-machine-learning-algorithms/
[hcai]:/
[imba]:http://machinelearningmastery.com/tactics-to-combat-imbalanced-classes-in-your-machine-learning-dataset/
[contact]:/contact.html
