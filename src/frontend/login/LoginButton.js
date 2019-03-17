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
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </Button>
);

LoginButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

LoginButton.defaultProps = {
  onClick: () => {},
};

export default LoginButton;
