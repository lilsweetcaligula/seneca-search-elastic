#!/bin/bash

# Bash 'strict' mode
#
set -euo pipefail
IFS=$'\n\t'


SUPPORTED_OPTS=':dD'


detached=0
show_desc=1

while getopts $SUPPORTED_OPTS option
do
    case $option in
        d  )    echo 'Elasticsearch is running in detached mode.'; detached=1;;
        D  )    show_desc=0;;
        \? )    echo 'Unknown option.'; exit 1;;
        *  )    echo 'Missing option argument.'; exit 1;;
    esac
done


if [[ 1 = "${show_desc}" ]]; then
  echo 'This script will spin up a local elasticsearch instance at:'
  echo 'http://localhost:9200/'
  echo

  sleep 2
fi


spin_up() {
  # TODO: Tidy up, - the only difference between the two commands
  # is the -d option (detached mode).
  #
  if [[ 1 = "${detached}" ]]; then
    docker run -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.14.0
  else
    docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.14.0
  fi
}

docker pull docker.elastic.co/elasticsearch/elasticsearch:7.14.0

if [[ 1 = "${detached}" ]]; then
  test -d devassets || mkdir devassets
  spin_up > './devassets/elastic_container_id.txt'
else
  spin_up
fi

