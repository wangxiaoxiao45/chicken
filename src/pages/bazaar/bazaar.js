import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import actions from '../../store/actions/bazaar'
import {connect} from 'react-redux';
import '../../common/css/index.less';


class Bazaar extends Component {
    componentDidMount() {
        this.props.getMenuClassification();
        this.props.clearlist();
    }

    render() {

        return (
            <div>
                <div className="bazaar-top">{this.props.bazaar.title}</div>
                <div className="container">
                    <h4 className="bazaar-hot">热门分类</h4>
                    <ul className="bazaar-con">
                        {
                            this.props.bazaar.list.map((item, index) => (

                                <Link to={`/bazaarlist/${item.menuId}`} key={index} >
                                    <img  src={item.menubg}/>
                                    <span>{item.title}</span>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
import './bazaar.less'
export default connect(state => state, actions)(Bazaar);