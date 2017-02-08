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

        # Move everything within `_site` to the root `/`
        #echo 'Moving files'
        mv ./* ../../

        # reconstruct the public folder from the source in `jekyll/public` to the root `/`
        # IMPORTANT- only run this script from the root!
        cd ../../
        ./rebuild_public_folder.sh

        echo 'Site generated.'
    fi
else
    echo 'Build failed, aborting'
fi