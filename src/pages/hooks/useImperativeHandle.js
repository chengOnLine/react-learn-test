import React , {useRef, useState ,forwardRef , useImperativeHandle} from "react";
import {Button} from "antd";
function Son (props,ref) {
    console.log(props)
    const inputRef = useRef(null)
    const [number , setNumber] = useState(0);
    const [ inputValue , setInputValue ] = useState('')

    function addNumber(){
        setNumber(number => number+1);
    }
    useImperativeHandle(ref,()=>{
       const handleRefs = {
           /* 声明方法用于聚焦input框 */
           onFocus(){
              inputRef.current.focus()
           },
           /* 声明方法用于改变input的值 */
           onChangeValue(value){
               setInputValue(value)
           },
           add(){
            addNumber();
           }
       }
       return handleRefs
    },[])
    return <div>
        number:{number}
        <br/>
        <input
            placeholder="请输入内容"
            ref={inputRef}
            value={inputValue}
        />
    </div>
}

const ForwarSon = forwardRef(Son);

class Index extends React.Component{
    cur = null
    handerClick(){
       const { onFocus , onChangeValue } =this.cur
       onFocus()
       onChangeValue('let us learn React!')
    }
    render(){
        return <div style={{ marginTop:'10px' }} >
            <ForwarSon ref={cur => (this.cur = cur)} />
            <button onClick={this.handerClick.bind(this)} >操控子组件</button>
            <Button onClick={()=>{ this.cur.add()}}>add</Button>
        </div>
    }
}

export default Index;