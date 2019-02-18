const config = require('../config/db');
const PooledDatabaseConnection = require('./PooledDatabaseConnection');

const getUsers = () => {
  const db = new PooledDatabaseConnection(config);
  return db.query('SELECT * from teama.users;')
};

const getUser = (userId) => {
  const db = new PooledDatabaseConnection(config);
  return db.query(`SELECT * from teama.users WHERE user_id = ?;`, [userId]);
};

module.exports = {
  getUsers,
  getUser,
};
