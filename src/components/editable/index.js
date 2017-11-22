import React,{Component} from 'react';
import ContentEditable from 'react-contenteditable'


export default class Editable extends Component{
    constructor(){
        super();
        this.state={
            menuTitle:'',
            story:""
        }
    }

    handleChange=(e,index)=>{
        this.setState({story: e.target.value},function(){
            this.props.menuCateStoryFn(this.state.story,index);
        });
    };
    handleFocus=(e,index)=>{
        if(this.state.story===this.props.titleVal){
            this.setState({story: ''},function(){
                this.props.menuCateStoryFn('',index);
            });
        }
    };
    handleBlur=(e)=>{
        if(!this.props.story){
            this.setState({story: this.props.titleVal});
        }
    };
    componentDidMount(){
        this.setState({
            story:this.props.titleVal
        });

    }
    render(){
        let index=this.props.index;
        return (
            <div>
                <ContentEditable
                    html={this.state.story}
                    disabled={false}
                    onChange={(evt)=>this.handleChange(evt,index)}
                    className={this.state.story===this.props.titleVal||''?"editable active":"editable"}
                    onFocus={(evt)=>this.handleFocus(evt,index)}
                    onBlur={this.handleBlur}
                    data-index={this.props.index}
                />
            </div>
        )
    }
}