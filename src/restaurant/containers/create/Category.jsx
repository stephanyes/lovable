import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import { connect } from "react-redux";
import CreateCategoryView from "../../../components/CreateCategoryView";
const DB = firebase.db;

const mapStateToProps = state => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};

class CreateMenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageCategory: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }
  menuId = this.props.match.params.id;

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
      [key]: input
    });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <CreateCategoryView
          submit={this.handleSubmit}
          inputs={this.handleInputs}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateMenuContainer);
