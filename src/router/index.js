import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Main from "../pages/main";
import MyRoute from "../pages/test/route";
import ReactAPI from "../pages/test/reactAPIs";
export default () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={Main}></Route>
    </Switch>
  </HashRouter>
);