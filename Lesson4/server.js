var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs')
var messages = [];

var content = fs.readFileSync("messages.json");
var obj=JSON.stringify('messages.json');
obj.length = 0;
app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('/Lesson4/index.html');
});

io.on('connection', function (socket) {
    for(var i in messages) {
      io.sockets.emit("display message", messages[i]);
    }
    socket.on("send message", function (data) {
        messages.push(data);
        io.sockets.emit("display message", data);     
        obj=JSON.stringify('messages.json');
        obj.messages
    });
 });
 

server.listen(3000);