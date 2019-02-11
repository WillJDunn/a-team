const mysql = require('mysql');

const config = {
  host     : 'localhost',
  user     : 'dbuser',
  password : 'ATeamDBUser2019!',
  database : 'ateam'
};

// const connection = mysql.createConnection(config);

// connection.connect();
// taken from https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
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

export const getUsers = () => {
  const db = new Database(config);
  return db.query('SELECT * from User;');
};

export const getUser = (userId) => {
  const db = new Database(config);
  return db.query(`SELECT * from User WHERE  ?;`, [userId]);
};

