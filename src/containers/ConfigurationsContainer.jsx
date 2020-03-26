import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "./SidebarContainer";
import FooterContainer from "./FooterContainer";
import Configurations from "../components/Configurations";
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
        <SidebarContainer />
        <Configurations restaurantId={this.props.restaurantId} />
        <FooterContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ConfigurationsContainer);
