import React from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

class NavbarContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default NavbarContainer;
