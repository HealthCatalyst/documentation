---
layout: post
title:  "The technical need for healthcare.ai"
date:   2016-12-09 07:47:05 -0700
tags: overview
author: Levi Thatcher
categories: blog
---
Many of you might be wondering how your organization could benefit from healthcare.ai. Even though you're read the broad statements on the [home page](http://healthcare.ai), you might be asking yourself, "how does healthcare.ai enable my team of analysts or data scientists? And how can it finally bring accurate, informative models to my health system for the first time?"

While those looking to get into healthcare machine learning (ML) can certainly use R's [caret package](http://topepo.github.io/caret/index.html) or Python's [scikit learn package](http://scikit-learn.org/stable/) to create models, we believe that's not the most efficient way to spread healthcare ML. These general tools have been around for years, yet ML still hasn't been broadly adopted in healthcare. The healthcare.ai project helps solve this issue, as it provides a gentle introduction to machine learning and R or Python *in healthcare*. 

How healthcare.ai helps is that it 1) offers pre-processing and algorithms appropriate for healthcare questions; 2) provides appropriate metrics to assess which algorithm generates the best model; 3) tells you which features (i.e., variables) are most important to your model; 4) provides easy connectivity to databases; and 5) allows you to easily save and deploy a model in production.

While there are folks in healthcare using R and Python to create models, very few of these ever make it to production. This is partly because 1) it's hard to produce predictions and interpretations that can actually guide clinicians; 2) it's grueling to both gather appropriate variables for a model AND write the full ML code to create, assess, and deploy a model; 3) it's difficult to fix bugs and make updates in a way that [DBAs](https://en.wikipedia.org/wiki/Database_administrator) are happy with; and 4) if the model does make it to production, it's very hard to maintain the custom R/Python code. 

The healthcare.ai packages solve these issues because of our focus on software engineering tools. Our code is under [version control](https://en.wikipedia.org/wiki/Version_control), which allows a team to collaboratively check the code's robustness, contribute new features, and fix any bugs. We use what are called [unit tests](https://en.wikipedia.org/wiki/Unit_testing), which let us automatically check that all important functionality is working at any time. (This is especially helpful as code changes are made.) As you might have read, we're also using [packages](http://r-pkgs.had.co.nz/), which allow teams to easily document and use [versioning](http://yihui.name/en/2013/06/r-package-versioning/) to organize changes in functionality over time. If someone uses healthcare.ai and (now or a year down the road) finds an error, there's [documentation](http://healthcare.ai/r) and [community](https://groups.google.com/forum/#!forum/healthcareai-users) support to help. As we release new versions, the old documentation will still be accessible, in case you haven't upgraded. 

We want the models you put into production to not only help people today, but for years to come. As people change jobs, new people will naturally inherit responsibility over older models. If the predictive code used in production wasn't production-grade code (following the above principles) these transitions can be painful and the health system may suffer. We feel that patient outcomes are too important for that to be a common occurrence, which is why we've open-sourced healthcare.ai.

Please [reach out](http://healthcare.ai/contact) with any questions or suggestions!