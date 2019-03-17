import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const _style = {
  loginButton: {
    color: 'white',
  },
};

const LoginButton = props => (
  <Button
    style={_style.loginButton}
    onClick={props.onClick}>
    Login
  </Button>
);

LoginButton.propTypes = {
  onClick: PropTypes.func,
};

LoginButton.defaultProps = {
  onClick: () => {},
};

export default LoginButton;
