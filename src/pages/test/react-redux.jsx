import React from "react";
import {connect} from "react-redux";
class ReactRedux extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {greeting ,username , phone} = this.props;
        return <>
            <div>{`${greeting} , I'm ${username}. My phone number is ${phone}`}</div>
        </>
    }
}
const mapStateToProps = function(state){
    return {
        username:state.userInfo.username,
        phone:state.userInfo.phone,
        greeting:state.baseInfo.greeting,
    }
}
export default connect(mapStateToProps)(ReactRedux);