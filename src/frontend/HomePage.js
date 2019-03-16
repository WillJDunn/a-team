import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const _style = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  appBarContents: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 12,
  },
  loginButtonContainer: {
    marginLeft: 'auto',
    marginRight: 12,
  },
  loginButton: {
    color: 'white',
  },
};

const HomePage = props => {
  return (
    <React.Fragment>
      <AppBar position="static">
          <div style={_style.appBarContents}>
            <div style={_style.title}>A Team</div>
            <div style={_style.loginButtonContainer}>
              <Button
                style={_style.loginButton}
                onClick={() => props.history.push('/login')}>
                Login
              </Button>
            </div>
          </div>
      </AppBar>
      <Button onClick={() => props.history.push('/projects')}>
        Projects
      </Button>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomePage;
