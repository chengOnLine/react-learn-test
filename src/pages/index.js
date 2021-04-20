import React from "react";
import Say from "./test/say";
import Validate from "./test/validate";
import Redux from "./test/redux";
import Context from "./test/context";
import ReactRedux from "./test/react-redux";
import CssMiddle from "./test/cssMiddle";
import MyPromise from "./test/script/MyPromise";
import TearJSByHand from "./test/script/TearJSByHand";
import {Provider} from "../context";
import { Button } from "_antd@4.13.0@antd";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count:0,
            fruit:"apple",
        }
    }   
    getContext = ()=>{
        return {
            ...this.state,
            control:{
                add:(num)=>{
                    this.setState({ count: this.state.count + num })
                },
                sub:(num)=>{
                    this.setState({ count: this.state.count - num })
                }
            }
        }
    }
    handleRouteJumpClick = (type)=>{
        const {fruit} = this.state;
        if(type === "params"){
            this.props.history.push({pathname:"/route/"+fruit});
        }else if(type === "query"){
            this.props.history.push({pathname:"/route" , query:{queryName:fruit }});
        }else if(type === "state"){
            this.props.history.push({pathname:"/route" , state:{stateName:fruit }});
        }else if(type = "search"){
            this.props.history.push({pathname:"/route" , search:`searchName=${fruit}`});
        }
    }
    render(){
        return <Provider value={this.getContext()}>
            {/* <Say/> */}
            {/* <Validate/> */}
            {/* <Redux/> */}
            <Context />
            {/* <ReactRedux /> */}
            {/* <CssMiddle /> */}
            <Button onClick={()=>this.handleRouteJumpClick("params")}>params跳转</Button>
            <Button onClick={()=>this.handleRouteJumpClick("query")}>query跳转</Button>
            <Button onClick={()=>this.handleRouteJumpClick("state")}>state跳转</Button>
            <Button onClick={()=>this.handleRouteJumpClick("search")}>search跳转</Button>
            <div dangerouslySetInnerHTML={{__html:"<span style=color:red>这是渲染的 HTML 内容</span>"}}></div>
            {/* xss攻击 */}
            <div dangerouslySetInnerHTML={{__html:"<script type=text/javascript src='./script/MyPromise.js'>console.log('Hello')</script>"}}></div> 
        </Provider>
    }
}
export default Home;