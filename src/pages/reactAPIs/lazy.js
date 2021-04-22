import React , {lazy , Suspense} from "react";
import ItemBox from "../../components/itemBox";
import {
    Image
} from "antd";
import car from "./imgs/car.jpg";
class Test extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
    }
    render(){
        return <div>
            <Image width={350} src={car}></Image>
        </div>
    }
}

const LazyComponent = lazy( ()=> new Promise( (resolve , reject) => {
    setTimeout(()=>{
        resolve({
            default: ()=><Test />
        })
    } , 2000)
}))
function Lazy(props) {
    return <ItemBox title="lazy Suspense" {...props}>
        <Suspense fallback={<div>loading...</div>}>
            <LazyComponent/>
        </Suspense>   
    </ItemBox>
}

export default Lazy;