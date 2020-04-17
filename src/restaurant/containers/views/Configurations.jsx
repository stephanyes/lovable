import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Footer from "../general/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FullPageLoader from '../../components/FullPageLoader/FullPageLoader'
import Configurations from "../../../restaurant/components/views/Configurations";
import { hideLoader, showLoader } from '../../../store/actions/loginAction'
import { connect } from "react-redux";

const DB = firebase.db;
let restaurantDoc;
const MySwal = withReactContent(Swal);
let local = JSON.parse(window.localStorage.getItem('persist:lovableLogin'))
let userLS
if (local) {
  userLS = JSON.parse(local.user)
}

class ConfigurationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantInfo: {},
      quantityMesas: 0,
    };
    this.addTableBtn = this.addTableBtn.bind(this)
    this.deleteTableBtn = this.deleteTableBtn.bind(this)
  }

  componentDidMount() {
    if (userLS.isAuth === false) {
      this.props.history.push("/");
    } else {
      this.props.dispatch(showLoader())
      restaurantDoc = DB.collection("restaurants").doc(
        `${userLS.loginUser.restaurantID}`
      );
      restaurantDoc.get().then((doc) => {
        console.log(doc.data())
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

  addTableBtn(e, id) {
    e.preventDefault()
    let sum = this.state.quantityMesas
    let newTable = DB.collection('restaurants').doc(id).collection('tables')
    MySwal.fire({
      title: "Adding another table?",
      text: "Please confirm this action before going forward :)",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      console.log(result)
      if (result.value) {
        MySwal.fire(
          "Created!",
          `A new table has been added to the dashboard!`,
          "success"
        );
        newTable.add({
          clientActual: 0,
          mail: "",
          number: sum + 1,
          orderActual: 0,
          orderStatus: "",
          pay: false,
          secretCode: 0,
          state: "free",
          waiter: false
        })
      } else if (result.dismiss === "cancel") {
        this.props.history.go(0)
      }
      this.props.history.push('/dashboard')
    })
  }

  deleteTableBtn(e, id) {
    e.preventDefault()
    let last = this.state.quantityMesas
    let newTable = DB.collection('restaurants').doc(id).collection('tables').where('number', '==', last)
    MySwal.fire({
      title: "You are about to delete the last table added :(",
      text: "Please confirm this action before going forward :)",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(result => {
      if (result.value) {
        MySwal.fire(
          "Deleted!",
          `Table number ${last} has been deleted xd`,
          "success"
        );
        newTable.get().then(lastTable => {
          lastTable.forEach(ultima => {
            ultima.ref.delete()
          })
        })
      } else if (result.dismiss === 'cancel') {
        this.props.history.go(0)
      }
      this.props.history.push('/dashboard')
    })

  }

  render() {
    return (
      <div>
        <Sidebar />
        <Configurations
          restaurantInfo={this.state.restaurantInfo}
          restaurantId={this.props.restaurantId}
          quantityMesas={this.state.quantityMesas}
          addTable={this.addTableBtn}
          deleteTable={this.deleteTableBtn}
        />
        <div>
          <FullPageLoader />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurantId: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};

export default connect(mapStateToProps)(ConfigurationsContainer);
