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
    res.redirect('/login');
  });
});

module.exports = router;