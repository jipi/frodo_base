#!/bin/bash
#sudo systemctl start frodolaunch
#sleep 3
#sudo systemctl start frodolaugh
#sleep 3
#sudo systemctl start frodoamooth
#nohup watch -n 5 ./lelio.sh &
#sleep 3
#nohup chromium-browser --headless --no-sandbox --disablec --no-first-run --disable-dev-shm-usage --user-data-dir=/tmp/chrome --autoplay-policy=no-user-gesture-required --allow-file-access-from-file --use-fake-ui-for-media-stream --remote-debugging-port=9222 https://nong.be:8443/d &
#sleep 3
#sudo modprobe v4l2loopback exclusive_caps=1,1 video_nr=2,3 devices=2
#nohup gst-launch-1.0 nvarguscamerasrc sensor_id=0 ! 'video/x-raw(memory:NVMM), width=1640, height=1232,framerate=30/1' ! nvvidconv flip-method=2 ! nvvidconv ! video/x-raw,width=816, height=614 ! nvvidconv ! identity drop-allocation=true ! v4l2sink device=/dev/video3 &
#sleep 3
#nohup deepstream-app -c source1_csi_dec_infer_resnet_int8_720p.txt &
#sleep 3

nohup /home/frodov2/nongros/pear/cmake/examples/gstreamer/gstreamer &
sleep 3

nohup chromium-browser --headless --no-sandbox --disable-gpu --disable-sync --no-first-run --disable-dev-shm-usage --user-data-dir=/tmp/chrome --autoplay-policy=no-user-gesture-required --allow-file-access-from-file --use-fake-ui-for-media-stream --remote-debugging-port=9222 https://nong.be:8443/d &
sleep 3

#sudo python3 GPSSimp.py
#sleep 3
#sudo chmod 777 /dev/serial/by-id/usb-SimTech__Incorporated_SimTech__Incorporated_0123456789ABCDEF-if01-port0
#sudo systemctl start frodonmea

