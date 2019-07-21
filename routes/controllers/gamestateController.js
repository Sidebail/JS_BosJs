const express = require('express');
const router = express.Router();
const Player = require('../../models/player');
const EnemyModel = require('../../models/enemy');

/* THIS IS TEMPORARY */

var playerChraracter = {
  name: "Tester",
  health: 10,
  attack: 1,
  armor: 0,
  level: 1,
  //pierce: Number,
  animIdle: String,
  animAttack: String,
  animDefend: String,
  //inventory: Item[3] -- NEEDS REVISE!

  recieveDamage: function(damage){
      if(damage-armor > 0){
          health = health - (damage-armor);
      }else{
          console.log(`Negative value damage - armor value`);
          health = health - 1;
      }
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
}

//////////////////////
router.get('/',async(req,res)=>{
  res.render('gameview',{playerChraracter})
});


//SEND PLAYER DATA TO GAMEVIEW
exports.createPlayer = async(req,res) => {

  

}


module.exports = router;

/*
const Project = require('../../models/project');
// Projects CRUD
// Creating
// Create a new Project
exports.createNewProject = async (req, res) => {
  const body = req.body;
  const project = await new Project(body).save();
  res.redirect(`/projects/${project._id}`);
};

// Reading
// Find a Project by it's ID
// /projects/:id
// exports.findProjectById = function(viewPath) {
//   return function(req, res) {
//     const id = req.params.id;
//     const project = await Project.findById(id);
//     res.render(viewPath, { project });
//   }
// }
exports.findProjectById = viewPath => async (req, res) => {
  const id = req.params.id;
  const project = await Project.findById(id);
  res.render(viewPath, { project });
};
// Old findProjectById
// exports.findProjectById = async (req, res) => {
//   const id = req.params.id;
//   const project = await Project.findById(id);
//   res.render('projects/details', { project });
// };

// Find all Projects
exports.findAllProjects = async (req, res) => {
  const projects = await Project.find();
  
  var listChunks = [];

  for (var i = 0; i < Math.ceil(projects.length / 3); i++) {
    listChunks.push(projects.slice(3 * i, 3 * (i + 1)));
  }

  res.render('projects/list', { listChunks });
};

// Updating
// Update a project based on it's ID
exports.updateProjectById = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const project = await Project.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });
  res.redirect(`/projects/${project._id}`);
};

// Deleting
// Delete a porject based on it's ID
exports.deleteProjectById = async (req, res) => {
  const id = req.params.id;
  await Project.findByIdAndDelete(id);
  res.redirect('/projects');
};

*/


/*
 recieveDamage: function(damage){
        if(damage-armor > 0){
            health = health - (damage-armor);
        }else{
            console.log(`Negative value damage - armor value`);
            health = health - 1;
        }
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
*/