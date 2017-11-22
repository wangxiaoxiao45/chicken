import * as types from '../action-types'
import {push} from 'react-router-redux'

export default {
    menuCoverFn(src){
        return {
            type:types.MENU_COVER,
            payload:src
        }
    },
    removeCoverFn(){
        return {
            type:types.MENU_COVER
        }
    },
    menuTitleFn(title){
        return {
            type:types.MENU_TITLE,
            payload:title
        }
    },
    menuCateStoryFn(detail){
        return {
            type:types.MENU_CATE_STORE,
            payload:detail
        }
    },
    addMaterialFn(material){
        return {
            type:types.ADD_MATERIAL,
            payload:material
        }
    },
    changeMaterialFn(materials){
        return {
            type:types.CHANGE_MATERIAL,
            payload:materials
        }
    },
    addStepFn(step){
        return {
            type:types.ADD_STEP,
            payload:step
        }
    },
    changeStepImgFn(payload){
        return {
            type:types.CHANGE_STEP_IMG,
            payload
        }
    },
    menuTipsFn(value){
        return {
            type:types.MENU_TIPS,
            payload:value
        }
    },
    exclusive(bool){
        return {
            type:types.MENU_EXCLUSIVE,
            payload:bool
        }
    },
    delMenu(){
        return dispatch=>{
            dispatch({
                type:types.DELETE_MENU
            });
            dispatch(push('/person'));
        }
    }

}