# Update jekyll blog

# Delete old copy
rm -rf blog

ls -la

cd jekyll

jekyll build

# Move into where new blog html files are
cd _site

# Move blog main page into /blog (so it shows at healthcare.ai/blog instead of at healthcare.ai)
mv index.html blog

# Change (what will be) top-level blog to newblog for testing

# Move everything within _site to healthcare.ai/blog
cp -rf * ../..




