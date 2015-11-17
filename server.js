var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.use(express.static('./'));

app.get('*', function(req, res){
  res.send(fs.readFileSync('index.html', { encoding: 'utf8' }));
});

var history = [];
var players = [];

io.on('connection', function(socket){
  socket.on('new_player', function(payload){
    console.log('New player: ' + payload.name);
    players.push(payload);
    io.sockets.emit('player_added', players);
  });
  socket.on('update_life', function(payload){
    var name = payload.name;
    var found = players.reduce(function(a, b){
      return (a.name==name && a) || (b.name == name && b)
    });
    found.life = found.life + parseInt(payload.life);
    io.sockets.emit('life_updated', players);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
