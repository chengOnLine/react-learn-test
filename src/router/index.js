import React from "react";
import { HashRouter, Route, Switch , BrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import MyRoute from "../pages/test/route";
import ReactAPI from "../pages/reactAPIs";
export default () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={Main}></Route>
    </Switch>
  </HashRouter>
);