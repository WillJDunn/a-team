import { combineReducers } from 'redux-starter-kit';
import user, * as fromUser from './user';


export default combineReducers({ user });

export const getUserIsError = state => fromUser.getIsError(state.user);

