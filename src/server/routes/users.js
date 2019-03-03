const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao');

const cleanUser = user => {
  const outputUser = { ...user };
  delete outputUser.password;
  return outputUser;
};

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
      const cleanedUsers = users.map(user => cleanUser(user));
      res.send(JSON.stringify(cleanedUsers));
    })
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
  userDao.getUserById(req.params.userId)
    .then(user => {
      res.send(JSON.stringify(cleanUser(user)));
    })
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
 * @apiSuccess (200) {User} the newly created user object
 */
router.post('/', (req, res, next) => {
  const { username, email, password } = req.body;
  const user = {
    username,
    password,
    email,
    emailVerified: true,
    registeredAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  };

  userDao.createUser(user)
    .then(dbRes => {
      userDao.getUserById(dbRes.insertId)
        .then(user => res.send(JSON.stringify(cleanUser(user))))
    })
    .catch(next);
});

module.exports = router;
