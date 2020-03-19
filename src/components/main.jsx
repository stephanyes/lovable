import React from "react";
//import axios from "axios";
//import { connect } from "react-redux";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Tables from "../components/Tables";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar />
        <Tables />
      </div>
    );
  }
}
