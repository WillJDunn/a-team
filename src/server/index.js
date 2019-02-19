const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger');
const userRoutes = require('./routes/user');

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

// Put new routes for new resources in their own file under the routes directory and then
// apply them to the app in this way.
// More information here: https://expressjs.com/en/guide/routing.html
app.use('/api/user', userRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Express server is running on localhost:${SERVER_PORT}`);
});
