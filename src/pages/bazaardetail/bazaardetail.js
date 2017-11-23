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
                            <img src={current.detail.detailImg} />
                            <div className="bazaardetail-detail-title">{current.title}</div>
                            <div className="bazaardetail-score">
                                <span>{current.score}综合评分 · </span>
                                <span>{current.cooked}3人最近7天做过</span>
                            </div>
                            <div className="bazaardetail-stypes">
                                {
                                   current.detail.steps.map((item,index)=>(
                                       <div key={index} className="bazaardetail-stypes-item">
                                           <p>{item.title}</p>
                                           <p>{item.content}</p>
                                       </div>

                                   ))
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