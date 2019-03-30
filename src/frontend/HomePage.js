import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LoginButtonContainer from './login/LoginButtonContainer';

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
              <LoginButtonContainer />
            </div>
          </div>
      </AppBar>
      {props.location.pathname !== '/projects' && (
        <Button onClick={() => props.history.push('/projects')}>
          Projects
        </Button>
      )}
    </React.Fragment>
  );
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomePage;
