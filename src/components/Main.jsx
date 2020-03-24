import React from "react";
//import axios from "axios";
//import { connect } from "react-redux";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Tables from "../containers/TablesContainer";
import SidebarContainer from "../containers/SidebarContainer";
import FooterContainer from "../containers/FooterContainer";
import LoginContainer from "../containers/LoginContainer";


export default class Main extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
      {/* <Navbar /> */}
        <Switch>
          <Route exact path="/home" component={SidebarContainer}></Route>
          <Route exact path="/" component={LoginContainer}></Route>
        </Switch>
        <FooterContainer />
        {/* <Tables /> */}
      </div>
    );
  }
}
