#!/bin/bash
chromium-browser --headless --no-sandbox --disable-gpu --disable-sync --no-first-run --disable-dev-shm-usage --user-data-dir=/tmp/chrome --autoplay-policy=no-user-gesture-required --allow-file-access-from-file --use-fake-ui-for-media-stream --remote-debugging-port=9222 https://nong.be:18442/frodov2sg0
PID=$!
wait "$PID"

