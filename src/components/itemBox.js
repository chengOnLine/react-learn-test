import React from "react";
 
function ItemBox(props) {
    const {title = ""} = props; 
    return <div style={{border:"2px solid #FAFAFA" , padding:"10px" , marginBottom:"10px"}}>
    <h2>{title}</h2>
        {props.children}
   </div>
}

export default ItemBox;