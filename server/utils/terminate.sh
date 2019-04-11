#!/bin/bash

terminateTree() {
    echo $1
    for cpid in $(/usr/bin/pgrep -P $1); do
        terminateTree $cpid
    done
    kill -9 $1 > /dev/null 2>&1
}

for pid in $*; do
    echo pid
    terminateTree $pid
done
