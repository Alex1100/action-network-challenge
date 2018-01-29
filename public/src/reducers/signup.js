import {
  UPDATE_USERNAME_INPUT,
  CLEAR_LOGIN,
  UPDATE_PASSWORD_INPUT
} from '../actions/login';

import {
  CLEAR_SIGNUP_DATA
} from '../actions/auth';

const signup = (state = {
  username: '',
  password: '',
}, action) => {
  switch (action.type) {
    case UPDATE_USERNAME_INPUT:
      return {
        ...state,
        username: action.username,
      };
    case UPDATE_PASSWORD_INPUT:
      return {
        ...state,
        password: action.password,
      };
    case CLEAR_LOGIN:
      return {
        ...state,
        password: action.password,
      };
    case CLEAR_SIGNUP_DATA:
      return {
        ...state,
        username: '',
        password: '',
      };
    default:
      return state;
  }
};

export default signup;
