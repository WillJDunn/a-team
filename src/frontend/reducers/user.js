import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

// actions
export const loginSucceeded = user => ({
  type: actionTypes.LOGIN_SUCCEEDED,
  payload: { user },
});

export const loginFailed = () => ({
  type: actionTypes.LOGIN_FAILED,
});

export const createUserSucceeded = () => ({
  type: actionTypes.CREATE_USER_SUCCEEDED,
});

export const createUserFailed = error => ({
  type: actionTypes.CREATE_USER_FAILED,
  payload: { error },
});

// state
const initialState = fromJS({
  isError: false,
  user: undefined,
});

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCEEDED:
      return state
        .set('user', fromJS(action.payload.user))
        .set('isError', false);
    case actionTypes.LOGIN_FAILED:
      return state.set('isError', true);
    case actionTypes.CREATE_USER_SUCCEEDED:
      return state.set('createError', undefined);
    case actionTypes.CREATE_USER_FAILED:
      console.log(action.payload);
      return state.set('createError', action.payload.error);
    default:
      return state;
  }
};

export const getIsError = state => state.get('isError');
export const getUsername = state => state.getIn(['user', 'username']);
export const getCreateUserError = state => state.get('createError');

export default user;
