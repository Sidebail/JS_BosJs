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

router.post('/gameview', function(req, res){
  finalscore = req.body.score; 
  //console.log(finalscore);
});

router.get('/gameover', function(req,res,next){
  res.render('gameover', {title: 'Game Over', score: finalscore });
});

module.exports = router;
