import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Footer from "../general/Footer";
import FullPageLoader from '../../components/FullPageLoader/FullPageLoader'
import Configurations from "../../../restaurant/components/views/Configurations";
import { hideLoader, showLoader } from '../../../store/actions/loginAction'
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
    if (this.props.isAuth === false) {
      this.props.history.push("/");
    } else {
      this.props.dispatch(showLoader())
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
        setTimeout(() => {
          this.props.dispatch(hideLoader())
        }, 500)
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
        <div>
          <FullPageLoader />
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ConfigurationsContainer);
