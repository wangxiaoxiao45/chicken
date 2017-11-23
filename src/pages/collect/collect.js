import React,{Component} from 'react';
import {connect} from 'react-redux'
import actions from '../../store/actions/session'
import './collect.less'
class Collect extends Component{
    componentWillMount(){

    }
    render(){
        return (
            <div>

            </div>
        )
    }
}
export default connect(
    state=>state.session,
    actions
)(Collect);