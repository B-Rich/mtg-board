var createPlayer = function(id, name, players) {
  var player = { id: id, name: name, life: 40, color: 'red'}
  players.push(player);
  return players;
}

module.exports = createPlayer;
