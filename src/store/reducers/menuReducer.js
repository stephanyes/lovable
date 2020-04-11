const initialState = {
  menuArray: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_MENU":
      return Object.assign({}, state, {
        menuArray: action.menues,
      });
    default:
      return state;
  }
};
