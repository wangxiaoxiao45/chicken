import React, {Component} from 'react';
import actions from '../../store/actions/bazaarlist'
import {connect} from 'react-redux';
import '../../common/css/index.less'

class Bazaardetail extends Component {

    componentDidMount() {

    }
    render() {
        let current=this.props.list.find(item=>item.id==this.props.match.params.id);
        return (
            <div>
                <div className="bazaardetail-head">
                    <span className="iconfont icon-fanhui" onClick={()=>this.props.history.goBack()}></span>
                  开始行动起来吧！！！
                </div>
                <div className="container">
                    <div className="bazaardetail-con">
                        <div>
                            {current.detail.detailImg?<img src={current.detail.detailImg}/>:null}
                            <div className="bazaardetail-detail-title">{current.title}</div>
                            <div className="bazaardetail-score">
                                <span>综合评分：<i>{current.score}</i> </span>
                                <span><i>{current.cooked}</i>人最近7天做过</span>
                            </div>
                            {current.menuCateStory?<div className="menuCateStory">
                                <p>
                                    {current.menuCateStory}
                                </p>
                            </div>:null}
                            {
                                current.foodMaterials?<div className="foodMaterials">
                                    <span>用料</span>
                                    {
                                        current.foodMaterials.map((cur,i)=>
                                            <p key={i}>
                                                <span>{cur.material}</span>
                                                <span>{cur.num}</span>
                                            </p>
                                        )
                                    }
                                </div>:null
                            }
                            <div className="bazaardetail-stypes">
                                {
                                    current.detail.steps?current.detail.steps.map((item,index)=>(
                                       <div key={index} className="bazaardetail-stypes-item">
                                           <p>{item.title}</p>
                                           {item.img?<img src={item.img}/>:null}
                                           <p>{item.content}</p>
                                       </div>

                                   )):null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
import './bazaardetail.less'
export default  connect(state => state.bazaarlist, actions)(Bazaardetail);