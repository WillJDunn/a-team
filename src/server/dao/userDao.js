const mysql = require('mysql');

// not sure where the best place for this is, but this is not it
const config = {
  host     : 'localhost',
  user     : 'dbuser',
  password : 'ATeamDBUser2019!',
  database : 'ateam',
  connectionLimit: 10 // default
};

// adapted from https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
class PooledDatabaseConnection {
  constructor(connectionConfig) {
    // use pooled connections: https://www.npmjs.com/package/mysql#pooling-connections
    this.pool = mysql.createPool(connectionConfig);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          // need to release the connection when done whether through error or successful completion
          connection.release();
          return reject(err);
        }
        connection.query(sql, args, (err, rows) => {
          if (err) {
            connection.release();
            return reject(err);
          }
          connection.release();
          resolve(rows);
        });
      });
    });
  }
}

const getUsers = () => {
  const db = new PooledDatabaseConnection(config);
  return db.query('SELECT * from User;')
};

const getUser = (userId) => {
  const db = new PooledDatabaseConnection(config);
  return db.query(`SELECT * from User WHERE id = ?;`, [userId]);
};

module.exports = {
  getUsers,
  getUser,
};
