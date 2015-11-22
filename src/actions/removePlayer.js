var _ = require('underscore');

var removePlayer = function(id, players) {
  return  _.reject(players, function(player) {
    return player.id == id;
  });
}

module.exports = removePlayer;
