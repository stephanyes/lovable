import React from "react";
//import axios from "axios";
//import { connect } from "react-redux";
//import { Route, Redirect, Switch, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Tables from "../containers/TablesContainer";
import SidebarContainer from "../containers/SidebarContainer";
//import Login from "./Login";

export default class Main extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
        {/* <Login /> */}
        <Navbar />
        <Tables />
        <SidebarContainer />
      </div>
    );
  }
}
