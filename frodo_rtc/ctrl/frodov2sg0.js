// Simple Peer Wrapper Example — Data
// https://github.com/lisajamhoury/simple-peer-wrapper

// This example allows for two users to draw on the same p5.js canvas
// using webRTC peer connections. It requires that a simple-peer-server
// is running to connect the two peers.
// See https://github.com/lisajamhoury/simple-peer-server

// Include this for to use p5 autofill in vscode
// See https://stackoverflow.com/questions/30136319/what-is-reference-path-in-vscode
/// <reference path="../shared/p5.d/p5.d.ts" />
/// <reference path="../shared/p5.d/p5.global-mode.d.ts" />

let partnerMousePosition;
let myMousePosition = {};

let spw;

// Colors used for drawing mouse ellipses
const colors = {
    x: 'rgba(16, 157, 227, 0.5)',
    y: 'rgba(227, 86, 16, 0.5)',
};

const size = 24;
var whoAmI = 'HUMAN';
var peerConnectionStatus = 'NOT CONNECTED';
// Add key Listener
let playerSpriteX = 0.0;
var steering_ = 0.0;
var throttle_ = 0.0;
var throttle_factor = 0.2;

var telekey = '';
var keyup = 0;



var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
    whoAmI = 'FRODO';
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

var cmdVel = new ROSLIB.Topic({
    ros : ros,
    //name : '/cmd_vel',
    name : '/velocity_smoother/input',
    messageType : 'geometry_msgs/Twist'
});

var twist = new ROSLIB.Message({
    linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x :  0.0,
        y :  0.0,
        z :  0.0
    }
});

var lasttwist = new ROSLIB.Message({
    linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x :  0.0,
        y :  0.0,
        z :  0.0
    }
});


cmdVel.publish(twist);

var zerotwist = new ROSLIB.Message({
    linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x :  0.0,
        y :  0.0,
        z :  0.0
    }
});


var listener = new ROSLIB.Topic({
    ros : ros,
    //name : '/PowerVoltage',
    name : '/connected_clients',
    messageType : 'rosbridge_msgs/ConnectedClients'
});

var gps_listener = new ROSLIB.Topic({
    ros : ros,
    name : '/extend_fix',
    messageType : 'gps_common/GPSFix'
});

/*
try {
  myPeerConnection = new RTCPeerConnection(pcOptions);

  statsInterval = window.setInterval(getConnectionStats, 1000);
  // add event handlers, etc 
} catch(err) {
  console.error("Error creating RTCPeerConnection: " + err);
}

function getConnectionStats() {
  myPeerConnection.getStats(null).then(stats => {
    var statsOutput = "";

    stats.forEach(report => {
      if (report.type === "inbound-rtp" && report.kind === "video") {
        Object.keys(report).forEach(statName => {
          statsOutput += `<strong>${statName}:</strong> ${report[statName]}<br>\n`;
        });
      }
    });

    document.querySelector(".stats-box").innerHTML = statsOutput;
  });
}

*/


/*
window.setInterval(function() {
  spw.getStats(null).then(stats => {
    let statsOutput = "";

    stats.forEach(report => {
      statsOutput += `<h2>Report: ${report.type}</h2>\n<strong>ID:</strong> ${report.id}<br>\n` +
                     `<strong>Timestamp:</strong> ${report.timestamp}<br>\n`;

      // Now the statistics for this report; we intentially drop the ones we
      // sorted to the top above

      Object.keys(report).forEach(statName => {
        if (statName !== "id" && statName !== "timestamp" && statName !== "type") {
          statsOutput += `<strong>${statName}:</strong> ${report[statName]}<br>\n`;
        }
      });
    });

    document.querySelector(".stats-box").innerHTML = statsOutput;
  });
}, 1000);


setInterval(() => {
    RTCPeerConnection.getStats((err, report) => {
        console.log('report', report)
    });
}, 1000);

*/


//jipi test
// Create an XMLHttpRequest object
//const xhttp = new XMLHttpRequest();

// Define a callback function
//xhttp.onload = function() {
  // Here you can use the Data
//}
// Send a request
//xhttp.open("GET", "https://nong.be:5073/rst_control");
//xhttp.send();


//var socket = io();
//const socket = io("http://localhost:5000");

// Setup() is a p5 function
// See this example if this is new to you
// https://p5js.org/examples/structure-setup-and-draw.html
function setup() {
    // Make a p5 canvas 500 pixels wide and 500 pixels high
    createCanvas(240, 240);

    // Fix the framerate to throttle data sending
    frameRate(20);

    // Include wrapper options here
    const options = {
        debug: false,
        serverUrl: 'https://nong.be:28081',
	    simplePeerOptions: {
    	    config: {
       		    iceServers: [
    /*            
    		        {
      			        //'urls': 'stun:stun.l.google.com:19302'
                        //'urls': 'stun:nong.be:3478'
                        //'urls': 'stun:stun4.l.google.com:19302?transport=udp'
                        //'urls': 'stun:16.163.155.19:3478'
                        'urls': 'stun:turnhk.nong.be:3478'

    		        },
    		        {
      			        //'urls': 'turn:nong.be:5349',
      			        //'username': 'frodoturn',
      			        //'credential': 'c8f5ba71a4f76f5f6ae2386f06deb63b'
                        //'urls': 'turn:16.163.155.19:5349',
                        //'username': 'admin',
                        //'credential': 'sambros2021'
                        'urls': 'turn:turnhk.nong.be:5349',
                        'username': 'frodoturn_ph',
                        //'credential': '6fbc5166b0146400b3116a5a9d3c215a'
                        'credential': 'sambros2021'


    		        }
                    */

{'urls': 'stun:turnhk.nong.be:3478'},
{'urls': 'turn:turnhk.nong.be:5349','username': 'frodoturn_ph','credential': 'sambros2021'}


  	            ]
    		},
	    },
    };
  
    // Create a new simple-peer-wrapper
    spw = new SimplePeerWrapper(options);

    // Make the peer connection
    spw.connect();
    // When data recieved over the connection call gotData
    spw.on('data', gotData);
}

// call gotData when robot peer browser receives data from human peer browser
function gotData(data) {
    //partnerMousePosition = data.data;
    //console.log(partnerMousePosition);
    //console.log(data);

    if (whoAmI=='FRODO') {
    	//original direct roslib publishing
        twist.linear.x = data.data.linear.x
//jipi        
        twist.angular.z = data.data.angular.z
    //twist.angular.z = (-1)*data.data.angular.z

        //console.log("data: "+ twist.linear.x +" and "+  twist.angular.z);
        cmdVel.publish(twist);
    }

    if (whoAmI=='HUMAN') {
       // document.getElementById('POWERVOLTAGE').innerHTML = 'PowerVoltage = ' + data.data;
      //  document.getElementById('LATITUDE').innerHTML = 'Latitude = ' + data.data;  
    }

    //	socket.emit('jiasai', twist.linear.x);

	/* websocket
        let socket = new WebSocket("ws://localhost:5000");
            socket.onopen = function(e) {
                socket.send(twist.linear,x);
            };
            socket.onclose = function(event){
        };
    */

    /* rospy
	// connects to robot python key teleop socket and passes it received data
	const socket = io("http://localhost:5000");
	//console.log(socket.id);
	socket.on("connect", () => {
          console.log(data.data);
          socket.volatile.emit('keypress event', data.data);
	});
    */


    //client.js
    //var io = require('socket.io-client');
    //const socket = io.connect('http://localhost:5000', {reconnect: true});
    // Add a connect listener
    //socket.on('connect', function (socket) {
	//console.log(socket.id);
    //console.log('Connected!');
    //});
    //socket.emit('CH01', 'me', 'test msg');

}

setInterval(function(){
    if (!spw.isConnectionStarted())
        return;
    //  console.log(spw.peerClient.connections[0].room);

    //var formData = new FormData();
    //formData.append("text", document.getElementById("sianginput").value);
    //JSON.stringify(Object.fromEntries(formData));

    //console.log(formData);
    //var strData = formData.get('input');

    //if (strData.search('human')==true) {
    //    whoAmI = 'HUMAN';
    //    console.log("i am human");
    //} else {
    //    whoAmI = 'ROBOT';
    //    console.log("i am robot");
    //}

    if (whoAmI=='FRODO') {
        //var listener = new ROSLIB.Topic({
        //    ros : ros,
        //    name : '/PowerVoltage',
        //    messageType : 'std_msgs/Float32'
        //});

        listener.subscribe(function(message) {
           // console.log('Received message on ' + listener.name + ': ' + message.data);
            spw.send(listener.name);
            spw.send(message.clients[0].ip_address);
         //   listener.unsubscribe();
        });


        //var gps_listener = new ROSLIB.Topic({
        //    ros : ros,
        //    name : '/extend_fix',
        //    messageType : 'gps_common/GPSFix'
        //});
 
     //   gps_listener.subscribe(function(msg) {
        //   console.log('Reiceived message on ' + gps_listener.name + ': ' + msg.longitude + " " + msg.latitude +": " + msg.time);
      //  spw.send(gps_listener.name);
      //  spw.send(msg.data);
        //            spw.send(listener.name);
        //    document.getElementById('longitude').innerHTML = msg.longitude
        //    document.getElementById('latitude').innerHTML = msg.latitude
        //       gps_listener.unsubscribe();
       // });
    }
}, 2000);

// Draw() is a p5 function
// See this example if this is new to you
// https://p5js.org/examples/structure-setup-and-draw.html
function draw() {
  // Only proceed if the peer connection is started
    if (!spw.isConnectionStarted()) {
        //console.log('returning');
        peerConnectionStatus = 'NOT CONNECTED!';                                                    
        document.getElementById('CONNECTION STATUS').innerHTML = 'connection status = ' + peerConnectionStatus;
        return;
    } else {
        peerConnectionStatus = 'CONNECTED!';
        document.getElementById('CONNECTION STATUS').innerHTML = 'connection status = ' + peerConnectionStatus;
        //console.log(spw.peerClient.connections[0].room);
        document.getElementById('CAMS LINK').innerHTML = 'cams link =' + "http://nong.be:8070";

    }

    // Get and send my mouse position over peer connection
    myMousePosition = { x: mouseX, y: mouseY };
    //spw.send(myMousePosition);

    // Draw a white background with alpha of 50
    background(200, 50);

    // Don't draw the stroke
    noStroke();

    // Use color x for my mouse position
    fill(colors.x);

    // Draw an ellipse at my mouse position
    ellipse(myMousePosition.x, myMousePosition.y, size);

    // Make sure there is a partner mouse position before drawing
    if (typeof partnerMousePosition !== 'undefined') {
        // Use color y for my parter's mouse position
        fill(colors.y);

        // Draw an ellipse at my partner's mouse position
        ellipse(partnerMousePosition.x, partnerMousePosition.y, size);
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code === "KeyW") throttle_ = 0.0
    else if (e.code === "KeyS") throttle_ = 0.0
    else if (e.code === "KeyA") {steering_ = 0.0;throttle_ = 0.0} 
    else if (e.code === "KeyD") {steering_ = 0.0;throttle_ = 0.0}
    else if (e.code === "KeyE") throttle_factor += 0.1
    else if (e.code === "KeyQ") throttle_factor -= 0.1
    if (throttle_factor > 1.0) throttle_factor = 1.0
    if (throttle_factor < 0.0) throttle_factor = 0.0
    document.getElementById('Throttle_factor').innerHTML = 'my throttle_factor = ' + throttle_factor;
    document.getElementById('Steering').innerHTML = 'my steering = ' + steering_;
    document.getElementById('Throttle').innerHTML = 'my throttle = ' + throttle_ * throttle_factor;


    //if (e.code === "KeyI") telekey = 'i'
	//spw.send(telekey);
    // Let us open a web socket
    //var ws = new WebSocket("ws://192.168.0.1:9090");
    //ws.onopen = function () {

        // Web Socket is connected, send data using send()
        //  var msg_to_send = "I am a client sending a msg"
        //  ws.send(msg_to_send);
        //  alert("Message: "+ msg_to_send +" sent");

        //var msg = {
        //    steering: steering_,
        //    throttle: throttle_ * throttle_factor
        //};
	//
	var atwist = new ROSLIB.Message({
        linear : {
            x : 0.0,
            y : 0.0,
            z : 0.0
        },
        angular : {
            x :  0.0,
            y :  0.0,
            z :  0.0
        }
    });


    //rosbridge	
        //atwist.linear.x = throttle_ * throttle_factor;
        //atwist.angular.z = steering_;
       // cmdVel.publish(atwist);
    //atwist.keyup.is = 1;
	//console.log("keyup->",atwist.linear.x, atwist.angular.z);
	spw.send(atwist);

    //rospy
    //downMax = 0;
    //spw.send(' ');
    //console.log("keyup event");
    //   if (e.code === "KeyI") telekey = 'i'i
    //human peer browser sends to the robot peer browser

    //ws.send(JSON.stringify(msg));
    //};
    //    ws.onclose = function () {
    // websocket is closed.
    //  alert("Connection is closed...");
    //  };
}) ;


(function (interval) {
    var keyboard = {};

    window.addEventListener("keyup", keyup, false);
    window.addEventListener("keydown", keydown, false);

    function keyup(event) {
        keyboard[event.keyCode].pressed = false;
    }

    function keydown(event) {
        var keyCode = event.keyCode;
        var key = keyboard[keyCode];

        if (key) {
            if (!key.start)
                key.start = key.timer.start();
            key.pressed = true;
        } else {
            var timer = new DeltaTimer(function (time) {
                if (key.pressed) {
                    var event = document.createEvent("Event");
                    event.initEvent("keypressed", true, true);
                    event.time = time - key.start;
                    event.keyCode = keyCode;
                    window.dispatchEvent(event);
                } else {
                    key.start = 0;
                    timer.stop();
                }
            }, interval);

            key = keyboard[keyCode] = {
                pressed: true,
                timer: timer
            };

            key.start = timer.start();
        }
    }
})(150);

//const controller = {
//  87: {pressed: false, func: player1.movePaddleUp},
//  83: {pressed: false, func: player1.movePaddleDown},
//}

//document.addEventListener("keydown", (e) => {
//  if(controller[e.keyCode]){
//    controller[e.keyCode].pressed = true
//  }
//})
//document.addEventListener("keyup", (e) => {
//  if(controller[e.keyCode]){
//    controller[e.keyCode].pressed = false
//  }
//})

var btwist = new ROSLIB.Message({
    linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x :  0.0,
        y :  0.0,
        z :  0.0
    },
});

class sai {
    constructor(direction) {
        this.direction = direction;
    }

    jiasai = () => {
        console.log("forward");
        btwist.linear.x = throttle_ * throttle_factor;
        btwist.angular.z = steering_;
        spw.send(btwist);
    }
    bangsai = () => {
        console.log("backward");
        btwist.linear.x = throttle_ * throttle_factor;
        btwist.angular.z = steering_;
        spw.send(btwist);
    }
    left = () => {
        console.log("left");
        btwist.linear.x = throttle_ * throttle_factor;
        btwist.angular.z = steering_;
        spw.send(btwist);
    }
    right = () => {
        console.log("right");
        btwist.linear.x = throttle_ * throttle_factor;
        btwist.angular.z = steering_;
        spw.send(btwist);
    }
}

const sai1 = new sai(1);

const controller = {
    87: {pressed: false, func: sai1.jiasai},
    83: {pressed: false, func: sai1.bangsai},
    65: {pressed: false, func: sai1.left},
    68: {pressed: false, func: sai1.right},
//  38: {pressed: false, func: player2.movePaddleUp},
//  40: {pressed: false, func: player2.movePaddleDown},
}

document.addEventListener("keydown", (e) => {
    if(controller[e.keyCode]){
        controller[e.keyCode].pressed = true
        //console.log("herherher");
    }
})

document.addEventListener("keyup", (e) => {
    if(controller[e.keyCode]){
        controller[e.keyCode].pressed = false
        //console.log("ashjdbjkasdfb");
    }
})

const executeMoves = () => {
    if ((controller[87].pressed && controller[83].pressed)
        || (controller[65].pressed && controller[68].pressed)
        || (controller[87].pressed && controller[65].pressed)
        || (controller[83].pressed && controller[68].pressed)
        || (controller[87].pressed && controller[68].pressed)
        || (controller[83].pressed && controller[65].pressed))
        {console.log("two keys pressed together");}
    else {
        console.log("only single press");

        Object.keys(controller).forEach(key=> {
            controller[key].pressed && controller[key].func()
        });
    }
}

window.addEventListener('keypressed', function (e) {
//    document.body.innerHTML += e.keyCode + " (" + e.time + " ms) " + throttle_ +  e.code + "<br/>";
    if(throttle_ != 1.0 && e.keyCode === 87 || throttle_ != -1.0 && e.keyCode === 83 || steering_ != 1.0 && e.keyCode === 65 || steering_ != -1.0 && e.keyCode === 68 ){
        if (e.keyCode === 87) throttle_ = 1.0
        else if (e.keyCode === 83) throttle_ = -1.0
       // else if (e.keyCode === 65) steering_ = 1.0
       // else if (e.keyCode === 68) steering_ = -1.0
        else if (e.keyCode === 65) {steering_ = 1.0;throttle_ = 1.0;}  
        else if (e.keyCode === 68) {steering_ = -1.0;throttle_ = 1.0;}

        else if (e.keyCode === "KeyZ") steering_ = 1.5
        else if (e.keyCode === "KeyC") steering_ = -1.5

        // alert(e.code);
        document.getElementById('Steering').innerHTML = 'my steering = ' + steering_;
        document.getElementById('Throttle').innerHTML = 'my throttle = ' + throttle_ * throttle_factor;
    } 
    executeMoves();
}, false);

function DeltaTimer(render, interval) {
    var timeout;
    var lastTime;

    this.start = start;
    this.stop = stop;

    function start() {
        timeout = setTimeout(loop, 0);
        lastTime = Date.now();
        return lastTime;
    }

    function stop() {
        clearTimeout(timeout);
        return lastTime;
    }

    function loop() {
        var thisTime = Date.now();
        var deltaTime = thisTime - lastTime;
        var delay = Math.max(interval - deltaTime, 0);
        timeout = setTimeout(loop, delay);
        lastTime = thisTime + delay;
        render(thisTime);
    }
}




//document.addEventListener('keypress', (e) => 

//   if (e.code === "KeyI") telekey = 'i'i
  //human peer browser sends to the robot peer browser
  //telekey = String.fromCharCode(e.keyCode);
  //spw.send(telekey);
  //console.log("keydown event", telekey);

//});

/*
var downMax = 0;

document.addEventListener('keydown', (e) => {


//   if (e.code === "KeyI") telekey = 'i'i
  //human peer browser sends to the robot peer browser
  if (downMax <= 20) {
    telekey =  String.fromCharCode(e.keyCode);
    spw.send(telekey);
    console.log("keydown event", telekey, downMax);
    downMax++;
  }

});

document.addEventListener('keyup', (e) => {
  // reset downMax
  downMax = 0;
  spw.send(' ');
  console.log("keyup event");
//   if (e.code === "KeyI") telekey = 'i'i
  //human peer browser sends to the robot peer browser
});

*/

const Timer = (event, interval = 0) => {
    let last = 0;
    let total = 0;
    return {
        set interval(newInterval)
        {
            interval = newInterval;
        },
        update(time = 0) {
            total += time - last;
            if (total >= interval) {
                event(this);
                total = 0;
            }
            last = time;
        }
    };
};


// gamepad stuff here
var gamepads = {};
var gamepadInfo = document.getElementById("gamepad-info");

var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

var rAFStop = window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.cancelRequestAnimationFrame;

function gamepadHandler(event, connecting) {
  var gamepad = event.gamepad;
  // Note:
  // gamepad === navigator.getGamepads()[gamepad.index]

  if (connecting) {
    gamepads[gamepad.index] = gamepad;
  } else {
    delete gamepads[gamepad.index];
  }
}

window.addEventListener("gamepadconnected", function(e) {
    var gp = navigator.getGamepads()[e.gamepad.index];
    gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
    gameLoop();
});

window.addEventListener("gamepaddisconnected", function(e) {
  gamepadInfo.innerHTML = "Waiting for gamepad.";
  rAFStop(start);
  //cancelRequestAnimationFrame(start);
});

var interval;
var zerosent = 0;
var turbo = 0.6;//0.70;
var snail = 0.45;//0.65;
var punytoo = 0.7;//1.0;
var angularzbias = 0.0;
var angularzdir = 'L';
var linearxbias = 0.00; // was 0.032
//var deadzonecount = 0;
var ga1floatval = 0.05;

if (!('ongamepadconnected' in window)) {
  // No gamepad events available, poll instead.
  interval = setInterval(pollGamepads, 500);
}

function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if (gp) {
      gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id +
        ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
      gameLoop();
      clearInterval(interval);
    }
  }
}

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}


const fooLogger = Timer((timer) => {
  //console.log('foo!');
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads)
    return;
  turbo = 0.6;//0.70;
  snail = 0.45;//0.65;
  punytoo = 0.7;//1.0;
  linearxbias = 0.00; // was 0.032
  ga1floatval = 0.05;

  var gp = gamepads[0];
  //if (buttonPressed(gp.buttons[0])) {
    //snail = 0.30;
    //console.log("0 pressed");
  //} else if (buttonPressed(gp.buttons[2])) {
    //console.log("2 pressed");
  //}
  //if(buttonPressed(gp.buttons[1])) {
    //console.log("1 pressed");
  //} else if(buttonPressed(gp.buttons[3])) {
    //turbo = 1.25;
    //console.log("3 pressed");
  //}

  document.getElementById('Gp_Throttle_Level').innerHTML = 'gp throttle level = ' + 'normal';
  
  if(buttonPressed(gp.buttons[4])) {
    snail = 0.15; //changed to 0.35 //was 0.3
    document.getElementById('Gp_Throttle_Level').innerHTML = 'gp throttle level = ' + 'slowest';
  } else if(buttonPressed(gp.buttons[5])) {
    turbo = 1.3;  //changed 1.00 //was 1.2
    document.getElementById('Gp_Throttle_Level').innerHTML = 'gp throttle level = ' + 'fast';
  }


  if(buttonPressed(gp.buttons[6])) {
    snail = 0.24; //changed 0.45 //was 0.3
  //  punytoo = 0.8;
    document.getElementById('Gp_Throttle_Level').innerHTML = 'gp throttle level = ' + 'slow';
  } else if(buttonPressed(gp.buttons[7])) {
    turbo = 2.0; //changed 1.25 //was 1.2
    document.getElementById('Gp_Throttle_Level').innerHTML = 'gp throttle level = ' + 'fastest';
  }

  if(buttonPressed(gp.buttons[0])) {
    if (angularzbias <= 0.5) {
      angularzbias = angularzbias + 0.01;
    }
    if (angularzbias > 0) angularzdir = 'L';
    document.getElementById('Gp_Steering_Bias').innerHTML = 'gp steering bias = ' + angularzdir + Math.abs(parseFloat(angularzbias).toFixed(2));
  } else if(buttonPressed(gp.buttons[2])) {
    if (angularzbias >= -0.5) {
      angularzbias = angularzbias - 0.01;
    }
    if (angularzbias < 0) angularzdir = 'R';
    document.getElementById('Gp_Steering_Bias').innerHTML = 'gp steering bias = ' + angularzdir + Math.abs(parseFloat(angularzbias).toFixed(2));
  }

  // button O ebrake
  if (buttonPressed(gp.buttons[1])) {

    zerosent = 1;
    //for (let i = 0; i < 8; i++) {
    //  btwist.linear.x = btwist.linear.x/2;
    //  btwist.angular.z = btwist.angular.z/2;
    //  spw.send(btwist);
    //}
    btwist.linear.x = 0;
    btwist.angular.z = 0;
    spw.send(btwist);

  }



/* no deadzone checking
  if((gp.axes[1] != 0) || (gp.axes[2] != 0)) {
    //btwist.linear.x = 0.5*snail*turbo*gp.axes[1]*(-1);
    console.log("rrrax0 val: " + gp.axes[1]);
    console.log("rrrax1 val: " + gp.axes[2]);
    btwist.linear.x = snail*turbo*gp.axes[1]*(-1);
    btwist.angular.z = gp.axes[2]*(-1);
    spw.send(btwist);
  } else if ((gp.axes[1] == 0) && (gp.axes[2] == 0) && (zerosent==0)) {
    console.log("mmmax0 val: " + gp.axes[1]);
    console.log("mmmax1 val: " + gp.axes[2]);
    btwist.linear.x = 0;
    btwist.angular.z = 0;
    //spw.send(btwist);
    zerosent = 1;
  }
*/

//deadzone
// deadzone line if((gp.axes[1] >= 0.10) || (gp.axes[1] <= -0.10) || (gp.axes[2] >= 0.03) || (gp.axes[2] <= -0.03)) {
    if((gp.axes[1] != 0) || (gp.axes[2] != 0)) {
    //btwist.linear.x = 0.5*snail*turbo*gp.axes[1]*(-1);
  //  console.log("rrrax0 val: " + gp.axes[1]);
  //  console.log("rrrax1 val: " + gp.axes[2]);
    btwist.linear.x = snail*turbo*gp.axes[1]*(-1)+linearxbias;
    //btwist.angular.z = gp.axes[2]*(-1);
    //slower speeds
    // deadzone line if (gp.axes[1] >= 0.10) { 
    if (gp.axes[1] >= ga1floatval) {
        btwist.angular.z = (gp.axes[2]*punytoo*0.5-angularzbias)*0.8;    // was 0.7
    }
    // deadzone lineelse if (gp.axes[1] <= -0.10) {
    if (gp.axes[1] <= -ga1floatval) {
        btwist.angular.z = (gp.axes[2]*(-1)*punytoo*0.5+angularzbias)*0.8;   // was 0.7
    }
    //faster speeds
    if (gp.axes[1] >= ga1floatval && turbo >= 1.00) {
        btwist.angular.z = (gp.axes[2]*punytoo*0.85-angularzbias)*0.9;
    }
    if (gp.axes[1] <= -ga1floatval && turbo >= 1.00) {
        btwist.angular.z = (gp.axes[2]*(-1)*punytoo*0.85+angularzbias)*0.9;
    }
//console.log("linx angz",gp.axes[1],gp.axes[2]);


    if ((gp.axes[1] < ga1floatval) && (gp.axes[1] > -ga1floatval)) {
        //if (deadzonecount==3) {
            btwist.linear.x = 0;
            btwist.angular.z = 0;
         //   console.log("deadzone");
        //    deadzonecount = 0;
        //}
        //deadzonecount++;
    }


    //else
    //    btwist.angular.z = gp.axes[2]*punytoo+angularzbias/2;
    //    btwist.angular.z = gp.axes[2]*punytoo+angularzbias/2;


    spw.send(btwist);
  } else if ((gp.axes[1] == 0) && (gp.axes[2] == 0) && (zerosent==0)) {
   // console.log("mmmax0 val: " + gp.axes[1]);
   // console.log("mmmax val: " + gp.axes[2]);
    btwist.linear.x = 0;
    btwist.angular.z = 0;

    //spw.send(btwist);
    zerosent = 1;
  } 





/*
  if((gp.axes[0] != 0) && (gp.axes[1] != 0)) {
     console.log("rrrax0 val: " + gp.axes[0]);
     console.log("rrrax1 val: " + gp.axes[1]);
     ellipse(120+gp.axes[0]*120,  120+gp.axes[1]*120, 24);
     btwist.linear.x = 0.5*snail*turbo*gp.axes[1]*(-1);
     btwist.angular.z = gp.axes[0]*(-1);
     spw.send(btwist);
     zerosent = 0;


  } else if ((gp.axes[0] == 0) && (gp.axes[1] == 0) && (zerosent==0)) {
     console.log("mmmax0 val: " + gp.axes[0]);
     console.log("mmmax1 val: " + gp.axes[1]);
     //ellipse(120+(gp.axes[0]*120),120+(gp.axes[1]*120), 24);
   //  console.log("rrrax0 val: " + gp.axes[0]);
   //  console.log("rrrax1 val: " + gp.axes[1]);
    // ellipse(120+gp.axes[0]*120,  120+gp.axes[1]*120, 24);
     btwist.linear.x = 0;
     btwist.angular.z = 0;
     spw.send(btwist);
     zerosent = 1; // send one zero

  }

  */

  timer.interval = 200;//168;//128;//64;
}, 200);//168);//128);//64);

function gameLoop(time) {

  //const pair = rtcConnection.sctp.transport.iceTransport.getSelectedCandidatePair();
  //console.log(pair.remote.type);

  //rtt = rtcIceCandidatePairStats.currentRoundTripTime;
  //console.log("crtt: " + rtt);

  var start = rAF(gameLoop);
  fooLogger.update(time);
}


var simiForm = document.getElementById('siangform');
var simiInput = document.getElementById('sianginput');

simiForm.addEventListener('submit', function(event)
{
    event.preventDefault();
    console.log(simiInput.value);
    strWho = JSON.stringify(simiInput.value);
    console.log(strWho.search("human"));
    if (strWho.search("human") == -1) {
        whoAmI = 'FRODO';
    } else {
        whoAmI = 'HUMAN';
    }
    console.log(whoAmI);
//    if (simiInput.value) {
//        simiInput.value = '';
//        console.log("out");
//    }
});

// Close simple-peer connections before exiting
window.onbeforeunload = () => {
    listener.unsubscribe();
    gps_listener.unsubscribe();
    spw.close();
};  

