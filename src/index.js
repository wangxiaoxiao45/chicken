import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter,routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import './common/css/index.less'
import 'antd-mobile/dist/antd-mobile.less'
import 'swiper/dist/css/swiper.min.css'


import store from './store'
//引入组件
import App from "./pages/app/index";

const history = createHistory();
const middleware = routerMiddleware(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.querySelector("#root")
);

