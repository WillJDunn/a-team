const db = require('./PooledDatabaseConnection');

const getUsers = () => db.query('SELECT * from teama.users;');

const getUser = userId =>
  db.query(`SELECT * from teama.users WHERE user_id = ?;`, [userId]);

module.exports = {
  getUsers,
  getUser,
};
