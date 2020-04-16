import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Product from "../../../restaurant/components/edit/Product";
import { connect } from "react-redux";
import { showLoader, hideLoader } from "../../../store/actions/loginAction";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
const DB = firebase.db;

const mapStateToProps = (state) => {
  return {
    restoId: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};

class EditProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      imageProduct: "",
      price: "",
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  menuId = this.props.match.params.id;
  categoryId = this.props.match.params.categoryId;
  productId = this.props.match.params.productId;

  componentDidMount() {
    if (this.props.isAuth === false) {
      this.props.history.push("/");
    } else {
      this.props.dispatch(showLoader())
      let doc = DB.collection("restaurants")
        .doc(this.props.restoId)
        .collection("menu")
        .doc(this.menuId)
        .collection("categories")
        .doc(this.categoryId)
        .collection("products")
        .doc(this.productId);
      doc.get().then((product) => {
        this.setState({
          name: product.data().name,
          description: product.data().description,
          imageProduct: product.data().imageProduct,
          price: product.data().price,
        });
        setTimeout(() => {
          this.props.dispatch(hideLoader())
        }, 500)
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.restoId)
      .collection("menu")
      .doc(this.menuId)
      .collection("categories")
      .doc(this.categoryId)
      .collection("products")
      .doc(this.productId);
    doc.update(this.state);
    firebase.succesfullMsg("Product updated!");
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
        <Product
          inputs={this.handleInputs}
          submit={this.handleSubmit}
          product={this.state}
        />
        <div>
          <FullPageLoader />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditProductContainer);
