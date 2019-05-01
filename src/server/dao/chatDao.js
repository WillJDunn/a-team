const chatDao = require('./chatDao');
const Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:7ade2168-b268-47e5-9451-d1b558a27b3a',
  key: '341a3e00-a299-4f4e-a4f4-6eba5273318a:GcUx3FongDvPotGYrcZKLY/9KMmGLdKoe+36nVtgiOQ=',
});


const createChatUser = username =>{
  return chatkit
    .createUser({
      id: username,
      name: username
    });
};

const authenticate = userId =>{
	return chatkit.authenticate({ userId })
};

module.exports = { 
	createChatUser, 
	authenticate,
};