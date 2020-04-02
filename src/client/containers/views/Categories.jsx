import React from "react";
import Menu from "../../../client/components/views/Categories";
import firebase from "../../../services/firebase";
const DB = firebase.db;

class MenuContainerCliente extends React.Component {
  constructor(props) {
    super();
    this.state = {
      categorias: [],
      producto: []
    };
  }

  componentDidMount() {
    const docC = DB.collection("restaurants")
      .doc(this.props.match.params.idRestaurant)
      .collection("menu")
      .doc(this.props.match.params.idMenu)
      .collection("categories");

    docC.get().then(querySnapshot => {
      querySnapshot.forEach(categ => {
        let productos = DB.collection("restaurants")
          .doc(this.props.match.params.idRestaurant)
          .collection("menu")
          .doc(this.props.match.params.idMenu)
          .collection("categories")
          .doc(categ.id)
          .collection("products");
        this.setState({
          categorias: [
            ...this.state.categorias,
            {
              nameCategoria: categ.data().name
            }
          ]
        });
        productos.get().then(querySnap => {
          querySnap.forEach(product => {
            this.setState({
              producto: [
                ...this.state.producto,
                {
                  idProduct: product.id,
                  idCategoria: categ.id,
                  idRestaurant: this.props.match.params.idRestaurant,
                  idMenu: this.props.match.params.idMenu,
                  nameCateg: categ.data().name,
                  description: product.data().description,
                  imageProduct: product.data().imageProduct,
                  name: product.data().name,
                  price: product.data().price
                }
              ]
            });
          });
        });
      });
    });
  }

  render() {
    return (
      <div>
        <Menu
          idTable={this.props.match.params.idTable}
          idRestaurant={this.props.match.params.idRestaurant}
          categoria={this.state.categorias}
          productos={this.state.producto}
        />
      </div>
    );
  }
}

export default MenuContainerCliente;
