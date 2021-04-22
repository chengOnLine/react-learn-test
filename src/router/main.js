import React from "react";
import {Route, Switch } from "react-router-dom";
import MyRoute from "../pages/test/route";
import ReactAPI from "../pages/reactAPIs";
import Hooks from "../pages/hooks";
import CssMiddle from "../pages/test/cssMiddle";
import Communication from "../pages/communication";
export default () => (
    <Switch>
      <Route exact path="/layout/test1" component={CssMiddle}></Route>
      <Route exact path="/communication" component={Communication}></Route>
      <Route exact path="/communication/route/:paramsName" component={MyRoute}></Route>
      <Route exact path="/communication/route" component={MyRoute}></Route>
      <Route exact path="/api/react" component={ReactAPI}></Route>
      <Route exact path="/api/hooks" component={Hooks}></Route>
      {/* <Route exact path="/react" component={ReactAPI}></Route> */}
    </Switch>
);