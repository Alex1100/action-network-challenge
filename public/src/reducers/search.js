import {
  UPDATE_SEARCH_TERM
} from '../actions/search';

import {
  CLEAR_SEARCH_DATA
} from '../actions/auth';

const search = (state = {
  term: ''
}, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        term: action.term
      };
    case CLEAR_SEARCH_DATA:
      return {
        ...state,
        term: ''
      };
    default:
      return state;
  }
};

export default search;
