import React from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}
