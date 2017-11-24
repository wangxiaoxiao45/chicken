import './nav.less'

import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'

export default class NavBar extends Component{
    render(){
        return (
            <nav className="bottom-nav">
                <NavLink exact to="/"><i className="iconfont icon-shouye-copy" style={{fontSize:'.46rem'}}/>下厨房</NavLink>
                <NavLink to="/bazaar"><i className="iconfont icon-02shouyeyixiangshiji" style={{paddingTop:'.02rem',fontSize:'.38rem'}}/>菜谱</NavLink>
                <NavLink to="/collect"><i className="iconfont icon-shoucang" style={{paddingTop:'.08rem'}}/>收藏</NavLink>
                <NavLink to="/person"><i className="iconfont icon-wo" style={{paddingTop:'.08rem'}}/>我</NavLink>
            </nav>
        )
    }
}

