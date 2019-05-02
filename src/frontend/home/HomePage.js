import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar/index';
import LoginButtonContainer from '../login/LoginButtonContainer';
import NavigationButtonContainer from './NavigationButtonContainer';

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
          <div style={_style.title}>
            <NavigationButtonContainer />
          </div>
          <div style={_style.loginButtonContainer}>
            <LoginButtonContainer />
          </div>
        </div>
      </AppBar>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomePage;
