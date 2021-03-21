import {
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
  CLEAR_PROFILE,
} from 'actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  registerSucceeded: false,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSucceeded: true,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        registerSucceeded: false,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGOUT:
    case CLEAR_PROFILE:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        registerSucceeded: false,
        user: null,
      };
    default:
      return state;
  }
}
