var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

// Actions
var updateLife = require('./src/actions/updateLife');
var updateHistory = require('./src/actions/updateHistory');
var createPlayer = require('./src/actions/createPlayer');

app.use(express.static('./'));

app.get('*', function(req, res){
  res.send(fs.readFileSync('index.html', { encoding: 'utf8' }));
});

var history = [];
var players = [];

io.on('connection', function(socket){
  socket.on('new_player', function(name){
    io.sockets.emit('player_added', createPlayer(name, players));
  });
  socket.on('update_life', function(player){
    io.sockets.emit('life_updated', updateLife(player, players));
    io.sockets.emit('history_updated', updateHistory(player, history));
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
