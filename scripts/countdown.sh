#!/bin/bash

# Bash 'strict' mode
#
set -euo pipefail
IFS=$'\n\t'


i=$1

while [ $i -gt 0 ];
do
  echo $i
  sleep 1;

  i=$((i-1))
done

echo 'Done'

