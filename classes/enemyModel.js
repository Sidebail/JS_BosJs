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

var healthMaxMins = [[3,10,25,55,80],[5,15,40,70,100]];
var attackMaxMins = [[1,2,6,18,30],[2,4,12,26,50]];

var healthDrops = [[2,4,6,10,15],[5,7,14,20,30]];
var attackDrops = [[1,3,8,11,16],[3,5,10,15,20]];
var armorDrops = [[1,1,1,3,5],[1,2,3,5,8]];
var typesDrops = ['health','attack','armor'];

//Name is setted randomly
// Tier 1 doesnt have prefix
// Tier 2 and higher has prefix to be assigned before name

class enemyModel {

  constructor(){
    this.makeName,
    this.health,
    this.maxHealth,
    this.attack,
    this.armor,
    this.tier,
    //pierce: Number,

    this.animIdle,
    this.animAttack,
    this.animDefend
  }
  


  makeName(){
      var randomNumber = Math.floor(Math.random()*enemyNames.length);
      switch(tier){
          case 1: this.name = enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
          case 2: this.name = tier2Prefixes[Math.floor(Math.random()*tier2Prefixes.length)] + " " + enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
          case 3: this.name = tier3Prefixes[Math.floor(Math.random()*tier3Prefixes.length)] + " " + enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
          case 4: this.name = tier4Prefixes[Math.floor(Math.random()*tier4Prefixes.length)] + " " + enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
          case 5: this.name = tier5Prefixes[Math.floor(Math.random()*tier5Prefixes.length)] + " " + enemyNames[randomNumber]; this.animIdle = enemyAnimsIdle[randomNumber]; break;
      }
  }

  makeStats(){
     this.health = Math.floor(Math.random() * (healthMaxMins[1][tier-1] - healthMaxMins[0][tier-1])) + healthMaxMins[0][tier-1];
     this.maxHealth = this.health;
     this.attack = Math.floor(Math.random() * (attackMaxMins[1][tier-1] - attackMaxMins[0][tier-1])) + attackMaxMins[0][tier-1];
     //console.log(healthMaxMins[tier-1][0] + " " + healthMaxMins[tier-1][1]);
     if(this.tier>2){
         this.armor = Math.floor(Math.random() * ((tier + 5) - (tier - 3)) + (tier - 3));
     }else{
         this.armor = 0;
     }
     
  }

  recieveDamage(damage){
      if(damage-this.armor > 0){
          this.health = this.health - (damage-this.armor);
      }else{
          console.log(`Negative value damage - armor value`);
          this.health = this.health - 1;
      }
  }

  createEnemy(tier){
      this.tier = tier;

      this.makeStats();
      this.makeName();

  }
}