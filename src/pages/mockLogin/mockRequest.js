export default function( data = [] , params = {} , delay = 0.5*1000 ){
    return new Promise( (resolve , reject ) => {
        setTimeout( ()=>{
            resolve( data.filter( item => compare(item , params )) );
        } , delay )
    })
}

function compare( item , params ){
    for( let key in params){
        if( params[key] === undefined || params[key] === "" ){
            return true;
        }
        if( params[key] !== item[key] ){
            return false;
        }   
    }
    return true;
}