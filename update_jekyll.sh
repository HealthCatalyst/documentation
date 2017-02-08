#!/usr/bin/env bash
# Update jekyll blog

# Delete old blog (both the generated and final destination)
echo 'Deleting old files'
./remove_old_blog_files.sh

echo 'Building new blog files'
cd jekyll

if jekyll build; then
    # only do move operations if the _site dir exists, otherwise you'll wreak havoc
    if [ -d "_site" ]; then

        # Move into where new blog html files are
        cd _site

        # Move blog main page into /blog (so it shows at healthcare.ai/blog instead of at healthcare.ai)
        # TODO fix this hack so it doesn't use relative links #215-6
        mv index.html blog/

        # Move everything within _site to healthcare.ai/blog
        #echo 'Moving files'
        mv ./* ../../

        echo 'Blog generated.'
    fi
else
    echo 'Build failed, aborting'
fi