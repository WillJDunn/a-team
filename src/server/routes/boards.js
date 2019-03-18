const express = require('express');
const router = express.Router();
const boardDao = require('../dao/boardDao');


router.get('/:projectId/boards', (req, res) => {
  console.log(req.params);
  const user = req.user;
  const { projectId } = req.params;
  console.log(user);
  boardDao.getBoardsForProject(projectId)
    .then(boards => res.send(boards));
});

router.post('/:projectId/boards', (req, res) => {
  console.log('in boards root post');
  console.log(req.params);
  const { name, description, projectId } = req.body;
  boardDao.createBoardForProject(projectId, { name, description })
    .then(dbRes => res.send(`${dbRes.insertId}`));
});

module.exports = router;
