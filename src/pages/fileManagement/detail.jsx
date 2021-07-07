import React from "react";
import style from "./index.scss";
import { Table , Button , Form , Input} from "_antd@4.13.0@antd";
import { queryString } from "../../utils/common";
export default class List extends React.Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef(null);
        this.state = {
            name: "",
        }
    }
    componentDidMount(){
        let name = queryString()["name"] || "";
        this.setState({
            name,
        })
    }

    goBack = ()=>{
        this.props.history.go(-1);
    }

    render(){
        const { name } = this.state;
        return (
            <div className={style.detail}>
                我是详情: {name}
                <br></br>
                <Button onClick={ this.goBack }>返回</Button>
            </div>
        );
    }
}