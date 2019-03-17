import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux-starter-kit';
import { withRouter } from 'react-router-dom';
import CreateUserWidget from './CreateUserWidget';
import { login } from './LoginWidgetContainer';


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
      console.log(response);
      if (Math.floor(response.status / 100 ) !== 2) { // failure
        throw new Error('Create User failed!');
      } // success
      return dispatch(login(username, password, history));
    })
    .catch(err => console.log(err));
};

const CreateUserWidgetContainer = props => {
  return (
    <CreateUserWidget onSubmit={props.createUser}/>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  createUser: (username, password, email) =>
    dispatch(createUser(username, password, email, props.history)),
});

const enhance = compose(
  withRouter,
  connect(null, mapDispatchToProps),
);

export default enhance(CreateUserWidgetContainer);
