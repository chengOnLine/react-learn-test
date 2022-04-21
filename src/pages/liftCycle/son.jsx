import React from "react";
import { Input } from "antd";
export default class List extends React.Component{
    constructor(props){
        super(props);
        this.name = "son";
        this.state = {
            message: undefined,
        }
    }
    print = (key) => {
        console.log(this.name + ":" + key);
    }
    componentWillMount(){
        this.print("componentWillMount");
    }
    componentDidMount(){
        this.print("componentDidMount");
    }

    componentDidUpdate(prevProps , preState){
        this.print("componentDidUpdate");
        // if( this.props.data !== prevProps.data ){
        //     this.setState({
        //         message:this.props.data,
        //     })
        // }
    }

    componentWillReceiveProps(nextProps){
        this.print("son componentWillReceiveProps");
        // if(nextProps.data !== this.state.data){
        //     this.setState({ message : nextProps.data })
        // }
    }
    // static getDerivedStateFromProps( props , state ){
    //     console.log("getDerivedStateFromProps");
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
            <div>
                <span>son: {message}</span>
                <Input value={this.state.message} onChange={ (e) => { this.setState( { message: e.target.value })}}></Input>
            </div>
        );
    }
}