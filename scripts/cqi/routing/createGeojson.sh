#!/bin/bash

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Get all .geojson files in the directory
FILES="$DIR/../input/*.geojson"

for file in $FILES
do
  node "./scripts/cqi/routing/createGeojsonProcess.js" "$file"
done
