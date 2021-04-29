import React , {Profiler} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainRouter from "./router";
import {store } from "./redux/store";
import {Provider} from "react-redux";
import 'antd/dist/antd.css';
import axios from "axios";

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log("response" , response)
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

store.subscribe(()=>console.log(store.getState()))
const render = ()=>{
  const callback = (...arg) => {
    // console.log(arg)
  }
  ReactDOM.render(
    // <React.StrictMode>
    <Profiler id="root" onRender={ callback }>
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </Profiler>,
    document.getElementById('root')
  ); 
}
render();
store.subscribe(render)
reportWebVitals();
