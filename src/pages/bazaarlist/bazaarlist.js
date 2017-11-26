import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import actions from '../../store/actions/bazaarlist'
import {connect} from 'react-redux';
import {upMore} from '../../utils'
import '../../common/css/index.less'

class Bazaarlist extends Component {
    constructor(){
        super();
        this.state={text:''};
    }

    handleDl=(e,item,index)=>{
        e.preventDefault();

        // console.log(333);
        this.props.changeColor(item.id);
        if(!this.props.bazaarlist.list[index].collection){
            this.props.addCollect(item);
        }

    };
    handleSearch = (e) => {
        this.setState({text:e.target.value});

    };
    componentDidMount() {
        let id = parseFloat(this.props.match.params.id);
        let _this = this;
        let ary = ['homedishes', 'fastFood', 'downMeal', 'breakFast', 'meat', 'fish', 'bearFood', 'vegetableDish', 'dessert'];

        for (let i = 0; i < ary.length; i++) {
            if (id === i + 1) {
                _this.props.getAList(ary[i]);
                upMore(this.container, () => _this.props.getAList(ary[i]))
            }
        }

    }
    render() {
        let queryList;
        if(this.state.text){
            queryList=this.props.bazaarlist.list.filter((item,index)=>(
                item.title.indexOf(this.state.text)>-1
            ))
        }else{
            queryList=this.props.bazaarlist.list
        }
        return (

            <div>
                <div className="bazaarlist-head">
                    <span className="iconfont icon-fanhui" onClick={()=>this.props.history.goBack()}></span>
                    <div className="top-input">
                        <i className="iconfont icon-fangdajing"></i>
                        <input type="text" placeholder="搜索美味佳肴" ref={input=>this.input=input} onChange={ this.handleSearch}/>
                    </div>
                </div>
                <div className="container" ref={container => this.container = container} style={{"marginTop": "20px"}}>
                    <div className="bazaarkist-con">
                        {
                            queryList.length===0?<img src={require('../collect/img/jjj.png')} className="bg" alt=""/>:
                                queryList.map((item, index) => (

                                <Link to={`/bazaardetail/${item.id}`}  key={index}>

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


                                    {this.props.session.user.username?<i className={ this.props.bazaarlist.list[index].collection?"iconfont icon-shoucang1 icon-shoucang-add":"iconfont icon-shoucang icon-shoucang-add"} onClick={(e)=>{this.handleDl(e,item,index);}}/>:null}

                                </Link>
                            ))
                        }
                        {
                            !this.props.bazaarlist.hasMore && queryList.length!==0?
                                <div className="bazaarlist-loading">{this.props.bazaarlist.loading}</div> : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
import './bazaarlist.less'
export default  connect(state => state, actions)(Bazaarlist);