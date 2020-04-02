import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../../services/firebase";
import { connect } from "react-redux";
import Navbar from "../../../restaurant/components/general/Navbar";
import { userLogout } from "../../../store/actions/loginAction";

const mapDispatchToProps = dispatch => {
  return {
    chauUser: () => dispatch(userLogout())
  };
};

class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.logoutButton = this.logoutButton.bind(this);
  }

  async logoutButton(e) {
    e.preventDefault();
    await firebase.logout();
    this.props.chauUser();
    this.props.history.replace("/");
  }

  render() {
    return (
      <div>
        <Navbar buttonClick={this.logoutButton} />
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(NavbarContainer));
