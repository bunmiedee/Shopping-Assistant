import * as ActionTypes from './constants';

const doLogin = (username, password) => ({
  type: ActionTypes.LOGIN_USER,
  data: {
    username,
    password
  }
});


export {
  doLogin
}
