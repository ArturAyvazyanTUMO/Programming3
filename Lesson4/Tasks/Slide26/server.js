var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs')
var messages = [];

 
let jsonData = JSON.parse(fs.readFileSync('messages.json'));  

console.log(jsonData);

app.use('/',express.static(__dirname+"/public"));
io.on('connection', function (socket) {
    for(var i in messages) {
      io.sockets.emit("display message", messages[i]);
    }
    socket.on("send message", function (data) {
        messages.push(data);
        io.sockets.emit("display message", data);
        jsonData.messages=messages;
        var json = JSON.stringify(jsonData);
        fs.writeFileSync('messages.json', json)
    });
 });
 

server.listen(3000);