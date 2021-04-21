import React , {forwardRef , useEffect} from "react";
import NavMenu from "../components/navMenu";
import MenuBar from "../components/navBar";
import MainRoute from "../router/main";
function Main(props) {

    return <React.Fragment>
        <div className="navBar" style={{width:"100%" , height:"80px" , position:"fixed" , top:"0" , left:"0"}}>
            <MenuBar />
        </div>
        <div className="slide" style={{width:"250px" , height:"100%" , position:"fixed" , top:"80px" , left:"0" , backgroundColor:"#FAFAFA"}}>
            <NavMenu></NavMenu>
        </div>  
        <div className="content" style={{padding:"80px 0 0 250px", backgroundColor:"#FFFFFF"}}>
            <div style={{padding:"10px"}}>
                <MainRoute />
            </div>
        </div>
    </React.Fragment>
}

export default forwardRef( (props , ref) => <Main ref = {ref} {...props}/>)