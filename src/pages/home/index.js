import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../store/actions/home.js'
import './index.less'
import Swiper from 'swiper';
class Home extends Component{

    componentDidMount(){
         let mySwiper =new Swiper('.swiper-container', {
             speed: 400,
             loop: true,
             autoplay: {
                 delay: 3000,
                 disableOnInteraction: false,
             },
             pagination: {
                 el: '.swiper-pagination',
             }
         });
    }
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
                    <img className="ceng" src={require('./img/ceng.png')} alt=""/>
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
                    <div className="swiper-container">

                        <div className="swiper-wrapper">

                            <div className="swiper-slide">
                                <img src={require('./img/morning-bird.png')} alt=""/><span>早餐</span><img src={require('./img/zao.jpg')} alt=""/>
                            </div>
                            <div className="swiper-slide">
                                <img src={require('./img/afternoon-cat.png')} alt=""/><span>午餐</span><img src={require('./img/wu.jpg')} alt=""/>
                            </div>
                            <div className="swiper-slide">
                                <img src={require('./img/evening-noon.png')} alt=""/><span>晚餐</span><img src={require('./img/wan.jpg')} alt=""/>
                            </div>
                        </div>

                        <div className="swiper-pagination"></div>


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