import axios from 'axios';
import Cookie from 'js-cookie';
import { store } from '../index';

import { actionFetchingDataPending, actionFetchingDataError, actionFetchingDataSuccess } from '../actions/system';
import { Constants } from '../utils/constants'

const requestProcess = request => {
  if (request.url && request.url.indexOf('http') === -1) {
    request.url = request.url = Constants.BASE_URL + request.url;
  }
  if (!request.noAuth) {
    request.headers = {
      ...{ 'Content-Type': 'application/json' },
      ...{ Authorization: "Bearer " + Cookie.get(Constants.JWT) },
      ...request.headers
    }
  }
  request.withCredentials = true;
  return request;
}

axios.interceptors.request.use( config => {
    // Do something before request is sent
    store.dispatch(actionFetchingDataPending());
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

axios.interceptors.response.use(
  response => {
    // Do something with response data
    store.dispatch(actionFetchingDataSuccess());
    return response;
  }, error => {
    // Do something with response error
    store.dispatch(actionFetchingDataError());
    window.location.href = "#/logout";
    return Promise.reject(error);
  });

export const makeGetRequest = request => {
  return axios(requestProcess({...request, 'method': 'get'}))
}

export const makePostRequest = request => {
  return axios(requestProcess({...request, 'method': 'post'}))
}

export const makePutRequest = request => {
  return axios(requestProcess({...request, 'method': 'put'}))
}

export const makeDeleteRequest = request => {
  return axios(requestProcess({...request, 'method': 'delete'}))
}
