import React, { useState } from 'react';
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
  return (
    <div style={_style.root}>
      <TextField
        required
        label="Username"
        value={username}
        onChange={evt => {setUsername(evt.target.value)}}
      />
      <TextField
        required
        label="Password"
        value={password}
        type="password"
        onChange={evt => {setPassword(evt.target.value)}}
      />
      <Button
        variant="contained"
        onClick={() => alert(`Username: ${username} Password: ${password}`)}
        color="primary"
      >
        SUBMIT
      </Button>
    </div>
  )
};

export default LoginWidget;
