# Install Instructions
Having Node.Js on your computer is a must. 

Run these commands to install express generator and node modules in the order that they appear:

express . --view=pug 
npm install
npm install --save-dev nodemon
npm install --save mongoose

# JS_BosJs
Rogue like rps boss fight game, written on NodeJS. 

# Game Idea
  The BosJs game is a rogue-like based boss-fight focused game, that includes the Rock/Paper/Scissors mechanics. 
  
  Player will start with base stats and will fight with enemies throughout the game, choosing where to attack and where to defend.
  Each fight consists of looping rounds of 2 phases - attack and defence
  
  In an Attack phase player will choose where to attack - Head, Torso or Legs. After that the Defence phase begins and Player has to choose what to defend - Head, Torso or Legs. If player attacked the non-defended place, enemy will take damage according to player's stats. Likewise in the defense phase.
  
# Game Design Bulletpoint

* What does Player has?
  - Name
  - Health amount (regenerates half of recieved damage per round)
  - Attack damage amount (Each successfull attack deals N damage)
  - Piercing damage amount (damage that ignores defence. Can be improved through items)
  - Armor amount (reduces the recieved damage)
  - Level count progression
* What does Enemy has?
  - Name
  - Tier (Tier upgrades with 5, 15, 30 and 50th enemy. Each Tier will define the Name and special abilities of enemies(like armor piercing or armor itself))
  - Health amount
  - Attack damage amount
  * (NOTE - Enemies apear randomly from the Tier pool. At the end of the Tier special enemy i.e. Boss appears)
* What Player gains?
  - After each victory on enemy Player chooses 1 of 2/3 drops that enemy will drop. It can be stats upgrade or the special item, taht player can equip. Max amount of items in inventory - 3. Player can exterminate items from the inventory.
  - When game is over, all the stats of the Player is written in the Database:
        - Name
        - Level count
        - MaxHealth/AttackDamage/Armor
        - Equipped Items
        - List of 10 last defeated bosses, which features
             - Name
             - Tier (1-5)
             - MaxHealth/AttackDamage/Armor
   - Player can share his achievements in Twitter!
   
# Development requirements:
 * Views
  - Main Menu page
      - Login with Google/Twitter option
      - !Custom nickname!
      - Play as a guest option (score is not written to the database if player is not logged in. That should be prompted!)
      - Contact with developers link
  - Gameplay page
      - Player on the left side
          - Health bar and name above the player character
          - Numeric stats(Attack/Armor) on the left
          - Defence buttons under the player
          - Inventory (3 items slosts) on more left than numeric stats
      - Enemy on the right side
          - Health bar and name above the enemy character
          - Numeric stats(Attack/Armor) on the right
          - Attack buttons under the player
      - When enemy dies:
          - Items/Upgrades to choose from on more right than numeric stats
   - Score page
      - Shows all acquitred stats line by line
      - For the stats order - refer to highscore in Game Design Bulletpoint
      - Share on Twitter button
      - Play again button
   - Leaderboard
      - Shows all players, goes from maximum passes levels and down. 
      - Max amount of leaders should be discussed
  * Models
    - Player model
      - Name
      - Level count
      - Health
      - Attack damage
      - Armor
      - Inventory (array of specialItem objects)
      - Special values (i.e. armor pierce damage)
    - Item object/model (not sure how to realize that 10/07/2019)
      - Name
      - Tier - item drops have tier. That way player will get better upgrades defeating better enemies.
      - Type (Upgrade or Special)
      - Upgrade Function (if Upgrade, increments the stats)
      - Equip function (if Special, posesses in slot and incerements specific value. Decrements it if destroyed)
    - Enemy model
      - Name
      - Tier
      - Health
      - Attack damage
      - Armor
      - Special values (i.e. armor pierce damage) - for bosses and Tier 4 enemies
      
* Liked that? Leave the comments!

  
  
