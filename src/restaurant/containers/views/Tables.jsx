import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Footer from "../general/Footer";
import Tables from "../../../restaurant/components/views/Tables";
import { connect } from "react-redux";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
import { showLoader, hideLoader } from "../../../store/actions/loginAction";

const DB = firebase.db;

let tablesDoc;

const mapStateToProps = (state, ownprops) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};
class TablesContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tables: [],
    };

    this.ordenar = this.ordenar.bind(this);
    this.handlerButton = this.handlerButton.bind(this);
  }

  // updateLoader = () => {


  //   setTimeout(() => {
  //     this.props.dispatch(hideLoader())
  //   }, 2000)
  // }

  componentDidMount() {
    if (this.props.isAuth == false) {
      this.props.history.push("/");
    } else {
      this.props.dispatch(showLoader())
      tablesDoc = DB.collection("restaurants")
        .doc(`${this.props.userLogin}`)
        .collection("tables");
      tablesDoc.onSnapshot((docSnapshot) => {
        let tables = [];
        docSnapshot.forEach((doc) => {
          tables.push({
            clientActual: doc.data().clientActual,
            number: doc.data().number,
            orderActual: doc.data().orderActual,
            secretCode: doc.data().secretCode,
            state: doc.data().state,
            waiter: doc.data().waiter,
            pay: doc.data().pay,
            orderStatus: doc.data().orderStatus,
            id: doc.id,
          });
          this.setState({ tables }, this.ordenar(this.state.tables));
          this.props.dispatch(hideLoader())
        });
      });
    }
  }
  handlerButton(e, tableId) {
    e.preventDefault();
    let newCode = Math.round(Math.random() * 9000 + 1000);
    tablesDoc.doc(tableId).update({ secretCode: newCode, state: "busy" });
  }

  ordenar = function (arr) {
    arr.sort(function (a, b) {
      return a.number - b.number;
    });
  };

  componentWillUnmount() {
    if (tablesDoc) tablesDoc.onSnapshot(() => {});
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Tables tables={this.state.tables} buttonClick={this.handlerButton} />
        <Footer />
        <div>
          <FullPageLoader />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TablesContainer);
