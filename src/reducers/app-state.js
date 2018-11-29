'use strict';


const initialState = {

};

export default function (state:State = initialState, action) {
  switch ( action.type ) {

    case '@user:isLoggedOut':
      return initialState;
    break;

    default:

  }


  return state;
}
