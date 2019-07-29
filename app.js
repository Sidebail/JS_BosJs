require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/user');

// connect mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`, { useNewUrlParser: true});

// mongoose variables
var db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to Mongodb'));
//db.collection.find( { $query: {}, $orderby: { level : -1 } } )

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
//var gameRouter = require('./routes/controllers/gamestateController'); // Added

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/controllers', express.static(path.join(__dirname, "/routes/controllers")));
app.use('/dist', express.static(path.join(__dirname, "/dist")));
app.use('/src', express.static(path.join(__dirname, "/src")));

// Express session (provides client-side persistent authentication)
app.use(
  session({
    secret: 'jkdfhlakdhkjlcansrlihaeuisfdlasdfgda',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize()); // initialize Passport
app.use(passport.session()); // use passport with session

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

passport.use(new LocalStrategy(User.authenticate()));


//GITHUB AUTHENTICATION

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOne({ githubId: profile.id }, function(err, user) {
        if (!err && !user) {
          const newgithub = new User(profile);
          newgithub.save();
          return cb(null, newgithub);
        } else {
          return cb(err, user);
        }
      });
    }
  )
);

//Google Authentication
/*
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOne({ googleId: profile.id }, function(err, user) {
        if (!err && !user) {
          const newgoogle = new User({ ...profile, googleId: profile.id });
          newgoogle.save();
          return cb(null, newgoogle);
        } else {
          return cb(err, user);
        }
      });
    }
  )
);
*/
/*
//Twitter Authentication
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL
},
function(token, tokenSecret, profile, cb) {
  User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));


//VKontakte Authentication
passport.use(new VKontakteStrategy({
  clientID:     process.env.VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
  clientSecret: process.env.VKONTAKTE_APP_SECRET,
  callbackURL:  process.env.VKONTAKTE_CALLBACK_URL
},
function(accessToken, refreshToken, params, profile, done) {
  // console.log(params.email); // getting the email
  User.findOrCreate({ vkontakteId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));


//Facebook Authentication
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));
*/


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
//app.use('/gameview',gameRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
