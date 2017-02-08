#!/usr/bin/env bash

# Rebuild the public directory from the source files in `jekyll/public`
# pulling only the relevant dist files (to avoid duping bootstrap source, etc)
echo "Rebuilding public directory"

if mkdir public; then
    mkdir public/bootstrap-3.3.7
    cp -r jekyll/public/bootstrap-3.3.7/dist public/bootstrap-3.3.7/

    cp -r jekyll/public/css public/
    cp -r jekyll/public/font-awesome-4.7.0 public/
    cp -r jekyll/public/img public/
    cp -r jekyll/public/js public/
fi
