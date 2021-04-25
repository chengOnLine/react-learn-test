import React from "react";
import ItemBox from "../../components/itemBox";
import {
    Image,
    Button,
} from "antd";
import pic from "./imgs/screenXclientXpageX.png";
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show:true,
            clientX:undefined, 
            clientY:undefined,
            screenX:undefined,
            screenY:undefined,
            pageX:undefined,
            pageY:undefined,
        }
    }
    componentDidMount(){
        document.onmousemove = (e)=>{
            const {clientX , clientY , screenX , screenY , pageX , pageY } = e;
            this.setState({
                clientX, 
                clientY,
                screenX,
                screenY,
                pageX,
                pageY,
            })
        }
    }
    
    render(){
        const {clientX , clientY , screenX , screenY , pageX , pageY } = this.state;
        return <div >
           <ItemBox title="参考图片">
               <Button onClick={()=>this.setState({
                   show:!this.state.show,
               })}>{`${this.state.show ? "隐藏" : "显示"}`}</Button>
               <br/>
               {this.state.show && <Image src = {pic}></Image>}
           </ItemBox>
           <ItemBox title="实例">
               <div ref={ (ref)=>this.box = ref } className="outer" style={{height:"500px" , backgroundColor:"cyan"}}> 
                    clientX:{clientX}  <br/>
                    clientY:{clientY}  <br/>
                    screenX:{screenX}  <br/>
                    screenY:{screenY}  <br/>
                    pageX:{pageX}  <br/>
                    pageY:{pageY}  <br/>
               </div>
           </ItemBox>
        </div>
    }
}

export default Home;