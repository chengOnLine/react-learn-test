import React from "react";
import Say from "./test/say";
import Validate from "./test/validate";
import Redux from "./test/redux";
import Context from "./test/context";
import ReactRedux from "./test/react-redux";
import CssMiddle from "./test/cssMiddle";

import {Provider} from "../context";

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
    render(){
        return <Provider value={this.getContext()}>
            {/* <Say/>
            <Validate/>
            <Redux/>
            <Context />
            <ReactRedux /> */}
            <CssMiddle />
        </Provider>
    }
}
export default Home;