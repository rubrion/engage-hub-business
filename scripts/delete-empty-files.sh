#!/bin/bash

ROOT_DIR="$(dirname "$(dirname "$(realpath "$0")")")"
echo "Searching for empty files in: $ROOT_DIR"

echo "Finding empty files..."
EMPTY_FILES=$(find "$ROOT_DIR" -type f -size 0 -not -path "*/node_modules/*" -not -path "*/\.*")

if [ -z "$EMPTY_FILES" ]; then
  echo "No empty files found."
  exit 0
fi

echo "The following empty files will be deleted:"
echo "$EMPTY_FILES" | while read -r file; do
  echo "  - $file"
done

read -p "Do you want to delete these files? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Operation cancelled."
  exit 1
fi

echo "Deleting empty files..."
echo "$EMPTY_FILES" | while read -r file; do
  rm "$file"
  echo "Deleted: $file"
done

echo "All empty files have been deleted."
