const db = require('./PooledDatabaseConnection');

// https://hackernoon.com/https-medium-com-amanhimself-converting-a-buffer-to-json-and-utf8-strings-in-nodejs-2150b1e3de57
/**
 * Convert a Buffer object returned by MySQL varbinary value to a utf-8 string
 *
 * @param buffer {Buffer}
 * @returns {string} utf-8 string
 */
const convertBufferToString = buffer => buffer.toString('utf-8');

const getUsers = () => db.query('SELECT * from teama.users;');

const getUser = userName => {
  console.log(userName);
  const users = db.query(`SELECT * from teama.users WHERE user_name = ?;`, [userName]);
  return users.then(data => {
    console.log(convertBufferToString(data[0].password));
    return data;
  });
};

const createUser = user => {
  const values = [
    [user.userName, user.password, user.email, user.emailVerified, user.registeredAt]
  ];
  const sql = 'INSERT INTO teama.users (user_name, password, email, email_verified, registered_at) VALUES ?';
  return db.query(sql, [values]);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
