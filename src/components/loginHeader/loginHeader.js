import React,{Component} from 'react';
import './loginHeader.less'
export default class LoginHeader extends Component{
    render(){
        return (
            <div className="common-header" onClick={this.props.history.goBack}>
                {this.props.titleVal}<i className="iconfont icon-fanhui"/>
            </div>
        )
    }
}