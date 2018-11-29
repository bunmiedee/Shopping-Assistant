import {
  LOGIN_SUCCESS,
  ON_USER_AUTH
} from 'src/actions/auth/constants';

const AuthMiddleware = (store : Object) => (next : Function) => (action : Object) => {
  // oldState = state before reducer
  const oldState = store.getState();
  const { type } = action;
  if (action.type === LOGIN_SUCCESS) {
    const { data } = action;

    store.dispatch({
      type: ON_USER_AUTH,
      data
    });
  }


  next(action);

  // newState = state after reducer
  const newState = store.getState();
};

export default AuthMiddleware;
