var updateLife = function(player, players) {
  var name = player.name;
  var found = players.reduce(function(a, b){
    return (a.name==name && a) || (b.name == name && b)
  });
  found.life = found.life + parseInt(player.life);
  return players;
}

module.exports = updateLife;
