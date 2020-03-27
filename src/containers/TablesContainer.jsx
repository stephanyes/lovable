import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "../containers/SidebarContainer";
import FooterContainer from "./FooterContainer";
import Tables from "../components/Tables";
import { connect } from "react-redux";

const DB = firebase.db;

let tablesDoc;

const mapStateToProps = (state, ownprops) => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};
class TablesContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tables: []
    };

    this.ordenar = this.ordenar.bind(this);
    this.handlerButton = this.handlerButton.bind(this);
  }

  componentDidMount() {
    tablesDoc = DB.collection("restaurants")
      .doc(`${this.props.userLogin}`)
      .collection("tables");
    tablesDoc.onSnapshot(docSnapshot => {
      let tables = [];

      docSnapshot.forEach(doc => {
        tables.push({
          clientActual: doc.data().clientActual,
          number: doc.data().number,
          orderActual: doc.data().orderActual,
          secretCode: doc.data().secretCode,
          state: doc.data().state,
          waiter: doc.data().waiter,
          pay: doc.data().pay,
          id: doc.id
        });
        this.setState({ tables });
        this.ordenar(this.state.tables);
      });
    });
  }

  handlerButton(e, tableId) {
    e.preventDefault();
    let newCode = Math.round(Math.random() * 9000 + 1000);
    tablesDoc.doc(tableId).update({ secretCode: newCode, state: "busy" });
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
    console.log(this.props.userLogin);
    return (
      <div>
        <SidebarContainer />
        <Tables tables={this.state.tables} buttonClick={this.handlerButton} />
        <FooterContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TablesContainer);
