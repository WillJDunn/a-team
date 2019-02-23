const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger');
const uuid = require('uuid');
const session = require('express-session');

const userRoutes = require('./routes/user');

const SERVER_PORT = process.env.SERVER_PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// adds fairly verbose logging to the npm server start command
app.use(pino());

// authentication setup tutorial found here
// https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
app.use(session({
  genid: req => {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    return uuid(); // use UUIDs for session IDs
  },
  secret: 'keyboard cat',  // FIXME what is best practice around this
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  console.log('got GET on root');
  console.log(req.sessionID);
  res.send(`You hit home page!\n`)  res.send('Hello world!');
});

app.get('/api/greeting', (req, res) => {
  console.log('got GET request at /api/greeting');
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// Put new routes for new resources in their own file under the routes directory and then
// apply them to the app in this way.
// More information here: https://expressjs.com/en/guide/routing.html
app.use('/api/user', userRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Express server is running on localhost:${SERVER_PORT}`);
});
