import React,{Component} from 'react'
import {connect} from 'react-redux'
import '../bazaarlist/bazaarlist.less'
import actions from '../../store/actions/session'
import {Link} from 'react-router-dom';
import IsLogined from "../../components/islogin/index";
import Top from "../../components/top/index";


class Collect extends Component{
    constructor(){
        super();
        this.state={text:''};
    }
    handle=(e)=>{
        this.setState({text:e.target.value});
    }
    render(){
        let queryList;
         if(this.state.text){
              queryList=this.props.collect.list.filter((item,index)=>
                 item.title.indexOf(this.state.text)>-1)
         }else{
              queryList=this.props.collect.list
         }


        return (
            <div className="collect">
                {
                    this.props.session.user.username?<div className="bazaarlist-head">
                        <span className="iconfont icon-fanhui" onClick={()=>this.props.history.goBack()}></span>
                        <div className="top-input">
                        <i className="iconfont icon-fangdajing"></i>
                            <input type="text" placeholder="搜索美味佳肴" onChange={this.handle} value={this.state.text}/></div>
                    </div>:<Top titleVal="菜谱收藏"  quit="true"/>
                }
                {this.props.session.user.username?null:<IsLogined hd="把美食与爱保存下来" desc="没人生来就是好厨师，轻点收藏，将你最喜欢的菜谱保存下来，为你的下一顿私房红烧肉做好准备。"/>}
                <div className="container" style={{"marginTop": "20px"}}>
                    <div className="bazaarkist-con">
                        {
                            queryList.map((item, index) => (

                                <Link to={`/bazaardetail/${item.id}`} key={index}>

                                    <p>
                                        <img src={item.titlebg} alt=""/>
                                    </p>
                                    <div className="bazaarkist-tg">
                                        <div className="bazaarkist-title">{item.title}</div>
                                        <div className="bazaarkist-bot">
                                            <p>{item.score}分</p>
                                            <p>{item.cooked}人做过</p>
                                        </div>

                                    </div>


                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(

    state=>state,
    actions
)(Collect);