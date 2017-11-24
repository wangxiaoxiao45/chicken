import * as types from '../action-types';
import {fetchUncerList}  from '../../api/bazzaarlist'

export default {
    getAList(offset,limit,getAList){
        return dispatch=>{
            fetchUncerList(offset,limit,getAList).then((alist)=>{
                dispatch(
                    {
                        type:types.GET_HOMEDISHES,
                        payload:alist
                    }
                )
            })
        }
    },
    changeColor(id){
        return {
            type:types.CHANGECOLOR,
            payload:id
        }
    },
    addCollect(item){
        return {
            type:types.ADD_COLLECT,
            payload:item
        }
    }


}