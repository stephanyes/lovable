import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Footer from "../general/Footer";
import Configurations from "../../../restaurant/components/views/Configurations";
import { connect } from "react-redux";

const DB = firebase.db;
let restaurantDoc;

const mapStateToProps = (state) => {
  return {
    restaurantId: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};

class ConfigurationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantInfo: {},
      quantityMesas: 0,
    };
  }

  componentDidMount() {
    if (this.props.isAuth == false) {
      this.props.history.push("/");
    } else {
      restaurantDoc = DB.collection("restaurants").doc(
        `${this.props.restaurantId}`
      );
      restaurantDoc.get().then((doc) => {
        this.setState({
          restaurantInfo: {
            backgroundImage: doc.data().backgroundImage,
            clientTotalNumber: doc.data().clientTotalNumber,
            logoImage: doc.data().logoImage,
            mail: doc.data().mail,
            name: doc.data().name,
            orderTotalNumber: doc.data().orderTotalNumber,
            orderStatus: doc.data().orderStatus,
            phone: doc.data().phone,
            id: doc.id,
          },
        });
      });
      restaurantDoc
        .collection("tables")
        .get()
        .then((mesas) => this.setState({ quantityMesas: mesas.size }));
    }
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Configurations
          restaurantInfo={this.state.restaurantInfo}
          restaurantId={this.props.restaurantId}
          quantityMesas={this.state.quantityMesas}
        />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ConfigurationsContainer);
