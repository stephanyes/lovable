import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "../containers/SidebarContainer";

import Tables from "../components/Tables";

const DB = firebase.db;
let tablesDoc;
class TablesContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tables: []
    };

    this.ordenar = this.ordenar.bind(this);
  }

  componentDidMount() {
    let idR = this.props.location.state.restaurantID;
    tablesDoc = DB.collection("restaurants")
      .doc(`${idR}`)
      .collection("tables");
    tablesDoc.onSnapshot(docSnapshot => {
      let tables = [];
      docSnapshot.forEach(doc => {
        tables.push(doc.data());

        this.setState({ tables });
        this.ordenar(this.state.tables);
      });
    });
  }

  ordenar = function(arr) {
    arr.sort(function(a, b) {
      return a.number - b.number;
    });
  };

  componentWillUnmount() {
    tablesDoc.onSnapshot(() => {});
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
    console.log("hola", this.state.tables);
    return (
      <div>
        <SidebarContainer />

        <Tables tables={this.state.tables} />
      </div>
    );
  }
}

// const mapStateToProps = (state, ownprops) => {
//   return {
//     userLogin: state.user.loginUser
//   };
// };

export default TablesContainer;
