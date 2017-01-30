# healthcare.ai docs

Used for

1) Splash page at healthcare.ai

2) Blog at healthcare.ai/blog (via jekyll)

3) R mkdocs found at healthcare.ai/r; files are in this repo in templates directory

4) Py sphinx docs found at healthcare.ai/py; files are in healthcare.ai-py repo in docs directory

Building of R/Py docs is currently manual process and we use github pages from this repo.

Please do a pull request if you see typos!

## R mkdocs update instructions

1) `cd` to root directory of repo

2) Edit .md files in the root/templates folder

3) Run `mkdocs build` to generate new docs in the root/r directory

4) Run `mkdocs serve` or `python -m http.server` to view docs

## Jekyll update instructions

1) Add the new .md file in jekyll/\_posts

2) `cd` to the jekyll directory and run `jekyll build`

3) Check your post in the browser via `jekyll serve`. Note: use port :4000

4) Once the post looks good, let's integrate it into healthcare.ai

5) In the top-level repo directory, run `update_jekyll.sh`

6) Check how healthcare.ai looks in the browser via `python -m http.server` Note: now use port :8000

7) Verify that things like good not only on healthcare.ai/blog, but also /py and /r

8) Commit, push, and check the real website.

This is the jekyll workflow until we use readthedocs to build for us (hopefully soon)!
