import * as types from '../action-types';
import {fetchMenuClassIf}  from '../../api/bazaar'

export default {
    getMenuClassification(){
        return dispatch=>{
            fetchMenuClassIf().then(menuclassification=>{
                dispatch(
                    {
                        type:types.CLASS_IFCATION,
                        payload:menuclassification
                    }
                )
            })
        }
    },
    clearlist(){
        return{
            type:types.List_CLEAR,
            payload:{hasMore:true,
                list:[],
                offset:0,
                limit:5,
                loading:'哼~谁还没有底线'}
        }
    }

}