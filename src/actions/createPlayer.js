var createPlayer = function(name, players) {
  var player = { name: name, life: 40, color: 'red'}
  players.push(player);
  return players;
}

module.exports = createPlayer;
