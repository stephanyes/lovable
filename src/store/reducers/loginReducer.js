import { SET_LOGIN } from "./constant";

const initialState = {
  loginUser: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return Object.assign({}, state, {
        loginUser: action.user
      });
    default:
      return state;
  }
};
