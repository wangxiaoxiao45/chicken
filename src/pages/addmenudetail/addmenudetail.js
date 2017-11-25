import React, {Component} from 'react';
import actions from '../../store/actions/bazaarlist'
import {connect} from 'react-redux';
import {post} from '../../api/index'
import '../../common/css/index.less'
import '../bazaardetail/bazaardetail.less'

class Addmenudetail extends Component {
    constructor(){
        super();
        this.state={
            current:{}
        }
    }
    componentDidMount() {
        post("/useraddmenulist",{id:this.props.match.params.id}).then(res=>{
            console.log(res.lists);
            if(res.lists){
                this.setState({
                    current:res.lists
                },function(){
                    console.log(this.state.current);
                })
            }
        });
    }
    componentWillMount(){

    }
    render() {
        let current=this.state.current;
        return (
            <div>
                <div className="bazaardetail-head">
                    <span className="iconfont icon-fanhui" onClick={()=>this.props.history.goBack()}></span>
                  开始行动起来吧！！！
                </div>
               <div className="container">
                    <div className="bazaardetail-con">
                        <div>
                            {current.detail?<img src={current.detail.detailImg}/>:null}
                            <div className="bazaardetail-detail-title">{current.title}</div>
                            <div className="bazaardetail-score">
                                <span>综合评分：<i>{current.score}</i> </span>
                                <span><i>{current.cooked}</i>人最近7天做过</span>
                            </div>
                            <div className="bazaardetail-stypes">
                                {
                                    current.detail?current.detail.steps.map((item,index)=>(
                                       <div key={index} className="bazaardetail-stypes-item">
                                           <p>{item.title}</p>
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
export default connect(state => state.bazaarlist, actions)(Addmenudetail);