const express = require('express');
const websocket = require('ws');
const path = require('path');
const WebSocket = require('ws'); 
const sprintf = require('sprintf-js').sprintf;
const ip_address = '192.168.18.181';


const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
})

const server = app.listen(8000, ip_address,() => {
    console.log("Serving app");
})

const wss = new WebSocket.Server({ server})
wss.on('connection', function connection(ws) {
   ws.on('error', console.error);

   ws.on('message', function message(data) {
    wss.clients.forEach(function each(client) {
        if(client.readyState === WebSocket.OPEN) {
            let d = sprintf("%s",data);
            client.send(d);
        }
    })
   })
})
