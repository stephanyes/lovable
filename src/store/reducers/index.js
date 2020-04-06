import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import loginClientReducer from "./loginClientReducer";


export default combineReducers({
  user: loginReducer,
  saveLoginClient: loginClientReducer
});
