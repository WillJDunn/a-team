import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  return (
    <div style={_style.root}>
      <div style={_style.errorContainer}>
        <span style={_style.error}>{props.error && 'Authentication Failed!'}</span>
      </div>
      <div style={_style.textContainer}>
        <TextField
          autoFocus
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
          onClick={() => props.onSubmit(username, password)}
          color="primary"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  )
};

LoginWidget.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.bool,
};

LoginWidget.defaultProps = {
  onSubmit: () => {},
};

export default LoginWidget;
