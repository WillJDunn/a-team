const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao');

router.get('/', (req, res, next) => {
  userDao.getUsers()
    .then(rows => {
      res.send(JSON.stringify(rows));
    })
    // FIXME error handling doesn't seem to be doing anything right now.
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  userDao.getUser(req.params.userId)
    .then(row => {
      res.send(JSON.stringify(row));
    })
    // FIXME error handling doesn't seem to be doing anything right now.
    .catch(next);
});

module.exports = router;
