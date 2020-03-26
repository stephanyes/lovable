import { SET_LOGIN_CLIENT } from "./constant";

const initialState = {
  loginClient: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_CLIENT:
      return Object.assign({}, state, {
        loginUser: action.client
      });
    default:
      return state;
  }
};
