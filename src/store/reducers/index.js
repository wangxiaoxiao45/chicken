import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import home from './home'
import addmenu from './addmenu'
import session from './session'
import bazaar from './bazaar'
import bazaarlist from './bazaarlist'

export default combineReducers({
    home,
    addmenu,
    session,
    bazaar,
    bazaarlist,
    router:routerReducer
})