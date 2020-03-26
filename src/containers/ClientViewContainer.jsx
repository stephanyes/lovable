import React from "react";
import firebase from "../services/firebase";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import ClientView from "../components/ClientView";
import Axios from "axios";
const DB = firebase.db;
let doc = DB.collection("restaurants")
  .doc("QtLVkjHLnXZPDj4pbWKw")
  .collection("tables");

class ClientViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    doc.onSnapshot(docSnapshot => {
      let tables = [];
      docSnapshot.forEach(doc => {
        tables.push(doc.data());
        this.setState({ tables });
      });
    });
  }

  componentWillUnmount() {
    doc.onSnapshot(() => {});
  }

  handleClick() {
    console.log(this.state.tables[0].waiter);
    let option = DB.collection("restaurants").doc(
      "QtLVkjHLnXZPDj4pbWKw/tables/CHvrMSpQE65dGNyCH2tM"
    );

    if (this.state.tables[0].waiter === false) {
      option.update({ waiter: true }).then(option => {
        console.log("Mozo true");
      });
    } else {
      option.update({ waiter: false }).then(option => {
        console.log("Mozo false");
      });
    }
  }

  render() {
    return (
      <div>
        <ClientView handleClick={this.handleClick} tables={this.state.tables} />
      </div>
    );
  }
}

export default ClientViewContainer;
