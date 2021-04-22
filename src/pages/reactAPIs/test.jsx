import React from "react";
import ItemBox from "../../components/itemBox";
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
        return <ItemBox title="test">
            count: {count}
        </ItemBox>
    }
}

export default Test;