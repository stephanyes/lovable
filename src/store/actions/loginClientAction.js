import { SET_LOGIN_CLIENT } from "../reducers/constant";
import axios from "axios";

const addLoginClient = user => ({
  type: SET_LOGIN_CLIENT,
  client
});

export const loginClient = client => dispatch =>
  dispatch(addLoginClient(client));
