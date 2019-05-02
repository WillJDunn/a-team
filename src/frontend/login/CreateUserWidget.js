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

const doPasswordsMatch = (passwordOne, passwordTwo) => passwordOne === passwordTwo;
const isEmailValid = email => /\S+@\S+\.\S+/.test(email);

const CreateUserWidget = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const onSubmit = (username, password, secondPassword, email) => {
    setError(undefined); // clear previous error
    if (!doPasswordsMatch(password, secondPassword)) {
      setError('Passwords must match!');
      return;
    } else if (!isEmailValid(email)) {
      setError('Email must be a valid email address!');
      return;
    }
    props.onSubmit(username, password, email);
  };
  const errorMsg = error || props.error;
  return (
    <div style={_style.root}>
      <div style={_style.errorContainer}>
        <span style={_style.error}>{errorMsg}</span>
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
          onClick={() => onSubmit(username, password, secondPassword, email)}
          color="primary"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  )
};

CreateUserWidget.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func,
};

CreateUserWidget.defaultProps = {
  onSubmit: () => {},
};

export default CreateUserWidget;
