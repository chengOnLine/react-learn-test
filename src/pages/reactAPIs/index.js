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
                <Image width={350} src={car}></Image>
            </ItemBox>
            <ItemBox title="render">
                render 是我们最常用的react-dom的 api，用于渲染一个react元素，一般react项目我们都用它，渲染根部容器app。
            </ItemBox>
            <ItemBox title="hydrate">
                 服务端渲染用hydrate。用法与 render() 相同，但它用于在 ReactDOMServer 渲染的容器中对 HTML 的内容进行 hydrate 操作。
            </ItemBox>
            <ItemBox title="Portal">
                Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。createPortal 可以把当前组件或 element 元素的子节点，渲染到组件之外的其他地方。
                那么具体应用到什么场景呢？
                比如一些全局的弹窗组件model, Model 组件一般都写在我们的组件内部，倒是真正挂载的dom，都是在外层容器，比如body上。此时就很适合createPortalAPI。
                createPortal接受两个参数：
                第一个： child 是任何可渲染的 React 子元素 第二个： container是一个 DOM 元素。
            </ItemBox>
            <ItemBox title="unstable_batchedUpdates">
                在react-legacy模式下，对于事件，react事件有批量更新来处理功能,但是这一些非常规的事件中，批量更新功能会被打破。所以我们可以用react-dom中提供的unstable_batchedUpdates 来进行批量更新。
            </ItemBox>
            <ItemBox title="flushSync">
                flushSync 可以将回调函数中的更新任务，放在一个较高的优先级中。我们知道react设定了很多不同优先级的更新任务。如果一次更新任务在flushSync回调函数内部，那么将获得一个较高优先级的更新。比如
            </ItemBox>
            <ItemBox title="findDOMNode">
                findDOMNode用于访问组件DOM元素节点，react推荐使用ref模式，不期望使用findDOMNode。
                1 findDOMNode只能用在已经挂载的组件上。2  如果组件渲染内容为 null 或者是 false，那么 findDOMNode返回值也是 null。3 findDOMNode 不能用于函数组件。
            </ItemBox>
            <ItemBox title="unmountComponentAtNode">
                从 DOM 中卸载组件，会将其事件处理器和 state 一并清除。 如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true ，如果没有组件可被移除将会返回 false 。
            </ItemBox>
        </div>
    }
}
export default ReactAPI;