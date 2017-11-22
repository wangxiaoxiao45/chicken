import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import home from './home'
import addmenu from './addmenu'

export default combineReducers({
    home,
    addmenu,
    router:routerReducer
})