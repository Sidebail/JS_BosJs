const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// 1 - Render login form
router.get("/login", (req, res) =>
  res.render("login", { buttonText: "Login" })
);
// 2 - Handle Login Form Submission
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/"
  })
);

//GitHub Login
router.get(`/auth/github`, passport.authenticate('github'));

router.get(
  `/auth/github/callback`,
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Google Login
router.get(
  `/auth/google`,
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get(
  `/auth/google/callback`,
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => res.redirect('/')
);

//Twitter Login
router.get('/auth/twitter',
  passport.authenticate('twitter'));

router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

//Facebook Login
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

//VKontakte Login
router.get('/auth/vkontakte',
  passport.authenticate('vkontakte'),
  function(req, res){
    // The request will be redirected to vk.com for authentication, so
    // this function will not be called.
});

router.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

// 3 - Render Register Form
router.get("/register", (req, res) =>
  res.render("login", { buttonText: "Register" })
);
// 4 - Handle Register Form Submission
router.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username, highestScore: null }),
    req.body.password,
    function(err, account) {
      if (err) {
        console.log(err);
        return res.render('register', { account: account });
      }

      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  );
});
// 5 - Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
});

module.exports = router;