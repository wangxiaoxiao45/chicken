import * as types from '../action-types';

let initState={
    hasMore:true,
    list:[],
    offset:0,
    limit:5,
    loading:'哼~谁还没有底线'
};

export default function (state = initState, action) {
    switch (action.type){
        case types.GET_HOMEDISHES:
            let {hasMore,list}=action.payload;
            return {
                ...state,
                hasMore,
                list:[...state.list,...list],
                offset:state.offset+list.length
            };
        case types.List_CLEAR:
            return action.payload;
        case types.CHANGECOLOR:
          let newList=state.list.map((item,index)=>{
                if(item.id==action.payload){
                    return {...item,collection:!item.collection}
                }else{
                    return item;
                }
            })
            return {...state,list:newList}
        default:
            return state;
    }
}