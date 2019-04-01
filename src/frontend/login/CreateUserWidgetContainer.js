import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux-starter-kit';
import { withRouter } from 'react-router-dom';
import CreateUserWidget from './CreateUserWidget';
import { login } from './LoginWidgetContainer';
import { createUserSucceeded, createUserFailed } from '../reducers/user';
import * as selectors from '../reducers/rootReducer';


export const createUser = (username, password, email, history) => dispatch => {
  const data = { username, password, email };
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch('/api/users', opts)
    .then(response => {
      if (Math.floor(response.status / 100 ) !== 2) { // failure
        throw new Error('Create User failed!');
      } // success
      dispatch(createUserSucceeded());
      return dispatch(login(username, password, history));
    })
    .catch(err => dispatch(createUserFailed(err.message)));
};

const CreateUserWidgetContainer = props => {
  return (
    <CreateUserWidget error={props.error} onSubmit={props.createUser}/>
  );
};

CreateUserWidgetContainer.propTypes = {
  // from connect
  error: PropTypes.string,
  createUser: PropTypes.func,
};

const mapStateToProps = state => ({
  error: selectors.getCreateUserError(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  createUser: (username, password, email) =>
    dispatch(createUser(username, password, email, props.history)),
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(CreateUserWidgetContainer);
