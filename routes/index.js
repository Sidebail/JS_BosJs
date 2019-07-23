var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BosJS' });
});

let nickname;

// get nickname from index.pug
router.post('/', function(req, res){
  nickname = req.body.nickname;
  //console.log(nickname);
  res.redirect('/gameview');
});

// send to gameview.pug and use to instantiate playercharacter with nickname

router.get('/gameview', function(req,res,next){
  res.render('gameview', { playerName: nickname});
});

module.exports = router;
