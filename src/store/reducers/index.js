import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import home from './home'
import addmenu from './addmenu'
import bazaar from './bazaar'
import bazaarlist from './bazaarlist'
import collect from './collect'

export default combineReducers({
    home,
    addmenu,
    bazaar,
    bazaarlist,
    collect,
    router:routerReducer
})