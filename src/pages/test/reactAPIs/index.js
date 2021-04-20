import React from "react";
import Memo from "./memo";
import ForwardRef from "./forwardRef";
import Test from "./test";
import {
    Input,
    Button
} from "antd";
class ReactAPI extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"lilincheng",
            data:{
                name:"data",
            },
        }
    }   

    componentDidMount(){
        console.log("this.child" , this.child)
        console.log("this.test" , this.test)
        console.log("this.test.current" , this.test.current)
    }
    render(){
        const {name , data} = this.state;
        return <div>
            <h3>React API</h3>
            <Input value={name} onChange = {(e)=>{ 
                this.state.data.name = e.target.value;
                let obj = {name:e.target.value};
                this.setState({
                    name:e.target.value,
                    data:{...this.state.data},
             })}}>
            </Input>
            <Memo name={name} data={data}></Memo>
            <ForwardRef name={name} ref={(ref) => this.child = ref }></ForwardRef>
            <Test ref={ (ref)=> this.test = ref}></Test>
            <Button onClick = {()=>{this.test.addCount()}}>addCount</Button>
        </div>
    }
}
export default ReactAPI;