import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Category from "../../../restaurant/components/edit/Category";
import { connect } from "react-redux";
const DB = firebase.db;

const mapStateToProps = (state) => {
  return {
    restoId: state.user.loginUser.restaurantID,
  };
};

class EditCategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageCategory: "",
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  menuId = this.props.match.params.id;
  categoryId = this.props.match.params.categoryId;

  componentDidMount() {
    let doc = DB.collection("restaurants")
      .doc(this.props.restoId)
      .collection("menu")
      .doc(this.menuId)
      .collection("categories")
      .doc(this.categoryId);
    doc.get().then((category) => {
      this.setState({
        name: category.data().name,
        imageCategory: category.data().imageCategory,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.restoId)
      .collection("menu")
      .doc(this.menuId)
      .collection("categories")
      .doc(this.categoryId);
    doc.update(this.state);
    firebase.succesfullMsg("Category updated!");
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
        <Category
          inputs={this.handleInputs}
          submit={this.handleSubmit}
          category={this.state}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditCategoryContainer);
