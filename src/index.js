import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import './css/index.less'
import 'antd-mobile/dist/antd-mobile.less'

//引入组件
import App from "./containers/app/index";
ReactDOM.render(
    <App/>,
    document.querySelector("#root")
);


