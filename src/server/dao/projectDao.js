const db = require('./PooledDatabaseConnection');
const Project = require('../dto/Project');

//api/projects/ GET: Get a list of projects
const getProjects = () => {
  const sql = 'SELECT * FROM teama.projects';
  return db.query(sql).then(results => results.map(result => Project.fromDB(result)));
};

// api/projects/POST: Create a new project
const createProject = project => {
  console.log('Creating new project in db', project);
  const values = [project.name, project.description];
  const sql = 'SET @insertId = 0; CALL add_project(?, ?, @insertId); SELECT @insertId as insertId';
  return db.query(sql, [values]);
};

//api/projects/:projectId/GET: Get a specific project by project id
const getProjectById = projectId => {
  const sql = 'SELECT * FROM teama.projects WHERE project_id = ?';
  return db.query(sql, [projectId])
      .then(results => results.map(result => Project.fromDB(result)));
};


module.exports = {
  getProjects,
  createProject,
  getProjectById
};
