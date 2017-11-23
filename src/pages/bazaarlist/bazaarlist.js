import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import actions from '../../store/actions/bazaarlist'
import {connect} from 'react-redux';
import '../../common/css/index.less'

class Bazaarlist extends Component {
    handleDetail=(id)=>{
        console.log(id);
    };
    componentDidMount() {
        let id = parseFloat(this.props.match.params.id);
        let _this = this;
        if (id === 1) {
            _this.props.getAList(0, 5, 'homedishes');
        } else if (id === 2) {
            _this.props.getAList(0, 5, 'fastFood');
        } else if (id === 3) {
            _this.props.getAList(0, 5, 'downMeal');
        } else if (id === 4) {
            _this.props.getAList(0, 5, 'breakFast');
        } else if (id === 5) {
            _this.props.getAList(0, 5, 'meat');
        } else if (id === 6) {
            _this.props.getAList(0, 5, 'fish');
        } else if (id === 7) {
            _this.props.getAList(0, 5, 'bearFood');
        } else if (id === 8) {
            _this.props.getAList(0, 5, 'vegetableDish');
        } else {
            _this.props.getAList(0, 5, 'dessert');
        }
    }

    render() {
        return (
            <div>
                <div className="bazaarlist-head">
                    <span className="iconfont icon-fanhui" onClick={()=>this.props.history.goBack()}></span>
                    <i className="iconfont icon-fangdajing"></i>
                    <input type="text" placeholder="搜索美味佳肴"/>
                </div>
                <div className="container" style={{"marginTop": "20px"}}>
                    <div className="bazaarkist-con">
                        {
                            this.props.list.map((item, index) => (
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
                                        <i className="iconfont icon-shoucang"></i>
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
import './bazaarlist.less'
export default  connect(state => state.bazaarlist, actions)(Bazaarlist);