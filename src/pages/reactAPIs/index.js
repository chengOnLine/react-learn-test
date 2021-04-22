import React from "react";
import Memo from "./memo";
import ForwardRef from "./forwardRef";
import Test from "./test";
import ItemBox from "../../components/itemBox";
import {
    Input,
    Button,
    Form,
    Image
} from "antd";
import car from "./imgs/car.jpg";
import Lazy from "./lazy";
const { Item } = Form;
class ReactAPI extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showLazyComponent:true,
            name:"lilincheng",
            data:{
                name:"lilincheng",
            },
        }
    }   

    componentDidMount(){
        console.log("this.child" , this.child)
        console.log("this.test" , this.test)
    }
    render(){
        const {name , data , showLazyComponent} = this.state;
        return <div>
            <ItemBox title="test memo">
                <Item 
                    label="setState({data:this.state.data})"
                >
                    <Input style={{width:"150px"}} value={name} onChange = {(e)=>{ 
                        this.state.data.name = e.target.value;
                        this.setState({
                            name:e.target.value,
                            data:this.state.data,
                    })}}>
                    </Input>
                </Item>

                <Item 
                    label="setState({data:{...this.state.data}})"
                >
                    <Input style={{width:"150px"}} value={name} onChange = {(e)=>{ 
                        this.state.data.name = e.target.value;
                        this.setState({
                            name:e.target.value,
                            data:{...this.state.data},
                    })}}>
                    </Input>
                </Item>

                <Memo name={name} data={data}></Memo>
            </ItemBox>

            <ItemBox title="test ref and forwardRef">
                <Button onClick = {()=>{this.test.addCount()}}>this.test.addCount</Button>
                <Test ref={ (ref)=> this.test = ref}></Test>
                <ForwardRef name={name} ref={(ref) => this.child = ref }></ForwardRef>
            </ItemBox>

            <ItemBox title="test lazy and Suspense">
                <Button onClick={ () => this.setState({ showLazyComponent : !this.state.showLazyComponent })}>{`${showLazyComponent ? "hide" : "show"}`}</Button>
                display none 不能重复触发渲染
                <Lazy style={ showLazyComponent ? {} : {display:"none" }  }/>
                <div style={{width:"1000px" , height:"100px" , backgroundImage:"C:/Users/86000095/Desktop/图片及图标资源/菜品素材/crown.jpg"}}>
                    <Image width={350} src={car}></Image>
                
                </div>
                
            </ItemBox>

        </div>
    }
}
export default ReactAPI;