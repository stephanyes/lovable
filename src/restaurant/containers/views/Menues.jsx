import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import MenuView from "../../../components/MenuView";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const DB = firebase.db;

const mapStateToProps = state => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};
const MySwal = withReactContent(Swal);

class MenuContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      menuesAndNames: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let doc = DB.collection("restaurants")
      .doc(`${this.props.userLogin}`)
      .collection("menu");
    doc.get().then(algo => {
      algo.forEach(menuesFB => {
        //Aca traemos los dos id's de los menu de un restaurant(testeando2) y el nombre
        this.setState({
          menuesAndNames: [
            ...this.state.menuesAndNames,
            { name: menuesFB.data().nameOfMenu, id: menuesFB.id }
          ]
        });
      });
    });
  }
  handleDelete(e, id) {
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("menu")
      .doc(id);
    //Refactorizar este mensaje de abajo, pasarlo a la clase Firebase. Quizas con Async Await se puede
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then(result => {
      if (result.value) {
        MySwal.fire("Deleted!", `Your Menu has been deleted.`, "success");
        doc.delete();
      }
      this.props.history.push(`/dashboard`);
    });
  }

  // componentWillUnmount() {
  //     doc.onSnapshot(() => { });
  // }
  render() {
    return (
      <div>
        <Sidebar />

        <MenuView
          menuObject={this.state.menuesAndNames}
          deleteFunc={this.handleDelete}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(MenuContainer);
