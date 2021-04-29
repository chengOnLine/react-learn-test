import request from "../../utils/request";

const mockLogin = (params) => request({
    url:"/user/login",
    method:"post", 
    params,
})

const mockRegister = (params) => request({
    url:"/user/register",
    method:"post",
    params,
})

const getUserList = () => request({
    url:"user/list",
    method:"get",
})

export {
    mockLogin,
    mockRegister,
    getUserList,
}