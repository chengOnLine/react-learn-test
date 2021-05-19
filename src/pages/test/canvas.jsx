import React from "react";
import ItemBox from "../../components/itemBox";
import {
    Button,
} from "antd";
import dragon from "./imgs/dragon.png";
import bubbleImg from "./imgs/bubble.jpg";
import style from "./style/canvas.css";
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.initCanvas();
    }

    initCanvas = ()=>{
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var image = new Image();
       
        image.src = dragon;
        console.log("image",image);
        image.onload = function(){
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image,0,0);

            var imageData = ctx.getImageData(0,0,image.width,image.height).data;
            console.log(imageData)
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0,0,image.width,image.height);
    
            var gap = 6;
    
            for (var h = 0; h < image.height; h+=gap) {
                for(var w = 0; w < image.width; w+=gap){
                        var position = (image.width * h + w) * 4;
                        var r = imageData[position], g = imageData[position + 1], b = imageData[position + 2];
    
                        // ctx.fillStyle = "#565";
                        // ctx.fillRect(w,h,4,4);
                        
                        if(r+g+b==0){
                                ctx.fillStyle = "#565";
                                ctx.fillRect(w,h,4,4);
                            }
                }
            }

            var dragonContainer = document.getElementById("container");
            var dragonScale = 2;
    
            for (var h = 0; h < image.height; h+=gap) {
                for(var w = 0; w < image.width; w+=gap){
                        var position = (image.width * h + w) * 4;
                        var r = imageData[position], g = imageData[position + 1], b = imageData[position + 2];
    
                        if(r+g+b==0){
                                var bubble = document.createElement("img");
                                bubble.src = bubbleImg;
                                bubble.setAttribute("class","bubble");
    
                                var bubbleSize = Math.random()*10+20;
                                bubble.style.left = (w*dragonScale-bubbleSize/2) + "px";
                                bubble.style.top = (h*dragonScale-bubbleSize/2) + "px";
                                bubble.style.width = bubble.style.height = bubbleSize+"px";
                                bubble.style.animationDuration = Math.random()*6+4 + "s";
    
                                dragonContainer.appendChild(bubble);
                            }
                }
            }
        }
    }

    render(){
        return <div >
           <ItemBox title="Canvas">
                <canvas id = "canvas" width = "300" height = "200"></canvas>
           </ItemBox>

           <ItemBox title="div 画一个龙">
                <div id= "container"></div>
           </ItemBox>
        </div>
    }
}

export default Home;