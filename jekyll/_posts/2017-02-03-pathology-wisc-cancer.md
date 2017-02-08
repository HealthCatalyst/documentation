---
layout: post
title:  "Using healthcare.ai Python"
date:   2017-02-03 6:00:00 -0700t
tags: example
author: Mike Mastanduno
categories: blog
excerpt: This is an example of how to build a predictive model using Python and healthcare.ai 
---

Note: this post follows a [Jupyter Notebook][nb].

We have had [a lot of say][r post] about R on the blog lately! R is a great statistical language to do data manipulation, cleaning, machine learning, and visualization. One reason we really like it on our team is how neatly packaged the tools are. However, there is a significant portion of the machine learning community that uses Python. For our purposes, the benefits of python mainly relate to speed, deep learning, and the ease of working with massive datasets. Until one language is markedly more common than the other, we maintain a [healthcare.ai][hcai-py] Python package in addition to the R package. This post serves to give an example of how to use the python package.

This example uses a dataset that can be found on the [UCI Machine Learning Repository][uci] and is freely available for download. The data is an array of characteristics from pathology samples. The process to get the data worked like this:
1. A patient with suspected breast cancer had a sample of cells taken from the lesion in a biopsy procedure.
2. Cells from the sample were put on a pathology slide and stained to highlight biological characteristics.
3. A pathologist read the slides to determine whether the cells were malignant or benign. 
4. The pathologist recorded observations about the size, shape, and characteristics of the cell nuclei. 

![Pathology slide example](/assets/breast-cancer-images-small.png)

The cellular characteristics in the slides help the pathologist make the distinction between malignant and benign lesions. Since the pathologist had the courtesy to record the features, we can see if a machine learning algorithm can distinguish the tissue samples as well as the pathologist could. Like [R notebooks][r post 2], Python can be written into a *Jupyter Notebook* for easy annotation and sharing. As there is a lot of code, data, and visualization contained within this post, it would be good if you would follow along with the [notebook][nb].

The basic process is:
1. Load the data and healthcare.ai
2. Explore the data through statistics and visualization.
3. Implement machine learning models.  

Again, check out the [example notebook][nb], thanks for reading, and [contact us][contact] with any questions. 


[hcai-py]:/py
[uci]:https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Diagnostic%29
[nb]:/assets/notebooks/Wisconsin-Pathology-Notebook.html
[r post]:/blog/2017/01/17/using-r-for-data-analysis/
[contact]:/contact.html
[r post 2]:/blog/2017/01/08/us-health-by-county/



