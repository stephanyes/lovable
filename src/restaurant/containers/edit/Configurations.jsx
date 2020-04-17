import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Product from "../../../restaurant/components/edit/Configurations";
import { connect } from "react-redux";
import Configurations from "../../../restaurant/components/edit/Configurations";
import { showLoader, hideLoader } from "../../../store/actions/loginAction";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
const DB = firebase.db;
let local = JSON.parse(window.localStorage.getItem('persist:lovableLogin'))
let userLS
if (local) {
  userLS = JSON.parse(local.user)
}

const mapStateToProps = (state) => {
  return {
    restaurantId: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};

class EditConfigurations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      phone: "",
      logoImage: "",
      backgroundImage: "",
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (userLS.isAuth === false) {
      this.props.history.push("/");
    } else {
      this.props.dispatch(showLoader())
      let doc = DB.collection("restaurants").doc(userLS.loginUser.restaurantID);
      doc.get().then((restaurantInfo) => {
        this.setState({
          name: restaurantInfo.data().name,
          mail: restaurantInfo.data().mail,
          phone: restaurantInfo.data().phone,
          logoImage: restaurantInfo.data().logoImage,
          backgroundImage: restaurantInfo.data().backgroundImage,
        });
        setTimeout(() => {
          this.props.dispatch(hideLoader())
        }, 500)
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let docRestaurant = DB.collection("restaurants").doc(
      this.props.restaurantId
    );
    docRestaurant.update(this.state);
    firebase.succesfullMsg("Information updated!");
    this.props.history.push(`/configurations`);
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
        <Configurations
          inputs={this.handleInputs}
          submit={this.handleSubmit}
          restaurant={this.state}
        />
        <div>
          <FullPageLoader />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditConfigurations);
