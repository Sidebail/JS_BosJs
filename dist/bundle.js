(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

    const playerCharacterClass = require('../classes/playerCharacter');

    //Declaring the elements
const levelCounter = document.getElementById('level');
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
var playerCharacter = new playerCharacterClass(pName.textContent);

console.log(playerCharacter);



////////////////////////////////////////////
//Enemy Drop models
var dropModel1 = dropModel();

var dropModel2 = dropModel();
var dropModel3 = dropModel();

var drops = [dropModel1,dropModel2,dropModel3];
/* Game mechanics */
var enemyDefendedPos;
var enemyAttackPos;
var positions = ["head","torso","legs"];
enemyDefend = function(){
//var item = items[Math.floor(Math.random()*items.length)];
    enemyDefendedPos = positions[Math.floor(Math.random()*positions.length)];
}
enemyAttack = function(){
    enemyAttackPos = positions[Math.floor(Math.random()*positions.length)];
}

//Adding listeners with functions!
//Defenders
defHead.addEventListener('click', function(){
    enemyAttack();
    if(enemyAttackPos != "head"){
        playerCharacter.recieveDamage(enemyModel.attack);
        console.log(`${enemyModel.name} attacks ${playerCharacter.name}'s head and deals ${enemyModel.attack} damage! Ouch!`);
        updateScene();
    }else{
        console.log(`${enemyModel.name} attacks ${playerCharacter.name}'s head but ${playerCharacter.name} blocks it! Not today!`);
    }
    switchToAttack();
});
defTorso.addEventListener('click', function(){
    enemyAttack();
    if(enemyAttackPos != "torso"){
        playerCharacter.recieveDamage(enemyModel.attack);
        console.log(`${enemyModel.name} attacks ${playerCharacter.name}'s torso and deals ${enemyModel.attack} damage! Ouch!`);
        updateScene();
    }else{
        console.log(`${enemyModel.name} attacks ${playerCharacter.name}'s torso but ${playerCharacter.name} blocks it! Not today!`);
    }
    switchToAttack();
});
defLegs.addEventListener('click', function(){
    enemyAttack();
    if(enemyAttackPos != "legs"){
        playerCharacter.recieveDamage(enemyModel.attack);
        console.log(`${enemyModel.name} attacks ${playerCharacter.name}'s legs and deals ${enemyModel.attack} damage! Ouch!`);
        updateScene();
    }else{
        console.log(`${enemyModel.name} attacks ${playerCharacter.name}'s legs but ${playerCharacter.name} blocks it! Not today!`);
    }
    switchToAttack();
});
//Attackers
atHead.addEventListener('click', function(){
    enemyDefend();
    if(enemyDefendedPos != "head"){
        enemyModel.recieveDamage(playerCharacter.attack);
        console.log(`${playerCharacter.name} attacks ${enemyModel.name}'s head and deals ${playerCharacter.attack} damage! Get it!`);
        updateScene();
    }else{
        console.log(`${playerCharacter.name} attacks ${enemyModel.name}'s head but ${enemyModel.name} blocks it! Mission failed, we'll get them next time!`);
    }
    switchToDefend();
});
atTorso.addEventListener('click', function(){
    enemyDefend();
    if(enemyDefendedPos != "torso"){
        enemyModel.recieveDamage(playerCharacter.attack);
        console.log(`${playerCharacter.name} attacks ${enemyModel.name}'s torso and deals ${playerCharacter.attack} damage! Get it!`);
        updateScene();
    }else{
        console.log(`${playerCharacter.name} attacks ${enemyModel.name}'s torso but ${enemyModel.name} blocks it! Mission failed, we'll get them next time!`);
    }
    switchToDefend();
});
atLegs.addEventListener('click', function(){
    enemyDefend();
    if(enemyDefendedPos != "legs"){
        enemyModel.recieveDamage(playerCharacter.attack);
        console.log(`${playerCharacter.name} attacks ${enemyModel.name}'s legs and deals ${playerCharacter.attack} damage! Get it!`);
        updateScene();
    }else{
        console.log(`${playerCharacter.name} attacks ${enemyModel.name}'s legs but ${enemyModel.name} blocks it! Mission failed, we'll get them next time!`);
    }
    switchToDefend();
});

//Adding listeners for drops
drop1.addEventListener('click',function(){
    playerCharacter.increaseStatistic(drops[0].typeString,drops[0].upgradeValue);
    disableDrops();
    newRound();
});
drop2.addEventListener('click',function(){
    playerCharacter.increaseStatistic(drops[1].typeString,drops[1].upgradeValue);
    disableDrops();
    newRound();
});

drop3.addEventListener('click',function(){
    playerCharacter.increaseStatistic(drops[2].typeString,drops[2].upgradeValue);
    disableDrops();
    newRound();
});


//Switchers for the activity buttons
switchToDefend = function(){
    disableDrops();
    atHead.disabled = true;
    atLegs.disabled = true;
    atTorso.disabled = true;
    defHead.disabled = false;
    defLegs.disabled = false;
    defTorso.disabled = false;
    console.log('Time to defend! Choose one of the positions!');
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
    console.log('Time to attack!!! Choose one of the positions!');
    checkHealth();
}



checkHealth = function(){
    console.log(`Enemy's defence choise ${enemyDefendedPos}`);
    console.log(`Enemy's attack choice ${enemyAttackPos}`);
    //Enemy's death
    if(enemyModel.health <= 0){
        console.log(`${enemyModel.name} has been defeated!`);
        playerCharacter.defeatedEnemies.push(Object.assign({},enemyModel));
        console.log(playerCharacter.defeatedEnemies);
        enableDrops();
    }
    //Player's death
    if(playerCharacter.health <= 0){
        console.log(`${playerCharacter.name} is (finally) down!`)
        atHead.disabled = true;
        atTorso.disabled = true;
        atLegs.disabled = true;
        defHead.disabled = true;
        defLegs.disabled = true;
        defTorso.disabled = true;
        window.location.href = "./views/leaderboard";
    }
}

disableDrops = function(){
    drop1.hidden = true;
    drop2.hidden = true;
    drop3.hidden = true;
}

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
    playerCharacter.level++;
    switch(playerCharacter.level){
        case 5: tier = 2; htmlEl.style.backgroundImage = `url('${bgArray[tier-1]}')`; break;
        case 15: tier = 3; htmlEl.style.backgroundImage = `url('${bgArray[tier-1]}')`; break;
        case 30: tier = 4; htmlEl.style.backgroundImage = `url('${bgArray[tier-1]}')`; break;
        case 50: tier = 5; htmlEl.style.backgroundImage = `url('${bgArray[tier-1]}')`; break;
    }
    enemyModel.createEnemy(tier);
    switchToAttack();
    playerCharacter.health = Math.floor(playerCharacter.health + playerCharacter.takenDamage/2);
    playerCharacter.takenDamage = 0;
    updateScene();
}



/* !!!Function that updates the scene with values!!! */
updateScene = function(){
  console.log('UPDATING SCENE!');
  levelCounter.textContent = `Level ${playerCharacter.level}`;
  pName.textContent = playerCharacter.name;
  pHealth.textContent = `Health: ${playerCharacter.health}/${playerCharacter.maxHealth}`
  pAttack.textContent = `Attack: ${playerCharacter.attack}`;
  pArmor.textContent = `Armor: ${playerCharacter.armor}`;

  eName.textContent = enemyModel.name;
  eHealth.textContent = `Health: ${enemyModel.health}/${enemyModel.maxHealth}`
  eAttack.textContent = `Attack: ${enemyModel.attack}`;
  eArmor.textContent = `Armor: ${enemyModel.armor}`;
  ePicture.src = enemyModel.animIdle;
}

newRound();
},{}]},{},[1]);
