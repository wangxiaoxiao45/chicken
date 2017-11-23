import React,{Component} from 'react';
import {connect} from 'react-redux'
import './collect.less'
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
              queryList=this.props.list.filter((item,index)=>
                 item.title.indexOf(this.state.text)>-1)
         }else{
              queryList=this.props.list
         }


        return (
            <div>
                <div className="bazaarlist-head">
                    <span className="iconfont icon-fanhui" onClick={()=>this.props.history.goBack()}></span>
                    <i className="iconfont icon-fangdajing"></i>
                    <input type="text" placeholder="搜索美味佳肴" onChange={this.handle} value={this.state.text}/>
                </div>
                <div className="container" style={{"marginTop": "20px"}}>
                    <div className="bazaarkist-con">
                        {
                            queryList.map((item, index) => (

                                <li key={index} onClick={()=>this.handleDetail(item.id)}>

                                    <p>
                                        <img src={item.titlebg} alt=""/>
                                    </p>
                                    <div className="bazaarkist-tg">
                                        <div className="bazaarkist-title">{item.title}</div>
                                        <div>
                                            <p>{item.score}分</p>
                                            <p>{item.cooked}人做过</p>
                                        </div>

                                    </div>


                                </li>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>state.collect

)(Collect);