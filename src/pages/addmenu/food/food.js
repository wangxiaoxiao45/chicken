import React,{Component} from 'react';
import './food.less'
export default class Food extends Component{
    constructor(){
        super();
        this.state={
            materials:[
                {
                    material:'',
                    num:''}
            ],
            stateShow:false
        };
    }
    addList=()=> {
        let item={material:'',num:''};
        this.setState({
            materials:[...this.state.materials,item]
        },function(){
            this.props.addMaterialFn(item);
        });
    };
    change1=(e)=>{
        this.setState({
            materials:this.state.materials.map((item,index)=>{
                let material=item.material;
                let num=item.num;
                if(index==e.target.dataset.index){
                    return {
                        material:e.target.value,
                        num
                    }
                }
                return item;
            })
        },function(){
            this.props.changeMaterialFn(this.state.materials);
        });
    };

    change2=(e)=>{
        this.setState({
            materials:this.state.materials.map((item,index)=>{
                let material=item.material;
                let num=item.num;
                if(index==e.target.dataset.index){
                    return {
                        material,
                        num:e.target.value
                    }
                }
                return item;
            })
        },function(){
            this.props.changeMaterialFn(this.state.materials);
        });
    };
    remove=(e)=>{
        this.setState({
            materials:this.state.materials.filter((item,index)=>{
                return e.target.dataset.index!=index;
            })
        },function(){
            this.props.changeMaterialFn(this.state.materials);
        });
    };
    hideDel=()=>{
        this.setState({
            stateShow:false
        })
    };

    componentDidMount(){
        this.setState({
            materials:this.props.foodMaterials
        });
    }

    render(){
        let list=this.state.materials;
        return (
            <div className="menu-food">
                <h4>用料</h4>
                <ul>
                    {
                        list.length>0?list.map((item,index)=>(
                            <li key={index}>
                                {
                                    this.state.stateShow?<i className="iconfont icon-shanchu" data-index={index} onClick={this.remove}/>:null
                                }
                                <input type="text" value={item.material} data-index={index} onFocus={this.hideDel} onChange={this.change1} placeholder="食材：如鸡蛋"/>
                                <input type="text" value={item.num} data-index={index} onFocus={this.hideDel} onChange={this.change2} placeholder="用量：如1只"/>
                            </li>
                        )):null
                    }
                </ul>
                <div className="add-food"><span onClick={this.addList}>再增加一行</span><span onClick={()=>this.setState({stateShow:!this.state.stateShow})}>调整用料</span></div>
            </div>
        )
    }
}