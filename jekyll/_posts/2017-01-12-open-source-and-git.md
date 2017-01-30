---
layout: post
title:  "Contributing to open source software development using Github"
date:   2017-01-12 01:32:11 -0700
tags: workflow			
author: Mike Mastanduno
categories: blog
excerpt: This blog will describe the motivation and workflow of Git version control
---

The purpose of this post is to help you become familiar with *Git*, an essential part of contributing to [healthcare.ai](http://healthcare.ai). Git is essentially a collaboration tool for software developers, and [*Github*](http://github.com) is the accompanying online storage platform. If you have been reading about healthcare.ai, you probably know that it is an [*open source* software package]( http://healthcare.ai/#why). Open source means that we aren’t hiding anything from our users. They can use the package, view the contents, and modify the package for their particular needs. We chose to make healthcare.ai open source for two major reasons:

1.	**Anyone can contribute to its development.** When an open source package becomes popular, there could be hundreds of people working on making it better!

2.	**The rising tide will raise all boats.** We are trying to be a leader in healthcare machine learning, and hoping that our efforts will be visible, benefit the community, and benefit patient care.

As our team (and number of contributors) grows, it doesn’t make sense to share our code using email attachments. We make thousands of changes on hundreds of files. Instead, we use Git. Git is an industry standard service that makes it easy for large teams to collaborate on code, keep files safe from unwanted changes through *version control*, and facilitate code review before changes are published.

The idea of Git is pretty easy to follow, but the vocabulary can be a little confusing at first. There are [many](https://guides.github.com/introduction/flow/) [great](http://git.huit.harvard.edu/guide/) [resources](https://guides.github.com/activities/hello-world/) about Git online, but sometimes they are too basic for specific issues, or too complicated and lacking explanation. Hopefully you find the ideas below to be both useful and informative.

Imagine that you are writing a paper. You write some, save the file: “myPaper_version1.doc.” You write more, save version 2, version 3… Essentially, this is what Git is doing. The codebase, or repository, is written line by line, and each change can be stored as a *commit*. The commits flow linearly, and if you don’t like the latest changes, you can roll back to the previous commit. This [excellent cheat sheet shows that process](http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf), where each circle represents a commit. 

I’ll focus on explaining five topics that are likely to help you collaborate.


1. Local vs source  
A code repository lives at [www.github.com](http://github.com), and you’d like to work on it. The *master* source is online. You need to *clone* or *fork* the repo to create a local copy on your computer. You can make improvements, commit them, and document each change. Verify that your code is working, then, they can be *merged* into the source copy.  
2. Pushing and Pulling  
When you are ready to submit your changes to the master, you must first *pull* changes from the master source to your local copy. This ensures that you have the latest changes from the master in your local copy. Then you can *push* your changes up to the online master. If you take a few weeks away from the code, make sure you pull the latest changes into your local copy before starting your work.
    * Pull changes from the master source to your local copy: `git pull`
    * Push your local changes to the online master: `git push`  
3. Branches  
[*Branches*](http://github.com/HealthCatalystSLC/healthcareai-r/branches/) are used to help keep large changes, feature additions, etc. separate from the master source. They allow you to “break the code to fix it” without worrying that you are going to ruin the master. If you create a topic branch to work in, you now have two separate local copies: your local master, and your local branch. You can make ongoing changes to the code in your branch, then switch back to the master to actually use code that you know is working.
    * Create a new topic branch or switch to an existing topic branch: `git checkout -b nameofbranch`
4. Merging  
When the topic branch you’ve been developing is done, documented, and functional, it’s ready to be merged back into the master branch. Again, update your local master, as other people could have been working on the code while you were. Merge the local master into your local branch (the ordering can be disputed, but this is how we do it at healthcare.ai), allowing you to test for functionality with all the latest changes. Finally, push the local branch up to the server and ask for review.
    * Check out the latest online master and merge into the local topic branch: `git merge origin/master`
    * Make sure it all still works!
    * Push the local branch to the server for review: `git push`
5. Pull Requests  
After pushing a completed topic branch up to the server, the *pull request* acts as a request for code review. The term pull request ~~makes no sense to me~~ [Got it!](https://www.quora.com/GitHub-Why-is-the-pull-request-called-pull-request) Another developer will look through your changes and documentation, ask for revisions, and eventually approve the pull request. After this happens, the branch will be merged into the online master. Anyone who clones the master will now get your changes, and the branch can be deleted.


There is a lot of vocabulary in this post, but we hope that it’s helpful to see these things defined in context of how they are used. Seasoned developers forget that Git language can be hard to interpret since it’s such an important part of their everyday work. The truth is, it’s a barrier to entry for the casual contributor. However, it’s extremely important for the health of a large code project and the team that works on it. 

If you’ve become motivated to get down to business, make an account on [Github](https://github.com/), [clone our repo](https://github.com/HealthCatalystSLC/healthcareai-r/blob/master/CONTRIBUTING.md#clone-healthcareai-r-repo), and help us shape the future of healthcare machine learning! There are more detailed instructions in the [readme](https://github.com/HealthCatalystSLC/healthcareai-r/blob/master/README.md) and [contributing](https://github.com/HealthCatalystSLC/healthcareai-r/blob/master/CONTRIBUTING.md) files, and you can feel free to [send questions](http://healthcare.ai/contact.html) our way.
