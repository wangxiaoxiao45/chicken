import React,{Component} from 'react';
import './step.less'
import MenuCover from "../menuCover/menuCover";
import Editable from "../../../components/editable/index";
import {compressImage,showAlert} from '../../../utils'
export default class Step extends Component{
    constructor(){
        super();
        this.state={
            step:[
                {
                    content:'',
                    img:''
                }
            ],
            del:false,
            setImg:'' //批量上传的时候设置图片
        }
    }
    //添加图片路径到state
    addPicFn=(imgSrc,num)=>{
        this.setState({
            step:this.state.step.map((item,index)=>{
                let img=item.img;
                let content=item.content;
                if(index==num){
                    return {
                        img:imgSrc,
                        content
                    }
                }
                return item;
            })
        },function(){
           this.props.changeStepImgFn(this.state.step);
        })
    };
    //更改描述
    changeVal=(val,num)=>{
        this.setState({
            step:this.state.step.map((item,index)=>{
                let img=item.img;
                let content=item.content;
                if(index==num){
                    return {
                        img,
                        content:val
                    }
                }
                return item;
            })
        },function(){
            this.props.changeStepImgFn(this.state.step);
        })

    };
    //删除图片，清除state里对应的图片路径
    removeImg=(num)=>{
        this.setState({
            step:this.state.step.map((item,index)=>{
                let img=item.img;
                let content=item.content;
                if(index==num){
                    return {
                        img:'',
                        content
                    }
                }
                return item;
            })
        },function(){
            this.props.changeStepImgFn(this.state.step);
        })
    };
    //添加单个步骤
    addSignle=()=>{
        this.setState({
            step:[...this.state.step,{img:'',content:''}]
        },function(){
            this.props.addStepFn({img:'',content:''});
        });
    };
    //批量添加步骤
    batchUp=(e)=>{
        let target=e.target;
        if(!target.value) return;
        this.setState({
            step:this.state.step.filter((item,index)=>item.img!==''||item.content!=='')
        },function(){
            [...target.files].map((item,index)=>{
                let imageSrc=URL.createObjectURL(item);
                compressImage(imageSrc,.9,(img)=>{

                    this.setState({
                        step:[...this.state.step,{img:img,content:''}],
                        setImg:img
                    },function(){
                        this.props.changeStepImgFn(this.state.step);
                    });

                    //释放内存
                    URL.revokeObjectURL(imageSrc);
                });
            })
        });




    };
    //显示删除按钮
    showDelBtn=()=>{
        this.setState({
            del:!this.state.del
        })
    };
    //删除
    del=(e,num)=>{
        showAlert(()=>{

            this.setState({
                step:this.state.step.filter((item,index)=>{
                    return index!==num;
                })
            },function () {

                this.props.changeStepImgFn(this.state.step);
            });

        },'是否要删除该步骤')

    };

    componentDidMount(){
        this.setState({
            step:this.props.step
        });
    }

    render(){
        let list= this.state.step;
        return (
            <div className="menu-step">
                <div className="menu-step-hd">
                    <h4>做法</h4>
                    <div className="batch-up">
                        <span>批量上传</span>
                        <input type="file" multiple="multiple" onChange={this.batchUp}/>
                    </div>
                </div>
                <ul className="menu-upload">
                    {list.length>0?list.map((item,index)=>(
                        <li key={index}>
                            <h5 className="step-num">步骤{index+1}</h5>
                            <div className={this.state.del?"menu-img active":"menu-img"}>
                                {this.state.del?<i className="iconfont icon-shanchu" onClick={(e)=>this.del(e,index)}/>:null}
                                <MenuCover menuCover={item.img} menuCoverFn={this.props.addStep} index={index} addPicFn={this.addPicFn} removePicFn={this.removeImg} describe="+步骤图"/>
                            </div>
                            <Editable titleVal="添加步骤说明"  menuCateStoryFn={this.changeVal} story={item.content} index={index} />
                        </li>
                    )):null}
                </ul>
                <div className="menu-change-step">
                    <span onClick={this.addSignle}>再增加一步</span>
                    <span onClick={this.showDelBtn}>调整步骤</span>
                </div>
            </div>
        )
    }
}