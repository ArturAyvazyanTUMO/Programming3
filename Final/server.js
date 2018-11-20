var express = require("express");
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require('fs');

var statistics = JSON.parse(fs.readFileSync('statistics.json','utf8'));

console.log(statistics);

app.use('/', express.static('public'))

app.set('view engine', 'ejs');

io.on('connection', function (socket) {
   socket.on("get statistics", function (data) {
      statistics = data;
      var json = JSON.stringify(statistics);
      fs.writeFileSync('statistics.json', json, 'utf8', function () {
      });
   });
});

app.get('/statistics', function (req, res) {
   res.render('dashboard', { statistics });
})

server.listen(3000, function () {
   console.log("Project is running on port 3000");
});
