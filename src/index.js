import React , {Profiler} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainRouter from "./router";
import {store } from "./redux/store";
import {Provider} from "react-redux";
import 'antd/dist/antd.css';
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
