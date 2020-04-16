import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Product from "../../../restaurant/components/create/Product";
import { connect } from "react-redux";
const DB = firebase.db;

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
    userLogin: state.user.loginUser.restaurantID,
  };
};

class CreateProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      imageProduct: "",
      price: "",
      stock: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }
  menuId = this.props.match.params.id;
  categoryId = this.props.match.params.categoryId;

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
      .doc(this.categoryId)
      .collection("products")
      .doc();
    doc.set(this.state);
    firebase.succesfullMsg("Product successfully added!");
    this.props.history.push(`/menu/${this.menuId}/${this.categoryId}`);
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
        <Product submit={this.handleSubmit} inputs={this.handleInputs} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateProductContainer);
