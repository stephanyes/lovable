import React from "react";
import firebase from "../services/firebase";

import Menu from "../components/Menu";

const DB = firebase.db;

class MenuContainer extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Menu />
      </div>
    );
  }
}

export default MenuContainer;
