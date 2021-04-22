import React , {useRef , useLayoutEffect} from "react";
import ItemBox from "../../components/itemBox";
import UseImperativeHandle from "./useImperativeHandle";
class ReactAPI extends React.Component{
    constructor(props){
        super(props);
    }   

    componentDidMount(){

    }

    render(){
        return <div>
            <ItemBox 
                title="参考文章">
                https://juejin.cn/post/6950063294270930980#heading-32
            </ItemBox>
            <ItemBox 
            title="useState" 
            detail="useState可以弥补函数组件没有state的缺陷。useState可以接受一个初识值，也可以是一个函数action，action返回值作为新的state。返回一个数组，第一个值为state读取值，第二个值为改变state的dispatchAction函数。"
            >
            </ItemBox>
            <ItemBox title="useEffect">
                useEffect可以弥补函数组件没有生命周期的缺点。我们可以在useEffect第一个参数回调函数中，做一些请求数据，事件监听等操作，第二个参数作为dep依赖项，当依赖项发生变化，重新执行第一个函数。
                useEffect可以用作事件监听，还有一些基于dom的操作。,别忘了在useEffect第一个参数回调函数，返一个函数用于清除事件监听等操作。
            </ItemBox>
            <ItemBox title="useMemo">
                useMemo接受两个参数，第一个参数是一个函数，返回值用于产生保存值。 第二个参数是一个数组，作为dep依赖项，数组里面的依赖项发生变化，重新执行第一个函数，产生新的值。
                应用场景： 1 缓存一些值，避免重新执行上下文； 2 减少不必要的dom循环； 3 减少子组件渲染
            </ItemBox>
            <ItemBox title="useCallback">
                useMemo 和 useCallback 接收的参数都是一样，都是在其依赖项发生变化后才执行，都是返回缓存的值，区别在于 useMemo 返回的是函数运行的结果， useCallback 返回的是函数。 返回的callback可以作为props回调函数传递给子组件。
            </ItemBox>
            <ItemBox title="useRef">
                useRef的作用：
                一 是可以用来获取dom元素，或者class组件实例 。
                二 react-hooks原理文章中讲过，创建useRef时候，会创建一个原始对象，只要函数组件不被销毁，原始对象就会一直存在，那么我们可以利用这个特性，来通过useRef保存一些数据。
            </ItemBox>
            <ItemBox title="useLayoutEffect">
                useEffect执行顺序: 组件更新挂载完成 - 浏览器 dom 绘制完成 - 执行 useEffect 回调。
                useLayoutEffect 执行顺序: 组件更新挂载完成 - 执行 useLayoutEffect 回调- 浏览器dom绘制完成。
                所以说 useLayoutEffect 代码可能会阻塞浏览器的绘制 。我们写的 effect和 useLayoutEffect，react在底层会被分别打上PassiveEffect，HookLayout，在commit阶段区分出，在什么时机执行。
            </ItemBox>
            <ItemBox title="useReduced">
                在react-hooks原理那篇文章中讲解到，useState底层就是一个简单版的useReducer
                useReducer 接受的第一个参数是一个函数，我们可以认为它就是一个 reducer , reducer 的参数就是常规 reducer 里面的 state 和  action ,返回改变后的 state , useReducer 第二个参数为 state 的初始值 返回一个数组，数组的第一项就是更新之后 state 的值 ，第二个参数是派发更新的 dispatch 函数。
            </ItemBox>
            <ItemBox title="useContext">
                我们可以使用 useContext ，来获取父级组件传递过来的 context 值，这个当前值就是最近的父级组件 Provider 设置的 value 值，useContext 参数一般是由 createContext 方式引入 ,也可以父级上下文 context 传递 ( 参数为 context )。useContext 可以代替 context.Consumer 来获取 Provider 中保存的 value 值
            </ItemBox>
            <ItemBox title="useImperativeHandle(神器，配合forwardRef使用可以获取函数组件的上下文)" >
                <UseImperativeHandle></UseImperativeHandle>
            </ItemBox>
            <ItemBox title="useTransition" >
                useTransition允许延时由state改变而带来的视图渲染。避免不必要的渲染。它还允许组件将速度较慢的数据获取更新推迟到随后渲染，以便能够立即渲染更重要的更新。
                useTransition 接受一个对象， timeoutMs代码需要延时的时间。
                返回一个数组。第一个参数：  是一个接受回调的函数。我们用它来告诉 React 需要推迟的 state 。 第二个参数： 一个布尔值。表示是否正在等待，过度状态的完成(延时state的更新)。
            </ItemBox>
            <ItemBox title="useDebugValue" >
                useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。这个hooks目的就是检查自定义hooks
            </ItemBox>
        </div>
    }
}
export default ReactAPI;