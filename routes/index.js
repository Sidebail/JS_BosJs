var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BosJS' });
});

router.get('/gameview', function(req,res,next){
  res.render('gameview');
});

module.exports = router;
