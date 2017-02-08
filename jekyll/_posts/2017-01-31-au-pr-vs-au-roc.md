---
layout: post
title:  "How can precision-recall curves help evaluate your model?"
date:   2017-01-31 03:00:00 -0700
tags: overview
author: Levi Thatcher
categories: blog
excerpt: While area under the ROC is a common metric for binary classification, area under the PR curve is often more appropriate.
---

Whenever we use machine learning (ML) for prediction, the question of how to evaluate the model is of the utmost importance. Of course, different metrics are appropriate for different kinds of models and business questions. If we were to predict patient length of stay (LOS)—a numeric value—we'd use a different model evaluation metric than if we were evaluating a model that predicts 30-day readmissions, which is a binary column (i.e., Y or N). It’s these types of decisions that [healthcare.ai](http://healthcare.ai/) streamlines.

In healthcare, we're most commonly focused binary predictions—think of readmissions, hospital-acquired infections, mortality, appointment no-shows, etc. In addition, our data frequently has *imbalanced classes*. What this means is that, for the column we're predicting (i.e., no-shows, readmissions, etc.), there are many more of either Y's or N's. In healthcare ML, it's typically the case that N is much more common than Y. That's a good thing. It's nice that most people don't get a hospital-acquired infection. However, because of this label imbalance, the most common classification evaluation metric could benefit from some adjustments.

For binary classification, the gold-standard for evaluation is the ROC curve and the associated area under the curve (AUC). [In a past post][ROC post], we've detailed why these are common. Considering that imbalanced classes are so pervasive in healthcare, we're excited to detail why we've also included precision-recall (PR) curves and the associated area under the curve in the R 0.1.10 release of healthcare.ai. In the following discussion, we'll focus on the curves themselves, but the same thoughts apply to both AU_ROC and AU_PR, which is area under the ROC and PR curves, respectively.

Recall that the [ROC][ROC post] shows the *True Positive Rate (TPR)* on the y-axis and the *False Positive Rate (FPR)* on the X-axis. As that [previous post][ROC post] explained, *TPR* is the proportion of actual readmissions that the test correctly predicted would be readmitted. *FPR* is the proportion of patients whom the model predicted would be readmitted, but were not. Here's a ROC curve, for reference.

![Example ROC Curves](/assets/AUCPost_ROCExample.png)

TPR is also known as [*recall*][recall definition] and also is present in PR curves. Compared to a ROC curve, a PR curve simple moves TPR (i.e., recall) to the x-axis and swaps out FPR for precision (which is on the y-axis). Now, why is that so significant when it comes to data with imbalanced classes? Consider the true negative. When you have data with a 10% rate of 30-day readmissions and that's what you're predicting, your model could simply predict N 90% of the time and be correct. Introducing precision instead of FPR in the PR curve is helpful because, as [this paper][Davis paper] states, "a large change in the number of false positives can lead to a small change in the false positive rate." Basically, with highly-imbalanced classes FPR is overwhelmed by the number of true negatives. Precision, on the other hand, focuses on true positives and false positives (which are much more relevant than true negatives when your classes are imbalanced toward negatives). We've created a guide that was inspired by this Stack Overflow [answer][SO post]:

![Equations](/assets/Post17PRcurve/Equations_final.jpg)

Note the lack of TNs in the second set of equations. Now, *how do the two metrics compare on the same dataset?* Let's use the [diabetes dataset][healthcareai data] that comes with healthcare.ai to compare Lasso vs. Random Forest when predicting readmissions:

![ROCExample](/assets/Post17PRcurve/ROCExample.png)

![PRExample](/assets/Post17PRcurve/PRCurveExample.png)

Note that the Random Forest-based model performs better than the Lasso-based model—note the greater area under the curve. However, we find that the difference between the algorithms is much more stark in terms of the ROC curve compared with the PR curve. Is this typically the case?

As we read in [this paper][Davis paper], "an algorithm that optimizes the area under the ROC curve is not guaranteed to optimize the area under the PR curve." If you have highly imbalanced classes, you may want to focus on the PR curve and maximizing the area under the curve (i.e., AU_PR), even though common benchmarks and your related presentation may tout your awesome results in terms of ROC. Happy modeling!

Feel free to [reach out with questions][contact], and thanks for reading.

[release]:http://healthcare.ai/r/#how-to-install-on-windows
[ROC post]:http://healthcare.ai/blog/2016/12/15/model-evaluation-using-roc-curves/
[recall definition]:https://en.wikipedia.org/wiki/Precision_and_recall#Definition_.28classification_context.29
[Davis paper]:http://machinelearning.wustl.edu/mlpapers/paper_files/icml2006_DavisG06.pdf
[SO post]:http://stats.stackexchange.com/a/90783/124897
[healthcareai data]:https://github.com/HealthCatalystSLC/healthcareai-r/blob/master/inst/extdata/HCRDiabetesClinical.csv
[contact]:/contact.html