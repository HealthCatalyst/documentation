# Update sphinx

# Before running, 

# 1) Clone the healthcareai-py repo in addition to the documentation repo

# 2) Install the packages in dev-requirements.txt

# Run this from within the top of the documentation repo

#sphinx-build -b html docs py

cd ../healthcareai-py

cp -rf py ../documentation

rm -rf py

cd ../documentation