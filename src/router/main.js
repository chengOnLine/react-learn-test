import React from "react";
import {Route, Switch } from "react-router-dom";
import MyRoute from "../pages/test/route";
import ReactAPI from "../pages/reactAPIs";
import Hooks from "../pages/hooks";
import CssMiddle from "../pages/test/cssMiddle";
import Communication from "../pages/communication";
import ClientXScreenXPageX from "../pages/test/clientXScreenXPageX";
import Dragon from "../pages/test/dragon";
import Wave from "../pages/funCss/wave";
import FunCSS from "../pages/funCss/";
import waterMark from "../pages/funCss/watermark";

// 列表 详情页 测试缓存组件
import List from "../pages/fileManagement/index";
import Detail from "../pages/fileManagement/detail";

import MockLogin from "../pages/mockLogin";
export default () => (
    <Switch>
      <Route exact path="/layout/test1" component={CssMiddle}></Route>
      <Route exact path="/layout/clientXScreenXPageX" component={ClientXScreenXPageX}></Route>
      <Route exact path="/layout/funcss/dragon" component={Dragon}></Route>
      <Route exact path="/layout/funcss/wave" component={Wave}></Route>
      {/* <Route exact path="/layout/funcss/waterMark" component={waterMark}></Route> */}
      <Route exact path="/layout/funcss/list" component={FunCSS}></Route>

      <Route exact path="/communication" component={Communication}></Route>
      <Route exact path="/communication/route/:paramsName" component={MyRoute}></Route>
      <Route exact path="/communication/route" component={MyRoute}></Route>
      <Route exact path="/api/react" component={ReactAPI}></Route>
      <Route exact path="/api/hooks" component={Hooks}></Route>
      
      <Route exact path="/fileManagement/list" component={List}></Route>
      <Route exact path="/fileManagement/detail" component={Detail}></Route>

      <Route exact path="/mockLogin" component={MockLogin}></Route>
      {/* <Route exact path="/react" component={ReactAPI}></Route> */}
    </Switch>
);