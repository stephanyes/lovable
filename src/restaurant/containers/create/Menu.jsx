import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Menu from "../../../restaurant/components/create/Menu";
import { connect } from "react-redux";
const DB = firebase.db;

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
    userLogin: state.user.loginUser.restaurantID,
  };
};

class CreateMenuContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      nameOfMenu: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    if (this.props.isAuth == false) this.props.history.push("/");
  }

  handleSubmit(e) {
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("menu")
      .doc();
    doc.set(this.state);
    firebase.succesfullMsg("Menu successfully created!");
    this.props.history.push("/menu");
  }

  handleInput(e) {
    let key = e.target.name;
    let input = e.target.value;
    this.setState({
      [key]: input,
    });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Menu submit={this.handleSubmit} input={this.handleInput} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateMenuContainer);
