import {get,post} from './index.js'

/*注册*/
export function register(data){
    return post("/sigup",data);
}

/*登录*/
export function login(data){
    return post("/login",data);
}

/*从cookie判断是否登录*/
export function validate(){
    return get("/validate");
}
/*上传头像*/
export function uploadImge(data){
    return post("/uploadImge",data)
}
/*读取头像*/
export function getImg(){
    return get("/getImg");
}
//提交菜谱
export function sendMenu(data){
    return post("/uploadImge",data)
}

/*获取新添菜谱*/
export function userAddMenu(){
    return get("/useraddmenu");
}