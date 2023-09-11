#!/bin/bash

if [ -e .env ]; then
  env_file=".env"
elif [ -e .env.development ]; then
  env_file=".env.development"
else
  echo "Neither .env nor .env.development file exists"
  exit 1
fi

if [ $# -ne 1 ]; then
  echo "Usage: $0 <output_path>"
  exit 1
fi

output_path="$1"

set -o allexport
source $env_file
set +o allexport

cat <<EOF >"$output_path"
window.env = {
$(grep -v '^#' $env_file | xargs -I {} echo {} | sed 's/=/": "/g' | sed 's/^/  "/g' | sed 's/$/",/g')
};
EOF