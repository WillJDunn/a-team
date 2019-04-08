const chatKit = require('...');


const createChatUser = username => {
  return chatKit.createUser...
};

module.exports = {
  createChatUser,
};

router.post('/api', (res, req, next) => {
  chatDao.createChatUser(username)
    .then(...);
});

const chatAuthenticate = userId => {
  const { user_id } = req.query;
};
