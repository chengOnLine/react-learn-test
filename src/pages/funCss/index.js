import React , { useState , useEffect , forwardRef , useRef} from 'react';
import ItemBox from "../../components/itemBox";
import style from "./style/index.scss";
import { Button, message } from "antd";
export default forwardRef(( props , ref) => {

    let itemBox = useRef();
    let timer = useRef(null);
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
        timer = setInterval( ()=>{
            if( !box || list.length === 0){
                doWaterMark(300 , 30 , "我是水印");
            }
        } , 3000);
        return ()=>{
            timer && clearInterval(timer);
        }
    } , [])
    return <React.Fragment>
        <div>
            <ItemBox title="加水印" style={{ position:"relative"}}  ref={itemBox} className={style.watermark}>
               <div>
                    用到的css属性主要是:user-select:none(属性规定是否能选取元素的文本) z-index: 999 ; pointer-events: none;(点击事件穿透)
               </div>
                <Button onClick={ ()=>{message.info("帅哥，你好")}}>水印不影响点击</Button>
            </ItemBox>

            <ItemBox title="设置input 的placeholder的字体样式 outline" className={style.inputStyle}>
                <input type="text" placeholder="请设置用户名" />
                <p className="outline">outline 的妙用</p>
            </ItemBox>

            <ItemBox title="文本单行、多行溢出 换行策略" className={style.overflow}>
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

                    <div className="text">
                        <span>hello world</span>
                        <p className="default">default(normal): (会将序列的空格合并为一个，内部是否换行由换行规则决定)
                        dsadsadasaaf     sadsafasf saasdad dasdad s dsaddddddddd</p>
                        <p className="pre">(pre: 原封不动的保留你输入时的状态，空格、换行都会保留，并且当文字超出边界时不换行)
                         dsadsadasaaf     sadsafasf saasdad dasdad s dsaddddddddd</p>
                        <p className="nowrap">(nowrap: 与normal值一致，不同的是会强制所有文本在同一行内显示)
                         dsadsadasaaf     sadsafasf saasdad dasdad s dsaddddddddd</p>
                        <p className="pre-wrap">(pre-wrap: 与pre值一致，不同的是文字超出边界时将自动换行。)
                         dsadsadasaaf     sadsafasf saasdad dasdad s dsaddddddddd</p>
                        <p className="pre-line">(pre-line: 与normal值一致，但是会保留文本输入时的换行)
                         dsadsadasaaf     sadsafasf saasdad dasdad s dsaddddddddd</p>
                    </div>
                </div>
            </ItemBox>

            <ItemBox title="负边距使用技巧" className={style.negative}>
                <div class="wrap">
                    <div class="item" style={{backgroundColor: "red"}}></div>
                    <div class="item" style={{backgroundColor: "green"}}></div>
                    <div class="item" style={{backgroundColor: "yellow"}}></div>
                    <div class="item" style={{backgroundColor: "pink"}}></div>
                    <div class="item" style={{backgroundColor: "green"}}></div>
                </div>
            </ItemBox>

            <ItemBox title="定位同时设置方位情况" className={style.position}>
                <span>1</span>
            </ItemBox>

            <ItemBox title="隐藏滚动条 或自定义滚动条样式" className={style.scroll}>
                <div class="scroll-container">
                    庭院深深，不知有多深？杨柳依依，飞扬起片片烟雾，一重重帘幕不知有多少层。豪华的车马停在贵族公子寻欢作乐的地方，她登楼向远处望去，却看不见那通向章台的大路。春已至暮，三月的雨伴随着狂风大作，再是重门将黄昏景色掩闭，也无法留住春意。泪眼汪汪问落花可知道我的心意，落花默默不语，纷乱的，零零落落一点一点飞到秋千外。庭院深深，不知有多深？杨柳依依，飞扬起片片烟雾，一重重帘幕不知有多少层。豪华的车马停在贵族公子寻欢作乐的地方，她登楼向远处望去，却看不见那通向章台的大路。春已至暮，三月的雨伴随着狂风大作，再是重门将黄昏景色掩闭，也无法留住春意。泪眼汪汪问落花可知道我的心意，落花默默不语，纷乱的，零零落落一点一点飞到秋千外。庭院深深，不知有多深？杨柳依依，飞扬起片片烟雾，一重重帘幕不知有多少层。豪华的车马停在贵族公子寻欢作乐的地方，她登楼向远处望去，却看不见那通向章台的大路。春已至暮，三月的雨伴随着狂风大作，再是重门将黄昏景色掩闭，也无法留住春意。泪眼汪汪问落花可知道我的心意，落花默默不语，纷乱的，零零落落一点一点飞到秋千外。庭院深深，不知有多深？杨柳依依，飞扬起片片烟雾，一重重帘幕不知有多少层。豪华的车马停在贵族公子寻欢作乐的地方，她登楼向远处望去，却看不见那通向章台的大路。春已至暮，三月的雨伴随着狂风大作，再是重门将黄昏景色掩闭，也无法留住春意。泪眼汪汪问落花可知道我的心意，落花默默不语，纷乱的，零零落落一点一点飞到秋千外。
                </div>
            </ItemBox>

            <ItemBox title="三角形 虚线框 优惠券" className={ style.triangle }>
                <div class="item regular-triangle"></div>
                <div className="item inverted-triangle"></div>
                <div className="item dotted-line">庭院深深，不知有多深？杨柳依依，飞扬起片片烟雾，一重重帘幕不知有多少层</div>
                <div class="coupon">
                    <span>200</span>优惠券
                </div>
            </ItemBox>

            <ItemBox title ="消息气泡" className={ style.message }>
                <div className="popver">
                    <span>点我弹出气泡</span>
                </div>

                <div className="example">
                    <div class="con">
                        <span class="css-tips" data-title="删除删除删除" data-title-dir="up">提示上</span>
                    </div>
                    <div class="con">
                        <span class="css-tips" data-title="删除删除删除" data-title-dir="right">提示右</span>
                    </div>
                    <div class="con">
                        <span class="css-tips" data-title="删除删除删除" data-title-dir="bottom">提示下</span>
                    </div>
                    <div class="con">
                        <span class="css-tips" data-title="删除删除删除" data-title-dir="left">提示左</span>
                    </div>
                    <div class="con">
                        <span class="css-tips" data-title="删除删除删除删除删除删除删除删除删除" data-title-dir="right" data-title-muti>多行提示</span>
                    </div>
      
                    <div class="con">
                        <span class="css-tips" data-title="删除删除删除删除" data-title-type="success">温馨提示</span>
                    </div>
                    <div class="con">
                        <span class="css-tips" data-title="删除删除删除" data-title-type="error">危险提示</span>
                    </div>
                    <div class="con">
                        <span class="css-tips" data-title="删除删除删除删除" data-title-type="warn">警告提示</span>
                    </div>
                </div>

                <div className="test">
                    <div className="parent"></div>
                    {/* <span className="parent"></span> */}
                    <div className="parent relative"></div>
                    <div className="parent absolute"></div>
                </div>    
            </ItemBox>

            <ItemBox title = "遮罩" className={style.mask}>
                <div className="test-mask">

                </div>
            </ItemBox>
            
        </div>
    </React.Fragment>
} )