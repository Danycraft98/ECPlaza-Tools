#!/bin/bash

usage () {
  ECHO 'Usage : exists <substring> -s <string>';
  exit 1;
}


sub=$1
ECHO started equal test;
if [ $# -eq 1 ]
then
    ECHO "1 argument passed"
    string="$(eval "python -m spacy info")"
    if [[ "$string" != *"$sub"* ]]
    then
      eval "python -m spacy download en"
    fi
elif [ $# -ge 3 ];
then
    ECHO "$# argument passed"
    key="$2"
    string="$3"

    if [[ "$string" == *"$sub"* ]]
    then
      ECHO 0
    else
      ECHO 1
    fi
else
    usage;
fi

#cmd /k