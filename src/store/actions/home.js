import * as types from '../action-types'
import {get} from '../../api/index'
export default {
    getState(){
        return (dispatch,getState)=>{
            let {loading}=getState().home.loading;
            if(!loading){
                dispatch({type:types.LOADING});
                dispatch({type:types.GETSTATE,payload:get('/indexdata')});
            }
        }
    }
}