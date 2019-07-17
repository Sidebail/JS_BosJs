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

    recieveDamage: function(damage){
        health = health - (damage-armor);
    },
    
    increaseStatistic: function(stringInput, value){
        switch(stringInput){
            case `health`: health = health + value; break;
            case `attack`: attack = attack + value; break;
            case `armor`: armor = armor + value; break;
            default: console.log(`ERROR: player.js->increaseStatistic(${stringInput},${value})`); break;
        }
    },
    
    increaseLevel: function(){
        level++;
    }
});



const Player = mongoose.model('Player', playerSchema);
module.exports = Player;