# Update sphinx

# Before running, 

# 1) Clone the healthcareai-py repo in addition to the documentation repo

# 2) Install the packages in dev-requirements.txt

# Run this from within the root of the healthcareai-py repo

# Build docs
sphinx-build -b html docs py

cd ../healthcareai-py

# Copy py folder to documentation repo
cp -rf py ../documentation

# Delete new py folder in the healthcareai-py directory
rm -rf py
