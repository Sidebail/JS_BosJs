const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var enemyNames = [`Orc`, `Elf`, `Thief`, `Skeleton`, `Dragon`];
var tier2Prefixes = [`Slick`, `Big`,`Old`,`Noob`,`Recruit`,`Half-dead`]
var tier3Prefixes = [`Warchief`,`Captain`,`Pirate`,`Wizard`,`Smart`]
var tier4Prefixes = [`Elder`,`Ancient`,`Centurion`,`King`,`Vengeful`]
var tier5Prefixes = [`Unstoppable`,`Invincible`,`Godlike`,`Magnificent`,`Super-duper`]

var Drop = {
    name: String,
    type: String,
    healthBoost: Number,
    armorBoost: Number,
    attackBoost: Number,
    pierceBoost: Number
}

//Name is setted randomly
// Tier 1 doesnt have prefix
// Tier 2 and higher has prefix to be assigned before name

const enemySchema = new Schema({
    name: String,
    health: Number,
    attack: Number,
    armor: Number,
    tier: Number,
    pierce: Number,

    animIdle: String,
    animAttack: String,
    animDefend: String,
    //currentPrefixes: String[] - HOW TO ARRAY OF STRINGS?!
    //drops: Drop[3] -- NEEDS REVISE! - HOW TO ARRAY OF OBJECTS?!

    makeName: function(){
        switch(tier){
            case 1: name = enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 2: name = tier2Prefixes[Math.floor(Math.random()*tier2Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 3: name = tier3Prefixes[Math.floor(Math.random()*tier3Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 4: name = tier4Prefixes[Math.floor(Math.random()*tier4Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 5: name = tier5Prefixes[Math.floor(Math.random()*tier5Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
        }
    }
});

const Enemy = mongoose.model('Enemy', enemySchema);

module.exports = Enemy;