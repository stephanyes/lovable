import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "../containers/SidebarContainer";
import NavbarContainer from "../containers/NavbarContainer";
import Orders from "../components/Orders";
const DB = firebase.firestore();

export default class OrdersContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SidebarContainer />
        <NavbarContainer />
        <Orders />
      </div>
    );
  }
}
