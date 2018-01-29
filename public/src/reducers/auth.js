import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/auth';

import {
  HIGHLIGHT_FAVORITE
} from '../actions/team';


const auth = (state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token'),
  errorMessage: '',
  user: ''
}, action) => {
  switch (action.type) {
    case HIGHLIGHT_FAVORITE:
      return {
        ...state,
        user: action.user
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.message,
        user: action.user
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user
      };
    default:
      return state;
  }
};

export default auth;
