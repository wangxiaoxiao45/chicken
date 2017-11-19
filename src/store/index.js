import {createStore,applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import createHistory from 'history/createHashHistory'
import {routerMiddleware} from 'react-router-redux'
import reducer from './reducers'

const history = createHistory();
const middleware = routerMiddleware(history);
export default createStore(reducer,applyMiddleware(promiseMiddleware,ReduxThunk,middleware,logger))