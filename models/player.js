const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    health: Number,
    attack: Number,
    armor: Number,
    level: Number,
    //pierce: Number,
    animIdle: String,
    animAttack: String,
    animDefend: String,
    //inventory: Item[3] -- NEEDS REVISE!
    arrayOfEnemies: []
});



const Player = mongoose.model('Player', playerSchema);
module.exports = Player;