#!/bin/bash

for f in dist/*; do
    echo $f
    sed -i -E "s| -(.*)\-function | |g" $f
done
for f in dist/**/*; do
    echo $f
    sed -i -E "s| -(.*)\-function | |g" $f
done
