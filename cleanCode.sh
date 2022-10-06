#!/bin/bash

for f in src/*; do
    if [[ $f == *.ts ]]; then
        echo $f
        sed -i -E "s| -(.*)\-function | |g" $f
    fi
done
for f in src/**/*; do
    if [[ $f == *.ts ]]; then
        echo $f
        sed -i -E "s| -(.*)\-function | |g" $f
    fi
done
