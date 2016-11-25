#!/bin/sh

# 1) Run 'npm start' in ghost directory

# 2) Run this script in ghost directory 

buster generate

# Move content from static to blog
mv static blog

cp -rf blog ../

rm -rf blog

# Move to top-level
cd ../

git add -A
git commit -m "Update on the website at $(date)"
git push origin master