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
  const values = [user.username, user.password, user.email];
  const sql = 'SET @userId = 0; CALL add_user(?, ?, ?, ?, @userId); SELECT @userId as userId';
  return db.query(sql, values)
    .then(dbRes => {
      const rows = dbRes[dbRes.length - 1];
      return rows[0].userId;
    });
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
