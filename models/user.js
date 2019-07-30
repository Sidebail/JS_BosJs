const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findorcreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');
//const Enemy = require('./enemy');

/*
    Filename - enemy.js
    File collaborators - Vladimir Vatsurin, Ian Blanchette
    File description - User's model, prepared for the MongoDB

*/

const userSchema = new Schema({
  username: String,
  password: String,
  highestScore: Number,
  googleId: String,
  githubId: String,
  facebookId: String,
  twitterId: String,
  vkontakteId: String
});

userSchema.plugin(findorcreate);
userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);

module.exports = User;