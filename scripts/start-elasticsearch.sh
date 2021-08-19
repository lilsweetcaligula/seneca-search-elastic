#!/bin/bash

echo 'This script will spin up a local elasticsearch instance at:'
echo 'http://localhost:9200/'
echo

docker pull docker.elastic.co/elasticsearch/elasticsearch:7.14.0 && \
  docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.14.0

