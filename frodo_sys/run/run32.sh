#!/bin/bash
source /opt/ros/foxy/install/setup.bash
source ~/ros_ws/src/velocity_smoother/install/setup.bash
ros2 launch velocity_smoother velocity_smoother-launch.py &
PID=$!
wait "$PID"

