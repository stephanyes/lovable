import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import loginClientReducer from "./loginClientReducer";
import menuReducer from "./menuReducer";

export default combineReducers({
  user: loginReducer,
  saveLoginClient: loginClientReducer,
  menuArray: menuReducer,
});
