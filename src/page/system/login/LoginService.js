import Cookie from 'js-cookie';

import * as Services from '../../../services/api';
import { Constants } from '../../../utils/constants';

export const requestLogin = users => {
  Cookie.remove(Constants.EXPIRED);
  Cookie.remove(Constants.JWT);
  Cookie.remove(Constants.USER_ROLES);
  if (users.rememberMe) {
    Cookie.set(Constants.LAST_LOGIN, users.username)
  } else {
    Cookie.remove(Constants.LAST_LOGIN)
  }
  return Services.makePostRequest({
    url: 'api/authenticate',
    noAuth: true,
    notNotice: true,
    data: users
  });
}

export const getAccountInfo = () => {
  return Services.makeGetRequest({
    url : 'api/account'
  })
}