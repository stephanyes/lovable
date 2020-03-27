import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import firebase from "../services/firebase";
import LoginContainer from "../containers/LoginContainer";
import TablesContainer from "../containers/TablesContainer";
import ConfigurationsContainer from "../containers/ConfigurationsContainer";
import ClientViewContainer from "../containers/ClientViewContainer";
import ClientLoginContainer from "../containers/ClientLoginContainer";
import OrdersContainer from "../containers/OrdersContainer";
import FooterContainer from "../containers/FooterContainer";
import RecoverPassword from "./RecoverPassword";
import MenuContainer from "../containers/MenuContainer";

const mapStateToProps = state => {
  return {
    userLogin: state.user.loginUser,
    isAuth: state.user.isAuth
  };
};
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      firebaseInitialized: false
    };
  }

  componentDidMount() {
    firebase.isInitialized().then(val => {
      this.setState({
        firebaseInitialized: val
      });
    });
  }

  render() {
    return this.state.firebaseInitialized !== false ? (
      <div>
        <Switch>
          <Route exact path="/" component={LoginContainer}></Route>
          <Route path="/dashboard" component={TablesContainer}></Route>

          <Route path="/orders" component={OrdersContainer}></Route>
          <Route path="/menu" component={MenuContainer}></Route>
          <Route
            path="/configuration"
            component={ConfigurationsContainer}
          ></Route>
          <Route path="/recover" component={RecoverPassword}></Route>
          <Route
            path="/:idRestaurant/tables"
            component={ClientLoginContainer}
          ></Route>
          <Route
            path="/:idRestaurant/:idTable"
            component={ClientViewContainer}
          ></Route>
        </Switch>
      </div>
    ) : (
      <div
        className="container"
        style={{ textAlign: "center", alignContent: "center" }}
      >
        <Loader type="Hearts" color="red" height={80} width={80} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
