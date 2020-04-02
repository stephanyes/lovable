import React from "react";
import firebase from "../../../services/firebase";
import SingleTable from "../../../restaurant/components/views/SingleTable";
import Sidebar from "../general/Sidebar";
import { connect } from "react-redux";

const DB = firebase.db;

let tablesDoc;
let tableActual;

const mapStateToProps = (state, ownprops) => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};

class SingleTableContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      table: {}
    };
    this.handlerButton = this.handlerButton.bind(this);
  }

  componentDidMount() {
    tablesDoc = DB.collection("restaurants")
      .doc(`${this.props.userLogin}`)
      .collection("tables");
    tablesDoc.onSnapshot(docSnapshot => {
      docSnapshot.forEach(doc => {
        if (doc.id == this.props.match.params.idTable) {
          this.setState({
            table: {
              clientActual: doc.data().clientActual,
              number: doc.data().number,
              orderActual: doc.data().orderActual,
              secretCode: doc.data().secretCode,
              state: doc.data().state,
              waiter: doc.data().waiter,
              pay: doc.data().pay,
              orderStatus: doc.data().orderStatus,
              id: doc.id
            }
          });
        }
      });
    });
  }

  componentWillUnmount() {
    tablesDoc.onSnapshot(() => {});
  }

  handlerButton(e) {
    e.preventDefault();
    let TableActual = DB.collection("restaurants")
      .doc(`${this.props.userLogin}`)
      .collection("tables")
      .doc(`${this.props.match.params.idTable}`);
    TableActual.update({
      clientActual: 0,
      orderActual: 0,
      orderStatus: "",
      secretCode: 0,
      state: "free",
      pay: false,
      waiter: false
    });
    this.props.history.push(`/dashboard`);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <SingleTable
          table={this.state.table}
          buttonClick={this.handlerButton}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(SingleTableContainer);
