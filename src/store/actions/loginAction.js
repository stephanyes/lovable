import { SET_LOGIN } from "./constant";
import axios from "axios";

export const addLogin = user => ({
  type: SET_LOGIN,
  user
});

export const loginUser = user => dispatch =>
  axios.post("/api/login").then(user => {
    dispatch(addLogin(user.data));
  });
