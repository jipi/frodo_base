#!/bin/bash
#source /home/frodov1/.bashrc
#source /opt/ros/melodic/setup.bash
#source /home/frodov1/catkin_ws/devel/setup.bash
source /opt/ros/foxy/install/setup.bash
source /home/frodov2/ros_ws/src/install/local_setup.sh
#export_ROS_HOME=/home/frodov1/.ros
#export ROS_MASTER_URI=http://192.168.0.1:11311
#export ROS_IP=192.168.0.1
#chmod 777 /dev/serial/by-id/usb-SimTech__Incorporated_SimTech__Incorporated_0123456789ABCDEF-if01-port0
#chmod 777 /dev/ttyUSB.sim7600-02
python3 /home/frodov2/GPSSimp.py &&
ros2 run nmea_navsat_driver nmea_serial_driver _port:=/dev/serial/by-id/usb-SimTech__Incorporated_SimTech__Incorporated_0123456789ABCDEF-if01-port0 _baud:=115200
#roslaunch nmea_navsat_driver nmea_serial_driver.launch port:=/dev/serial/by-id/usb-SimTech__Incorporated_SimTech__Incorporated_0123456789ABCDEF-if01-port0 &
PID=$!
wait "$PID"

