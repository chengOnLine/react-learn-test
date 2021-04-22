import { useEffect , memo} from "react";
import ItemBox from "../../components/itemBox";

function Memo(props){
    useEffect(()=>{
        console.log("props",props);
    } , [props])
    return <ItemBox title="memo">
        <p>i’m memo</p>
        <div>
            name:{props.name}
            <br/>
            data.name:{props.data.name}
        </div>
    </ItemBox>    
}

export default memo(Memo , (pre , next)=>{
    // console.log(pre.name === next.name , pre.data === next.data);
    if(pre.name === next.name) return true;
    else if(pre.data === next.data) return true;
    else return false;
});