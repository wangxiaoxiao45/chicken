import * as types from '../action-types'

let initState={
        first:{title:'',list:[]},
        second:{title:'',list:[]},
        third:{title:'',list:[]},
        four:{title:'',list:[]},
        five:{title:'',list:[]},
        loading:''

};

export default function (state=initState,action){
    if(action.type===types.LOADING){
        return {
            ...state,
            loading:'用绳命在加载'
        }
    }
    if(action.type===types.GETSTATE){
        return {
            first:{
                title:action.payload.first.title,
                list:action.payload.first.list
            },
            second:{
                title:action.payload.second.title,
                list:action.payload.second.list
            },
            third:{
                title:action.payload.third.title,
                list:action.payload.third.list
            },
            four:{
                title:action.payload.four.title,
                list:action.payload.four.list
            },
            five:{
                title:action.payload.five.title,
                list:action.payload.five.list
            },
            loading:''
        }
    }
    if(action.type===types.CLEAR){
        return {
            first:{title:'',list:[]},
            second:{title:'',list:[]},
            third:{title:'',list:[]},
            four:{title:'',list:[]},
            five:{title:'',list:[]},
            loading:''

        };
    }

    return state;
}