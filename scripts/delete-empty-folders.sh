#!/bin/bash

ROOT_DIR="$(dirname "$(dirname "$(realpath "$0")")")"
echo "Searching for empty folders in: $ROOT_DIR"

echo "Finding empty folders..."
EMPTY_FOLDERS=$(find "$ROOT_DIR" -type d -empty -not -path "*/node_modules/*" -not -path "*/\.*")

if [ -z "$EMPTY_FOLDERS" ]; then
  echo "No empty folders found."
  exit 0
fi

echo "The following empty folders will be deleted:"
echo "$EMPTY_FOLDERS" | while read -r folder; do
  echo "  - $folder"
done

read -p "Do you want to delete these folders? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Operation cancelled."
  exit 1
fi

echo "Deleting empty folders..."
echo "$EMPTY_FOLDERS" | while read -r folder; do
  rmdir "$folder"
  echo "Deleted: $folder"
done

echo "All empty folders have been deleted."
