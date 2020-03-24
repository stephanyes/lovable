import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "../containers/SidebarContainer";
import NavbarContainer from "../containers/NavbarContainer";
import Tables from "../components/Tables";
const DB = firebase.db;
let doc = DB.collection("restaurants")
  .doc("QtLVkjHLnXZPDj4pbWKw")
  .collection("tables");

export default class TablesContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tables: []
    };
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

  //     // algo.get().then(algo => {
  //     //   console.log(algo);
  //     //   algo.forEach(doc => {
  //     //     tables.push(doc.data());
  //     //     this.setState({ tables });
  //     //   });
  //     // });
  //   };

  render() {
    return (
      <div>
        <SidebarContainer />

        <Tables tables={this.state.tables} />
      </div>
    );
  }
}
