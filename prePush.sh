touch pullRequestRelease.json
timestamp=$(date +%s)

VERSION=$(npm pkg get version | sed 's/"//g')
echo $VERSION
echo "{\"version\": \""${VERSION}${timestamp}"\"}" > pullRequestRelease.json