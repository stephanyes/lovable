import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, Link, withRouter } from "react-router-dom";
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
import EditConfigurations from "./restaurant/containers/edit/Configurations";
import MenuesClient from "./client/containers/views/Menues";
import CategoriesClient from "./client/containers/views/Categories";
import ProductsClient from "./client/containers/views/Products";
import Cart from "./client/containers/views/Cart";
import SingleOrder from "./restaurant/containers/views/SingleOrder";
import Password from "./restaurant/components/edit/Password";
import AddTables from "./restaurant/containers/edit/AddTables";
import Mail from "./client/components/views/Mail";
import Navbar from "./restaurant/containers/general/Navbar";

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser,
    isAuth: state.user.isAuth,
  };
};

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      firebaseInitialized: false,
    };
  }

  componentDidMount() {
    firebase.isInitialized().then((val) => {
      this.setState({
        firebaseInitialized: val,
      });
    });
  }

  render() {
    // console.log(this.props.userLogin.name);
    return this.props.userLogin.name !== undefined ? (
      <div>
        <Navbar />
        <Switch>
          <Route path="/dashboard" component={Tables} />
          <Route path="/configuration/edit" component={EditConfigurations} />
          <Route path="/orders/:orderId" component={SingleOrder} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/configurations" component={Configurations} />
          <Route path="/configurations/resetpassword" component={Password} />
          <Route path="/configuration/addTable" component={AddTables} />
          <Route path="/recover" component={RecoverPassword} />
          {/* Create */}
          <Route path="/menu/createMenu" component={CreateMenu} />
          <Route path="/menu/:id/createCategory" component={CreateCategory} />
          <Route
            path="/menu/:id/:categoryId/createProduct"
            component={CreateProduct}
          />
          {/* Edit */}
          <Route
            path="/menu/:id/:categoryId/editProduct/:productId"
            component={EditProduct}
          />
          <Route
            path="/menu/:id/:categoryId/editCategory"
            component={EditCategory}
          />
          <Route path="/menu/:id/editMenu" component={EditMenu} />
          {/* Rutas a Menu/Categorias/Productos */}
          <Route exact path="/menu" component={Menues} />
          <Route exact path="/menu/:id/:categoryId" component={Products} />
          <Route path="/menu/:id" component={Categories} />

          <Route path="/configurations" component={Configurations} />
          <Route
            path="/forms"
            component={() => {
              window.location.href =
                "https://alexk321099.typeform.com/to/BxGprT";
              return null;
            }}
          />
          <Route
            exact
            path="/tables/:idTable"
            component={withRouter(SingleTable)}
          />
          <Route path="/:idRestaurant/cart/:idTable" component={Cart} />
          <Route path="/:idRestaurant/tables" component={LoginClient} />
          <Route path="/:idRestaurant/:idTable/menu" component={MenuesClient} />
          <Route
            path="/:idRestaurant/menu/:idMenu/:idTable"
            component={CategoriesClient}
          />
          <Route
            path="/:idRestaurant/:idMenu/:idCategoria/:idProduct/:idTable/client"
            component={ProductsClient}
          />
          <Route path="/:idRestaurant/:idTable/mail" component={Mail} />
          <Route path="/:idRestaurant/:idTable" component={Home} />
        </Switch>
      </div>
    ) : (
      <div
        className="container"
        style={{ textAlign: "center", alignContent: "center" }}
      >
        <Route exact path="/" component={Login}></Route>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
