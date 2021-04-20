import { useEffect , memo} from "react";

function Memo(props){

    useEffect(()=>{
        console.log("props",props);
    } , props)
    return <>
        <p>i’m memo</p>
        <div>
            name:{props.name}
            <br/>
            data:{props.data.name}
        </div>
    </>    
}

export default memo(Memo , (oldProps , newProps)=>{
    // const {data:oldData} = oldProps;
    // const {data:newData} = newProps;
    console.log("oldProps", oldProps);
    console.log("newProps" , newProps);
    console.log(oldProps === newProps)
    if(oldProps === newProps) 
        return true;
    return false;
});