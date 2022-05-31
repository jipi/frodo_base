#!/bin/bash
#source /home/frodov1/.bashrc
source /opt/ros/foxy/install/setup.bash
source /home/frodov2/microros_ws/install/local_setup.bash
#export_ROS_HOME=/home/frodov1/.ros
#export ROS_MASTER_URI=http://192.168.0.1:11311
#export ROS_IP=192.168.0.1
#roslaunch turn_on_wheeltec_robot frodorian.launch&
#roslaunch turn_on_wheeltec_robot turn_on_wheeltec_robot.launch &
ros2 run micro_ros_agent micro_ros_agent udp4 --port 8888 &
PID=$!
wait "$PID"
#roslaunch turn_on_wheeltec_robot frodorian.launch

