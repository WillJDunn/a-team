const mysql = require('mysql');
const config = require('../config/db');

// adapted from https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
class PooledDatabaseConnection {
  constructor(connectionConfig) {
    // use pooled connections: https://www.npmjs.com/package/mysql#pooling-connections
    if (!PooledDatabaseConnection.instance) {
      this.pool = mysql.createPool(connectionConfig);
      PooledDatabaseConnection.instance = this;
    }
    return PooledDatabaseConnection.instance;
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          // need to release the connection when done whether through error or successful completion
          //connection.release();
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

// make this a Singleton instance: https://www.sitepoint.com/javascript-design-patterns-singleton/
const instance = new PooledDatabaseConnection(config);
Object.freeze(instance);

module.exports = instance;
