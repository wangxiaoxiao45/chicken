import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../store/actions/home.js'
import './index.less'
class Home extends Component{

    render(){
        return (
            <div className="home">
                <div className="kheader">
                    <i className="iconfont icon-icon1460189708222"></i>
                    <div>
                        <i  className="iconfont icon-fangdajing"></i>
                        <input type="text" placeholder="搜索菜谱、食材"/>
                        <i className="iconfont icon-yuyin"></i>
                    </div>


                    <i className="iconfont icon-biji"></i>
                </div>
                <div className="main">
                    <div className="banner">

                        <div><img src={require('./img/home-1.png')} alt=""/>
                            <p>厨房好物</p>
                        </div>
                        <div><img src={require('./img/home-2.png')} alt=""/>
                            <p>厨房问答</p>
                        </div>
                        <div><img src={require('./img/home-3.png')} alt=""/>
                            <p>排行榜</p>
                        </div>
                        <div><img src={require('./img/home-4.png')} alt=""/>
                            <p>菜谱分类</p>
                        </div>
                    </div>
                    <div className="pic">
                        <div className="left"><img src={require('./img/qiezi.jpg')} alt=""/><p>本周<br/>流行菜谱</p></div>
                        <div className="right"><img src={require('./img/jingwu.jpg')} alt=""/><p>查看好友<br/>并关注她们</p></div>
                    </div>
                </div>

                </div>

        )
    }
}
export default connect(
    state=>state.home,
    actions
)(Home);