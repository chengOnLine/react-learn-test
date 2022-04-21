import React , { useState , useEffect , forwardRef , useRef} from 'react';
import ItemBox from "../../components/itemBox";
import style from "./style/index.scss";
import { Button, message } from "antd";
export default forwardRef(( props , ref) => {

    let itemBox = useRef();
    let timer = useRef(null);
    useEffect(()=>{
        // console.log(itemBox , "itemBox");
        function doWaterMark(width, height, content) { 
            let box = document.getElementById("watermark-box"); 
            if( !box ){
                box = document.createElement("div");
                box.setAttribute("id" , "watermark-box");
                itemBox.current.appendChild(box);
            }
            let boxWidth = box.clientWidth, 
                boxHeight = box.clientHeight; 
            for (let i = 0; i < Math.floor(boxHeight / height); i++) { 
                for (let j = 0; j < Math.floor(boxWidth / width); j++) { 
                    let next = document.createElement("div") 
                    next.setAttribute("class", "watermark") 
                    next.style.width = width + 'px' 
                    next.style.height = height + 'px' 
                    next.innerText = content 
                    box.appendChild(next) 
                } 
            } 
        } 
        doWaterMark(300 ,30 ,"我是水印");
        let box = document.getElementById("watermark-box"); 
        let list = document.getElementsByClassName("watermark") || [];
        timer = setInterval( ()=>{
            if( !box || list.length === 0){
                doWaterMark(300 , 30 , "我是水印");
            }
        } , 3000)

        return ()=>{
            timer && clearInterval(timer);
        }
    } , [])
    return <React.Fragment>
        <div className={style.watermark}>
            <ItemBox title="加水印" style={{ position:"relative"}}  ref={itemBox}>
               <div>
                    用到的css属性主要是:user-select:none(属性规定是否能选取元素的文本) z-index: 999 ; pointer-events: none;(点击事件穿透)
               </div>
                <Button onClick={ ()=>{message.info("帅哥，你好")}}>水印不影响点击</Button>
                {/* <div id="watermark-box"></div> */}
            </ItemBox>

            <ItemBox title="文本单行、多行溢出">
                <div class="container">
                    <p class="single">
                        <span class="c-red">单行溢出：</span>《ECMAScript 6 入门教程》是一本开源的 JavaScript 语言教程，
                        全面介绍 ECMAScript 6 新引入的语法特性。
                    </p>
                    <p class="mutiple">
                        <span class="c-red">多行溢出：</span>《ECMAScript 6 入门教程》是一本开源的 JavaScript 语言教程，
                        全面介绍 ECMAScript 6 新引入的语法特性。本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，
                        对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码。
                    </p>
                </div>
            </ItemBox>
        </div>
    </React.Fragment>
} )