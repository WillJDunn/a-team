const mysql = require('mysql');

const config = {
  host     : 'localhost',
  user     : 'dbuser',
  password : 'ATeamDBUser2019!',
  database : 'ateam'
};

const pooledConfig = config.connectionLimit = 10; // arbitrary number of connections



// const connection = mysql.createConnection(config);

// connection.connect();
// taken from https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
class Database {
  constructor(connectionConfig) {
    // use pooled connections: https://www.npmjs.com/package/mysql#pooling-connections
    this.connection = mysql.createPool(connectionConfig);
    // this.connection = mysql.createConnection(config);
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

const getUsers = () => {
  const db = new Database(pooledConfig);
  const results = db.query('SELECT * from User;');
  db.close();
  return results;
};

const getUser = (userId) => {
  const db = new Database(pooledConfig);
  const results =  db.query(`SELECT * from User WHERE id = ?;`, [userId]);
  db.close();
  return results;
};

module.exports = {
  getUsers,
  getUser,
};
