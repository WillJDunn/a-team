import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

// actions
export const loginSuccessful = user => ({
  type: actionTypes.LOGIN_SUCCESSFUL,
  payload: { user },
});

export const loginFailed = () => ({
  type: actionTypes.LOGIN_FAILED,
});

// state
const initialState = fromJS({
  isError: false,
  user: undefined,
});

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFUL:
      return state
        .set('user', fromJS(action.payload.user))
        .set('isError', false);
    case actionTypes.LOGIN_FAILED:
      return state.set('isError', true);
    default:
      return state;
  }
};

export const getIsError = state => state.get('isError');

export default user;
