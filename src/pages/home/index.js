import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../store/actions/home.js'
import './index.less'
import Swiper from 'swiper';
import {get} from '../../../src/api/index'

import ReactIScroll from 'react-iscroll';
import {downRefresh} from "../../utils";
import Loading from "../../components/loading/loading";
import {TransitionGroup,CSSTransition} from 'react-transition-group'
let iScroll = require('iscroll');
class Home extends Component{
constructor(){
    super();
    this.state={flag:true};
}
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
        this.props.getState();
        downRefresh(this.mainBox,this.props.downRefresh);

    }
    handle=()=>{
       this.state.flag?this.jia.className='z-rotate iconfont icon-icon1460189708222':this.jia.className='f-rotate iconfont icon-icon1460189708222';
       this.setState({flag:!this.state.flag});
    }
    render(){
        console.log('xx',this.state.list);

        return (
            <div className="home">
                {/*header*/}
                <div className="kheader">

                    <i onClick={this.handle} className="iconfont icon-icon1460189708222" ref={input=>this.jia=input}></i>
                    <div>
                        <i  className="iconfont icon-fangdajing"></i>
                        <input type="text" placeholder="搜索菜谱、食材"/>
                        <i className="iconfont icon-yuyin"></i>
                        <TransitionGroup>

                            {
                                !this.state.flag&&<CSSTransition timeout={500} classNames="fade"><div className="show"><div className="center">
                                    <img src={require('./img/head.png')} alt=""/><p>分享的人是厨房里的天使</p>
                                    <div className="camera">
                                        <div className="left">
                                            <div className="list">
                                                <div className="yi"></div>
                                                <div className="er"></div>
                                                <div className="san"></div>
                                            </div>
                                            <p style={{marginTop:'.085rem'}}>创建菜谱</p>
                                        </div>
                                        <div className="right">
                                            <div className="list">
                                                <div className="yi"></div>
                                                <div className="er"></div>
                                                <div className="san"></div>
                                            </div>
                                            <p>上传作品</p>
                                        </div>
                                    </div>
                                </div></div></CSSTransition>
                            }

                        </TransitionGroup>

                    </div>


                    <i className="iconfont icon-biji"></i>

                </div>
                <div className="loader"><Loading/></div>

                {/*main*/}
                <div className="main" ref={input=>this.mainBox=input}>

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
                    <div className="wrapper-slider">
                        <img className="ceng" src={require('./img/ceng.png')} alt=""/>
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
                    {/*平滑滚动*/}
                    <div className="scroll">
                        <div className="header">
                            <p>{this.props.first.title}</p>
                            <p>查看全部</p>
                        </div>

                        <ReactIScroll iScroll={iScroll}
                                      options={{mouseWheel: false,  scrollX: true,momentum:true,freeScroll: true,disablePointer: true,disableTouch:false,disableMouse:false}}>
                            <div style={{width:'210%'}}>
                                <ul>
                                    {
                                        this.props.first.list.map((item,index)=>(
                                            <li style={{marginBottom:'-.2rem'}} key={index}><span>{item.price}</span><img src={item.img} alt=""/><p>{item.title}</p></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </ReactIScroll>

                    </div>
                    <div className="scroll lesson">
                        <div className="header">
                            <p>{this.props.second.title}</p>
                            <p>查看全部</p>
                        </div>

                        <ReactIScroll iScroll={iScroll}
                                      options={{mouseWheel: false,  scrollX: true,momentum:true,freeScroll: true,disablePointer: true,disableTouch:false,disableMouse:false}}>
                            <div style={{width:'250%'}}>
                                <ul>
                                    {
                                        this.props.second.list.map((item,index)=>(
                                            <li key={index}><span className="teach">{item.teach}</span><span className="teachName">{item.teachName}</span><img src={item.img} alt=""/><p>{item.title}</p><p className="canyu">{item.num}人参与</p></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </ReactIScroll>

                    </div>
                    <div className="scroll">
                        <div className="header">
                            <p>{this.props.third.title}</p>
                            <p>查看全部</p>
                        </div>

                        <ReactIScroll iScroll={iScroll}
                                      options={{mouseWheel: false,  scrollX: true,momentum:true,freeScroll: true,disablePointer: true,disableTouch:false,disableMouse:false}}>
                            <div style={{width:'250%'}}>
                                <ul>
                                    {
                                        this.props.third.list.map((item,index)=>(
                                            <li key={index}><span style={index==1?{width:'.8rem'}:null} className={index==1?'special':'special'} >{item.special}</span><span className="price">{item.price}/{item.stage}</span><img src={item.img} alt=""/><p>{item.title}</p></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </ReactIScroll>

                    </div>
                    <div className="scroll">
                        <div className="header">
                            <p>{this.props.four.title}</p>
                            <p>查看全部</p>
                        </div>

                        <ReactIScroll iScroll={iScroll}
                                      options={{mouseWheel: false,  scrollX: true,momentum:true,freeScroll: true,disablePointer: true,disableTouch:false,disableMouse:false}}>
                            <div style={{width:'250%'}}>
                                <ul>
                                    {
                                        this.props.four.list.map((item,index)=>(
                                            <li style={{marginBottom:'-.2rem'}} key={index}><span className="buy">{item.buy}</span><img src={item.img} alt=""/><p>{item.title}</p></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </ReactIScroll>

                    </div>
                    <div className="scroll five">
                        <div className="header">
                            <p>{this.props.five.title}</p>
                            <p>查看全部</p>
                        </div>

                        <ReactIScroll iScroll={iScroll}
                                      options={{mouseWheel: false,  scrollX: true,momentum:true,freeScroll: true,disablePointer: true,disableTouch:false,disableMouse:false}}>
                            <div style={{width:'400%'}}>
                                <ul>
                                    {
                                        this.props.five.list.map((item,index)=>(
                                            <li style={{marginBottom:'-.2rem'}} key={index}><span>{item.score}</span><img src={item.img} alt=""/><p>{item.title}</p></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </ReactIScroll>

                    </div>
                    <div className="loading">
                        哼，谁还没有底线呢！
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