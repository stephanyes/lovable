import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "./SidebarContainer";
import NavbarContainer from "./NavbarContainer";
import Configurations from "../components/Configurations";

export default class ConfigurationsContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SidebarContainer />

        <Configurations />
      </div>
    );
  }
}
