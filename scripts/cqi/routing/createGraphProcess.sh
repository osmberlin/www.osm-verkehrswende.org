#!/usr/bin/env bash

# Use the first command-line argument as the input filename
inputFile=$1
if [ -z "$inputFile" ]; then
  echo 'Please provide an input filename as a command-line argument.'
  exit 1
fi

# Use the second command-line argument as the output filename
ouptFile=$2
if [ -z "$ouptFile" ]; then
  echo 'Please provide an output filename as a command-line argument.'
  exit 1
fi

# Change repository
cd ../route_snapper || exit

# Make sure we are up to date
git rebase origin/main

# This is where the binary is
cd geojson-to-route-snapper || exit

echo "Run route snapper"
# Run the command
cargo run --release -- --input "$inputFile" --output "$ouptFile"

# Compress and only keep the compressed file
echo "Cleanup and compress file"
# rm "$ouptFile".gz "$ouptFile".br
# gzip -k "$ouptFile"
rm "$ouptFile".br
brotli -k "$ouptFile"
rm "$ouptFile"
