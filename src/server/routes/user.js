const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao');

router.get('/', (req, res, next) => {
  userDao.getUsers()
    .then(users => {
      res.send(JSON.stringify(users));
    })
    // FIXME error handling doesn't seem to be doing anything right now.
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  userDao.getUser(req.params.userId)
    .then(user => {
      res.send(JSON.stringify(user));
    })
    // FIXME error handling doesn't seem to be doing anything right now.
    .catch(next);
});

router.post('/', (req, res, next) => {
  const user = {
    username: 'foo',
    password: 'foo',
    email: 'foo2@domain.com',
    emailVerified: true,
    registeredAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  };
  // if you don't res.send something the request just hangs
  userDao.createUser(user)
    .then(() => res.send('Created'))
    .catch(next);
});

module.exports = router;
