const express = require('express');
const router = express.Router();
const projectDao = require('../dao/projectDao');


router.get('/', (req, res) => {
  const user = req.user;
  console.log(user);
  projectDao.getProjects()
    .then(projects => res.send(projects));
});

router.post('/', (req, res) => {
  console.log('in projects root post');
  const { name, description } = req.body;
  projectDao.createProject({ name, description })
    .then(dbRes => res.send(`${dbRes.insertId}`));
});

module.exports = router;
