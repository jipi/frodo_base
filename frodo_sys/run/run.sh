#!/bin/bash
#source /home/frodov1/.bashrc
#source /opt/ros/melodic/setup.bash
#source /home/frodov1/catkin_ws/devel/setup.bash
#export ROS_MASTER_URI=http://localhost:11311
#export ROS_IP=192.168.0.1
#roslaunch turn_on_wheeltec_robot turn_on_wheeltec_robot.launch
#nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:8092 R:8090:127.0.0.1:2233 & # ssh

nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:8096 R:8095:127.0.0.1:2233 & # ssh

nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:8071 R:8070:127.0.0.1:8000 & # frontcam
#nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:5072 R:5070:10.42.0.40:80 & 
#nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:5073 R:5071:10.42.0.40:81 &
nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:6072 R:6070:10.42.0.77:80 & # rearcam ctrl
nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:6073 R:6071:10.42.0.77:81 & # rearcam

nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:5072 R:5070:127.0.0.1:8888 & # kobe

#nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:7082 R:7080:10.42.0.182:80 &
nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:9012 R:9010:127.0.0.1:9090 & # rosbridge

nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:7083 R:7081:10.42.0.28:80 & # mic

#nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:7073 R:7071:192.168.0.182:81 &
#nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:7083 R:7081:127.0.0.1:18554 &
#nohup /home/frodov2/nongros/chisel/chisel client http://nong.be:7083 R:7081:127.0.0.1:8554 &
