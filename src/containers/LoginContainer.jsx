import React from "react";
import Login from "../components/Login";
import firebase from "../services/firebase"
import { loginUser } from "../store/actions/loginAction";
import { connect } from "react-redux";

const DB_users = firebase.firestore().collection('users');

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

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  }
  
  handlerSubmit(e) {
    e.preventDefault();
    const auth = firebase.auth()
    const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    promise.then(user => {
      DB_users.doc(user.user.uid)
      .get().then(rest => {
        this.props.loggeado(rest.data());
      })
    })
    .catch(e => console.error(e))
  }

  render() {
    return (
      <div>
        <Login
          handlerChange={this.handlerChange}
          handlerSubmit={this.handlerSubmit}
          />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
