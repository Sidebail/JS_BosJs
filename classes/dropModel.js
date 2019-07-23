class dropModel {
  constructor(){
    typeString = String,
    upgradeValue = String,
    generateDrop = function(){
        this.typeString = typesDrops[Math.floor(Math.random()*typesDrops.length)];
        switch(this.typeString){
            case 'health': this.upgradeValue = Math.floor(Math.random() * (healthDrops[1][tier-1] - healthDrops[0][tier-1])) + healthDrops[0][tier-1]; break;
            case 'attack': this.upgradeValue = Math.floor(Math.random() * (attackDrops[1][tier-1] - attackDrops[0][tier-1])) + attackDrops[0][tier-1]; break;
            case 'armor': this.upgradeValue = Math.floor(Math.random() * (armorDrops[1][tier-1] - armorDrops[0][tier-1])) + armorDrops[0][tier-1]; break;
        }
    }
  }
}