import React,
{
  Component
} from 'react';

import {
  connect
} from 'react-redux';

import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

//Stateless
import GuestNav from '../components/GuestNav';
import UserNav from '../components/UserNav';
import LandingPage from '../components/LandingPage';

//Stateful
import Login from './Login';
import Signup from './Signup';
import SearchContainer from './SearchContainer';


class Router extends Component {

  render() {
    const {
      dispatch,
      history,
      user,
      isAuthenticated
    } = this.props;

    return isAuthenticated ? (
      <Switch>
        <Route
          exact
          path="/">
            <div>
              <UserNav
                dispatch={dispatch}
                history={history}
                user={user}
              />
              <SearchContainer
                dispatch={dispatch}
                history={history}
                user={user}
              />
            </div>
        </Route>
      </Switch>
    ) : (
      <Switch>
        <Route
          exact
          path="/">
            <div>
              <GuestNav
                dispatch={dispatch}
                history={history}
              />
              <LandingPage
                dispatch={dispatch}
                history={history}
              />
            </div>
        </Route>
        <Route
        exact
        path="/login">
          <div>
            <GuestNav
              dispatch={dispatch}
              history={history}
            />
            <Login
              dispatch={dispatch}
              history={history}
            />
          </div>
        </Route>
        <Route
          exact
          path="/signup">
            <div>
              <GuestNav
                dispatch={dispatch}
                history={history}
              />
              <Signup
                dispatch={dispatch}
                history={history}
              />
            </div>
        </Route>
      </Switch>
    );
  }
}


const mapStateToProps = (state) => {
  const {
    auth
  } = state;

  const {
    isAuthenticated,
    user
  } = auth;

  return {
    isAuthenticated,
    user
  };
};

export default withRouter(connect(mapStateToProps)(Router));
