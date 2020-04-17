import React from "react";
import { withRouter } from "react-router-dom";
import Login from "../../../restaurant/components/views/Login";
import { loginUser } from "../../../store/actions/loginAction";
import { connect } from "react-redux";


class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }


  componentDidMount() {
    if (this.props.isAuth) {
      this.props.history.push('/dashboard');
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.isAuth) {
  //     this.props.history.goBack();
  //   }
  // }

  handlerChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value,
    });
  }

  handlerSubmit(e) {
    e.preventDefault();
    this.props.loggeado(this.state.email, this.state.password, this.props.history);
    //;
  }

  render() {
    // this.props.isAuth && this.props.history.replace("/dashboard");
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
    isAuth: state.user.isAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loggeado: (user, pass, ruta) => dispatch(loginUser(user, pass, ruta)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
