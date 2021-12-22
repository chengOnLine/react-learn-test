
import React from "react";
import Redux from "../test/redux";
import Context from "../test/context";
import ReactRedux from "../test/react-redux";
import {Provider} from "../../context";
import { Button } from "_antd@4.13.0@antd";
import ItemBox from "../../components/itemBox";
import axios from "axios";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count:0,
            fruit:"apple",
        }
    }   

    componentDidMount(){
        // var scope = "global scope";
        // function checkscope(){
        //     var scope = "local scope";
        //     function f(){
        //         console.log("scope" , scope);
        //     }
        //     return f();
        // }
        this.scope = "global scope";
        let obj = {
            scope : "obj",
            checkScope: () => {
                console.log(this.scope);
            }
        }
        let fn = obj.checkScope;
        fn();
        // obj.fn();
        obj.checkScope();
        // checkscope();
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
            this.props.history.push({pathname:"/communication/route/"+fruit});
        }else if(type === "query"){
            this.props.history.push({pathname:"/communication/route" , query:{queryName:fruit }});
        }else if(type === "state"){
            this.props.history.push({pathname:"/communication/route" , state:{stateName:fruit }});
        }else if(type = "search"){
            this.props.history.push({pathname:"/communication/route" , search:`searchName=${fruit}`});
        }
    }
    fetchData = ()=>{
        // axios.get("http://localhost:8080/mockLogin").then(res => {
        //     console.log("res" , res);
        // }).catch(e=>{
        //     console.log("error" ,e);
        // })
        axios({
            url:"http://localhost:8080/",
            method:"get",
            data:{
                name:"123"
            }
        })
    }

    render(){
        return <Provider value={this.getContext()}>
            <Redux/>
            <Context />
            <ReactRedux />
            <ItemBox title="route">
                <Button style={{marginRight:15}} onClick={()=>this.handleRouteJumpClick("params")}>params跳转</Button>
                <Button style={{marginRight:15}} onClick={()=>this.handleRouteJumpClick("query")}>query跳转</Button>
                <Button style={{marginRight:15}} onClick={()=>this.handleRouteJumpClick("state")}>state跳转</Button>
                <Button style={{marginRight:15}} onClick={()=>this.handleRouteJumpClick("search")}>search跳转</Button>
            </ItemBox>
            <ItemBox title="axios">
                <Button onClick={()=>{this.fetchData()}}>axios</Button>
            </ItemBox>
        </Provider>
    }
}
export default Home;