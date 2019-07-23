class playerCharacter {

  constructor(nickname) 
  {
    (nickname != "") ? this.name = nickname : this.name = "Tester";
    health = 10,
    attack = 1,
    armor = 0,
    level = 1,
    //pierce: Number,
    animIdle = String,
    animAttack = String,
    animDefend = String
    //inventory: Item[3] -- NEEDS REVISE!
  }
 

  recieveDamage(damage){
      if(damage-armor > 0){
          health = health - (damage-armor);
      }else{
          console.log(`Negative value damage - armor value`);
          health = health - 1;
      }
  }
  
  increaseStatistic(stringInput, value){
      switch(stringInput){
          case `health`: health = health + value; break;
          case `attack`: attack = attack + value; break;
          case `armor`: armor = armor + value; break;
          default: console.log(`ERROR: player.js->increaseStatistic(${stringInput},${value})`); break;
      }
  }
  
  increaseLevel(){
      level++;
  }
}

module.exports = playerCharacter;