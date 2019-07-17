const Player = require('../models/player');

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