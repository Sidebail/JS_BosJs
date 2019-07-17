const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var enemyNames = [`Orc`, `Elf`, `Thief`, `Skeleton`, `Dragon`];
var tier2Prefixes = [`Slick`, `Big`,`Old`,`Noob`,`Recruit`,`Half-dead`]
var tier3Prefixes = [`Warchief`,`Captain`,`Pirate`,`Wizard`,`Smart`]
var tier4Prefixes = [`Elder`,`Ancient`,`Centurion`,`King`,`Vengeful`]
var tier5Prefixes = [`Unstoppable`,`Invincible`,`Godlike`,`Magnificent`,`Super-duper`]

var healthMaxMins = [3,10,25,55,80][7,17,40,70,100]

//Name is setted randomly
// Tier 1 doesnt have prefix
// Tier 2 and higher has prefix to be assigned before name

const enemySchema = new Schema({
    name: String,
    health: Number,
    attack: Number,
    armor: Number,
    tier: Number,
    //pierce: Number,

    animIdle: String,
    animAttack: String,
    animDefend: String,

    makeName: function(){
        switch(tier){
            case 1: name = enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 2: name = tier2Prefixes[Math.floor(Math.random()*tier2Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 3: name = tier3Prefixes[Math.floor(Math.random()*tier3Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 4: name = tier4Prefixes[Math.floor(Math.random()*tier4Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 5: name = tier5Prefixes[Math.floor(Math.random()*tier5Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
        }
    },

    makeStats: function(){
        switch(tier){
            case 1: 
            health = Math.floor(Math.random() * (healthMaxMins[1] - healthMaxMins[1][1])) + healthMaxMins[1][1];

            break;
            case 2: 
            health = Math.floor(Math.random() * (healthMaxMins[2] - healthMaxMins[2][2])) + healthMaxMins[2][2];

            break;
            case 3: 
            health = Math.floor(Math.random() * (healthMaxMins[3] - healthMaxMins[3][3])) + healthMaxMins[3][3];

            break;
            case 4: 
            health = Math.floor(Math.random() * (healthMaxMins[4] - healthMaxMins[4][4])) + healthMaxMins[4][4];

            break;
            case 5: 
            health = Math.floor(Math.random() * (healthMaxMins[5] - healthMaxMins[5][5])) + healthMaxMins[5][5];

            break;                
        }
    },

    recieveDamage: function(damage){
        if(damage-armor > 0){
            health = health - (damage-armor);
        }else{
            console.log(`Negative value damage - armor value`);
            health = health - 1;
        }
    },

    createEnemy: function(tier, animIdle, animAttack, animDefend){
        this.tier = tier;

        this.health = health;
        this.attack = attack;
        this.armor = armor;
       
        this.animIdle = animIdle;
        this.animAttack = animAttack;
        this.animDefend = animDefend;
        makeName();

    }
});

const Enemy = mongoose.model('Enemy', enemySchema);

module.exports = Enemy;