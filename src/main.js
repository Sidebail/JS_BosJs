/*
    Filename - main.js
    File collaborators - Vladimir Vatsurin, Nathaniel Fischer
    File description -  Game's core logic, which is running on the client side
                        

*/

//Declaring the elements
const levelCounter = document.getElementById('level');
const scoreCounter = document.getElementById('score');
const gameEvents = document.getElementById('gameText');
//Player Elements
const pName = document.getElementById('pName');
const pHealth = document.getElementById('pHealth');
const pAttack = document.getElementById('pAttack');
const pArmor = document.getElementById('pArmor');
const pPicture = document.getElementById('pPicture');
//Defence buttons
const defHead = document.getElementById('defHead');
const defTorso = document.getElementById('defTorso');
const defLegs = document.getElementById('defLegs');
//Attack Butons
const atHead = document.getElementById('atHead');
const atTorso = document.getElementById('atTorso');
const atLegs = document.getElementById('atLegs');
//Enemy elements
const eName = document.getElementById('eName');
const eHealth = document.getElementById('eHealth');
const eAttack = document.getElementById('eAttack');
const eArmor = document.getElementById('eArmor');
const ePicture = document.getElementById('ePicture');
//Drops
const drop1 = document.getElementById('drop1');
const drop2 = document.getElementById('drop2');
const drop3 = document.getElementById('drop3');
//Form items for the outputting the stats
// Player
const nameForm = document.getElementById('nameform');
const levelForm = document.getElementById('levelform');
const maxHealthForm = document.getElementById('maxHealthform');
const attackForm = document.getElementById('attackform');
const armorForm = document.getElementById('armorform');
// Enemy 1
const e1nameForm = document.getElementById('e1nameform');
const e1maxHealthForm = document.getElementById('e1maxHealthform');
const e1attackForm = document.getElementById('e1attackform');
const e1armorForm = document.getElementById('e1armorform');
// Enemy 2
const e2nameForm = document.getElementById('e2nameform');
const e2maxHealthForm = document.getElementById('e2maxHealthform');
const e2attackForm = document.getElementById('e2attackform');
const e2armorForm = document.getElementById('e2armorform');
// Enemy 3
const e3nameForm = document.getElementById('e3nameform');
const e3maxHealthForm = document.getElementById('e3maxHealthform');
const e3attackForm = document.getElementById('e3attackform');
const e3armorForm = document.getElementById('e3armorform');

const submitScore = document.getElementById('submitScore');

// DELETE FOR PROD
const die = document.getElementById('die');

var tier = 1;
//Html element
const htmlEl = document.getElementById('content');
console.log(htmlEl)
//Different backgrounds. Changing by tiers
const bgArray = [
    /* Tier 1 - Village */ `https://img.itch.zone/aW1hZ2UvMzQyNjAwLzE2OTg4MzEucG5n/original/DOT1NH.png`,
    /* Tier 2 - Forrest */ `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/428550/3288949bd5d35b3bcfa9de0b65faade54bbd701c.jpg`,
    /* Tier 3 -  Mountains*/ `https://i.ibb.co/zHN6p76/snow.png`,
    /* Tier 4 - Castle  */ `https://backgroundcheckall.com/wp-content/uploads/2018/10/bowser-castle-background-6.png`,
    /* Tier 5 - Hell */ `https://img.wallpapersafari.com/desktop/1920/1080/84/74/8Y2GRE.jpg`
]

/* Creating the player object. THIS SHOULD BE GETTING THE NICKNAME FROM INITIAL INPUT! */
var playerChraracter = {
    name: (pName.textContent == "") ? "Stranger" : pName.textContent,
    health: 10,
    maxHealth: 10,
    attack: 1,
    armor: 1,
    level: 0,
    takenDamage: 0, 
    score: 0,
    //pierce: Number,
    animIdle: String,
    animAttack: String,
    animDefend: String,

    defeatedEnemies: [],
    //inventory: Item[3] -- NEEDS REVISE!
  
    recieveDamage: function(damage){
        if(damage-this.armor > 0){
            this.health = this.health - (damage-this.armor);
            this.takenDamage = this.takenDamage + (damage-this.armor);
        }else{
            updateGameText(`Negative value damage - armor value`);
            this.health = this.health - 1;
            this.takenDamage = this.takenDamage + 1;
        }
    },
    
    increaseStatistic: function(stringInput, value){
        switch(stringInput){
            case `Health`: this.health = this.health + value; this.maxHealth = this.maxHealth + value; break;
            case `Attack`: this.attack = this.attack + value; break;
            case `Armor`: this.armor = this.armor + value; break;
            default: console.log(`ERROR: player.js->increaseStatistic(${stringInput},${value})`); break;
        }
    },
    
    increaseLevel: function(){
        this.level++;
    }
}

/* ENEMY LOGIC STARTS HERE */
var enemyNames = [`Orc`, `Elf`, `Thief`, `Skeleton`, `Dragon`]
var enemyAnimsIdle = [
    /* Orc */`https://i.ibb.co/YXPJ7F3/orc.gif`,
    /* Elf */`https://i.ibb.co/DGqzNvx/elf.gif`,
    /* Thief */`https://i.ibb.co/bLv6Y5f/thief.gif`,
    /* Skeleton */`https://i.ibb.co/3RVPcvV/skeleton.gif`,
    /* Dragon */`https://i.ibb.co/XLPs4t2/dragon.gif`
]
var tier2Prefixes = [`Slick`, `Big`,`Old`,`Noob`,`Recruit`,`Half-dead`]
var tier3Prefixes = [`Warchief`,`Captain`,`Pirate`,`Wizard`,`Smart`]
var tier4Prefixes = [`Elder`,`Ancient`,`Centurion`,`King`,`Vengeful`]
var tier5Prefixes = [`Unstoppable`,`Invincible`,`Godlike`,`Magnificent`,`Super-duper`]

var healthMaxMins = [[2,10,20,55,80],[5,15,40,70,120]];
var attackMaxMins = [[1,3,6,18,30],[1,6,12,26,50]];

var healthDrops = [[2,3,6,14,15],[5,4,10,20,30]];
var attackDrops = [[1,2,5,10,14],[3,4,8,12,20]];
var armorDrops = [[1,1,1,3,5],[1,2,3,5,8]];
var typesDrops = ['Health','Attack','Armor'];

//Name is setted randomly
// Tier 1 doesnt have prefix
// Tier 2 and higher has prefix to be assigned before name

var enemyModel = {
    name: String,
    health: Number,
    maxHealth: Number,
    attack: Number,
    armor: Number,
    tier: Number,
    //pierce: Number,

    animIdle: String,
    animAttack: String,
    animDefend: String,
    


    makeName: function(){
        var randomNumber = Math.floor(Math.random()*enemyNames.length);
        switch(tier){
            case 1: this.name = enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
            case 2: this.name = tier2Prefixes[Math.floor(Math.random()*tier2Prefixes.length)] + " " + enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
            case 3: this.name = tier3Prefixes[Math.floor(Math.random()*tier3Prefixes.length)] + " " + enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
            case 4: this.name = tier4Prefixes[Math.floor(Math.random()*tier4Prefixes.length)] + " " + enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
            case 5: this.name = tier5Prefixes[Math.floor(Math.random()*tier5Prefixes.length)] + " " + enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
        }
    },

    makeStats: function(){
        if(playerChraracter.level >= 55){
            this.health = Math.floor(Math.random() * (healthMaxMins[1][tier-1] - healthMaxMins[0][tier-1])) + healthMaxMins[0][tier-1] + playerChraracter.maxHealth - playerChraracter.level;
            this.maxHealth = this.health;
            this.attack = Math.floor(Math.random() * (attackMaxMins[1][tier-1] - attackMaxMins[0][tier-1])) + attackMaxMins[0][tier-1] + playerChraracter.maxHealth - playerChraracter.level;
        }else{
            this.health = Math.floor(Math.random() * (healthMaxMins[1][tier-1] - healthMaxMins[0][tier-1])) + healthMaxMins[0][tier-1];
            this.maxHealth = this.health;
            this.attack = Math.floor(Math.random() * (attackMaxMins[1][tier-1] - attackMaxMins[0][tier-1])) + attackMaxMins[0][tier-1];
            //console.log(healthMaxMins[tier-1][0] + " " + healthMaxMins[tier-1][1]);
        }
       if(this.tier>2){
            this.armor = Math.floor(Math.random() * ((tier + 5) - (tier - 3)) + (tier - 3));
        }else{
            this.armor = 0;
        }
       
    },

    recieveDamage: function(damage){
        if(damage-this.armor > 0){
            this.health = this.health - (damage-this.armor);
        }else{
            updateGameText(`Negative value damage - armor value`);
            this.health = this.health - 1;
        }
    },

    createEnemy: function(tier){
        this.tier = tier;

        this.makeStats();
        this.makeName();

    }
}

////////////////////////////////////////////
//Enemy Drop models
var dropModel1 = {
    typeString: String,
    upgradeValue: String,
    generateDrop: function(){
        this.typeString = typesDrops[Math.floor(Math.random()*typesDrops.length)];
        switch(this.typeString){
            case 'Health':  this.upgradeValue = Math.floor(Math.random() * (healthDrops[1][tier-1] - healthDrops[0][tier-1])) + healthDrops[0][tier-1];
                            drop1.style.backgroundColor = "rgb(145, 255, 120)";
                            break;
            case 'Attack':  this.upgradeValue = Math.floor(Math.random() * (attackDrops[1][tier-1] - attackDrops[0][tier-1])) + attackDrops[0][tier-1]; 
                            drop1.style.backgroundColor = "rgb(255, 117, 129)";
                            break;
            case 'Armor':   this.upgradeValue = Math.floor(Math.random() * (armorDrops[1][tier-1] - armorDrops[0][tier-1])) + armorDrops[0][tier-1];
                            drop1.style.backgroundColor = "rgb(133, 188, 255)";
                            break;
        }
    }
}
var dropModel2 = {
    typeString: String,
    upgradeValue: String,
    generateDrop: function(){
        this.typeString = typesDrops[Math.floor(Math.random()*typesDrops.length)];
        switch(this.typeString){
            case 'Health':  this.upgradeValue = Math.floor(Math.random() * (healthDrops[1][tier-1] - healthDrops[0][tier-1])) + healthDrops[0][tier-1];
                            drop2.style.backgroundColor = "rgb(145, 255, 120)"; 
                            break;
            case 'Attack':  this.upgradeValue = Math.floor(Math.random() * (attackDrops[1][tier-1] - attackDrops[0][tier-1])) + attackDrops[0][tier-1]; 
                            drop2.style.backgroundColor = "rgb(255, 117, 129)";  
                            break;
            case 'Armor': this.upgradeValue = Math.floor(Math.random() * (armorDrops[1][tier-1] - armorDrops[0][tier-1])) + armorDrops[0][tier-1];
                            drop2.style.backgroundColor = "rgb(133, 188, 255)";
                            break;
        }
    }
}
var dropModel3 = {
    typeString: String,
    upgradeValue: String,
    generateDrop: function(){
        this.typeString = typesDrops[Math.floor(Math.random()*typesDrops.length)];
        switch(this.typeString){
            case 'Health':  this.upgradeValue = Math.floor(Math.random() * (healthDrops[1][tier-1] - healthDrops[0][tier-1])) + healthDrops[0][tier-1];
                            drop3.style.backgroundColor = "rgb(145, 255, 120)"; 
                            break;
            case 'Attack':  this.upgradeValue = Math.floor(Math.random() * (attackDrops[1][tier-1] - attackDrops[0][tier-1])) + attackDrops[0][tier-1]; 
                            drop3.style.backgroundColor = "rgb(255, 117, 129)";  
                            break;
            case 'Armor': this.upgradeValue = Math.floor(Math.random() * (armorDrops[1][tier-1] - armorDrops[0][tier-1])) + armorDrops[0][tier-1];
                            drop3.style.backgroundColor = "rgb(133, 188, 255)";
                            break;       }
    }
}
var drops = [dropModel1,dropModel2,dropModel3];
/* Game mechanics */
var enemyDefendedPos;
var enemyAttackPos;
var positions = ["head","torso","legs"];
// Function that chooses what part enemy would defend
enemyDefend = function(){
//var item = items[Math.floor(Math.random()*items.length)];
    enemyDefendedPos = positions[Math.floor(Math.random()*positions.length)];
}
// Function that chooses what part enemy would attack
enemyAttack = function(){
    enemyAttackPos = positions[Math.floor(Math.random()*positions.length)];
}

die.addEventListener('click' , function(){
    playerChraracter.recieveDamage(100000000000000000000000);
    switchToAttack();
    atHead.click();
});
//Adding listeners with functions!
//Defenders
defHead.addEventListener('click', function(){
    enemyAttack();
    if(enemyAttackPos != "head"){
        playerChraracter.recieveDamage(enemyModel.attack);
        updateGameText(`${enemyModel.name} attacks ${playerChraracter.name}'s ${enemyAttackPos} and deals ${enemyModel.attack} damage! Ouch!`);
        updateScene();
    }else{
        console.log(`${enemyModel.name} attacks ${playerChraracter.name}'s head but ${playerChraracter.name} blocks it! Not today!`);
    }
    switchToAttack();
});
defTorso.addEventListener('click', function(){
    enemyAttack();
    if(enemyAttackPos != "torso"){
        playerChraracter.recieveDamage(enemyModel.attack);
        updateGameText(`${enemyModel.name} attacks ${playerChraracter.name}'s ${enemyAttackPos} and deals ${enemyModel.attack} damage! Ouch!`);
        updateScene();
    }else{
        updateGameText(`${enemyModel.name} attacks ${playerChraracter.name}'s torso but ${playerChraracter.name} blocks it! Not today!`);
    }
    switchToAttack();
});
defLegs.addEventListener('click', function(){
    enemyAttack();
    if(enemyAttackPos != "legs"){
        playerChraracter.recieveDamage(enemyModel.attack);
        updateGameText(`${enemyModel.name} attacks ${playerChraracter.name}'s ${enemyAttackPos} and deals ${enemyModel.attack} damage! Ouch!`);
        updateScene();
    }else{
        updateGameText(`${enemyModel.name} attacks ${playerChraracter.name}'s legs but ${playerChraracter.name} blocks it! Not today!`);
    }
    switchToAttack();
});
//Attackers
atHead.addEventListener('click', function(){
    enemyDefend();
    if(enemyDefendedPos != "head"){
        enemyModel.recieveDamage(playerChraracter.attack);
        updateGameText(`${playerChraracter.name} attacks ${enemyModel.name}'s head and deals ${playerChraracter.attack} damage! Get it!`);
        updateScene();
    }else{
       updateGameText(`${playerChraracter.name} attacks ${enemyModel.name}'s head but ${enemyModel.name} blocks it! Mission failed, we'll get them next time!`);
    }
    switchToDefend();
});
atTorso.addEventListener('click', function(){
    enemyDefend();
    if(enemyDefendedPos != "torso"){
        enemyModel.recieveDamage(playerChraracter.attack);
        updateGameText(`${playerChraracter.name} attacks ${enemyModel.name}'s torso and deals ${playerChraracter.attack} damage! Get it!`);
        updateScene();
    }else{
        updateGameText(`${playerChraracter.name} attacks ${enemyModel.name}'s torso but ${enemyModel.name} blocks it! Mission failed, we'll get them next time!`);
    }
    switchToDefend();
});
atLegs.addEventListener('click', function(){
    enemyDefend();
    if(enemyDefendedPos != "legs"){
        enemyModel.recieveDamage(playerChraracter.attack);
        updateGameText(`${playerChraracter.name} attacks ${enemyModel.name}'s legs and deals ${playerChraracter.attack} damage! Get it!`);
        updateScene();
    }else{
        updateGameText(`${playerChraracter.name} attacks ${enemyModel.name}'s legs but ${enemyModel.name} blocks it! Mission failed, we'll get them next time!`);
    }
    switchToDefend();
});

//Adding listeners for drops
drop1.addEventListener('click',function(){
    playerChraracter.increaseStatistic(drops[0].typeString,drops[0].upgradeValue);
    disableDrops();
    newRound();
});
drop2.addEventListener('click',function(){
    playerChraracter.increaseStatistic(drops[1].typeString,drops[1].upgradeValue);
    disableDrops();
    newRound();
});

drop3.addEventListener('click',function(){
    playerChraracter.increaseStatistic(drops[2].typeString,drops[2].upgradeValue);
    disableDrops();
    newRound();
});

//Function to call updating the text area
updateGameText = function (newText)
{
    document.getElementById('gameText').value += newText;
    document.getElementById('gameText').value += "\r"; 
    document.getElementById('gameText').scrollTop = document.getElementById('gameText').scrollHeight;
}
//Switchers for the activity buttons
switchToDefend = function(){
    console.log("STUFF");
    disableDrops();
    atHead.disabled = true;
    atLegs.disabled = true;
    atTorso.disabled = true;
    defHead.disabled = false;
    defLegs.disabled = false;
    defTorso.disabled = false;
    updateGameText('Time to defend! Choose one of the positions!');
    checkHealth();
}

switchToAttack = function(){
    disableDrops();
    atHead.disabled = false;
    atLegs.disabled = false;
    atTorso.disabled = false;
    defHead.disabled = true;
    defLegs.disabled = true;
    defTorso.disabled = true;
    updateGameText('Time to attack!!! Choose one of the positions!');
    checkHealth();
}

// DEPRECATED
increaseScore = function(score)
{
    switch(enemyModel.tier){
        case 1: tier = 1; playerChraracter.score += 1000;  break;
        case 2: tier = 2; playerChraracter.score += 2000;  break;
        case 3: tier = 3; playerChraracter.score += 3000;  break;
        case 4: tier = 4; playerChraracter.score += 4000;  break;
        case 5: tier = 5; playerChraracter.score += 5000;  break;

    } 

}

// Checking the health and triggering deaths if one of the healths is below zero
checkHealth = function(){
    //updateGameText(`Enemy's defence choise ${enemyDefendedPos}`);
    //updateGameText(`Enemy's attack choice ${enemyAttackPos}`);
    //Enemy's death
    if(enemyModel.health <= 0){
        updateGameText(`${enemyModel.name} has been defeated!`);
        playerChraracter.defeatedEnemies.unshift(Object.assign({},enemyModel));
        //updateGameText(playerChraracter.defeatedEnemies);
        increaseScore(playerChraracter.score);
        enableDrops();

    }
    //Player's death
    if(playerChraracter.health <= 0){
        updateGameText(`${playerChraracter.name} is (finally) down!`)
        atHead.disabled = true;
        atTorso.disabled = true;
        atLegs.disabled = true;
        defHead.disabled = true;
        defLegs.disabled = true;
        defTorso.disabled = true;
        // send score back to index.js with hidden form
        /////
        // Player 1
        nameForm.value = playerChraracter.name;
        levelForm.value = playerChraracter.level;
        maxHealthForm.value = playerChraracter.maxHealth;
        attackForm.value = playerChraracter.attack;
        armorForm.value = playerChraracter.armor;
        // Enemy 1
        if(typeof playerChraracter.defeatedEnemies[0] !== 'undefined'){
            e1nameForm.value = playerChraracter.defeatedEnemies[0].name;
            e1maxHealthForm.value = playerChraracter.defeatedEnemies[0].maxHealth;
            e1attackForm.value = playerChraracter.defeatedEnemies[0].attack;
            e1armorForm.value = playerChraracter.defeatedEnemies[0].armor;
        }else{
            e1nameForm.value = "";
         //   e1maxHealthForm.value = "";
         //   e1attackForm.value = "";
         //   e1armorForm.value = "";
       
        }
        // Enemy 2
        if(typeof playerChraracter.defeatedEnemies[1] !== 'undefined'){
            e2nameForm.value = playerChraracter.defeatedEnemies[1].name;
            e2maxHealthForm.value = playerChraracter.defeatedEnemies[1].maxHealth;
            e2attackForm.value = playerChraracter.defeatedEnemies[1].attack;
            e2armorForm.value = playerChraracter.defeatedEnemies[1].armor;
        }else{
            e2nameForm.value = "";
         //   e2maxHealthForm.value = "";
         //   e2attackForm.value = "";
         //   e2armorForm.value = "";
       
        }
        // Enemy 3
        if(typeof playerChraracter.defeatedEnemies[2] !== 'undefined'){
            e3nameForm.value = playerChraracter.defeatedEnemies[2].name;
            e3maxHealthForm.value = playerChraracter.defeatedEnemies[2].maxHealth;
            e3attackForm.value = playerChraracter.defeatedEnemies[2].attack;
            e3armorForm.value = playerChraracter.defeatedEnemies[2].armor;
        }else{
            e3nameForm.value = "";
          //  e3maxHealthForm.value = "";
          //  e3attackForm.value = "";
          //  e3armorForm.value = "";
       
        }
        ////
        console.log("before submit");
        submitScore.click();
        console.log("after submit");
       // window.location.href = "/gameover";
       //window.open("/gameover", score=`${playerChraracter.score}`);
    }
}
// Disabling drops buttons, hiding them
disableDrops = function(){
    drop1.hidden = true;
    drop2.hidden = true;
    drop3.hidden = true;
}

// Enabling frops buttons and generating drops, accoring to the current tier
enableDrops = function(){
    atHead.disabled = true;
    atTorso.disabled = true;
    atLegs.disabled = true;
    defHead.disabled = true;
    defLegs.disabled = true;
    defTorso.disabled = true;
    drop1.hidden = false;
    drop2.hidden = false;
    drop3.hidden = false;
    drops.forEach(el => {
        el.generateDrop();
    });
    drop1.textContent = `${drops[0].typeString}: ${drops[0].upgradeValue}`;
    drop2.textContent = `${drops[1].typeString}: ${drops[1].upgradeValue}`;
    drop3.textContent = `${drops[2].typeString}: ${drops[2].upgradeValue}`;
}


/* !Initializing the round! */
newRound = function(){
    playerChraracter.level++;
    switch(playerChraracter.level){
        case 5: tier = 2; htmlEl.style.backgroundImage = `url('${bgArray[tier-1]}')`; break;
        case 15: tier = 3; htmlEl.style.backgroundImage = `url('${bgArray[tier-1]}')`; break;
        case 30: tier = 4; htmlEl.style.backgroundImage = `url('${bgArray[tier-1]}')`; break;
        case 50: tier = 5; htmlEl.style.backgroundImage = `url('${bgArray[tier-1]}')`; break;
    }
    enemyModel.createEnemy(tier);
    switchToAttack();
    playerChraracter.health = Math.floor(playerChraracter.health + playerChraracter.takenDamage/2);
    playerChraracter.takenDamage = 0;
    updateScene();
}



/* !!!Function that updates the scene with values!!! */
updateScene = function(){
  console.log('UPDATING SCENE!');
  levelCounter.textContent = `Level ${playerChraracter.level}`;
  pName.textContent = playerChraracter.name;
  pHealth.textContent = `Health: ${playerChraracter.health}/${playerChraracter.maxHealth}`
  pAttack.textContent = `Attack: ${playerChraracter.attack}`;
  pArmor.textContent = `Armor: ${playerChraracter.armor}`;



  eName.textContent = enemyModel.name;
  eHealth.textContent = `Health: ${enemyModel.health}/${enemyModel.maxHealth}`
  eAttack.textContent = `Attack: ${enemyModel.attack}`;
  eArmor.textContent = `Armor: ${enemyModel.armor}`;
  ePicture.src = enemyModel.animIdle;
}

// Starting the game
newRound();