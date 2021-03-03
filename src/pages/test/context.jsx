import React from "react";
import {Consumer} from "../../context";
import {Button} from "antd";
class ContextTest extends React.Component{
    constructor(props){
        super(props);
    }
    // static contextType = ThemeContext;
    render(){
        console.log("context" , this.context)
        return <>
            <div>
                <Consumer>
                {
                    (context)=>{
                        const {fruit , count , control} = context; 
                        return <>
                             <div>{`fruit type: ${fruit} , count:${count}`}</div>
                            <Button size="small" type="primary" onClick={()=>typeof control.add === "function" && control.add(1)}>Add</Button>
                            <Button size="small" style={{marginLeft:15}} type="primary" onClick={()=>typeof control.sub === "function" && control.sub(1)}>Sub</Button>
                        </>
                    }
                }
                </Consumer>
            </div>
        </>
    }
}

export default ContextTest;