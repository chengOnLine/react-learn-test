import React from "react";
import Say from "./test/say";
import Validate from "./test/validate";
class Home extends React.Component{
    constructor(props){
        super(props);
    }   
    render(){
        return <Validate/>
    }
}
export default Home;