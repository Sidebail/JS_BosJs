var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BosJS' });
});

router.get('/gameview', function(req,res,next){
  res.render('gameview', { title: 'Defeat Enemies!' });
});

router.get('/gameover', function(req,res,next){
  res.render('gameover', {title: 'Game Over'});
});

module.exports = router;
