import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const GRAB_ALL_TEAMS_FAILURE = "GRAB_ALL_TEAMS_FAILURE";
export const GRAB_ALL_TEAMS = "GRAB_ALL_TEAMS";
export const GRAB_ALL_TEAMS_REQUEST = "GRAB_ALL_TEAMS_REQUEST";
export const CLEAR_TEAM_DATA = "CLEAR_TEAM_DATA";
export const CLEAR_SEARCH_DATA = "CLEAR_SEARCH_DATA";
export const CLEAR_LOGIN_DATA = "CLEAR_LOGIN_DATA";
export const CLEAR_SIGNUP_DATA = "CLEAR_SIGNUP_DATA";


const requestLogin = user => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  user
});


const receiveLogin = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  user: user
});


const loginError = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  errorMessage: message,
  user: ''
});


const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true,
  user: ''
});


const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false,
  errorMessage: '',
  user: ''
});

const clearTeamData = () => ({
  type: CLEAR_TEAM_DATA
});

const clearSearchData = () => ({
  type: CLEAR_SEARCH_DATA
});

const clearLoginData = () => ({
  type: CLEAR_LOGIN_DATA
});

const clearSignupData = () => ({
  type: CLEAR_SIGNUP_DATA
});

const failedToGrabAllTeams = () => ({
  type: GRAB_ALL_TEAMS_FAILURE,
  isFetching: false,
  teams: []
});

const grabAllTeamsRequest = () => ({
  type: GRAB_ALL_TEAMS_REQUEST,
  isFetching: true,
  teams: []
})

const grabAllTeamsSuccess = (teams) => ({
  type: GRAB_ALL_TEAMS,
  isFetching: false,
  teams
});


const grabAllTeams = (dispatch) => {
  dispatch(grabAllTeamsRequest());

  const token = localStorage.getItem("token");

  return axios.get(`api/teams/${token}`)
    .then(response => {
      if(!response.data) {
        dispatch(failedToGrabAllTopics());
        return Promise.reject(response);
      }

      dispatch(grabAllTeamsSuccess(response.data));
    })
    .catch(err => console.log("ERROR GRABBING ALL TOPICS: ", err));
};


const loginUser = (creds, history) => {
  let axiosBod = {
    username: creds.username,
    password: creds.password
  };

  return (dispatch) => {
    dispatch(requestLogin(creds.username));
    return axios.post(`/api/login`, axiosBod)
      .then(response => {
        if(!response.data.token){
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
        }

        localStorage.setItem('token', response.data.token);
        const username = response.data.user.username;
        const favorite_teams = response.data.user.favorite_teams;
        const userId = response.data.user.id;
        const user = { userId, username, favorite_teams };

        grabAllTeams(dispatch);
        dispatch(receiveLogin(user));
        history.push('/');
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };
};


const signupUser = (creds, history) => {
  const axiosBod = {
    username: creds.username,
    password: creds.password,
  };

  return (dispatch) => {
    dispatch(requestLogin(creds));
    return axios.post('/api/signup', axiosBod)
      .then(response => {
        if (!response.data.token) {
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
        }

        localStorage.setItem('token', response.data.token);
        const username = response.data.user.username;
        const favorite_teams = response.data.user.favorite_teams;
        const userId = response.data.user.id;
        const user = { userId, username, favorite_teams };

        grabAllTeams(dispatch);
        dispatch(receiveLogin(user));
        history.push("/");
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };
};


const logoutUser = (history) => (dispatch) => {
  dispatch(requestLogout());
  dispatch(clearTeamData())
  dispatch(clearSearchData())
  dispatch(clearLoginData())
  dispatch(clearSignupData())
  localStorage.removeItem('token');
  dispatch(receiveLogout());
  history.push('/');
};


export {
  logoutUser,
  signupUser,
  loginUser,
  grabAllTeams
};
