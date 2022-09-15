
VERSION=$(npm pkg get version | sed 's/"//g')
echo $VERSION
for f in docs/**/*
do
 if [[ $f == *.html ]]; then
  sed -i -e "s|@qoretechnologies/qorus-toolkit|@qoretechnologies/qorus-toolkit-$VERSION|g" $f
 fi
done