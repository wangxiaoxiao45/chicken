import * as types from '../action-types'

let initState={
   user:{
       username:'',
       password:'',
       nickname:''
   },
    success:null,
    error:null,
    upImg:''
};
export default function (state=initState,action){
    if(action.type==='ADD_USER'){
        return {...state,...action.payload}
    }
    if(action.type==='UPLOAD_IMG'){
        return {...state,upImg:action.payload}
    }
    if(action.type==="USER_QUIT"){
        return {...state,user:{username:'',password:'',nickname:''}}
    }
    return state;
}