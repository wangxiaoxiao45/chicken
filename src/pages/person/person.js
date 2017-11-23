import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import Swiper from 'swiper'
import {connect} from 'react-redux'
import {compressImage} from '../../utils'
import actions from '../../store/actions/session'

import './person.less'
import Top from "../../components/top/index";
import pic from '../../static/images/picture.jpg'

class Person extends Component{
    constructor(){
        super();
        this.state={current:1};
    }
    //上传图片
    changeImage=(e)=>{
        let target=e.target;
        if(!target.value) return;

        let imageSrc=URL.createObjectURL(target.files[0]);
        compressImage(imageSrc,0.6,(img)=>{
          this.props.uploadImge({upImg:img});
          //释放内存
            URL.revokeObjectURL(imageSrc);
        });

    };
    componentDidMount(){
        this.props.validate();
        this.props.getImg();
        let _this=this;
        this.mySwiper=new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                type:"custom",
                clickable:true,
                bulletActiveClass:"active",
                renderCustom(swiper, current, total){
                    _this.setState({
                        current
                    });
                    _this.lineEle.style.left=(current-1)*50+'%';

                }
            }
        });
    }
    //选项按钮
    handleClick=(e)=>{
        let num=Number(e.target.dataset.num);

        if(num){
            this.setState({
                current:num
            },function(){
                this.mySwiper.slideTo(num-1);
                this.lineEle.style.left=(num-1)*50+'%';
            })
        }
    };

    render(){
        return (
            <div>
                <Top titleVal="个人中心"/>
                <div className="container">
                    <header className="person-header">
                        <div className="person-pro">
                            <h4>{this.props.user.username&&this.props.user.username}</h4>
                            <Link to="/collect">
                                <i className="iconfont icon-shoucang"/>
                                我的收藏
                            </Link>
                        </div>
                        <div className="up-image">
                            <img src={this.props.upImg||pic} alt=""/>
                            <input type="file" className="upFile" onChange={this.changeImage}/>
                        </div>
                    </header>
                    <section className="person-content swiper-container">
                        <h4 className="border-top swiper-pagination" onClick={this.handleClick}>
                            <span className={this.state.current===1?'active':''} data-num="1">菜谱</span><span className={this.state.current===2?'active':''} data-num='2'>作品</span>
                            <i ref={(i)=>{this.lineEle=i}} />
                        </h4>
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="add-menu-btn">
                                    <p>创建菜谱的人是厨房里的天使</p>
                                    <Link to="/addmenu">开始创建第一道菜谱</Link>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="add-menu-btn">
                                    <p>记录美食，味道因此回忆而美丽</p>
                                    <Link to="/addmenu">分享我的美食作品</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default connect(
    state=>state.session,
    actions
)(Person);