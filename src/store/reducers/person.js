import * as types from '../action-types'

let initState={
    data:[]
};

export default function (state=initState,action){
    if(action.type===types.USER_ADD_MENU){
        return {...state,data:action.payload};
    }
    return state;
}