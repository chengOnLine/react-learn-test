import { useEffect , forwardRef} from "react";
import ItemBox from "../../components/itemBox";
// react不允许ref通过props传递，因为组件上已经有 ref 这个属性,在组件调和过程中，
// 已经被特殊处理，forwardRef出现就是解决这个问题，把ref转发到自定义的forwardRef定义的属性上，
// 让ref，可以通过props传递。

function ForwardRef(props){
    useEffect(()=>{
        console.log("props",props);
    } , [props])
    return <ItemBox title="forwardRef">
        <p ref={props.onRef}>i’m forwardRef</p>
    </ItemBox>    
}

export default forwardRef((props, ref) => <ForwardRef onRef = {ref} {...props}/>);
// export default ForwardRef;