#!/bin/bash
#source /home/frodov1/.bashrc
#source /opt/ros/melodic/setup.bash
#source /home/frodov1/catkin_ws/devel/setup.bash
#export_ROS_HOME=/home/frodov1/.ros
#export ROS_MASTER_URI=http://192.168.0.1:11311
#export ROS_IP=192.168.0.1
source /opt/ros/foxy/install/setup.bash
source /home/frodov2/ros_ws/rosbridge_suite/install/setup.bash
#ros2 run rosbridge_server rosbridge_websocket.py &
ros2 launch rosbridge_server rosbridge_websocket_launch.xml &
#roslaunch rosbridge_server rosbridge_websocket.launch &
PID=$!
wait "$PID"

