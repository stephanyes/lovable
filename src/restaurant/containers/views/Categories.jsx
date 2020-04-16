import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Categories from "../../../restaurant/components/views/Categories";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
import { showLoader, hideLoader } from "../../../store/actions/loginAction";
const DB = firebase.db;

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};
const MySwal = withReactContent(Swal);

class MenuIndividualContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreMenu: "",
      categoryArray: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  menuId = this.props.match.params.id;
  componentDidMount() {
    if (this.props.isAuth === false) {
      this.props.history.push("/");
    } else {
      this.props.dispatch(showLoader())
      let doc = DB.collection("restaurants")
        .doc(this.props.userLogin)
        .collection("menu")
        .doc(this.menuId);
      //Aca saco el nombre del menu
      doc.get().then((name) => {
        this.setState({
          nombreMenu: name.data().nameOfMenu,
        });
        //Aca agarro categorias (plural siendo que cada menu puede tener muchas categorias)
        //Y hago un array de categorias, y meto objetos adentro
        doc
          .collection("categories")
          .get()
          .then((array) => {
            array.forEach((ids) => {
              this.setState({
                categoryArray: [
                  ...this.state.categoryArray,
                  {
                    categoryId: ids.id,
                    imageCategory: ids.data().imageCategory,
                    name: ids.data().name,
                  },
                ],
              });
            });
          });
        setTimeout(() => {
          this.props.dispatch(hideLoader())
        }, 500)
      });

    }
  }

  handleDelete(e, id) {
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("menu")
      .doc(this.menuId)
      .collection("categories")
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
        MySwal.fire(
          "Deleted!",
          `Your Category has been deleted  with it's products.`,
          "success"
        );
        doc.delete();
      }
      this.props.history.push(`/menu`);
    });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Categories
          nombre={this.state.nombreMenu}
          categories={this.state.categoryArray}
          menuId={this.props.match.params.id}
          deleteFunc={this.handleDelete}
        />
        <div>
          <FullPageLoader />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MenuIndividualContainer);
