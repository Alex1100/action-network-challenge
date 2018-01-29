import React,
{
  Component
} from 'react';

import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap';

import {
  Link
} from 'react-router-dom';

const GuestNav = (props) => (
  <div>
    <Navbar>
      <Nav>
        <NavItem>
          <Link to="/">
            <h1>Action-Network</h1>
          </Link>
        </NavItem>
        <NavItem>
          <Link
            to="/login">
            Login
          </Link>
        </NavItem>
        <NavItem className="guest-signup">
          <Link
            to="/signup">
            Signup
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
)

export default GuestNav;
