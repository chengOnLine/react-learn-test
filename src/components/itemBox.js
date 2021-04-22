import React from "react";
 
function ItemBox(props) {
    const {
        title = "",
        detail = "",
        html = "",
    } = props; 
    
    return <div style={{border:"2px solid #FAFAFA" , padding:"10px" , marginBottom:"10px"}} {...props}>
        <h2>{title}</h2>
        <p>{detail}</p>
        <div style={{backgroundColor:"cyan"}} dangerouslySetInnerHTML = {{__html:html}}></div>
        {props.children}
   </div>
}

export default ItemBox;