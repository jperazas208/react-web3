import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from '../reducers/rootReducer';
import createDebounce from "redux-debounced"
import thunk from "redux-thunk"

const middlewares = [thunk, createDebounce()]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
)

export { store }