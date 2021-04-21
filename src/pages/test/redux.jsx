import React from "react";
import {store} from "../../redux/store";
import ItemBox from "../../components/itemBox";
// const {getState , dispatch } = store;
class ReduxTest extends React.Component{
    constructor(props){
        super(props);
        store.dispatch({type:"updateUser" , data:{username:"李林城" , phone:"15119623093"}})
    }
    render(){
        const {userInfo , baseInfo } = store.getState() || {};
        const {username , phone } = userInfo || {};
        const {greeting} = baseInfo || {};
        console.log(store.getState())
        return <ItemBox title="redux">
            <div>{`${greeting} , I'm ${username}. My phone number is ${phone}`}</div>
        </ItemBox>
    }
}
export default ReduxTest;