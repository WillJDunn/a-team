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

router.get('/:projectId', (req, res, next) => {
  const { projectId } = req.params;
  const user = req.user;
  if (user) {
    console.log(`User ${user.username} is authenticated`);
  }
  projectDao.getProjectById(projectId)
    .then(project => res.send(project))
    .catch(next);
});

// priorities
router.get('/:projectId/priorities', (req, res, next) => {
  const user = req.user;
  const { projectId } = req.params;
  console.log(`Getting priorities for project id=${projectId}`);
  projectDao.getPrioritiesForProject(projectId)
    .then(priorities => res.send(priorities))
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
