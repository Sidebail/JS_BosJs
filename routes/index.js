const Enemy = require('../models/enemy');
const Player = require('../models/player');
var express = require('express');
var router = express.Router();
var nickname;
var finalscore;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BosJS' });
});

// get nickname submission from index
router.post('/', function(req, res) {
  nickname = req.body.nickname;
  res.redirect('/gameview');
});

router.get('/gameview', function(req,res,next){
  res.render('gameview', { title: 'Defeat Enemies!', playerName: nickname });
});

// this receives data from game about enemies and player
router.post('/gameview', function(req, res){
  //finalscore = req.body.score; 
  // create 3 enemy models with data from gameview
  let enemy1 = new Enemy({ name: req.body.e1name, health: req.body.e1maxHealth, attack: req.body.e1attack, armor: req.body.e1armor,});
  let enemy2 = new Enemy({ name: req.body.e2name, health: req.body.e2maxHealth, attack: req.body.e2attack, armor: req.body.e2armor,});
  let enemy3 = new Enemy({ name: req.body.e3name, health: req.body.e3maxHealth, attack: req.body.e3attack, armor: req.body.e3armor,});

  let player = new Player({ name: req.body.name, health: req.body.maxHealth, attack: req.body.attack , armor: req.body.armor, level: req.body.level, lastThreeEnemies: [enemy1, enemy2, enemy3]});
  player.save();
});

router.get('/gameover', function(req,res,next){
  res.render('gameover', {title: 'Game Over', score: finalscore });
});

module.exports = router;
