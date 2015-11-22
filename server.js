var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var _und = require('underscore');

// Actions
var updateLife = require('./src/actions/updateLife');
var updateHistory = require('./src/actions/updateHistory');
var createPlayer = require('./src/actions/createPlayer');
var resetMatch = require('./src/actions/resetMatch');
var removePlayer = require('./src/actions/removePlayer');

app.use(express.static('./'));

app.get('*', function(req, res){
  res.send(fs.readFileSync('index.html', { encoding: 'utf8' }));
});

var history = [];
var players = [];

io.on('connection', function(socket){
  socket.on('new_player', function(name){
    socket.emit('update_player_id', socket.id);
    io.sockets.emit('update_players', createPlayer(socket.id, name, players));
    io.sockets.emit('history_updated', history);
  });

  socket.on('update_life', function(player){
    io.sockets.emit('life_updated', updateLife(player, players));
    io.sockets.emit('history_updated', updateHistory(player, history));
  });

  socket.on('reset_match', function(){
    var result = resetMatch(players, history);
    players = result.players;
    history = result.history;
    io.sockets.emit('life_updated', players);
    io.sockets.emit('history_updated', history);
  });

  socket.on('disconnect', function() {
    players = removePlayer(socket.id, players);
    io.sockets.emit('update_players', players);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
