import * as types from '../action-types'

let initState={id:0};

export default function (state=initState,action){
    if(action.type===types.GETSTATE){
        return {
            id:action.payload.id
        }
    }
    return state;
}