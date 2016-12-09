---
layout: post
title:  "The benefits of machine learning in healthcare"
date:   2016-12-05 07:24:23 -0700
tags: overview
author: Levi Thatcher
categories: blog
---

If you read much about technology, you have likely heard about machine learning, but may be wondering how it would work in healthcare. Where's the low-hanging fruit? And how could it help my clinical team?

As always, we'll be practical in our discussion. Throughout healthcare, and many other industries, there are heuristics (or rules of thumb) that help people make decisions. A popular example in healthcare is the [LACE index](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2845681/), which provides a likelihood of patient 30-day readmission risk. You might have also heard of similar tools like the [SOFA Score](http://jamanetwork.com/journals/jama/fullarticle/194262), [Apgar Score](http://www.nejm.org/doi/full/10.1056/NEJM200102153440701#t=article), [PRISM Score](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2999700/), and the [PIM Score](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2999700/).

Like most of these scores, the [LACE calculation](http://www.besler.com/lace-risk-score/) is fairly simple. It's based on length of stay, acuity of the admission, patient comorbities, and ED visits within the last six months. In each of these categories, points are assigned--a length of stay of three days equals three points, for example. Then the points from each categories are added up to form the LACE index.

It's simple and indicative of how healthcare has worked for the last 20-30 years. First, there's a national study, which eventually leads to guidelines and a simple calculation to help prioritize which patients are most at risk of something.

So what's wrong with that? Well, the guidelines can only be [narrowly applied](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2845681/) and even then [don't give impressive results](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4670852/). Think of it--LACE was developed from patients seen in Ontario from 2004-2008. Do your patient demographics closely match those in Ontario? Or, do your patient demographics even match your same set from ten years ago? Perhaps not. Another issue is applicability--since LACE requires the patient's length of stay, the score is only available upon discharge. What if you want a risk score early during their stay?

These are a some of the reasons that machine learning is fantastic. First it learns the important relationships in your data on past patients and their outcomes. This means that the model is customized on your data from the last few years--you don't have to rely on scores made on other populations, 10-20 years ago. In addition, machine learning allows one to create a model based on whatever data is available when you need a risk score (ie, upon admission rather than discharge).

In summary, what does this customized model provide? Accurate risk scores, enabling confident and precise resource allocation, leading to lower costs and improved outcomes. As an added bonus, [healthcare.ai](http://healthcare.ai/) is focused on providing guidance as to why a risk score was high, such that the the clinician not only knows who's most at risk, but also can quickly see what can be done to lower that patient's risk. We'll detail this ability in a future post. Thanks, and please [reach out](http://healthcare.ai/contact) with any questions or comments!