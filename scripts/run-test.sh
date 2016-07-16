#!/bin/bash

if [ "$1" == "watch" ]
then
  env $(cat .env | xargs) mocha --watch
else
  env $(cat .env | xargs) mocha
fi
