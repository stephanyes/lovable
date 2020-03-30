import { SET_LOGIN_CLIENT } from "./constant";

const initialState = {
  clientData : []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_CLIENT:
      return {clientData: [action.clientData]};
    default:
      return state;
  }
};
