const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var enemyNames = [`Orc`, `Elf`, `Thief`, `Skeleton`, `Dragon`];
// var tier2Prefixes = [`Slick`, `Big`,`Old`,`Noob`,`Recruit`,`Half-dead`]
// var tier3Prefixes = [`Warchief`,`Captain`,`Pirate`,`Wizard`,`Smart`]
// var tier4Prefixes = [`Elder`,`Ancient`,`Centurion`,`King`,`Vengeful`]
// var tier5Prefixes = [`Unstoppable`,`Invincible`,`Godlike`,`Magnificent`,`Super-duper`]

// var healthMaxMins = [3,10,25,55,80][7,17,40,70,100];
// var attackMaxMins = [1,3,8,18,30][3,7,13,26,50];

//Name is setted randomly
// Tier 1 doesnt have prefix
// Tier 2 and higher has prefix to be assigned before name

const enemySchema = new Schema({
    name: String,
    health: Number,
    attack: Number,
    armor: Number,
    // tier: Number,
    // //pierce: Number,

    // animIdle: String,
    // animAttack: String,
    // animDefend: String
});

/*
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
       health = Math.floor(Math.random() * (healthMaxMins[tier-1] - healthMaxMins[tier-1][tier-1])) + healthMaxMins[tier-1][tier-1];
       attack = Math.floor(Math.random() * (attackMaxMins[tier-1] - attackMaxMins[tier-1][tier-1])) + attackMaxMins[tier-1][tier-1];

       if(tier>2){
           armor = Math.floor(Math.random() * ((tier + 5) - (tier - 3)) + (tier - 3));
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

        makeStats();
       
        this.animIdle = animIdle;
        this.animAttack = animAttack;
        this.animDefend = animDefend;
        makeName();

    }
*/
const Enemy = mongoose.model('Enemy', enemySchema);

module.exports = Enemy;