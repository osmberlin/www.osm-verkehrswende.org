#!/bin/bash

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Get all .geojson files in the directory
FILES="$DIR/files_geojson/*.geojson"

for file in $FILES
do
  if [[ $file == *_base.geojson ]]; then
    continue
  fi

  BASENAME=$(basename "$file" .geojson)
  OUTPUT="$DIR/files_graph/$BASENAME.bin"

  chmod +x "./scripts/cqi/routing/createGraphProcess.sh"
  "./scripts/cqi/routing/createGraphProcess.sh" "$file" "$OUTPUT"
done
