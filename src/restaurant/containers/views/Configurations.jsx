import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Footer from "../general/Footer";
import Configurations from "../../../components/Configurations";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    restaurantId: state.user.loginUser.restaurantID
  };
};

class ConfigurationsContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Sidebar />
        <Configurations restaurantId={this.props.restaurantId} />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ConfigurationsContainer);
