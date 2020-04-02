import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import firebase from "./services/firebase";
import Login from "./restaurant/containers/views/Login";
import Tables from "./restaurant/containers/views/Tables";
import Configurations from "./restaurant/containers/views/Configurations";
import Home from "./client/containers/views/Home";
import LoginClient from "./client/containers/views/Login";
import Orders from "./restaurant/containers/views/Orders";
import RecoverPassword from "./restaurant/components/views/RecoverPassword";
import Menues from "./restaurant/containers/views/Menues";
import Categories from "./restaurant/containers/views/Categories";
import Products from "./restaurant/containers/views/Products";
import SingleTable from "./restaurant/containers/views/SingleTable";
import CreateMenu from "./restaurant/containers/create/Menu";
import CreateCategory from "./restaurant/containers/create/Category";
import CreateProduct from "./restaurant/containers/create/Product";
import EditProduct from "./restaurant/containers/edit/Product";
import EditCategory from "./restaurant/containers/edit/Category";
import EditMenu from "./restaurant/containers/edit/Menu";
import MenuesClient from "./client/containers/views/Menues";
import CategoriesClient from "./client/containers/views/Categories";
import ProductsClient from "./client/containers/views/Products";
import Cart from "./client/containers/views/Cart";
import SingleOrder from "./restaurant/containers/views/SingleOrder";

const mapStateToProps = state => {
  return {
    userLogin: state.user.loginUser,
    isAuth: state.user.isAuth
  };
};

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      firebaseInitialized: false
    };
  }

  componentDidMount() {
    firebase.isInitialized().then(val => {
      this.setState({
        firebaseInitialized: val
      });
    });
  }

  render() {
    return this.state.firebaseInitialized !== false ? (
      <div>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/dashboard" component={Tables}></Route>

          <Route path="/orders/:orderId" component={SingleOrder}></Route>
          <Route exact path="/orders" component={Orders}></Route>
          <Route path="/configuration" component={Configurations}></Route>
          <Route path="/recover" component={RecoverPassword}></Route>
          {/* Create */}
          <Route path="/menu/createMenu" component={CreateMenu}></Route>
          <Route
            path="/menu/:id/createCategory"
            component={CreateCategory}
          ></Route>
          <Route
            path="/menu/:id/:categoryId/createProduct"
            component={CreateProduct}
          ></Route>
          {/* Edit */}
          <Route
            path="/menu/:id/:categoryId/editProduct/:productId"
            component={EditProduct}
          ></Route>
          <Route
            path="/menu/:id/:categoryId/editCategory"
            component={EditCategory}
          ></Route>
          <Route path="/menu/:id/editMenu" component={EditMenu}></Route>
          {/* Rutas a Menu/Categorias/Productos */}
          <Route exact path="/menu" component={Menues}></Route>
          <Route
            exact
            path="/menu/:id/:categoryId"
            component={Products}
          ></Route>
          <Route path="/menu/:id" component={Categories}></Route>
          <Route path="/configuration" component={Configurations}></Route>
          <Route
            path="/forms"
            component={() => {
              window.location.href =
                "https://alexk321099.typeform.com/to/BxGprT";
              return null;
            }}
          ></Route>
          <Route path="/tables/:idTable" component={SingleTable}></Route>
          <Route path="/:idRestaurant/cart/:idTable" component={Cart}></Route>
          <Route path="/:idRestaurant/tables" component={LoginClient}></Route>
          <Route
            path="/:idRestaurant/:idTable/menu"
            component={MenuesClient}
          ></Route>
          <Route
            path="/:idRestaurant/menu/:idMenu/:idTable"
            component={CategoriesClient}
          ></Route>
          <Route
            path="/:idRestaurant/:idMenu/:idCategoria/:idProduct/:idTable/client"
            component={ProductsClient}
          ></Route>
          <Route path="/:idRestaurant/:idTable" component={Home}></Route>
        </Switch>
      </div>
    ) : (
      <div
        className="container"
        style={{ textAlign: "center", alignContent: "center" }}
      >
        <Loader type="Hearts" color="red" height={80} width={80} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
