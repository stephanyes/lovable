import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Menu from "../../../restaurant/components/edit/Menu";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader"
import { connect } from "react-redux";
import { showLoader, hideLoader } from "../../../store/actions/loginAction";
const DB = firebase.db;
let local = JSON.parse(window.localStorage.getItem('persist:lovableLogin'))
let userLS
if (local) {
  userLS = JSON.parse(local.user)
}

const mapStateToProps = (state) => {
  return {
    restoId: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};

class EditMenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfMenu: "",
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  menuId = this.props.match.params.id;
  componentDidMount() {
    if (userLS.isAuth === false) {
      this.props.history.push("/");
    } else {
      this.props.dispatch(showLoader())
      let doc = DB.collection("restaurants")
        .doc(userLS.loginUser.restaurantID)
        .collection("menu")
        .doc(this.menuId);
      doc.get().then((menu) => {
        this.setState({
          nameOfMenu: menu.data().nameOfMenu,
        });
        setTimeout(() => {
          this.props.dispatch(hideLoader())
        })
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.restoId)
      .collection("menu")
      .doc(this.menuId);
    doc.update(this.state);
    firebase.succesfullMsg("Menu updated!");
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
        <Menu
          inputs={this.handleInputs}
          submit={this.handleSubmit}
          menu={this.state}
        />
        <div>
          <FullPageLoader />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditMenuContainer);
