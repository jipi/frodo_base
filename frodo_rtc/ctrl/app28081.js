const express = require('express');
const https = require('https');
const cors = require('cors');
const SimplePeerServer = require('simple-peer-server');
const fs = require('fs');

const options = {
    key: fs.readFileSync('../../../flolo/privkey.pem'),
    cert: fs.readFileSync('../../../flolo/cert.pem'),
    ca: fs.readFileSync('../../../flolo/chain.pem')
};

const app = express();
app.use(cors({
    origin: 'https://nong.be:28081'
}));

const httpsServer = https.createServer(options, app);
const spServer = new SimplePeerServer(httpsServer, true);

httpsServer.listen(28081);
