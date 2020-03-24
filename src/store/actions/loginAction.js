import { SET_LOGIN, SET_LOGOUT } from "../reducers/constant";
import axios from "axios";

const addLogin = user => ({
  type: SET_LOGIN,
  user
});

const logoutUser = () => ({
  type: SET_LOGOUT,
  logout: {}
})

export const loginUser = user => dispatch =>
  dispatch(addLogin(user));

export const userLogout = () => dispatch =>
  dispatch(logoutUser())