import React from "react";
class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count:0,
        }
    }
    componentDidMount(){
        
    }
    addCount = ()=>{
        console.log("coutn",this.state.count);
        this.setState(({count})=>({count: count+1}));
    }
    render(){
        const {count} = this.state;
        return <div>
            i am test count:{count}
        </div>
    }
}

export default Test;