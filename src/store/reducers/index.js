import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import home from './home'
import addmenu from './addmenu'
import session from './session'

export default combineReducers({
    home,
    addmenu,
    session,
    router:routerReducer
})