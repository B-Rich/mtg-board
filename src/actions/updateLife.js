var _ = require('underscore');

var updateLife = function(player, players) {
  var name = player.name;
  var found =  _.findWhere(players, { name: name });
  found.life = found.life + parseInt(player.life);
  return players;
}

module.exports = updateLife;
