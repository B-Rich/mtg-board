var _ = require('underscore');

var updateLife = function(player, players) {
  var id = player.id;
  var found =  _.findWhere(players, { id: id });
  found.life = found.life + parseInt(player.life);
  return players;
}

module.exports = updateLife;
