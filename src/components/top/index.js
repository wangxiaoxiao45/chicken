import React,{Component} from 'react';
import './index.less'
export default class Top extends Component{
    render(){
        return (
            <div className="top">
                {this.props.titleVal}
            </div>
        )
    }
}