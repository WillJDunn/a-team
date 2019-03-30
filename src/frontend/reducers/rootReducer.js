import { combineReducers } from 'redux-starter-kit';
import user, * as fromUser from './user';


export default combineReducers({ user });

export const getUserIsError = state => fromUser.getIsError(state.user);
export const getUsername = state => fromUser.getUsername(state.user);
export const getCreateUserError = state => fromUser.getCreateUserError(state.user);

