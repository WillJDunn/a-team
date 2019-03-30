const db = require('./PooledDatabaseConnection');
const User = require('../dto/User');

const cleanUser = user => {
  const outputUser = { ...user };
  delete outputUser.password;
  return outputUser;
};

const getUsers = () => db.query('SELECT * from teama.users;')
  .then(results => results.map(result => cleanUser(User.fromDB(result))));

const getUser = userName => {
  return db.query(`SELECT *
                   from teama.users
                   WHERE user_name = ?;`, [userName])
    .then(data => User.fromDB(data[0]));
};

const getUserById = userId =>
  db.query(`SELECT * from teama.users WHERE user_id = ?;`, [userId])
    .then(data => cleanUser(User.fromDB(data[0])));


const createUser = user => {
  const values = [user.username, user.password, user.email];
  const sql = 'SET @userId = 0; CALL add_user(?, ?, ?, ?, @userId); SELECT @userId as userId';
  return db.query(sql, values)
    .then(dbRes => {
      const rows = dbRes[dbRes.length - 1];
      return rows[0].userId;
    });
};

async function authenticate(username, password) {
  const user = await getUser(username);
  const sql = 'CALL check_user_password_by_user_name(?, ?)';
  return db.query(sql, [username, password])
    .then(dbRes => {
      // select response is first element in db response and select response contains one row
      const selectRes = dbRes[0];
      const { user_id } = selectRes[0];
      if (user_id !== user.id) {
        throw new Error("Authentication Failed!");
      }
      return cleanUser(user);
    });
}

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  authenticate,
};
