const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger');
const mysql = require('mysql');

const SERVER_PORT = process.env.SERVER_PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// adds fairly verbose logging to the npm server start command
app.use(pino());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 'ATeamDBUser2019!',
  database : 'ateam'
});

connection.connect();

app.get('/', (req, res) => {
  console.log('got GET on root');
  res.send('Hello world!');
});

app.get('/api/greeting', (req, res) => {
  console.log('got GET request at /api/greeting');
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/user', (req, res) => {
  connection.query('SELECT * from User;', function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('The solution is: ', results);
    console.log('Fields: ', fields);
    res.send(JSON.stringify(results));
  });

  app.get('/api/user/:userId', (req, res) => {
    const userId = req.params.userId;
    connection.query(`SELECT * from User where id = "${userId}"`, (error, results, fields) => {
      if (error) {
        throw error
      }
      console.log('Results: ', results);
      console.log('Fields: ', fields);
      res.send(JSON.stringify(results));
    });
  });

  // connection.end();
});

app.listen(SERVER_PORT, () => {
  console.log(`Express server is running on localhost:${SERVER_PORT}`);
});
