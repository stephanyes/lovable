import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Products from "../../../restaurant/components/views/Products";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
import { hideLoader, showLoader } from "../../../store/actions/loginAction";

const DB = firebase.db;
let doc;
const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};

const MySwal = withReactContent(Swal);
class ProductsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsArray: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStock = this.handleStock.bind(this);
  }
  menuId = this.props.match.params.id;
  categoryId = this.props.match.params.categoryId;

  componentDidMount() {
    if (this.props.isAuth === false) {
      this.props.history.push("/");
    } else {
      this.props.dispatch(showLoader())
      doc = DB.collection("restaurants")
        .doc(this.props.userLogin)
        .collection("menu")
        .doc(this.menuId)
        .collection("categories")
        .doc(this.categoryId)
        .collection("products");
      //Doc en este container es un array de IDS en referencia a todos los productos que van a haber
      doc.onSnapshot((productDocument) => {
        let product = [];
        productDocument.forEach((ind) => {
          //ind.id me da el id de cada producto que vaya a haber
          //Eventualmente el id de cada producto lo vamos a necesitar para reflejarlo en el carrito y editar
          product.push({
            id: ind.id,
            name: ind.data().name,
            imageProduct: ind.data().imageProduct,
            price: ind.data().price,
            description: ind.data().description,
            stock: ind.data().stock,
          });
        });
        this.setState({
          productsArray: product,
        });
        setTimeout(() => {
          this.props.dispatch(hideLoader())
        }, 500)
      });
    }
  }
  componentWillUnmount() {
    if (doc) doc.onSnapshot(() => { });
  }
  handleStock(e, id) {
    e.preventDefault();
    let documento = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("menu")
      .doc(this.menuId)
      .collection("categories")
      .doc(this.categoryId)
      .collection("products")
      .doc(id);
    documento.get().then((producto) => {
      let boolean = producto.data().stock;
      documento.update({ stock: !boolean });
    });
  }

  handleDelete(e, id) {
    // SI CANCELA EL DELETE DEBERIA QUEDARSE EN LA PAGINA
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("menu")
      .doc(this.menuId)
      .collection("categories")
      .doc(this.categoryId)
      .collection("products")
      .doc(id);
    //Refactorizar este mensaje de abajo, pasarlo a la clase Firebase. Quizas con Async Await se puede
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.value) {
        MySwal.fire("Deleted!", `Your product has been deleted.`, "success");
        doc.delete();
      }
      this.props.history.push(`/menu/${this.menuId}`);
    });
  }
  render() {
    return (
      <div>
        <Sidebar />
        <Products
          products={this.state.productsArray}
          menuId={this.props.match.params.id}
          catId={this.props.match.params.categoryId}
          deleteFunc={this.handleDelete}
          handleStock={this.handleStock}
        />
        <div>
          <FullPageLoader />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductsContainer);
