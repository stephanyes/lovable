import React from "react";
import { withRouter } from "react-router-dom";
import Login from "../components/Login";
import firebase from "../services/firebase";
import { loginUser } from "../store/actions/loginAction";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DB_users = firebase.db.collection("users");

const mapStateToProps = (state, ownprops) => {
  return {
    userLogin: state.user.loginUser
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    loggeado: user => dispatch(loginUser(user))
  };
};
const MySwal = withReactContent(Swal);

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    //this.handlerButton = this.handlerButton.bind(this);
  }

  // async handlerButton() {
  //   try {
  //     await firebase.login(this.state.email, this.state.password)
  //     this.props.history.push('/home')
  //   } catch (error) {
  //     return MySwal.fire(error.message)
  //   }
  // }

  handlerChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  }

  handlerSubmit(e) {
    e.preventDefault();
    const auth = firebase.auth;
    const promise = auth.signInWithEmailAndPassword(
      this.state.email,
      this.state.password
    );
    promise
      .then(user => {
        DB_users.doc(user.user.uid)
          .get()
          .then(rest => {
            this.props.loggeado(rest.data());
            this.props.history.push("/dashboard");
          });
      })
      .catch(e => MySwal.fire(e.message));
  }

  render() {
    //console.log(this.props.userLogin)
    return (
      <div>
        <Login
          handlerChange={this.handlerChange}
          handlerSubmit={this.handlerSubmit}
          //buttonClick={this.handlerButton}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
