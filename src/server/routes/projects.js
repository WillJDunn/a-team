const express = require('express');
const router = express.Router();
const projectDao = require('../dao/projectDao');


router.get('/', (req, res, next) => {
  const user = req.user;
  if (user) {
    console.log(`User ${user.username} is authenticated`);
  }
  projectDao.getProjects()
    .then(projects => res.send(projects))
    .catch(next);
});

router.post('/', (req, res, next) => {
  console.log('in projects root post');
  const { name, description } = req.body;
  projectDao.createProject({ name, description })
    .then(projectId => res.send(`${projectId}`))
    .catch(next);
});

module.exports = router;
