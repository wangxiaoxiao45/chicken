import React,{Component} from 'react';
import { Switch,List,Toast } from 'antd-mobile';
import {connect} from 'react-redux'

import actions from '../../store/actions/addmenu.js'
import {get,post} from '../../api/index'


import Top from "../../components/top/index";

import './index.less'
import Food from "./food/food";
import MenuCover from "./menuCover/menuCover";
import Editable from "../../components/editable/index";
import Step from "./step/step";



class AddMenu extends Component{
    constructor(){
        super();
        this.state={
            menuTitle:'',
            isChecked:false,
            show:false,
            isShowNext:true
        }
    }
    show=(isShow)=>{
        this.setState({
            show:isShow
        });
        this.setState({
            isShowNext:''
        })
    };
    inputValueChange=(e)=>{
        this.setState({
            menuTitle:e.target.value
        },function(){
            this.setState({
                isShowNext:this.state.menuTitle
            });
           this.props.menuTitleFn(this.state.menuTitle);
        });
    };
    //独家发布
    only=(checked)=>{
       this.setState({
            isChecked:!this.state.isChecked
        });
        this.props.exclusive(checked);
    };
    //删除菜谱
    del=()=>{
        this.props.delMenu();
    };
    //提交
    bindleSubmit=()=>{
        let props=this.props;
       if(!props.menuCover){
           Toast.info('菜谱封面图片不能为空',1);
           return;
       }
       if(!props.menuTitle){
           Toast.info('菜谱名称不能为空',1);
           return;
       }

        let isBool=props.foodMaterials.every((item)=>{
            return item.material===''&&item.num==='';
       });

        if(isBool){
            Toast.info('食材不能为空',1);
            return;
        }

        let foodMaterials=props.foodMaterials.filter(item=>item.material!==''||item.num!=='');
        let step=props.step.filter(item=>item.img!==''||item.detail!=='');

        post('/addmenu',{
            "menuCover":props.menuCover,
            "menuTitle":props.menuTitle,
            "menuCateStory":props.menuCateStory,
            "foodMaterials":foodMaterials,
            "step":step,
            "tips":props.tips,
            "exclusive":props.exclusive,
        }).then((res)=>{
           if(res.success==='ok'){

           }
        });
    };

    render(){
        return (
            <div className="add-menu">
                <Top titleVal="菜谱名称" toBack="取消" toGo="继续" ref={(t)=>this.t=t} colorActive={this.state.isShowNext} history={this.props.history} show={this.show}/>
                <section className="container">
                    <form>
                        <MenuCover addPicFn={this.props.menuCoverFn} removePicFn={this.props.removeCoverFn} menuCover={this.props.menuCover} describe="+菜谱封面"/>
                        <div className={this.state.show?"menu-transform active":"menu-transform"}>
                            <div className="add-menu-title">
                                <input type="text" value={this.state.menuTitle} name="titleCover" onChange={this.inputValueChange} placeholder="添加菜谱名称"/>
                            </div>
                            <div className="menu-transform-bt">
                                <div className="menu-list">
                                    <Editable menuCateStoryFn={this.props.menuCateStoryFn} story={this.props.menuCateStory} titleVal="输入这道美食背后的故事"/>
                                    <Food addMaterialFn={this.props.addMaterialFn} foodMaterials={this.props.foodMaterials} changeMaterialFn={this.props.changeMaterialFn}/>
                                    <Step step={this.props.step} addStepFn={this.props.addStepFn} changeStepImgFn={this.props.changeStepImgFn}/>
                                    <h4>小贴士</h4>
                                    <div className="small-font">
                                        <Editable menuCateStoryFn={this.props.menuTipsFn} story={this.props.tips} titleVal="添加小贴士，这道菜有哪些可供厨友参考的小技巧"/>
                                    </div>
                                </div>
                                <div className="menu-bottom">
                                    <div className="menu-bottom-dj">
                                        <List.Item
                                            extra={<Switch
                                                checked={this.state.isChecked}
                                                onClick={this.only}
                                            />}
                                        ><strong>独家菜谱</strong>
                                            <p>仅在下厨房发布，拥有特殊标示</p>
                                        </List.Item>
                                    </div>
                                    <p className="del-list" onClick={this.del}>删除这个菜谱</p>
                                    <a href="javascript:void(0);" className="menu-submit" onClick={this.bindleSubmit}>发布这个菜谱</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}

export default connect(
    state=>state.addmenu,
    actions
)(AddMenu);