const express = require('express');
const router = express.Router();
const projectDao = require('../dao/projectDao');


router.get('/', (req, res, next) => {
  const user = req.user;
  console.log(user);
  projectDao.getProjects()
    .then(projects => res.send(projects))
    .catch(next);
});

router.post('/', (req, res, next) => {
  console.log('in projects root post');
  const { name, description } = req.body;
  projectDao.createProject({ name, description })
    .catch(next);
});

module.exports = router;
