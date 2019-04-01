const db = require('./PooledDatabaseConnection');
const Project = require('../dto/Project');

const getProjects = () => {
  const sql = 'SELECT * FROM teama.projects';
  return db.query(sql).then(results => results.map(result => Project.fromDB(result)));
};

const getProjectById = projectId => {
  const sql = 'SELECT * FROM teama.projects WHERE project_id = ?';
  return db.query(sql, [projectId])
      .then(results => results.map(result => Project.fromDB(result))[0]);
};

const createProject = project => {
  console.log('Creating new project in db', project);
  const values = [
    [project.name, project.description],
  ];
  const sql = 'INSERT INTO teama.projects (project_name, description) VALUES ?';
  return db.query(sql, [values])
      .then(dbRes => dbRes.insertId);
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
};