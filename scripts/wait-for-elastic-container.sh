#!/bin/bash

# Bash 'strict' mode
#
set -euo pipefail
IFS=$'\n\t'

until curl -s "${LOCALHOST}:9200"; do
  echo 'Waiting for the container to spin up...'
  sleep 6
done

