import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux-starter-kit';
import { connect } from 'react-redux';
import LoginButton from './LoginButton';
import { withRouter } from 'react-router-dom';
import * as selectors from '../reducers/rootReducer';

const LoginButtonContainer = props => {
  return (
    <LoginButton
      disabled={Boolean(props.username)}
      onClick={() => props.history.push('/login')}>
      {props.username || 'LOGIN'}
    </LoginButton>
  );
};

LoginButtonContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  username: selectors.getUsername(state),
});

const enhanced = compose(
  withRouter,
  connect(mapStateToProps)
);

export default enhanced(LoginButtonContainer);
