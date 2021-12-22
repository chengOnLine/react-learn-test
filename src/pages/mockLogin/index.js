import React , {useState , useRef , useEffect} from "react";
import {Form , Input , Button, message} from "antd";
import ItemBox from "../../components/itemBox";
import {
    mockLogin,
    mockRegister,
    getUserList,
} from "./request";
import CryptoJS from "crypto-js";
import {CRYCTOKEY} from "../../utils/constant";

const {Item} = Form;
function MockLogin(props) {

    const [userList , setUserList] = useState([]);

    useEffect(()=>{
        fetchData();
        console.log("process.env.NODE_ENV" , process.env.NODE_ENV);
    } , [])

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const pullData = (values , type)=>{

        form.validateFields().then(()=>{
            // Encrypt 密码加密传输
            var ciphertext = CryptoJS.AES.encrypt(values.password, CRYCTOKEY).toString();
            values.password = ciphertext;

            // Decrypt 密码解密
            // var bytes  = CryptoJS.AES.decrypt(ciphertext, '1234123412ABCDEF');
            // var originalText = bytes.toString(CryptoJS.enc.Utf8);
            // console.log("ciphertext",ciphertext , "originalText",originalText);

            const request = type === "login" ? mockLogin : mockRegister;
            request(values).then( res => {
                console.log("data" , res);
                const {code , msg} = res || {};
                if(code === 0){
                    message.success(msg);
                    fetchData();
                }else{
                    message.error(msg||"未知错误");
                }
            })  
        })
    }

    const fetchData = () => {
        getUserList().then(res =>{
            const {code , list} = res;
            if(code === 0){
                setUserList(list);
            }else{
                setUserList([]);
            }
        })      
    }

    return (
        <div>
            <ItemBox>
                <ItemBox>
                  1
                </ItemBox>
                <ItemBox>
                  2
                </ItemBox>
                {/* <div>1</div> */}
            </ItemBox>
            {/* <ItemBox title="mockLogin">
                <Form 
                    form = {form}
                    {...layout}
                    layout="horizontal" 
                    initialValues = {
                        { 
                            name : undefined,
                            email : undefined,
                            password : undefined,
                        }
                    }>
                    <Item
                        label = "name"
                        name = "name"
                        rules = {[
                            {
                                required:true,
                                message:"name can't be blank"
                            }
                        ]}>
                        <Input style={{width:"200px"}} placeholder="name"></Input>
                    </Item>
                    <Item
                        label = "email"
                        name = "email"
                        rules = {[
                            {
                                required:true,
                                message:"email can't be blank"
                            }
                        ]}>
                        <Input style={{width:"200px"}} placeholder="email"></Input>
                    </Item>
                    <Item
                        label = "password"
                        name = "password"
                        rules = {[
                            {
                                required:true,
                                message:"password can't be blank"
                            }
                        ]}>
                        <Input.Password style={{width:"200px"}} placeholder="password"></Input.Password>
                    </Item>
                    <Item
                        {...tailLayout}>
                        <Button style={{marginRight:15}} type="primary" onClick = { ()=> { pullData( form.getFieldsValue() , "login")}}>
                            login
                        </Button>
                        <Button type="primary" onClick = { ()=> { pullData( form.getFieldsValue() , "register")}}>
                            register
                        </Button>
                    </Item>
                </Form>
            </ItemBox>
            <ItemBox title="users">
                <ul>
                    {
                        Array.isArray(userList) && userList.map( (item,index) => {
                            const {name , email} = item;
                            return <li key={index}>
                                name：{name} ; email：{email}
                            </li>
                        })
                    } 
                </ul>
            </ItemBox> */}
        </div>
    )
}

export default MockLogin;