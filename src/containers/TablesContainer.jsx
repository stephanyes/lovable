import React from "react";
import Tables from "../components/Tables";
import firebase from "../services/firebase";
const DB = firebase.firestore();

export default class TablesContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tables: []
    };
  }

  componentDidMount() {
    let tables = [];
    let algo = DB.collection("restaurants")
      .doc("QtLVkjHLnXZPDj4pbWKw")
      .collection("tables");
    algo.get().then(algo => {
      console.log(algo);
      algo.forEach(doc => {
        tables.push(doc.data());
        this.setState({ tables });
      });
    });
  }

  render() {
    console.log(this.state.tables);
    return (
      <div>
        <h1>Mesas</h1>
        <Tables tables={this.state.tables} />
      </div>
    );
  }
}
