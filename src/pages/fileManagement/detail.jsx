import React from "react";
import style from "./index.scss";
import { Table , Button , Form , Input} from "_antd@4.13.0@antd";
import mockRequest from "../mockLogin/mockRequest";
const { Item } = Form;
const data = [
    {
        key: '1',
        name: '李林城',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]
export default class List extends React.Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef(null);
        this.state = {
            loading:false,
            tableData : [
            ]
        }
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                align:"center",
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                align:"center",
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                align:"center",
            },
            {
                title: "操作",
                dataIndex:"key",
                align:"center",
                render:(key)=>{
                   return <Button type="link" onClick={ ()=>{this.goToDetailPage(key)} }>查看</Button>
                }
            }
        ]
    }

    goToDetailPage = (name)=>{
        this.props.history.push({
            pathname:`/fileManagement/detail?name=${name}`
        })
    }

    queryTableData = ()=>{
        let values = this.formRef.current.getFieldsValue();
        this.setState({
            loading:true,
        } , ()=>{
            mockRequest( data , values ).then( res => {
                this.setState({
                    tableData:res,
                    loading:false,
                })
            }).catch( ()=>{
                this.setState({
                    loading:false,
                })
            })
        })
    }

    componentDidMount(){
        this.queryTableData();
    }

    render(){
        const { tableData , loading} = this.state;
        return (
            <div className={style.list}>

            </div>
        );
    }
}