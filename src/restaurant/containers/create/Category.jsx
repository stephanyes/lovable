import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import { connect } from "react-redux";
import Category from "../../../restaurant/components/create/Category";
const DB = firebase.db;

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};

class CreateMenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageCategory: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }
  menuId = this.props.match.params.id;

  componentDidMount() {
    if (this.props.isAuth == false) this.props.history.push("/");
  }
  handleSubmit(e) {
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("menu")
      .doc(this.menuId)
      .collection("categories")
      .doc();
    doc.set(this.state);
    firebase.succesfullMsg("Category succesfully created!");
    this.props.history.push(`/menu/${this.menuId}`);
  }
  handleInputs(e) {
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
        <Category submit={this.handleSubmit} inputs={this.handleInputs} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateMenuContainer);
