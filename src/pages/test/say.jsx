import React from "react";
import PropTypes from 'prop-types';
class Say extends React.Component{

    // 默认props，默认值也会进行类型检查
    static defaultProps = {
        content:"123",
    }
    // 类型检查
    static propTypes = {
        content:PropTypes.string.isRequired,
    }
    constructor(props){
        super(props);
    }
    render(){
        return <p>Yes, i can say {this.props.content}</p>
    }
}

export default Say;