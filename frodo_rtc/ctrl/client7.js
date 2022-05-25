// import required packages
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const https = require('https');

const fs = require('fs');

// kobe test
//var sys = require('sys');
//var exec = require('child_process').exec;
//var url = require("url");

const options = {
    key: fs.readFileSync('../../flolo/privkey.pem'),
    cert: fs.readFileSync('../../flolo/cert.pem'),
    ca: fs.readFileSync('../../flolo/chain.pem')
};

// create new express app and save it as "app"
const app = express();
app.use(cors({

    origin: 'https://nong.be:28081'

}));

//import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyDNdhI9FtkFaPbBtgklUccmzs7C98osZDg",
    authDomain: "frodobots-web.firebaseapp.com",
    projectId: "frodobots-web",
    storageBucket: "frodobots-web.appspot.com",
    messagingSenderId: "307802276460",
    appId: "1:307802276460:web:05b4571e4fc7c1d40e0e49",
    measurementId: "G-2399702SE5"
});

var db = firebase.firestore();
var bufferb;

const buffer = fs.readFileSync("pubkey.txt");
const buffera = require('./pubkey.json');
console.log(buffer);
console.log(buffera.name + ' ' + buffera.pubkey);

// Listen both http & https ports
//const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

//const { Server } = require("socket.io");
//const io = new Server(httpsServer);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/v', (req, res) => {
    res.sendFile(__dirname + '/tele.html');
});

app.get('/d', (req, res) => {
    res.sendFile(__dirname + '/dual.html');
});

app.get('/frodov2sg1', (req, res) => {
    res.sendFile(__dirname + '/frodov2sg1.html');
});

app.get('/frodov2sg0', (req, res) => {
    res.sendFile(__dirname + '/frodov2sg0.html');
});

app.get('/t', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

app.get('/g', (req, res) => {
    res.sendFile(__dirname + '/gps.html');
});

app.get('/a', (req, res) => {
    res.sendFile(__dirname + '/audio.html');
});

app.get('/r', (req, res) => {
    res.sendFile(__dirname + '/recordrtc.html');
});

app.get('/webaudio', (req, res) => {
    res.sendFile(__dirname + '/webaudio.html');
});

app.get('/'+buffera.pubkey, (req, res) => {
    //res.send('this is all so right');
    res.sendFile(__dirname + '/dual.html');
});

app.get('/:doc_id', (req, res) => {

    if (req.params.doc_id != 'favicon.ico') {
    var tmpUrl = req.params.doc_id;
    
    console.log ("######## START #######"); 
    console.log ("doc_id = ", tmpUrl);

    var bufferb;

    //var caly_start_time;
    //var caly_end_time;

    //const driveTime = new Date('05 October 2011 14:48 UTC');
    const driveTime = new Date();
    var utcdriveTime = driveTime.toUTCString();
    
    console.log(driveTime);
    console.log(driveTime.toLocaleString('en-SG'));
    console.log(driveTime.toISOString());
    console.log(utcdriveTime);

    //var usersRef = db.collection("users");
    var usersRef = db.collection("bookings");
    //var query = usersRef.where("start_time", "<", '2022-03-09T06:30:00.000000Z');
    //var query = usersRef.where("start_time", "<", '2022-03-09T08:45:00.000000Z');
    //var query = usersRef.where("start_time", "<", driveTime.toISOString());
    var query = usersRef.where("start_time", "<", driveTime);
    //var query = usersRef.where("start_time", "<", utcdriveTime.toISOString());

    //var bufferb;
    query.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, "11 => ", doc.data());
            //console.log(doc.id, " => ", doc.data().wallet_address);
            //bufferb =  doc.data().wallet_address;
            bufferb = doc.id;
            console.log("11doc.id = ", bufferb);

            //if ( tmpUrl === bufferb) {
            //    res.sendFile(__dirname + '/dual.html');
            //} else {
            //    res.send('404');
           // }
        });
        if ( tmpUrl === bufferb) {
            res.sendFile(__dirname + '/dual.html');
        } else {
             res.send('404');
        }
     })
     .catch((error) => {
        console.log("11Error getting documents: ", error);
     });
    
    }
     console.log ("######## END #######");
});



//Other routes here
app.get('*', (req, res) => {
   res.send('Sorry, this is all all all so wrong');
});

//io.on('connection', (socket) => {
//  console.log('a user connected');
//});

httpsServer.listen(18442, () => {
    console.log('HTTPS Server running on port 18442');
});

