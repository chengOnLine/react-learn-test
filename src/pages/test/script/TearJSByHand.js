import {
    log
} from "../../../utils/common";

// 手撕JS
// 1 判断数据类型
export const myTypeof = function(param){
    return Object.prototype.toString.call(param).split(" ")[1].slice(0,-1).toLowerCase();
}


// 2 继承
var Parent = function(name){
    this.name = name;
    this.age = 98;
    this.candy = [];
}
Parent.prototype.sayHello = function(){
    log("sayHello: " , this.name , this.age);
}

// 测试函数
var test = ()=>{
    var s = new Son("cheng");
    log("name: " , s.name);
    log("age: ", s.age);
    s.sayHello();
    log("s instanceof Son : " , s instanceof Son);
    log("s.constructor" , s.constructor);
    s.candy.push("s");
    log("s.candy： " , s.candy);
    var s1 = new Son();
    log("s1.candy： " , s1.candy);
}

    //(1) 原型链继承
    var Son = function(){}
    Son.prototype = new Parent();

    //(2) 构造函数继承
    // var Son = function(name){
    //     Parent.call(this , name);
    // }

    //(3) 组合继承
    // var Son = function(name){
    //     Parent.call(this , name);
    // }
    // Son.prototype = new Parent();

    // (4) 组合继承优化
    var Son = function(name){
        Parent.call(this , name);
    }
        // var F = function(){} //创建一个空函数
        // F.prototype = Parent.prototype;
        // Son.prototype = new F();
    Son.prototype = Object.create(Parent.prototype);
    Son.prototype.constructor = Son;

    //(5) class 继承(ES6)
    // test();
    

// 3 数据去重
var arr = ["1" , 1 , {text:"hello"} , {text:"hello"} , "1"];

    // (1) 利用filter
    // var unique = function(arr){
    //     return arr.filter( (item , idx ) => {
    //         return arr.indexOf(item) === idx;
    //     })
    // }

    // (2) 利用ES6的 Set
    var unique = function(arr){
        // return Array.from(new Set(arr));
        return [...new Set(arr)]
    }
    // log(unique(arr));

// 4 数组扁平化
var arr1 = [ [[1] , [2]] , [3] , [4 , 5] ];
    // (1) 递归
    // var myFlat = function(arr){
    //     let array = [];
    //     for(let i = 0 ; i < arr.length ; i++){
    //         if(Array.isArray(arr[i])){
    //             array = array.concat(myFlat(arr[i]));
    //         }else{
    //             array.push(arr[i])
    //         }
    //     }

    //     return array;
    // }
    
    // (2) some
    // var myFlat = function(arr){
    //     while(arr.some(item => Array.isArray(item))){
    //         arr = [].concat(...arr);
    //     }
    //     return arr;
    // }
    // (3) flat
    var myFlat = function(arr){
        var array = [];
        array = arr.flat(Infinity);
        return array;
    }
    // log(myFlat(arr1));

// 5 深拷贝
var obj = { person:{ name: "cheng" , age:24}};
    // (1) 递归
    // var deepClone = function(obj){
    //     if(typeof obj !== "object"){
    //         return obj;
    //     }
    //     let newObj = Array.isArray(obj) ? [] : {};
    //     for(let key in obj){
    //         if(obj.hasOwnProperty(key)){
    //             newObj[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    //         }
    //     }
    //     return newObj;
    // }
    // (1) JSON stringify 和 parse
    // var deepClone = function(obj){
    //     return JSON.parse(JSON.stringify(obj));
    // }
    // log( deepClone(obj) );

// 6 解析URL
var url = "http://localhost:3000/#/personnelManagement/reception/edit?id=17&name";
export const parseURL = function(url){
    var paramObj = {};
    if(url.split("?").length  < 1 ) return {};
    let paramStr = url.split("?")[1];
    paramStr.split("&").forEach( (item)=>{
        if(item.split("=").length === 2){
            let key = item.split("=")[0];
            let value = item.split("=")[1];
            paramObj[key] = decodeURIComponent(value);
        }else{
            let key = item.split("=")[0];
            paramObj[key] = true;
        }
    })
    return paramObj;
}
// log(parseURL(url));

// 7 字符串模板
export const render = function(template , obj = {}){
    var reg = /\{\{(\w+)\}\}/;
    if(reg.test(template)){
        var key = reg.exec(template)[1];
        template = template.replace(reg ,obj[key]);
        return render(template , obj);
    }
    return template;
}
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
    name: '布兰',
    age: 12
}
// log(render(template, person)); // 我是布兰，年龄12，性别undefined


// 8 函数防抖
export const debounce = function (fn , wait){
    var timer = null;
    return function(){
        var that = this;
        var args = arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            fn.apply(that,args);
        } , wait);
    }
}
let c = 0;
function autoPrint() {
    console.log(c++);
};
var dbPrint = debounce(autoPrint , 1000);
// window.addEventListener('resize', dbPrint);

// 防抖优化 
// 最终版：除了支持 this 和 event 外，还支持以下功能：
// 支持立即执行；
// 函数可能有返回值；
// 支持取消功能；

// function debounce(func, wait, immediate) {
//     var timeout, result;
    
//     var debounced = function () {
//         var context = this;
//         var args = arguments;
        
//         if (timeout) clearTimeout(timeout);
//         if (immediate) {
//             // 如果已经执行过，不再执行
//             var callNow = !timeout;
//             timeout = setTimeout(function(){
//                 timeout = null;
//             }, wait)
//             if (callNow) result = func.apply(context, args)
//         } else {
//             timeout = setTimeout(function(){
//                 func.apply(context, args)
//             }, wait);
//         }
//         return result;
//     };

//     debounced.cancel = function() {
//         clearTimeout(timeout);
//         timeout = null;
//     };

//     return debounced;
// }


// 9 函数节流

export const thottle = function(fn , wait){
    var pre = 0;
    return function(){
        var that = this;
        var args = arguments;
        var now = +new Date();
        if(now - pre > wait){
            fn.apply(that , args);
            pre = now;
        }
    }
}
var ttPrint = thottle(autoPrint , 1000);
// window.addEventListener('resize', ttPrint);


// 节流优化 
// 支持取消节流；另外通过传入第三个参数，options.leading 来表示是否可以立即执行一次，opitons.trailing 表示结束调用的时候是否还要执行一次，默认都是 true。
// 注意设置的时候不能同时将 leading 或 trailing 设置为 false。

// function throttle(func, wait, options) {
//     var timeout, context, args, result;
//     var previous = 0;
//     if (!options) options = {};

//     var later = function() {
//         previous = options.leading === false ? 0 : new Date().getTime();
//         timeout = null;
//         func.apply(context, args);
//         if (!timeout) context = args = null;
//     };

//     var throttled = function() {
//         var now = new Date().getTime();
//         if (!previous && options.leading === false) previous = now;
//         var remaining = wait - (now - previous);
//         context = this;
//         args = arguments;
//         if (remaining <= 0 || remaining > wait) {
//             if (timeout) {
//                 clearTimeout(timeout);
//                 timeout = null;
//             }
//             previous = now;
//             func.apply(context, args);
//             if (!timeout) context = args = null;
//         } else if (!timeout && options.trailing !== false) {
//             timeout = setTimeout(later, remaining);
//         }
//     };
    
//     throttled.cancel = function() {
//         clearTimeout(timeout);
//         previous = 0;
//         timeout = null;
//     }
//     return throttled;
// }


// 10 函数柯里化
// 什么叫函数柯里化？其实就是将使用多个参数的函数转换成一系列使用一个参数的函数的技术

export const curry = function (fn) {
    let judge = (...args) => {
        if (args.length == fn.length) return fn(...args)
        return (...arg) => judge(...args, ...arg)
    }
    return judge
}
function add(a, b, c) {
    return a + b + c
}
let addCurry = curry(add)
// log(addCurry(1)(2)(3))


// 11 偏函数
// 什么是偏函数？偏函数就是将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入
function partial(fn, ...args) {
    return (...arg) => {
        return fn(...args, ...arg)
    }
}
let partialAdd = partial(add, 1)
// log(partialAdd(2, 3))



// 11 JsonP 原理是script的src标签和 link的href标签 不受同源策略的限制
export const jsonp = function ({ url , params = {}, callbackname}){
    function getURL(){
        let paramStr = "?";
        for(let key in params){
            if(params.hasOwnProperty(key)){
                paramStr += `${key}=${params[key]}&`;
            }
        }
        paramStr += `callbackname=${callbackname}`;
        return url + parseURL;
    }
    return new Promise( (resolve , reject ) => {
        var frame = document.createElement("script");
        frame.src = getURL();
        document.body.appendChild(frame);
        window[callbackname] = (data) =>{
            resolve(data);
            document.body.removeChild(frame);
        }
    })
}


// 12 AJAX
export const getJSON = function(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.responseText));
            }
        }
        xhr.send();
    })
}

// 13 实现数组原型方法 forEach
export const myForEach = function( callback , thisArgs){
    if(this == null){
        throw new TypeError("this is null or not defined");
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    const obj = new Object(this);
    let len = obj.length >>> 0;
    let key = 0;
    while(key < len){
        if( key in obj ){
            callback.call(thisArgs , obj[key] , key , obj);
        }
        key++;
    }
}
Array.prototype.myForEach = myForEach;
var arr = [1 , 2 , 3 , 4, 5];
// arr.forEach( (item)=>{
//     console.log(item);
// })
// arr.myForEach( (item) =>{
//     console.log(item);
// })

// 14 实现数组原型方法 map
export const myMap = function(callback , thisArgs){
    if(this == null){
        throw new TypeError("this is null or not defined");
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    let result = [];
    const obj = new Object(this);
    let len = obj.length >>> 0;
    let key = 0;
    while(key < len){
        if( key in obj ){
            result[key] = callback.call(thisArgs , obj[key] , key , obj);
        }
        key++;
    }
    return result;
}
Array.prototype.myMap = myMap;
// log(arr.map( (item)=>{
//     return item+10;
// }))
// Array.prototype.myMap = myMap;
// log(arr.myMap( (item) =>{
//     return item+10;
// }))


// 15 实现数组原型方法 filter
export const myfilter = function(callback , thisArgs){
    if(this == null){
        throw new TypeError("this is null or not defined");
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    let result = [];
    const obj = new Object(this);
    let len = obj.length >>> 0;
    let key = 0;
    while(key < len){
        if( key in obj ){
            if(callback.call(thisArgs , obj[key] , key , obj) ){
                result[key] = obj[key];
            }
        }
        key++;
    }
    return result;
}
Array.prototype.myfilter = myfilter;

// 16 实现数组原型方法 some
export const mySome = function(callback , thisArgs){
    if(this == null){
        throw new TypeError("this is null or not defined");
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    let result = [];
    const obj = new Object(this);
    let len = obj.length >>> 0;
    let key = 0;
    while(key < len){
        if( key in obj ){
            if(callback.call(thisArgs , obj[key] , key , obj) ){
               return true;
            }
        }
        key++;
    }
    return false;
}
Array.prototype.mySome = mySome;


// 17 实现数组原型方法 reduce
export const myReduce = function(callback , initialValue , thisArgs){
    if(this == null){
        throw new TypeError("this is null or not defined");
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    const obj = new Object(this);
    let len = obj.length >>> 0;
    let key = 0 , total;
    if(arguments.length > 2){
        total = initialValue;    
    }else{
        while(key < len && !(key in obj)){
            key++;
        }
        if(key > len){
            throw TypeError("Reduce of empty array with no initial value");
        }
        total = obj[key++];
    }
    while(key < len){
        if(key in obj){
            total = callback.call(thisArgs , total , obj[key] , key , obj);
        }
        key++;
    }
    return total;
}
Array.prototype.myReduce = myReduce;
// log(arr.reduce((tatal , item)=>{
//     return tatal + item;
// } , 0))
// log(arr.myReduce((tatal , item)=>{
//     return tatal + item;
// } , 0))


// 18 call
export const myCall = function(thisArgs){
    function isStrict(){
        return (function(){
            return !this; 
        }())
    }
    let args = [...arguments].slice(1);
    let fn = this;
    if(thisArgs === null || thisArgs === undefined){
        return fn(...args);
    }
    if(!isStrict()){
        if(typeof thisArgs === "number"){
            thisArgs = new Number(thisArgs);
        }else if(typeof thisArgs === "string"){
            thisArgs = new String(thisArgs);
        }else if(typeof thisArgs === "boolean"){
            thisArgs = new Boolean(thisArgs);
        }
    }
    fn = Symbol(thisArgs);
    thisArgs[fn] = this;
    return thisArgs[fn](...args);
}
Function.prototype.myCall = myCall;

// function test1(a, b) {
//     var args = [].slice.myCall([1,2])
//     console.log(arguments, args)
// }

// test1(1, 2)
// obj = {
//     name: 'jack'
// };
// var name = 'global';
// function getName() {
//     return this.name;
// }
// getName();
// log(getName.myCall(obj));
  

// 19 apply
export const myApply = function(thisArgs , params){
    function isStrict(){
        return (function(){
            return !this; 
        }())
    }
    let args = Array.isArray(params) ? params : [];
    let fn = this;
    if(thisArgs === null || thisArgs === undefined){
        return fn(...args);
    }
    if(!isStrict()){
        if(typeof thisArgs === "number"){
            thisArgs = new Number(thisArgs);
        }else if(typeof thisArgs === "string"){
            thisArgs = new String(thisArgs);
        }else if(typeof thisArgs === "boolean"){
            thisArgs = new Boolean(thisArgs);
        }
    }
    fn = Symbol(thisArgs);
    thisArgs[fn] = this;
    return thisArgs[fn](...args);
}
Function.prototype.myApply = myApply;
// log(Math.max.myApply(null, [1, 2, 4, 8]));

// 20 bind
export const myBind = function(thisArgs){
    function isStrict(){
        return (function(){
            return !this; 
        }())
    }
    let args = [].prototype.slice.call(arguments , 1);
    let fn = this;
    return function(){
        let fnArgs = [].prototype.slice.call(arguments);
        fn.apply(thisArgs , args.concat(fnArgs));
    }
}
Function.prototype.myBind = myBind;
// let fn = getName.bind(obj);
// log(fn());


// 21 实现new
export const objectFactory = function(){
    let obj = new Object();
    const fn = [].shift.call(arguments);
    obj.__proto__ = fn.prototype;
    let res = fn.apply(obj , arguments);
    return typeof res === "object" ? res||obj : obj;
}
// function Person(name, age) {
//     this.name = name
//     this.age = age
// }
// log(new Person("jack" , 12));
// log(objectFactory(Person ,"jack", 12));


// 22 instanceof 
// 判断构造函数的原型是否出现在实例的原型链上
export const myInstanceof = function(obj , func){
    let proto = obj.__proto__;
    let prototype = func.prototype;
    while(proto !== prototype){
        proto = proto.__proto__;
        if(proto == null)
            return false;
    }
    return true;
} 
// log(myInstanceof( [] , Number))

// 23 Object.create
export const myCreate = function(proto, propertyObject = undefined) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object or null.')
    }
    if (propertyObject == null) {
        new TypeError('Cannot convert undefined or null to object')
    }
    function F() {}
    F.prototype = proto
    const obj = new F()
    if (propertyObject != undefined) {
        Object.defineProperties(obj, propertyObject)
    }
    if (proto === null) {
        // 创建一个没有原型对象的对象，Object.create(null)
        obj.__proto__ = null
    }
    return obj
}

// 24 Object.assign
export const myAssign = function(target, ...source) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    let ret = Object(target) 
    source.forEach(function(obj) {
        if (obj != null) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    ret[key] = obj[key]
                }
            }
        }
    })
    return ret
}

// 25 JSON.jsonStringify
// 基本数据类型：
    // undefined 转换之后仍是 undefined(类型也是 undefined)
    // boolean 值转换之后是字符串 "false"/"true"
    // number 类型(除了 NaN 和 Infinity)转换之后是字符串类型的数值
    // symbol 转换之后是 undefined
    // null 转换之后是字符串 "null"
    // string 转换之后仍是string
    // NaN 和 Infinity 转换之后是字符串 "null"

// 函数类型：转换之后是 undefined

// 对象类型(非函数)
    // 如果是一个数组：如果属性值中出现了 undefined、任意的函数以及 symbol，转换成字符串 "null" ；
    // 如果是 RegExp 对象：返回 {} (类型是 string)；
    // 如果是 Date 对象，返回 Date 的 toJSON 字符串值；
    // 如果是普通对象；
    // 如果有 toJSON() 方法，那么序列化 toJSON() 的返回值。
    // 如果属性值中出现了 undefined、任意的函数以及 symbol 值，忽略。
    // 所有以 symbol 为属性键的属性都会被完全忽略掉。
    // 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。

export const myJsonStringify = function(data) {
    let dataType = typeof data;
    
    if (dataType !== 'object') {
        let result = data;
        //data 可能是 string/number/null/undefined/boolean
        if (Number.isNaN(data) || data === Infinity) {
            //NaN 和 Infinity 序列化返回 "null"
            result = "null";
        } else if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
            //function 、undefined 、symbol 序列化返回 undefined
            return undefined;
        } else if (dataType === 'string') {
            result = '"' + data + '"';
        }
        //boolean 返回 String()
        return String(result);
    } else if (dataType === 'object') {
        if (data === null) {
            return "null"
        } else if (data.toJSON && typeof data.toJSON === 'function') {
            return myJsonStringify(data.toJSON());
        } else if (data instanceof Array) {
            let result = [];
            //如果是数组
            //toJSON 方法可以存在于原型链中
            data.forEach((item, index) => {
                if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
                    result[index] = "null";
                } else {
                    result[index] = myJsonStringify(item);
                }
            });
            result = "[" + result + "]";
            return result.replace(/'/g, '"');
            
        } else {
            //普通对象
            /**
             * 循环引用抛错(暂未检测，循环引用时，堆栈溢出)
             * symbol key 忽略
             * undefined、函数、symbol 为属性值，被忽略
             */
            let result = [];
            Object.keys(data).forEach((item, index) => {
                if (typeof item !== 'symbol') {
                    //key 如果是symbol对象，忽略
                    if (data[item] !== undefined && typeof data[item] !== 'function'
                        && typeof data[item] !== 'symbol') {
                        //键值如果是 undefined、函数、symbol 为属性值，忽略
                        result.push('"' + item + '"' + ":" + myJsonStringify(data[item]));
                    }
                }
            });
            return ("{" + result + "}").replace(/'/g, '"');
        }
    }
}
