import * as types from '../action-types';

let initState={
     list:[]
};

export default function (state = initState, action) {
    switch (action.type){
        case types.ADD_COLLECT:
            return {list:[...state.list,action.payload]};
        case  types.DEL_COLLECT:

            let newList=state.list.filter((item,index)=>
                item.titlebg!=action.payload.titlebg
            )
            return {list:newList}
        default:
            return state;
    }
}