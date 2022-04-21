import axios from "axios";
import qs from "qs";
export default function request( props ) {
    const { url , method , params } = props;
    // const reqUrl = "http://localhost:8080" + url;
    // const queryString = qs.stringify(params, {
    //     arrayFormat: "indices",
    //     allowDots: true,
    //   });
    // if( method === "get" ){
    //     console.log("reqUrl" , reqUrl )
    //     return axios.get(`${reqUrl}?${queryString}`)
    // }else if( method === "post" ){
    //     console.log("queryString" , queryString)
    //     return axios.post(reqUrl , queryString);
    // }
    return axios({
            method: method,
            baseURL: "http://localhost:8080",
            url : url,
            data: qs.stringify(params),
            headers:{
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            // transformRequest: [function (data) {
            //     var formData = new FormData();
            //     for(var key in data ){
            //         if( data.hasOwnProperty(key) ){
            //             if( data[key] ){
            //                 formData.append( key , data[key] );
            //             }
            //         }
            //     }
            //     return formData;
            //     // let ret = ''
            //     // for (let it in data) {
            //     // ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            //     // }
            //     // return ret
            // }],
        });
}