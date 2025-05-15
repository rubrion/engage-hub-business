#!/bin/bash
set -e

echo "Starting main branch initialization..."

git fetch --all

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "develop" ]; then
  echo "Checking out develop branch..."
  git checkout develop || { echo "Failed to checkout develop branch"; exit 1; }
fi

git pull origin develop

if git show-ref --quiet refs/heads/main; then
  echo "Main branch exists locally, checking out..."
  git checkout main
  echo "Resetting main branch to match develop..."
  git reset --hard develop
else
  echo "Main branch doesn't exist locally, creating..."
  git checkout -b main
fi

echo "Pushing changes to remote main branch..."
git push -f origin main

echo "Main branch has been successfully initialized and synced with develop!"

git checkout develop

echo "Process completed. You're now back on the develop branch."
