const db = require('./PooledDatabaseConnection');
const User = require('../dto/User');

const getUsers = () => db.query('SELECT * from teama.users;')
  .then(results => results.map(result => User.fromDB(result)));

const getUser = userName => {
  return db.query(`SELECT *
                   from teama.users
                   WHERE user_name = ?;`, [userName])
    .then(data => User.fromDB(data[0]));
};

const getUserById = userId =>
  db.query(`SELECT * from teama.users WHERE user_id = ?;`, [userId])
    .then(data => User.fromDB(data[0]));


const createUser = user => {
  const values = [
    [user.username, user.password, user.email, user.emailVerified, user.registeredAt]
  ];
  const sql = 'INSERT INTO teama.users (user_name, password, email, email_verified, registered_at) VALUES ?';
  return db.query(sql, [values]);
};

const authenticate = (username, password) =>
  getUser(username).then(user => {
    if (user.getClearTextPassword() !== password) {
      throw new Error("Authentication Failed!");
    }
    return user;
  });


module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  authenticate,
};
