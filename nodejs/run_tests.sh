#!/bin/sh

usage ()
{
  echo "usage: ./run_tests.sh [-r RUN] [-s small|mid|large] [-h] path"
  echo "       -r|--repeat number of test run, default is 1"
  echo "       -s|--size   size of dataset, default is small"
  echo "       -h|--help   show this help message"
  exit  1
}

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
  -r|--repeat)
    REPEAT="$2"
    shift # past argument
    shift # past value
    ;;
  -s|--size)
    DATASIZE="$2"
    shift # past argument
    shift # past value
    ;;
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

REPEAT="${REPEAT:-1}"
DATASIZE="${DATASIZE:-small}"
DIR=$1
SCRIPT_NAME="run_tests.sh"

if [ ! -f "$DIR/$SCRIPT_NAME" ]; then
  echo "ERROR: no test case runner in $DIR"
  usage
fi

cd "$DIR"

export DATASIZE

for i in $(seq $REPEAT); do
  echo "=== test run $DATASIZE #$i ==="
  bash "$SCRIPT_NAME"
  printf '\n'
done
