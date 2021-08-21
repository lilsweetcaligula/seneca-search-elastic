#!/bin/bash

# Bash 'strict' mode
#
set -euo pipefail
IFS=$'\n\t'


CONTAINER_ID_PATH='./devassets/elastic_container_id.txt'


if test -f "${CONTAINER_ID_PATH}"; then
  head -n1 "${CONTAINER_ID_PATH}" | xargs docker container stop
  rm "${CONTAINER_ID_PATH}"
else
  echo 'The Elastic container does not seem to be running.'
  echo
  echo 'If you believe the Elastic to be running, try running `docker ps`'
  echo 'and stopping the container manually with `docker container stop "${CONTAINER_ID}"'
fi

