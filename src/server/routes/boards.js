const express = require('express');
const router = express.Router();
const boardDao = require('../dao/boardDao');


router.get('/:projectId/boards', (req, res, next) => {
  const user = req.user;
  const { projectId } = req.params;
  console.log(`Getting boards for project id=${projectId}`);
  boardDao.getBoardsForProject(projectId)
    .then(boards => res.send(boards))
    .catch(next);
});

router.get('/:projectId/boards/:boardId', (req, res, next) => {
  const user = req.user;
  const { projectId, boardId } = req.params;
  console.log(`Getting board id=${boardId} for project id=${projectId}`);
  boardDao.getBoardById(projectId, boardId)
    .then(board => res.send(board))
    .catch(next);
});

router.post('/:projectId/boards', (req, res, next) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  console.log(`Creating board on project id=${projectId}`);
  boardDao.createBoardForProject(projectId, { name, description })
    .then(insertId => res.send(`${insertId}`))
    .catch(next);
});

// statuses
router.get('/:projectId/boards/:boardId/statuses', (req, res, next) => {
  const user = req.user;
  const { projectId, boardId } = req.params;
  console.log(`Getting board id=${boardId} statuses for project id=${projectId}`);
  boardDao.getStatusesForBoard(boardId)
    .then(statuses => res.send(statuses))
    .catch(next);
});

// items
router.get('/:projectId/boards/:boardId/items', (req, res, next) => {
  const user = req.user;
  const { projectId, boardId } = req.params;
  console.log(`Getting board id=${boardId} items for project id=${projectId}`);
  boardDao.getItemsForBoard(projectId, boardId)
    .then(statuses => res.send(statuses))
    .catch(next);
});

module.exports = router;
