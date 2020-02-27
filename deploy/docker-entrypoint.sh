#!/bin/sh

set -e

echo "Opening folder"
cd code-generator

echo "List of files"
ls -l

echo "Commiting with current timestamp"
timestamp=`date -Iseconds`
echo $timestamp
echo $GIT_COMMITTER_NAME
echo $GIT_COMMITTER_EMAIL
git diff-index --quiet HEAD || git commit -m $timestamp

echo "Authenticating github servers"
ssh-keyscan github.com >> ~/.ssh/known_hosts

echo "Pushing to remote"
yes | git push -v

echo "Finished!"
