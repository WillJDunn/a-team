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

// React Hooks: https://reactjs.org/docs/hooks-intro.html
const LoginWidget = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState(false);
  async function login(username, password) {
    const data = { username, password };
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch('/login', opts);
    if (Math.floor(response.status / 100 ) !== 2) { // failure
      setError(true);
      return;
    } // success
    const user = await response.json();
    console.log(user);
    window.location = '/'; // FIXME this should be react-router push
  }
  return (
    <div style={_style.root}>
      <div style={_style.errorContainer}>
        <span style={_style.error}>{isError && 'Authentication Failed!'}</span>
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
      <div style={_style.buttonContainer}>
        <Button
          variant="contained"
          fullWidth
          disabled={!Boolean(username && password)}
          onClick={() => login(username, password)}
          color="primary"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  )
};

export default LoginWidget;
