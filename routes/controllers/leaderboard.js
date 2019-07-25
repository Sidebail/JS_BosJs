const Player = require('../../models/player');

exports.findAllPlayers = async (req, res) => {
  const players = await Player.find();
  res.render('leaderboard', { players });
};