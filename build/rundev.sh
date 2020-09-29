#!/bin/sh
if "$1"
then
  ./node_modules/poi/bin/cli.js apps/$1/index.js --serve
else
  ./node_modules/poi apps/$1/index.js --serv
fi
