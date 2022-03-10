import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/placesReducer";
import { init, insertData } from "./helper/db";

console.log("init () above");

init()
  .then(() => {
    console.log("DATABASE INITIALIZED");
  })
  .catch(() => {
    console.log("FAILED DATABSE INITIALIZATION", err);
  });

console.log("init () below");

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
