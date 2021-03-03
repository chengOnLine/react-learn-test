import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainRouter from "./router";
import {store } from "./redux/store";

store.subscribe(()=>console.log(store.getState()))

const render = ()=>{
  ReactDOM.render(
    <React.StrictMode>
      <MainRouter />
    </React.StrictMode>,
    document.getElementById('root')
  ); 
}
render();
store.subscribe(render)
store.dispatch({type:"updateUser" , username:"李林城"})
reportWebVitals();
