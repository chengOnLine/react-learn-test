import React from "react";
import Say from "./test/say";
import Validate from "./test/validate";
import Redux from "./test/redux";
class Home extends React.Component{
    constructor(props){
        super(props);
    }   
    render(){
        return <>
            <Say/>
            <Validate/>
            <Redux/>
        </>
    }
}
export default Home;