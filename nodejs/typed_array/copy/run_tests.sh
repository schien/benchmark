#!/bin/sh

for file in test_*.js;
do
  node "$file"
done
