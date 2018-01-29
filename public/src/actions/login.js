export const UPDATE_USERNAME_INPUT = "UPDATE_USERNAME_INPUT";
export const UPDATE_PASSWORD_INPUT = "UPDATE_PASSWORD_INPUT";

const updateUsername = (usr) => ({
  type: "UPDATE_USERNAME_INPUT",
  username: usr,
});

const updatePassword = (pwd) => ({
  type: "UPDATE_PASSWORD_INPUT",
  password: pwd,
});

const inputUsername = (usr) => (dispatch) => {
  dispatch(updateUsername(usr));
};


const inputPassword = (pwd) => (dispatch) => {
  dispatch(updatePassword(pwd));
};

export {
  inputUsername,
  inputPassword
};
