import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/index";
import MyRoute from "../pages/test/route";
import ReactAPI from "../pages/test/reactAPIs";
export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/route/:paramsName" component={MyRoute}></Route>
      <Route exact path="/route" component={MyRoute}></Route>
      <Route exact path="/react/api" component={ReactAPI}></Route>
    </Switch>
  </HashRouter>
);