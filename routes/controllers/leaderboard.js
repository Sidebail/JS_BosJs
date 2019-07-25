const Player = require('../../models/player');

exports.findAllPlayers = async (req, res) => {
  const players = await Player.find().sort( { level: -1 } ).limit(100);
  //console.log(players);
  res.render('leaderboard', { players });
};