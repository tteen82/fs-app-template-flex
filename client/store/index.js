import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import nnLists from './nnLists';

const reducer = combineReducers({ auth, nnLists });
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './nnLists';
