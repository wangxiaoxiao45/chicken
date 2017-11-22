import React,{Component} from 'react';
import {compressImage,showAlert} from '../../../utils'

export default class MenuCover extends Component{
    constructor(){
        super();
        console.log(this.props);
        this.state={
            menuCover:''
        }
    }
    uploadImage=(e,num)=>{
        let target=e.target;
        if(!target.value) return;

        let imageSrc=URL.createObjectURL(target.files[0]);

        compressImage(imageSrc,.9,(img)=>{

            this.setState({
                menuCover:img
            },function(){
                this.props.addPicFn(img,num);
            });
            //释放内存
            URL.revokeObjectURL(imageSrc);
        });
    };
    removeImg=(e,index)=>{
        let parent=e.target.parentNode;

        if(/menu-cover/ig.test(parent.className)){
            showAlert(()=>{
                this.props.removePicFn(index);
                this.setState({
                    menuCover:''
                });
            },'确定删除图片');
        }
    };

    componentDidMount(){
        this.setState({
            menuCover:this.props.menuCover
        });
    }

    render(){
        let index=this.props.index||0;
        return (
            <div className="menu-cover menu-upload-img">
                {this.state.menuCover||this.props.menuCover?<img src={this.props.menuCover} ref={img=>this.imgEle=img} alt=""/>:null}
                {this.state.menuCover||this.props.menuCover?<i className="iconfont icon-guanbi" onClick={(e)=>this.removeImg(e,this.props.index)}/>:null}

                <span>{this.props.describe}</span>
                <input type="file" className="upFile" onChange={(e)=>this.uploadImage(e,index)} name="imgCover"/>

            </div>

        )
    }
}
