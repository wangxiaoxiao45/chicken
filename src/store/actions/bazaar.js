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
    }

}