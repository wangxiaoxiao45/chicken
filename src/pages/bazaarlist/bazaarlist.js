import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import actions from '../../store/actions/bazaarlist'
import {connect} from 'react-redux';
import '../../common/css/index.less'

class Bazaarlist extends Component {

    handleDetail=(id)=>{
        console.log(id);
    };

    handleDl=(e)=>{
        e.stopPropagation();
        console.log(333);
    };

    componentDidMount() {

        let id = parseFloat(this.props.match.params.id);
        let _this = this;
        let ary = ['homedishes', 'fastFood', 'downMeal', 'breakFast', 'meat', 'fish', 'bearFood', 'vegetableDish', 'dessert'];

        for (let i = 0; i < ary.length; i++) {
            if (id === i + 1) {
                _this.props.getAList(0, 5, ary[i]);
            }
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

                                <Link to={`/bazaardetail/${item.id}`}  key={index} onClick={()=>this.handleDetail(item.id)}>


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


                                        <i className={ this.props.list[index].collection?"iconfont icon-shoucang1 icon-shoucang-add":"iconfont icon-shoucang icon-shoucang-add"} onClick={(e)=>{this.handleDl(e);this.props.changeColor(item.id);
                                        if(!this.props.list[index].collection){
                                            this.props.addCollect(item);
                                        }

                                        }}/>




                                </Link>
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