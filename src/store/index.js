import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";

const persistConfig = {
  key: "lovableLogin",
  storage, // defaults to localStorage for web
  whitelist: ["user"],
  //blacklist: ["saveLoginCliente", "menuArray"],
};

const pReducer = persistReducer(persistConfig, reducer); //Aca le decimos que Reducer queremos persistir en la app, por cuestiones de no refactorizar todo. Guardamos combineReducer directamente

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  pReducer,
  composeEnhancers(applyMiddleware(createLogger(), thunkMiddleware))
);

const persistor = persistStore(store);

export { persistor, store };
