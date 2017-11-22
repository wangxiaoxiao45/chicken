import React,{Component} from 'react';
import './index.less'
export default class Top extends Component{
    show=()=>{
        this.props.show(!!this.props.colorActive);
    };
    render(){
        return (
            <div className="top">
                <span className={this.props.toBack==='取消'?'active':''} onClick={()=>{this.props.history.goBack()}}>{this.props.toBack||''}</span>{this.props.titleVal}<span className={this.props.colorActive?'active':''} onClick={this.show}>{this.props.toGo||''}</span>
            </div>
        )
    }
}