import React from "react";
import { withRouter } from "react-router-dom";
import Login from "../../../restaurant/components/views/Login";
import { loginUser } from "../../../store/actions/loginAction";
import { connect } from "react-redux";

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }
  componentDidUpdate(prevState) {
    this.props.isAuth &&
      this.props.userLogin.name &&
      prevState.isAuth !== this.props.isAuth &&
      this.props.history.push("/dashboard");
  }

  handlerChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value,
    });
  }

  handlerSubmit(e) {
    e.preventDefault();
    this.props.loggeado(this.state.email, this.state.password);
    this.props.history.push(`/dashboard`);
  }

  render() {
    this.props.isAuth && this.props.history.replace("/dashboard");
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
const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loggeado: (user, pass) => dispatch(loginUser(user, pass)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
