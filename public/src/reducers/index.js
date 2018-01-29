import {
  combineReducers
} from 'redux';

import auth from './auth';
import login from './login';
import signup from './signup';
import search from './search';
import teamData from './team';

const RootReducer = combineReducers({
  auth,
  login,
  signup,
  search,
  teamData
});

export default RootReducer;
