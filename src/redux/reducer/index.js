import userInfo from "./userInfo";
import {combineReducers} from "redux";
const initState = {
    greeting:"Hello",
}
function baseInfo (state = initState , action){
    switch(action.type){
        case "updateBase": 
            return { ...state , ...action.data}
        default:
            return state;
    } 
}
const reducers = combineReducers({
    userInfo,
    baseInfo,
})
export default reducers;



