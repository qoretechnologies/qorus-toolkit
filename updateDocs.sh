#!/bin/bash

VERSION=$(node -pe "require('./pullRequestRelease.json').version")
echo $VERSION
for f in docs/**/*
do
 if [[ $f == *.html ]]; then
  sed -i -e "s|@qoretechnologies/qorus-toolkit|@qoretechnologies/qorus-toolkit@pull_request_$VERSION|g" $f
 fi
done