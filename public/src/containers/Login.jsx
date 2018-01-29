import React,
{
  Component
} from 'react';

import {
  loginUser
} from '../actions/auth';

import {
  inputUsername,
  inputPassword
} from '../actions/login';


import {
  connect
} from 'react-redux';


class Login extends Component {
  constructor(props) {
    super(props);

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.LoginUser = this.LoginUser.bind(this);
  }

  handleUsername(e) {
    this.props.dispatch(inputUsername(e.target.value));
  }

  handlePassword(e) {
    this.props.dispatch(inputPassword(e.target.value));
  }

  LoginUser(){
    const {
      username,
      password,
      dispatch,
      history
    } = this.props;

    if(
      username.length >= 6 &&
      password.length >= 6
    ){
      dispatch(loginUser({ username, password }, history))
    }
  }

  render() {
    const {
      username,
      password
    } = this.props;

    return (
      <div>
        <div className="login-container">
          <form>
            <label className="login-username-label">
              Username
            </label>
            <input
              className="login-username-input"
              type='text'
              name='username'
              onChange={(e) => {
                e.preventDefault();
                this.handleUsername(e);
              }}
              value={username}
            />
            <br/>
            <label className="login-password-label">
              Password
            </label>
            <input
              className="login-password-input"
              type='password'
              name='password'
              onChange={(e) => {
                e.preventDefault();
                this.handlePassword(e);
              }}
              value={password}
            />
            <br/>
            <button
              className="login-submit-btn"
              onClick={(e) => {
                e.preventDefault();
                this.LoginUser();
              }}>
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    login
  } = state;

  const {
    username,
    password
  } = login;

  return {
    username,
    password,
  };
};


export default connect(mapStateToProps)(Login);
