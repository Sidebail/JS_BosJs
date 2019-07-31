const Player = require('../../models/player');

/*
    Filename - leaderboard.js
    File collaborators - Ian Blanchette, Vladimir Vatsurin
    File description - Leadeboards's controller, prepared for the MongoDB

*/

exports.findAllPlayers = async (req, res) => {
  const players = await Player.find().sort( { level: -1 } ).limit(100);
  //console.log(players);
  res.render('leaderboard', { players });
};