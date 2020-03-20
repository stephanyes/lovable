import { SET_LOGIN } from "../reducers/constant";
import axios from "axios";

export const addLogin = user => ({
  type: SET_LOGIN,
  user
});

export const loginUser = user => dispatch => 
  dispatch(addLogin(user));

