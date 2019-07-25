const Player = require('../../models/player');

exports.findAllPlayers = async (req, res) => {
  const players = await Player.find();
  //console.log(players);
  res.render('leaderboard', { players });
};