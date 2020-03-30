import {
  SET_LOGIN_CLIENT,
} from "../reducers/constant";

const addLoginClient = clientData => ({
  type: SET_LOGIN_CLIENT,
  clientData
});

// const addIdTable = table => ({
//   type: SET_ID_TABLE,
//   table
// });

// const addIdRestaurant = restaurant => ({
//   type: SET_ID_RESTAURANT,
//   restaurant
// });

export const saveLoginClient = client => dispatch => dispatch(addLoginClient(client));

// export const saveTable = table => dispatch => dispatch(addIdTable(table));

// export const saveRestaurant = restaurant => dispatch =>
//   dispatch(addIdRestaurant(restaurant));
