import {
  SELECT_TAB,
  FILTER_SEARCHED_TEAMS,
  NO_RESULT_FOUND
} from '../actions/team';

import {
  GRAB_ALL_TEAMS_FAILURE,
  GRAB_ALL_TEAMS,
  GRAB_ALL_TEAMS_REQUEST,
  CLEAR_TEAM_DATA
} from '../actions/auth';

import {
  FILTER_TEAMS,
  NO_RESULT_MESSAGE
} from '../actions/search';


const teamData = (state = {
  isFetching: false,
  teams: [],
  selectedSport: 'NBA',
  filteredTeams: [],
  message: '',
}, action) => {
  switch (action.type) {
    case NO_RESULT_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case NO_RESULT_FOUND:
      return {
        ...state,
        message: action.message
      };
    case FILTER_SEARCHED_TEAMS:
      return {
        ...state,
        message: action.message,
        filteredTeams: action.filteredTeams
      };
    case FILTER_TEAMS:
      return {
        ...state,
        message: action.message,
        filteredTeams: action.filteredTeams
      };
    case SELECT_TAB:
      return {
        ...state,
        message: '',
        selectedSport: action.selectedSport
      };
    case GRAB_ALL_TEAMS_REQUEST:
      return {
        ...state,
        message: '',
        isFetching: action.isFetching,
      };
    case GRAB_ALL_TEAMS:
      return {
        ...state,
        isFetching: action.isFetching,
        teams: action.teams
      };
    case GRAB_ALL_TEAMS_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case SELECT_TAB:
      return {
        ...state,
        message: '',
        selectedSport: action.selectedSport
      };
    case CLEAR_TEAM_DATA:
      return {
        ...state,
        isFetching: false,
        teams: [],
        selectedSport: 'NBA',
        filteredTeams: [],
        message: ''
      };
    default:
      return state;
  }
};

export default teamData;

