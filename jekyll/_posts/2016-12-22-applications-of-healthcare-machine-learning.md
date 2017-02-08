---
layout: post
title: "Applications of healthcare machine learning"
date:   2016-12-22 21:39:11 -0700
tags: overview
author: Mike Mastanduno
categories: blog
excerpt: This post gives examples of classification, regression, supervised, and unsupervised machine learning applications.  
---

Now that we have been through some of the applications of machine learning (ML) in mainstream technology, we thought it would be nice to give a broader overview of some of the different types of ML and how they might be applied to improve patient care. [We explored the algorithms](/blog/2016/12/21/which-algorithms-are-in-healthcareai/) that currently make up healthcare.ai, and alluded to the fact that there is lots of room for expansion. We’ll take this post as an opportunity to speculate on where healthcare ML could go in the near and distant future. Along the way, we’ll discuss the different types of ML algorithms and give examples of their use in healthcare. 
At its most basic definition, machine learning refers to a group of algorithms that learn from data. These algorithms are different from [conventional ones](https://fiftyexamples.readthedocs.io/en/latest/celsius.html) since they work using examples rather than rules. If you went to the hospital for flu like symptoms, a doctor thinking along the lines of traditional algorithms might say, “You have a fever, aches, general weakness, and no cold symptoms. This looks like the flu.” A different doctor, thinking like an ML algorithm, would say, “Hmmm, your symptoms are the same as 50 recent patients who had the flu. You probably do too.” Silly example, but it’s worth noting a couple of things. First, the ML doctor doesn’t actually need to know anything about the flu before they start making diagnoses. Second, their diagnoses probably won’t be very good until they have seen a lot of examples to compare against.     

**Classification vs. Regression**

The above scenario is an example of a classification machine learning problem. A classification algorithm will give a probability score of a person having the disease, or, more broadly, the probability of event happening vs. not. Healthcare.ai has already implemented some of the simplest [algorithms](/blog/2016/12/21/which-algorithms-are-in-healthcareai/) to answer questions like:

1.	What is the likelihood that a patient will develop a central line infection?
2.	What is the likelihood that a COPD patient will be readmitted within 90 days of discharge?
3.	What is the likelihood that a person will no-show for their appointment?

These questions are posed with a lot of example data and the expectation that a model will give a probability from 0 (low) to 1 (high). It’s up to us to draw the line of what we call a positive prediction and what we call a negative prediction. On the other hand, a regression algorithm will predict a continuous value. Here are some examples of questions that we have or plan to tackle using regression algorithms:

1.	How many days will a patient need to stay in the hospital?
2.	How many people do we need on staff in the ED on a given night?
3.	How much money will a patient cost the health system over the next year?

There are a lot of exciting questions that can be answered with very basic machine learning! As we’ve said before, we are focused on trying to answer the questions that will make the most impact right now. Luckily for us, there is still a lot of low-hanging fruit in healthcare for our team to address. As long as there is good example data, ML could help answer a huge range of questions.

**Supervised vs. Unsupervised**

All the problems that this post has discussed so far are supervised machine learning problems. For each of these there is a ground truth associated with every patient example being used to train the model. The other major type of machine learning is unsupervised. There is no ground truth associated with the data. The algorithms in this category are largely related to identifying patterns and similarity, and using them to group or stratify data into different categories. This type of functionality is a high priority capability that we are working on implementing in healthcare.ai. In the very near future, we hope to be able to use clustering methods and anomaly detection to answer questions like:

1.	Does this patient (who hasn’t been associated with diabetes) belong in a diabetes registry? Or a heart disease registry? And with what likelihood?
2.	How similar are my high-utilizing patients? Do they fall into particular clusters? What can we learn about the characteristics of these separate clusters?

These questions are typically more nebulous than supervised learning problems, but useful insights can still be gathered. For example, there would be value in labeling a non-diabetic patient as a person to watch and intervene before they ever develop diabetes. This is great information to have and ML will absolutely make an impact by answering such questions.   

**The Future**

The third arm of machine learning that has especially gotten a lot of attention lately is in Artificial Intelligence (AI), mostly implemented with what’s called deep learning. [Self-driving cars](https://www.tesla.com/autopilot), [home assistants](https://www.facebook.com/notes/mark-zuckerberg/building-jarvis/10154361492931634/), and [translation services](http://www.nytimes.com/2016/12/14/magazine/the-great-ai-awakening.html?smid=pl-share&_r=0) are some applications of AI. This is the cutting edge in ML right now. In the 2-5 year timeframe, we will start to see more mainstream impact from these techniques. In healthcare, the first big use case is for image analysis in radiology and pathology departments. It’s possible that computers will learn to assess images with high speed and accuracy in the very near future. When the community is ready for adoption, we will be excited to provide these tools in healthcare.ai.
Hopefully this post helped you to understand the different types of machine learning and begin to think about the types of questions that can be reliably answered. There will never be any shortage of work for machine learning. The bottleneck is the number of people with the necessary expertise. As we’ve said before, another goal of healthcare.ai is to help commoditize machine learning in healthcare. If you’d like to get involved, please [start using and contributing to the package](https://github.com/HealthCatalystSLC/healthcareai-r) on your data and feel free to [reach out](/contact.html) with questions! 

