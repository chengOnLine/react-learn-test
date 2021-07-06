import React from "react";
import {connect} from "react-redux";
import ItemBox from "../../components/itemBox";
import { Button } from "antd";
class ReactRedux extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {greeting ,username , phone , updateName} = this.props;
        return <ItemBox title="react-redux">
            <div>{`${greeting} , I'm ${username}. My phone number is ${phone}`}</div>
            <Button onClick={ ()=> updateName("李林城") }>中文名</Button>
            <Button onClick={ ()=> updateName("lilincheng") }>拼音</Button>
        </ItemBox>
    }
}
const mapStateToProps = function(state , ownProps){
    console.log("mapStateToProps.ownProps" , ownProps)
    return {
        username:state.userInfo.username,
        phone:state.userInfo.phone,
        greeting:state.baseInfo.greeting,
    }
}

const mapDispatchToPrps = function(dispatch , ownProps){
    console.log("mapDispatchToPrps.ownProps" , ownProps);
    return {
        updateName : ( name )=>{
            console.log("name" , name);
            dispatch( {type:"updateUser" , data: { username : name} } );
        }
    }
}
export default connect(mapStateToProps , mapDispatchToPrps)(ReactRedux);