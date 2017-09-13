import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({
  athletes: (state = [], action) => action.type === 'GET_ALL_ATHLETES_SUCCESS' ? action.payload : state,
  athleteDetail: (state = {}, action) => action.type === 'GET_ATHLETE_SUCCESS' ? action.payload : state,
  routing: routerReducer
});

const composeEnhancers = compose;
const finalCreateStore = initialState => createStore(
  rootReducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export const createNewStore = finalCreateStore;
export default typeof window === 'undefined' ? null : finalCreateStore(window.__INITIAL_STATE__);
