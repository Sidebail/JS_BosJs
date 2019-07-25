const Leaderboard = require('../../models/player');

exports.findAllPlayers = async (req, res) => {
  const player = await Leaderboard.find();
  res.render('leaderboard', { player });
};