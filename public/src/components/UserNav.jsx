import React,
{
  Component
} from 'react';

import {
  Nav,
  Navbar,
  NavItem,
  Button
} from 'react-bootstrap';

import {
  Link
} from 'react-router-dom';

import {
  logoutUser
} from '../actions/auth';


const UserNav = (props) => (
  <div>
    <Navbar>
      <Nav>
        <NavItem>
          <h3>{props.user.username} <span className="glyphicon glyphicon-user"></span></h3>
        </NavItem>
        <NavItem>
          <Link
            to="/"
            onClick={() => props.dispatch(
              logoutUser(
                props.history
              )
            )}>
            Logout
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
);

export default UserNav;
