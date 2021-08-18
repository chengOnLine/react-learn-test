import React , { useRef  , useState , useEffect ,useCallback} from "react";
import example from "../../images/example.png";
import moment from "moment";
// import { useThrottleFn } from 'ahooks'
// const { run } = useThrottleFn(scrollViewEvent, {
//     wait: 500
//   })
// const throttle = function( fn , wait){
//   let flag = false;
//   return function( ...args ){
//     if( !flag ){
//       flag = true;
//       setTimeout( ()=>{
//         flag = false;
//       } , wait)
//       // console.log("fn")
//       fn.apply(this , args );
//     }
//   }
// }
const throttle = function( fn , wait){
    let pre = 0;
    return function( ...args ){
      let now = moment().valueOf();
      if( now - pre > wait ){
        fn.apply(this , args);
        pre = now;
      }
      
    }
  }

const debounce = function( fn , wait){
  let timer = null;
  return ( ...args ) => {
    if( !timer ) clearTimeout(timer);
    timer = setTimeout( ()=> {
      fn( ...args );
    } , wait);
  }
}

const useThrottle = function( value , delay ){
    const [ changeValue , setChangeValue ] = useState(value);
    
    useEffect( ()=>{
      
    } , [value , delay])

    return changeValue;
}

const LazyLoading = function(props){
    const lazyLoadingBox = useRef();

    const [ list , setList ] = useState( [1 , 2 ,3 ,4 ,5 , 6 , 7] )

    const run = useRef( throttle(  scrollViewEvent , 200)).current;

    useEffect(() => {
        const imgs = document.getElementsByTagName('img');
        console.log(lazyLoadingBox.current, 'current')
        lazyLoadingBox.current.addEventListener('scroll', () => {
          // console.log('listens start')
          run(imgs);
        })
        run(imgs);
        return (
            lazyLoadingBox.current.removeEventListener('scroll', () => {
            console.log('listens end')
          })
        )
      }, [])


    function scrollViewEvent (images)  {
        console.log("scrollViewEvent")
        // 可视化区域高度
        const clientHeight = lazyLoadingBox.current?.clientHeight || 0
        
        // 滚动的距离
        const scrollTop = lazyLoadingBox.current?.scrollTop || 0
        
        // 遍历imgs元素
        for (let image of images) {
          if (!image.dataset.src) continue
        
          // 判断src是否已经加载
          if (image.src) continue
          
          //图片距离顶部距离
          let top = image.offsetTop
          
          // console.log( clientHeight , scrollTop , top)
          // 公式
          if (clientHeight + scrollTop > top) {
           // 设置图片源地址，完成目标图片加载
            image.src = image.dataset.src || ''
            image.removeAttribute('data-src')
          }
        }
      } 
      
    return (
        <div ref={ lazyLoadingBox } style={{ height: "500px" , overflow:"auto"}}>
            {
                list.map( ()=> {
                    return <div style = { { height: "200px" }}>
                      <img 
                    style={{ width: '100%', height: '100%' }}
                    // src = {example}
                    data-src = { example }
                    ></img>
                    </div>
                })
            }
        </div>
    )
}

export default LazyLoading;