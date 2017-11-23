import React,{Component} from 'react';
import {Link} from 'react-router-dom'

import './index.less'
export default class IsLogined extends Component{
    render(){
        return (
            <div className="login-index">
                <h4>{this.props.hd}</h4>
                <p>{this.props.desc}</p>
                <Link to="/login">登录</Link>
                <Link to="/register">手机注册</Link>
            </div>
        )
    }
}
