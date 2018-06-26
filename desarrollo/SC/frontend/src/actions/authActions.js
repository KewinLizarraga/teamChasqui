import { tinkuyAxios } from '../services/axios';
import { logout as logoutService } from '../services/AuthService';

// constants
export const LOADING_BEGIN = 'LOADING_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const CLEAR_ERROR = 'CLEAR_ERROR';

//actions
export const clearError = () => ({
  type: CLEAR_ERROR
})
export const loadingBegin = () => ({
  type: LOADING_BEGIN
});

export const loginSuccess = ({ user, token }) => {
  window.localStorage.setItem('token', token);
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
};

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

export const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  payload: error
});

export const logout = () => {
  logoutService()
  return {
    type: LOGOUT
  }
}

export const login = (datos) => (dispatch) => {
  // INICIO
  dispatch(loadingBegin());
  // CONSULTA ASINCRONICA
  return tinkuyAxios({
    method: 'post',
    url: '/auth/login',
    data: datos
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(loginSuccess(response.data));
    }
    else {
      dispatch(loginFailed(response.data));
    }
    return response;
  });
  //FINAL
}

export const register = (datos) => (dispatch) => {
  dispatch(loadingBegin());

  return tinkuyAxios({
    method: 'post',
    url: '/auth/signup',
    data: datos
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(registerSuccess())
    } else {
      dispatch(registerFailed(response.data));
    }
    return response;
  }, err => {
    return Promise.reject(err.response);
  })
}
