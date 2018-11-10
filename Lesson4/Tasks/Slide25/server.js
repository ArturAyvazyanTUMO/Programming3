var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use('/', express.static(__dirname + "/public"));

io.on('connection', newConnection);

function newConnection(socket) {
    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        io.sockets.emit('mouse', data);
        console.log(data);
    }

}


server.listen(3000);

