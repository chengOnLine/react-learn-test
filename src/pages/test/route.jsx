import React from "react";
import PropTypes from 'prop-types';
class Route extends React.Component{

    // 默认props，默认值也会进行类型检查
    static defaultProps = {
        content:"123",
    }
    componentDidMount(){
        console.log("this.props" , this.props);
    }
    // 类型检查
    static propTypes = {
        content:PropTypes.string.isRequired,
    }
    constructor(props){
        super(props);
    }
    render(){
        const { 
            match:{params:{paramsName = "--"}} , 
            location = {}
        } = this.props ;
        
        const {query = {} , search , state = {}} = location;
        const {queryName  = "--"} = query;
        const {stateName = "--"} = state;
        return <div>
            <h3>路由接收参数方式</h3>
            <div>
                {`paramsName: ${ paramsName }`}
            </div>
            <div>
                {`queryName: ${queryName}`}
            </div>
            <div>
                {`stateName: ${stateName}`}
            </div>
            <div>
                {`searchName: ${search}`}
            </div>

            <h3>优缺点</h3>
            <div>
                <p>1.params在HashRouter和BrowserRouter路由中刷新页面参数都不会丢失</p>
                <p>2.state在BrowserRouter中刷新页面参数不会丢失，在HashRouter路由中刷新页面会丢失</p>
                <p>3.query：在HashRouter和BrowserRouter路由中刷新页面参数都会丢失</p>
                <p>4.query和 state 可以传对象</p>
            </div>
        </div>
    }
}

export default Route;