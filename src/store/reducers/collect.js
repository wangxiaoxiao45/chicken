import * as types from '../action-types';

let initState={
     list:[]
};

export default function (state = initState, action) {
    switch (action.type){
        case types.ADD_COLLECT:
            return {list:[...state.list,action.payload]};
        default:
            return state;
    }
}