const PENDING = "pending";
const FULLFILLED = "fulfilled";
const REJECTED = "rejected";
function resolvePromise(x , resolve , reject ){
    if(x instanceof MyPromise){
        if(x.statu === PENDING){
            x.then( y => resolvePromise(y , resolve , reject) , error => reject(error));
        }else{
            x.then(resolve , reject);
        }
    }else{
        resolve(x);
    }
}
const MyPromise = function (func){
    const self = this;
    self.statu = PENDING;
    self.value = undefined;
    self.error = undefined;
    self.resolveCallBack = [];
    self.rejectCallBack = [];
    const resolve = function(param){
        if(self.statu === PENDING){
            setTimeout(()=>{
                self.statu = FULLFILLED;
                self.value = param;
                self.resolveCallBack.forEach(callBack => {
                    typeof callBack === "function" && callBack(self.value);
                })  
            })
        }    
    }
    const reject = function(error){
        if(self.statu === PENDING){
            setTimeout(()=>{
                self.statu = REJECTED;
                self.error = error;
                self.rejectCallBack.forEach(callBack => {
                    typeof callBack === "function" && callBack(self.error);    
                })  
            })
        }        
    }
    try{
        func(resolve, reject);
    }catch(error){
        reject(error);
    }
}

// Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。
// 如果这个值是一个 promise ，那么将返回这个 promise ；
// 如果这个值是thenable（即带有"then" 方法），
// 返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
// 否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平。
MyPromise.resolve = function( value ){
    if(value instanceof MyPromise){
        return value;
    }else if(typeof value === "object" && typeof value["then"] === "function"){
        const {then} = value;
        return new MyPromise(then);
    }else{
        return new MyPromise((resolve , reject) =>{
            resolve(value);
        })
    }
}

// Promise.reject()方法返回一个带有拒绝原因的Promise对象。
MyPromise.reject = function( error ){   
    return new MyPromise((resolve , reject)=> {
        reject(error);
    })
}

// 这个方法返回一个新的promise对象，该promise对象
// 在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
// 一旦有任何一个iterable里面的promise对象失败则立即触发
// 该promise对象的失败。这个新的promise对象在触发成功状态以后，
// 会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，
// 顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，
// 它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。
// Promise.all方法常被用于处理多个promise对象的状态集合。（可以参考jQuery.when方法---译者注）
MyPromise.all = function( iterable ){
    const mps = Array.f
}

MyPromise.race = function(){
    
}

MyPromise.any = function(){
    
}

MyPromise.some = function(){
    
}

// 添加解决(fulfillment)和拒绝(rejection)回调到当前 promise, 返回一个新的 promise, 将以回调的返回值来resolve.
// 如果 then 中的回调函数：
// 返回了一个值，那么 then 返回的 Promise 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
// 没有返回任何值，那么 then 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。
// 抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
// 返回一个已经是接受状态的 Promise，那么 then 返回的 Promise 也会成为接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。
// 返回一个已经是拒绝状态的 Promise，那么 then 返回的 Promise 也会成为拒绝状态，并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。
// 返回一个未定状态（pending）的 Promise，那么 then 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同；同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的。
MyPromise.prototype.then = function( onFullFilled , onRejected ){
    const self = this;
    onFullFilled = typeof onFullFilled === "function" ? onFullFilled : x => x ;
    onRejected = typeof onRejected === "function" ? onRejected : error=> { throw(error) }
    if(self.statu === PENDING){
        return new MyPromise( (resolve , reject)=>{
            self.resolveCallBack.push( (value)=>{
                try{
                    let x = onFullFilled(value);
                    resolvePromise(x , resolve , reject);
                }catch(error){
                    reject(error);
                }
            })
            self.rejectCallBack.push( (error)=>{
                try{
                    let x = onRejected(error);
                    resolvePromise(x , resolve , reject);
                }catch(error){
                    reject(error);
                }
            })
        });
    }
    if(self.statu === FULLFILLED){
        return new MyPromise( (resolve , reject )=>{
            try{
                let x = onFullFilled(this.value);
                resolvePromise(x , resolve , reject);
            }catch(error){
                reject(error);
            }
        })
    }
    if(self.statu === REJECTED){
        return new MyPromise( (resolve , reject)=>{
            try{
                let x = onRejected(this.error);
                resolvePromise(x , resolve , reject);
            }catch(error){
                reject(error);  
            }
        })
    }

}

// 添加一个拒绝(rejection) 回调到当前 promise, 返回一个新的promise。
// 当这个回调函数被调用，新 promise 将以它的返回值来resolve，否则如果当前promise 
// 进入fulfilled状态，则以当前promise的完成结果作为新promise的完成结果.
MyPromise.prototype.catch = function( onRejected ){
    const self = this;
    self.then(undefined , onRejected);
}

// finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，
// 都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
// 这避免了同样的语句需要在then()和catch()中各写一次的情况。
MyPromise.prototype.finally = function( onFinally ){
    const self = this;
    return self.then( value => {
        return MyPromise.resolve( onFinally() ).then(()=>{
            return value;
        })
    } , error => {
        return MyPromise.reject( onFinally() ).then(()=>{
            throw error;
        })
    })
}
export default MyPromise;


    MyPromise.resolve().then(() => {
        console.log(0);
        return MyPromise.resolve(4);
        // return 4;
    }).then((res) => {
        console.log(res)
    })

    MyPromise.resolve().then(() => {
        console.log(1);
    }).then(() => {
        console.log(2);
    }).then(() => {
        console.log(3);
    }).then(() => {
        console.log(5);
    }).then(() =>{
        console.log(6);
    })
