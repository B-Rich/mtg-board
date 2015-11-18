var updateHistory = function(player, history) {
  var verb = parseInt(player.life) > 0 ? 'gains' : 'loses';
  var row = player.name+' '+verb+' '+player.life +' life';
  history.push({ text: row });
  return history;
}

module.exports = updateHistory;
