import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginButton from './LoginButton';
import { withRouter } from 'react-router-dom';
import * as selectors from '../reducers/rootReducer';

const LoginButtonContainer = props => {
  console.log(props);
  return (
    <LoginButton onClick={() => props.history.push('/login')} />
  );
};

LoginButtonContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  username: selectors.getU
});

export default withRouter(LoginButtonContainer);
