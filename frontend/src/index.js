import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import RegisterPage from "views/RegisterPage/RegisterPage.jsx";


import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
	  <Route path="/login" component={LoginPage} />
	  <Route path="/register" component={RegisterPage} />
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
