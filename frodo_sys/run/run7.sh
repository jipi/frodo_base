#!/bin/bash
#source /home/frodov1/.bashrc
#/home/frodov2/nongros/pear/cmake/examples/gstreamer/gstreamer
#/home/frodov2/nongros/pear/cmake/examples/surveillance/surveillance
/home/frodov2/nongros/webrtcbin/webrtc-unidirectional-h264-2


#gst-launch-1.0 nvarguscamerasrc ! 'video/x-raw(memory:NVMM), width=1280, height=720,framerate=30/1' ! nvvidconv flip-method=2 ! 'video/x-raw(memory:NVMM), width=1280, height=720, framerate=30/1, format=I420' ! nvvidconv ! 'video/x-raw, width=1280, height=720, framerate=30/1, format=UYVY' ! identity drop-allocation=true ! v4l2sink device=/dev/video1
PID=$!
wait "$PID"

