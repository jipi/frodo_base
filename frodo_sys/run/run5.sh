#!/bin/bash
source /opt/ros/foxy/install/setup.bash
source /home/frodov2/ros_ws/src/install/local_setup.sh
#watch -n 5 /home/frodov2/lelio.sh
#mystring=$(mmcli -m 0 | grep signal | sed 's/.*quality..\(.*\)..recent.*/\1/')
#echo $mystring
#ros2 topic pub /ltesignal std_msgs/String "data: $mystring"
#ros2 run py_pub talker
/usr/bin/python3 /home/frodov2/ros_ws/src/py_pub/py_pub/publisher_member_function.py
PID=$!
wait "$PID"

