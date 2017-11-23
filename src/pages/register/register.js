import React,{Component} from 'react';
import { Toast } from 'antd-mobile';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import LoginHeader from "../../components/loginHeader/loginHeader";
import actions from '../../store/actions/session'
import './register.less'

class Register extends Component{
    constructor(){
      super();
    };
    register=()=>{
        let username=this.username.value.trim(),
            nickname=this.nickname.value.trim(),
            password=this.password.value.trim(),
            toPassword=this.toPassword.value.trim();
        if(!username){
            Toast.info('手机号不能为空',1);
            return;
        }else if(!/^1\d{10}$/.test(username)){
            Toast.info('手机号输入有误',1);
            return;
        }
        if(!nickname){
            Toast.info('昵称不能为空',1);
            return;
        }
        if(!password){
            Toast.info('密码不能为空',1);
            return;
        }else if(!/^\w{1,16}$/.test(password)){
            Toast.info('密码输入有误，只能输入6～16位',1);
            return;
        }
        if(toPassword!==password){
            Toast.info('再次输入密码有误',1);
            return;
        }
        this.props.register({username,password,nickname});
    };
    componentDidMount(){
        this.props.validate();
    }

    render(){
        return (
            <div className="register">
                <LoginHeader titleVal="注册" history={this.props.history}/>
                <ul>
                    <li>
                        <input type="text" maxLength="11" ref={input=>this.username=input} placeholder="手机号"/>
                    </li>
                    <li>
                        <input type="text" maxLength="11" ref={input=>this.nickname=input} placeholder="昵称"/>
                    </li>
                    <li>
                       <input type="password" ref={input=>this.password=input} placeholder="密码"/>
                    </li>
                    <li>
                        <input type="password" ref={input=>this.toPassword=input} placeholder="再次输入密码"/>
                    </li>
                    <li>
                        <p>
                            <Link to="/login">登录</Link>
                        </p>
                        <span onClick={this.register}>注册</span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect(
    state=>state.session,
    actions
)(Register);