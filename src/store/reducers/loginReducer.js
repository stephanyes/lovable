const initialState = {
  loginUser: {},
  isAuth: false,
  loader: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return Object.assign({}, state, {
        loginUser: action.user,
        isAuth: true,
        loader: false
      });
    case "SET_LOGOUT":
      return Object.assign({}, state, {
        loginUser: action.logout,
        isAuth: false,
      });
    case "SHOW_LOADER":
      return { ...state, loader: true }
    case "HIDE_LOADER":
      return { ...state, loader: false }
    default:
      return state;
  }
};
