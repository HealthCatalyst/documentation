---
layout: post
title:  "What models has Health Catalyst created with healthcare.ai"
date:   2016-12-12 09:28:05 -0700
tags: overview
author: Levi Thatcher
categories: blog
---

After reading a few articles on healthcare.ai, some of you may be saying, well, that's great--but what has Health Catalyst actually used it for? Since Health Catalyst has been open with sharing the tool set, it only makes sense that they'd also be willing to share details of its use. As the Director of Data Science at Health Catalyst and founder of healthcare.ai, I oversee all client predictive engagements, and will make a point of updating the community on our work from time to time. If you have questions, comments, or criticism, please [reach out](http://healthcare.ai/contact).


The goal of healthcare.ai was to provide a simple, flexible tool to streamline healthcare machine learning. This means that it works across financial, operational, and clinical realms. If a health system has a business question that they want predictions for, we want healthcare.ai to be flexible enough to cover that use case. Today we'll cover three predictive use cases, and save more for a future post.


Let's start with finance. Uncompensated care is a growing problem at all health systems. To help a particular client counter this trend, we've started using propensity-to-pay models. Recall that each health system interested in using machine learning to answer business questions gets a custom model, tailored to their data. Each month, for each person with an open account, the probability of payment is calculated and used to determine 1) who may need reminders, 2) who may need financial assistance, and 3) how the likelihood of payment changes over time and after particular life events. A few features that were important to the model turned were things like whether the person paid last month (surprise!), account balance, a person's age, the month of the year, etc. These may vary for your health system (as your demographics are likely a bit different), but healthcare.ai makes it easy to customize the model to *your* payment data.


Those who have ever worked in a clinical setting know how hard it is to maintain schedules that keep both clinicians and patients happy. Slots are often over or under-booked because someone showed up late, didn't show up, or showed up without warning. Health Catalyst taken a first pass at this problem via a no-show predictive model. In this engagement, we gathered all past data on the characteristics of people that had showed or hadn't showed for their appointments, and created an accurate predictive model to assess, with each scheduled appointment, the risk of a no-show. If the clinic feels that they can reduce their no-show rate by extra phone calls, this helps assure that the resources used are efficiently allocated. If, on the other hand, the clinic has found that it's quite hard to reduce the no-show rate (even with this guidance), they can use the probability scores to over-book particular slots, such that clinical scheduling is optimized using past data. Features that were particularly helpful in this prediction were prior number of cancellations, appointment type, and week of the year.


Finally, we'll touch on a clinical case. Many health systems are [penalized](http://www.modernhealthcare.com/article/20150803/NEWS/150809981) if their 30-day readmissions rate is too high. While general readmissions models are possible via healthcare.ai, we've found that focusing on particular disease cohorts (such as for heart failure, sepsis, or COPD) allows us to create a much more accurate model. We've had multiple engagements recently related to COPD readmissions (both 30 and 90-day). How it works is that the relevant data on past patients (and whether they had a 90-day readmission or now) is collected into a [subject area mart](https://www.healthcatalyst.com/late-binding-data-warehouse/late-binding-data-bus/sam-designer/), and a couple of different algorithms are used to create models. Once we matched a column set with an algorithm that produces an accurate model, we save the model and integrate it into our ETL. This way, clinicians in the relevant units receive guidance as to which of their patients is most likely to be readmitted. Features like prior readmissions, pre-existing conditions, and facility were particularly helpful to this model.


Considering the resource constraints present in many hospital units, this type of machine learning guidance can be crucial to efficiently deploying resources toward achieving business goals (i.e., reducing readmissions, reducing 1-yr mortality, preventing [HAIs](https://www.cdc.gov/hai/), etc). As time goes on, we'll detail more of these predictive projects, and explain how they might be useful to your health system.


Thanks, and please [reach out](http://healthcare.ai/contact.html) with any questions!




