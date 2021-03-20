import axios from 'axios';

import { setAlert } from './alert';
import setAuthToken from 'utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from './types';

export const loadUser = () => async (dispatch) => {
  const token = localStorage.token;
  setAuthToken(token);
  if (token) {
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

export const register = ({ name, email, password, passwordConfirm }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    email,
    name,
    password,
    passwordConfirm,
  };
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(
      setAlert(
        'Register succeeded, please check your email to activate your account',
        'success'
      )
    );
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = { email, password };

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
