const Enemy = require('../models/enemy');
const Player = require('../models/player');
var express = require('express');
var router = express.Router();
var nickname = "Default";
var finalscore;
var enemy1;
var enemy2;
var enemy3;
var player;

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
  enemy1 = new Enemy({ name: req.body.e1name, health: req.body.e1maxHealth, attack: req.body.e1attack, armor: req.body.e1armor,});
  enemy2 = new Enemy({ name: req.body.e2name, health: req.body.e2maxHealth, attack: req.body.e2attack, armor: req.body.e2armor,});
  enemy3 = new Enemy({ name: req.body.e3name, health: req.body.e3maxHealth, attack: req.body.e3attack, armor: req.body.e3armor,});


  player = new Player({ name: nickname, health: req.body.maxHealth, attack: req.body.attack , armor: req.body.armor, level: req.body.level, lastThreeEnemies: [enemy1, enemy2, enemy3]});

  player.save();
});

router.get('/gameover', function(req,res,next){
  //res.render('gameover', {title: 'Game Over'});
  
  res.render('gameover', {title: 'Game Over', name: player.name, level: player.level, maxHealth: player.health, attack: player.attack, armor: player.armor,
                          e1name: enemy1.name, e1maxHealth: enemy1.health, e1attack: enemy1.attack, e1armor: enemy1.armor,
                          e2name: enemy2.name, e2maxHealth: enemy2.health, e2attack: enemy2.attack, e2armor: enemy2.armor,
                          e3name: enemy3.name, e3maxHealth: enemy3.health, e3attack: enemy3.attack, e3armor: enemy3.armor});
  
});

module.exports = router;
