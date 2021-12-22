import React , {forwardRef , useEffect} from "react";


export default forwardRef( (props , ref)=>{
    const {
        title = "",
        detail = "",
        html = "",
    } = props; 
    
    useEffect( ()=>{
        // if( props.children ){
            // const result = React.Children.map( props.children , function(child){ return child } );
            // console.log( "result" , result );
        // }
    }, [])
    
    return <div style={{height:"auto" , border:"2px solid #FAFAFA" , padding:"10px" , marginBottom:"10px"}} {...props} ref={ref}>
        <h2>{title}</h2>
        <p>{detail}</p>
        <div style={{backgroundColor:"cyan"}} dangerouslySetInnerHTML = {{__html:html}}></div>
        {React.Children.map( props.children , function( child ){ return child } ) }
   </div>
})
// export default ItemBox;