import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Loader from 'react-loader-spinner'
import Tables from "../containers/TablesContainer";
import SidebarContainer from "../containers/SidebarContainer";
import firebase from "../services/firebase"
import LoginContainer from "../containers/LoginContainer";

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser,
    isAuth: state.user.isAuth
  }
}
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
      })
    })
  }

  // componentDidUpdate(prevProps) {
  //   console.log(prevProps)
  //   if (this.props.userLogin !== prevProps.userLogin) {
  //     this.setState({
  //       isAuth: "Logged"
  //     })
  //   }
  // }
  //Object.keys(this.props.userLogin).length === 0 ? <Redirect to="/" /> 

  render() {
    console.log(this.props.isAuth)
    return (
      this.state.firebaseInitialized !== false ?
        (
          <div>
            <Switch>
              <Route exact path="/" component={LoginContainer}></Route>
              <Route exact path="/home" component={SidebarContainer}></Route>
            </Switch>
            {/* <Tables /> */}
          </div>
        )
        : (<div className="container" style={{ textAlign: "center", alignContent: "center" }}>
          <Loader type="Hearts" color="red" height={80} width={80} />
        </div >)
    );
  }
}


export default connect(mapStateToProps)(Main);

