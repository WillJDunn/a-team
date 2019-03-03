import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const _style = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 212,
  },
  errorContainer: {
    margin: 6,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  error: {
    color: 'red',
  },
  textContainer: {
    margin: 6,
  },
  buttonContainer: {
    margin: 6,
  }
};

const doPasswordsMatch = (passwordOne, passwordTwo) => passwordOne === passwordTwo;
const isEmailValid = email => /\S+@\S+\.\S+/.test(email);

const CreateUserWidget = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  async function createUser(username, password, email) {
    if (!doPasswordsMatch(password, secondPassword)) {
      setError('Passwords must match!');
      return;
    }
    if (!isEmailValid(email)) {
      setError('Email must be a valid email address!');
      return;
    }
    const data = { username, password, email };
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch('/createUser', opts);
    if (Math.floor(response.status / 100 ) !== 2) { // failure
      setError('Create User failed!');
      return;
    } // success
    const user = await response.json();
    console.log(user);
    window.location = '/'; // FIXME this should be react-router push
  }
  return (
    <div style={_style.root}>
      <div style={_style.errorContainer}>
        <span style={_style.error}>{error}</span>
      </div>
      <div style={_style.textContainer}>
        <TextField
          required
          label="Username"
          value={username}
          onChange={evt => setUsername(evt.target.value)}
        />
      </div>
      <div style={_style.textContainer}>
        <TextField
          required
          label="Password"
          value={password}
          type="password"
          onChange={evt => setPassword(evt.target.value)}
        />
      </div>
      <div style={_style.textContainer}>
        <TextField
          required
          label="Reenter Password"
          value={secondPassword}
          type="password"
          onChange={evt => setSecondPassword(evt.target.value)}
        />
      </div>
      <div style={_style.textContainer}>
        <TextField
          required
          label="Email"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
        />
      </div>
      <div style={_style.buttonContainer}>
        <Button
          variant="contained"
          fullWidth
          disabled={!Boolean(username && password && secondPassword && email)}
          onClick={() => createUser(username, password, email)}
          color="primary"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  )
};

export default CreateUserWidget;
