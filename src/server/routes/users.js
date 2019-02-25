const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao');

/**
 * @api {get} /api/users Request a list of users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {User[]} Array of User objects
 */
router.get('/', (req, res, next) => {
  userDao.getUsers()
    .then(users => {
      res.send(JSON.stringify(users));
    })
    // FIXME error handling doesn't seem to be doing anything right now.
    .catch(next);
});

/**
 * @api {get} /api/users/:userId Request a user
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {String} userId User name
 *
 * @apiSuccess {User} Single User whose username matches userId
 */
router.get('/:userId', (req, res, next) => {
  userDao.getUser(req.params.userId)
    .then(user => {
      res.send(JSON.stringify(user));
    })
    // FIXME error handling doesn't seem to be doing anything right now.
    .catch(next);
});

/**
 * @api {post} /api/users Create a new user
 * @apiName createUser
 * @apiGroup Users
 *
 * @apiParam {String} username Username of the user.  Must not exist already
 * @apiParam {String} password Password of the user.
 * @apiParam {String} email Email address of the user.
 * @apiParam {boolean} emailVerified True if the email address has been verified
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "firstInitialLastName",
 *       "password": "password1234",
 *       "email": "foo@domain.com",
 *       "emailVerified": true
 *     }
 *
 * @apiSuccess (200) {String} username The Username of the created User
 */
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
