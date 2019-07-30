const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Filename - player.js
    File collaborators - Vladimir Vatsurin, Nathaniel Fischer
    File description - Player's model, prepared for the MongoDB

*/

const playerSchema = new Schema({
    name: String,
    health: Number,
    attack: Number,
    armor: Number,
    level: Number,
    //pierce: Number,
    // animIdle: String,
    // animAttack: String,
    // animDefend: String,
    //inventory: Item[3] -- NEEDS REVISE!
    lastThreeEnemies: []
});



const Player = mongoose.model('Player', playerSchema);
module.exports = Player;