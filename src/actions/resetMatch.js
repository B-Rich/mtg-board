var _ = require('underscore');

var resetMatch = function(players, history) {
  _.each(players, function(player){
    player.life = 40;
  });
  return { players: players, history: []}
}

module.exports = resetMatch;
