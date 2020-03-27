import {
  SET_ID_CLIENT,
  SET_ID_TABLE,
  SET_ID_RESTAURANT
} from "../reducers/constant";

const addIdClient = client => ({
  type: SET_ID_CLIENT,
  client
});

const addIdTable = table => ({
  type: SET_ID_TABLE,
  table
});

const addIdRestaurant = restaurant => ({
  type: SET_ID_RESTAURANT,
  restaurant
});

export const saveClient = client => dispatch => dispatch(addIdClient(client));

export const saveTable = table => dispatch => dispatch(addIdTable(table));

export const saveRestaurant = restaurant => dispatch =>
  dispatch(addIdRestaurant(restaurant));
