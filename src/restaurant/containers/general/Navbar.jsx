import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../../services/firebase";
import { connect } from "react-redux";
import Navbar from "../../../restaurant/components/general/Navbar";
import { userLogout } from "../../../store/actions/loginAction";

const DB = firebase.db;
let doc;

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chauUser: () => dispatch(userLogout()),
  };
};

class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      mesas: [],
      isOpen: false,
    };
    this.logoutButton = this.logoutButton.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  async logoutButton(e) {
    e.preventDefault();
    await firebase.logout();
    this.props.chauUser();
    this.props.history.replace("/");
  }
  toggleOpen() {
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    } else {
      this.setState({
        isOpen: false,
      });
    }
  }

  componentDidMount() {
    doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("tables");

    doc.onSnapshot((tables) => {
      let mesas = [];
      tables.forEach((change) => {
        if (
          change.data().pay ||
          change.data().waiter ||
          change.data().orderStatus === "pending"
        )
          mesas.push({
            id: change.id,
            number: change.data().number,
            pay: change.data().pay,
            waiter: change.data().waiter,
            orderStatus: change.data().orderStatus,
          });
      });
      this.setState({ mesas: mesas });
    });
  }
  componentWillUnmount() {
    doc.onSnapshot(() => {});
  }

  render() {
    return (
      <div>
        <Navbar
          mesas={this.state.mesas}
          buttonClick={this.logoutButton}
          isOpen={this.toggleOpen}
          dropdown={this.state.isOpen}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
);
