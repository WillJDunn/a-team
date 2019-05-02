// const Chatkit = require('@pusher/chatkit-server');
const express = require('express');
const router = express.Router();
const chatDao =  require('../dao/chatDao');


// const chatkit = new Chatkit.default({
//   instanceLocator: 'v1:us1:7ade2168-b268-47e5-9451-d1b558a27b3a',
//   key: '341a3e00-a299-4f4e-a4f4-6eba5273318a:GcUx3FongDvPotGYrcZKLY/9KMmGLdKoe+36nVtgiOQ=',
// });
//

router.post('/users', (req, res, next) => {
  const { username } = req.body;
    chatDao.createChatUser(username)
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    })
});

router.post('/authenticate', (req, res) => {
  const { user_id } = req.query;
  const authData = chatDao.authenticate(user_id);
  res.status(authData.status).send(authData.body);

});


module.exports = router;
