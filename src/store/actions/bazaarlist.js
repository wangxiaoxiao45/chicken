import * as types from '../action-types';
import {fetchUncerList}  from '../../api/bazzaarlist'

export default {
    getAList(getAList){
        return (dispatch,getState)=>{
            let {offset, limit, hasMore,} = getState().bazaarlist;
            fetchUncerList(offset,limit,getAList).then((alist)=>{
                if (hasMore) {
                    dispatch(
                        {
                            type: types.GET_HOMEDISHES,
                            payload: alist
                        }
                    )
                }
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