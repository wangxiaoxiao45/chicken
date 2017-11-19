import * as types from '../action-types'

export default {
    getState(){
        return {
            type:types.GETSTATE,
            payload:{
                id:1
            }
        }
    }
}