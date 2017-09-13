import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import { canUseDOM } from "./commons";

const rootReducers = combineReducers({
  athletes: (state = [], action) => action.type === 'GET_ALL_ATHLETES_SUCCESS' ? action.payload : state,
  athleteDetail: (state = {}, action) => action.type === 'GET_ATHLETE_SUCCESS' ? action.payload : state,
  routing: routerReducer
});

const reduxDevTools = () => {
  if (canUseDOM) {
    if (window.devToolsExtension) {
      return window.devToolsExtension();
    }
  }
  return _=>_;
};

const finalCreateStore = initialState => createStore(
  rootReducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    reduxDevTools()
  )
);

export const createNewStore = finalCreateStore;
export default canUseDOM ? finalCreateStore(window.__INITIAL_STATE__) : null;
