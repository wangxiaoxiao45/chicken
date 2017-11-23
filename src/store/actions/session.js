import {register,login,validate,uploadImge,getImg} from '../../api/session'
import { Toast } from 'antd-mobile';
import {push} from 'react-router-redux'
export default {
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
                dispatch({type:'ADD_USER',payload:res});
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
    }
}