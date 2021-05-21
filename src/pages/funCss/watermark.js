import React , { useState , useEffect , forwardRef , useRef} from 'react';
import ItemBox from "../../components/itemBox";
import style from "./style/index.scss";
import { Button, message } from "antd";
export default forwardRef(( props , ref) => {

    let itemBox = useRef();
    useEffect(()=>{
        console.log(itemBox , "itemBox");
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
        setInterval( ()=>{
            if( !box || list.length === 0){
                doWaterMark(300 , 30 , "我是水印");
            }
        } , 3000)
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
        </div>
    </React.Fragment>
} )