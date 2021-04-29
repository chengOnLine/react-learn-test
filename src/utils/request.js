import axios from "axios";

export default function request( props ) {
    const { url , method , params } = props;
    return axios({
            method: method,
            baseURL: "http://localhost:8080",
            url : url,
            data: params,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
        });
}