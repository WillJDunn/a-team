const db = require('./PooledDatabaseConnection');
const Project = require('../dto/Project');

const getProjects = () => {
  const sql = 'SELECT * FROM teama.projects';
  return db.query(sql).then(results => results.map(result => Project.fromDB(result)));
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
  createProject,
p};
