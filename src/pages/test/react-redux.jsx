import React from "react";
import {connect} from "react-redux";
import ItemBox from "../../components/itemBox";
class ReactRedux extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {greeting ,username , phone} = this.props;
        return <ItemBox title="react-redux">
            <div>{`${greeting} , I'm ${username}. My phone number is ${phone}`}</div>
        </ItemBox>
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