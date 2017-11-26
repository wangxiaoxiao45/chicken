import {register,login,validate,uploadImge,getImg,userAddMenu,userQuit} from '../../api/session'
import { Toast } from 'antd-mobile';
import {push} from 'react-router-redux'
import * as types from '../action-types'
export default {
    //注册
    register(data){
        return dispatch=>{
            register(data).then(res=>{
                dispatch({type:'ADD_USER',payload:res});
                if(res.code===0){
                    Toast.info(res.success,1,function(){
                        dispatch(push("/login"));
                    });
                }else{
                    Toast.info(res.error,1);
                }
            })
        }
    },
    //登录
    login(data){
        return dispatch=>{
            login(data).then(res=>{
                dispatch({type:'ADD_USER',payload:res});
                if(res.code===0){
                    Toast.info(res.success,1,function(){
                        dispatch(push("/person"));
                    });
                }else{
                    Toast.info(res.error,1);
                }
            })
        }
    },

    validate(){
        return dispatch=>{
            validate().then(res=>{
                if(res.code==0){
                    dispatch({type:'ADD_USER',payload:res});
                }
            })
        }
    },
    //上传头像
    uploadImge(data){
        return dispatch=>{
            uploadImge(data).then(res=>{
                if(res.code==0){
                    dispatch({type:'UPLOAD_IMG',payload:res.upImg});
                }
            })
        }
    },
    //读取头像
    getImg(){
        return dispatch=>{
            getImg().then(res=>{
                dispatch({type:'UPLOAD_IMG',payload:res.upImg});
            });
        }
    },
    // 获取创建的菜谱
    userAddMenu(){
        return dispatch=>{
            userAddMenu().then(res=>{
                if(res.code==0){
                    dispatch({
                        type:'USER_ADD_MENU',
                        payload:res.data
                    });
                }

            })
        }
    },

    //退出
    userQuit(data){
        return dispatch => {
            userQuit(data).then(res => {
                if (res.code == 0) {
                    dispatch({
                        type: 'USER_QUIT'
                    });
                    Toast.info(res.success, 1);
                }
            })
        }
    },
    removeCollect(item){
        return {
            type:types.DEL_COLLECT,
            payload:item
        }
    },
    userDeleteMenu(data){
        return {
            type:types.USER_ADD_MENU,
            payload:data
        }
    }
}