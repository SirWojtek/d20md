#!/bin/bash

if ! gulp prepare_db; then
  echo 'Error preparing db'
  exit 1
fi

./server.js &
SERVER_PID=$!

cd frontend && yarn e2e:headless && cd -
TEST_EXIT_CODE=$?

kill $SERVER_PID

[ $TEST_EXIT_CODE -eq 0 ] || exit 2

