import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../store/actions/home.js'

class Home extends Component{
    componentDidMount(){
        this.props.getState();
    }
    render(){
        return (
            <div>
                {this.props.id}
                <Link to="/person">个人</Link>
            </div>
        )
    }
}
export default connect(
    state=>state.home,
    actions
)(Home);