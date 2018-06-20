#!/bin/sh

for file in by_*.js;
do
  node "$file"
done
