import { SET_LOGIN, SET_LOGOUT } from "./constant";

const initialState = {
  loginUser: {},
  isAuth: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return Object.assign({}, state, {
        loginUser: action.user,
        isAuth: true
      });
    case SET_LOGOUT:
      return Object.assign({}, state, { loginUser: action.logout, isAuth: false })
    default:
      return state;
  }
};
