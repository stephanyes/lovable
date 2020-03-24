import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import TablesContainer from "../containers/TablesContainer";
import LoginContainer from "../containers/LoginContainer";
import ClientViewContainer from "../containers/ClientViewContainer";
import OrdersContainer from "../containers/OrdersContainer";
import ConfigurationsContainer from "../containers/ConfigurationsContainer";

export default class Main extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LoginContainer}></Route>
          <Route path="/dashboard" component={TablesContainer}></Route>
          <Route path="/tables" component={ClientViewContainer}></Route>
          <Route path="/orders" component={OrdersContainer}></Route>
          <Route
            path="/configuration"
            component={ConfigurationsContainer}
          ></Route>
        </Switch>
      </div>
    );
  }
}
