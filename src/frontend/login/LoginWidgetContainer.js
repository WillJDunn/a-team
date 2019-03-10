import React from 'react';
import { connect } from 'react-redux';
import LoginWidget from './LoginWidget';
import { loginSuccessful, loginFailed  } from '../reducers/user';
import * as selectors from '../reducers/rootReducer';
import { withRouter } from 'react-router-dom';

const login = (username, password, history) => dispatch  => {
  const data = { username, password };
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch('/login', opts)
    .then(response => {
      if (Math.floor(response.status / 100 ) !== 2) {
        dispatch(loginFailed());
        throw new Error();
      }
      return response;
    })
    .then(response => response.json())
    .then(user => dispatch(loginSuccessful(user)))
    .then(() => {
      history.push('/');
    })
    .catch(() => dispatch(loginFailed()));
};

const LoginWidgetContainer = ({ onSubmit, error, history }) => (
  <LoginWidget onSubmit={onSubmit(history)} error={error} />
);

const mapStateToProps = state => ({
  error: selectors.getUserIsError(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: history => (username, password) => dispatch(login(username, password, history))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginWidgetContainer));
