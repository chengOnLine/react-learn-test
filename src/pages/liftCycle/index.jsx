import React from "react";
import style from "./index.scss";
import Son from "./son";
import { Input , Button } from "antd";
export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message: "hello world",
        }
        this.name = "parent";
    }
    print = (key) => {
        console.log(this.name + ":" + key);
    }
    testSetState = () => {
        this.setState({ message: this.state.message + 1 });
        console.log("message1" , this.state.message);
        this.setState({ message: this.state.message + 2 });
        console.log("message2" , this.state.message);
        setTimeout( () => {
            this.setState( { message: this.state.message + 3});
            console.log("message3" , this.state.message);
            this.setState( { message: this.state.message + 4});
            console.log("message4" , this.state.message);
        })
    }
    componentWillMount(){
        this.print("componentWillMount");
        this.setState({ message: this.state.message + 0 });
        console.log("message0" , this.state.message);
    }
    componentDidMount(){
        this.print("componentDidMount");
        var btn = document.querySelector("#button");
        btn && btn.addEventListener("click" , () => {
            this.setState({ message: this.state.message + 5 })
            console.log("message5" , this.state.message)
        })
    }

    componentDidUpdate(prevProps){
        this.print("componentDidUpdate");
    }

    componentWillReceiveProps(prevProps){
        this.print("componentWillReceiveProps");
    }
    // static getDerivedStateFromProps( props , state ){
    //     console.log("parent getDerivedStateFromProps");
    //     return null
    // }   

    shouldComponentUpdate(nextProps, nextState){
        this.print("shouldComponentUpdate");
        return true;
    }

    componentWillUpdate(nextProps , nextState){
        this.print("componentWillUpdate");
    }

    render(){
        const { message } = this.state;
        console.log(this.name, "render");
        return (
            <div className={style.list}>
                <span>parent: {message}</span>
                <Input value={this.state.message} onChange={ (e) => { this.setState( { message: e.target.value })}}></Input>
                <Son data={message}></Son>
                <Button onClick={() => { this.testSetState() }}>按钮</Button>
                <button id="button">原生按钮</button>
            </div>
        );
    }
}