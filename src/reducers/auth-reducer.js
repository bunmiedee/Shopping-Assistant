import * as ActionTypes from 'src/actions/auth/constants';

const initialState = {
  isAuth: false,
  token: null,
  userId: null,
  username: null
};

export default function (state = initialState, action) {
  switch ( action.type ) {

    case ActionTypes.ON_USER_AUTH:
      const {data: { token, userId, username }} =  action
      return {
        ...state,
        isAuth: true,
        token,
        userId,
        username
      };
    break;

    default:

  }


  return state;
};
