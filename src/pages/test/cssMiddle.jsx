import React from "react";
import style from "./style/cssMiddle.css";
class Middle extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        var canJump = function(nums) {
            if(nums.length <= 1){
                return true;
            }
            let dp = new Array( nums.length ).fill(0);
            dp[0] = 1;
        
            for(let i=1 ; i<nums.length ; i++){
                for(let k=1 , j=i-k; j>=0 ; k++){
                    if(nums[j] >= k){
                        dp[i] += dp[j];
                    }
                }
                console.log(dp);
            }
            return dp[nums.length-1] !== 0;
        };
        // console.log(canJump([2,3,1,1,4]));
    }
    render(){
        return <div className="content">
            {/* <h1>css的居中方案</h1>
            <div className="box horizontal">
                <h2>垂直水平居中：</h2>
                <div className="parent" id="parent">
                    父级盒子
                    <div className="son" id="son">
                        子级盒子
                        <div className="grandson"></div>
                    </div>
                </div>
            </div> */}

            {/* <h1>问题描述: 实现一个div垂直居中, 其距离屏幕左右两边各10px, 其高度始终是宽度的50%。同时div中有一个文字A，文字需要水平垂直居中</h1>
            <div class="outer_wrapper">
                <div class="inner_wrapper">
                    <div class="box">A</div>
                </div>
            </div> */}

            {/* <h1>品字布局</h1>
            <div className="div1 box">1</div>
            <div className="div2 box">2</div>
            <div className="div3 box">3</div> */}

            {/* <h1>圣杯布局（float）</h1>
                <div class="header">这里是头部</div>
                <div class="container">
                    <div class="middle">中间部分</div>
                    <div class="left">左边</div>
                    <div class="right">右边</div>
                </div>
                <div class="footer">这里是底部</div> */}

            {/* <h1>双飞翼布局</h1> */}
                <article class="container">
                <div class="center">
                    <div class="inner"></div>
                </div>
                <div class="left"></div>
                <div class="right"></div>
                </article>
        </div>
    }
}

export default Middle;