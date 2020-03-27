import { SET_ID_CLIENT, SET_ID_TABLE, SET_ID_RESTAURANT } from "./constant";

const initialState = {
  idClient: {},
  idTable: {},
  idRestaurant: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ID_CLIENT:
      return Object.assign({}, state, {
        idClient: action.client
      });
    case SET_ID_TABLE:
      return Object.assign({}, state, {
        idTable: action.table
      });
    case SET_ID_RESTAURANT:
      return Object.assign({}, state, {
        idRestaurant: action.restaurant
      });
    default:
      return state;
  }
};
