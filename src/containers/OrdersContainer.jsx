import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "../containers/SidebarContainer";
import FooterContainer from "./FooterContainer";
import Orders from "../components/Orders";

export default class OrdersContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SidebarContainer />
        <Orders />
        <FooterContainer />
      </div>
    );
  }
}
