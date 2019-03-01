import React, { useState, useGlobal } from 'reactn';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const _style = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
  },
};

// React Hooks: https://reactjs.org/docs/hooks-intro.html
const LoginWidget = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // FIXME figure out reactn global state.  We are not getting updated values in render each time
  // the "username" and "password" get set...
  // const [username, setUsername] = useGlobal('username');
  // const [password, setPassword] = useGlobal('password');
  const [isError, setError] = useState(false);
  // console.log(username, password);
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
    window.location = '/'; // FIXME this should be react-router push
  }
  return (
    <div style={_style.root}>
      {isError && <div style={_style.error}>Authentication Failed!</div>}
      <TextField
        required
        label="Username"
        value={username}
        onChange={evt => setUsername(evt.target.value)}
      />
      <TextField
        required
        label="Password"
        value={password}
        type="password"
        onChange={evt => setPassword(evt.target.value)}
      />
      <Button
        variant="contained"
        disabled={!Boolean(username && password)}
        onClick={() => login(username, password)}
        color="primary"
      >
        SUBMIT
      </Button>
    </div>
  )
};

export default LoginWidget;
