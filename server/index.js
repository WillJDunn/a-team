const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger');
const userDao = require('./dao/userDao.js');

const SERVER_PORT = process.env.SERVER_PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// adds fairly verbose logging to the npm server start command
app.use(pino());


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
  userDao.getUsers().then(rows => {
    res.send(JSON.stringify(rows));
  });
});

app.get('/api/user/:userId', (req, res) => {
  userDao.getUser(req.params.userId).then(row => {
    res.send(JSON.stringify(row));
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`Express server is running on localhost:${SERVER_PORT}`);
});
