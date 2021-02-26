import React from "react";
import Say from "./test/say";
class Home extends React.Component{
    constructor(props){
        super(props);
    }   
    render(){
        return <Say/>
    }
}
export default Home;