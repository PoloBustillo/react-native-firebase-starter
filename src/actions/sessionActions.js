import * as ActionTypes from './types';


export const loginUserSuccess = (authUser,isAdmin) => ({
  type: ActionTypes.LOGIN_USER_SUCCESS,
  payload: authUser,
  isAdmin: isAdmin
});
