import * as types from '../action-types';

let initState={
    hasMore:true,
    list:[]
};

export default function (state = initState, action) {
    console.log(action.payload,'aaa');
    switch (action.type){
        case types.GET_HOMEDISHES:
            let {hasMore,list}=action.payload;
            return {...state,hasMore,list};
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