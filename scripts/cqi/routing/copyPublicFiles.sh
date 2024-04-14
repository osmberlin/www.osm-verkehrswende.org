#!/bin/bash

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TARGET_DIR="$(dirname "$(dirname "$(dirname "$DIR")")")/public/project_cqi/routing/"

# Handle .geojson
FILES="$DIR/files_geojson/*_base.geojson"
for file in $FILES
do
  # rm "$file".br
  # brotli -k "$file"

  cp "$file.br" "$TARGET_DIR"
done

# Handle .geojson
FILES="$DIR/files_graph/*.bin.br"
for file in $FILES
do
  cp "$file" "$TARGET_DIR"
done
