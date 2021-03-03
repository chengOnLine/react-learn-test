const initState = {
    username:"--",
    phone:"--",
}
export default function (state = initState , action){
    switch(action.type){
        case "updateUser":
            return { ...state, ...action.data }
        default:
            return state;
    }
}