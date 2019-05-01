const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger');
const uuid = require('uuid');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userDao = require('./dao/userDao');
const usersRoutes = require('./routes/users');
const projectsRoutes = require('./routes/projects');
const boardsRoutes = require('./routes/boards');
const cors = require('cors');
const chat = require('.routes/chat');

const SERVER_PORT = process.env.SERVER_PORT || 3001;

passport.use(new LocalStrategy(
  // "username" is the default, but if our request contains a different field, we could change it here
  {usernameField: 'username' },
  (username, password, done) => {
    userDao.authenticate(username, password)
      .then(user => {
        // auth succeeded
        return done(null, user);
      })
      // auth failed
      .catch(() => done(null, false, { message: 'Authentication Failed!'}));

  })
);

passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => {
  userDao.getUser(username)
    .then(user => done(null, user))
    .catch(error => done(error, false));
});

const app = express();

// to give us automated parsing of request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cors());

// adds fairly verbose logging to the npm server start command
app.use(pino());

// authentication setup tutorial found here
// https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
app.use(session({
  genid: () => uuid(), // use UUIDs for session IDs
  store: new FileStore(),
  secret: 'keyboard cat',  // FIXME what is best practice around this
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  console.log('got GET on root');
  console.log(req.sessionID);
  console.log(`You hit home page!`);
  res.send('Hello world!');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, err => {
      if (err) {
        return next(err);
      }
      const outputUser = { ...req.user };
      delete outputUser.password;
      return res.status(200).json(outputUser);
    });
  })(req, res, next);
});

app.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        next(err);
      }
      req.logout();
      res.status(200).json({ message: 'Logout successful '});
    });
  }
});


app.get('/authrequired', (req, res) => {
  console.log('inside GET /authrequired callback');
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) {
    res.send('you hit the authenticated endpoint');
  } else {
    res.redirect('/');
  }
});


// Put new routes for new resources in their own file under the routes directory and then
// apply them to the app in this way.
// More information here: https://expressjs.com/en/guide/routing.html
app.use('/api/users', usersRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/projects/', boardsRoutes);
app.use('/api/chat', chat);

app.listen(SERVER_PORT, () => {
  console.log(`Express server is running on localhost:${SERVER_PORT}`);
});
