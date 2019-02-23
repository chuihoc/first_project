import Cookie from 'js-cookie';

import { PENDING, SUCCESS, ERROR, FETCHING_DATA, SIGN_OUT, UPDATE_ROLES, UPDATE_USER_INFO } from '../utils/constants/actionType';
import { Constants } from '../utils/constants';

export const actionFetchingDataPending = () => {
  return {
    type: FETCHING_DATA + PENDING
  }
}

export const actionFetchingDataSuccess = () => {
  return {
    type: FETCHING_DATA + SUCCESS
  }
}

export const actionFetchingDataError = () => {
  return {
    type: FETCHING_DATA + ERROR
  }
}

export const actionLogout = () => {
  Cookie.remove(Constants.JWT);
  Cookie.remove(Constants.EXPIRED);
  Cookie.remove(Constants.USER_ROLES);
  return {
    type: SIGN_OUT
  };
}

export const actionUpdateRoles = (role) => {
  Cookie.set(Constants.USER_ROLES, role);
  return {
    type: UPDATE_ROLES,
    payload: role
  }
}

export const actionUpdateUserInfo = (userInfo) => {
  return {
    type: UPDATE_USER_INFO,
    payload: userInfo
  }
}