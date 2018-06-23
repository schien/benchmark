#!/bin/sh

usage ()
{
  echo "usage: ./gen_report.sh [-h] path"
  exit  1
}

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
  -h|--help)
    usage
    ;;
  *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

DIR=$1

if [[ -z "$DIR" ]]; then
  usage
fi

for sz in small mid large; do
  ./run_tests.sh -r 5 -s $sz $DIR
done | node ./aggregate_result.js
