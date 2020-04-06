import React from "react";
import firebase from "../../../services/firebase";
import SingleTable from "../../../restaurant/components/views/SingleTable";
import Sidebar from "../general/Sidebar";
import { connect } from "react-redux";

const DB = firebase.db;

let pruebaSingleTable;
let orderQuery
let productsTable

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};

class SingleTableContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      table: {},
      tableOrder: {},
      productArray: []
    };
    this.handlerButton = this.handlerButton.bind(this);
    this.orderHandler = this.orderHandler.bind(this);
    this.tableHandler = this.tableHandler.bind(this);
  }

  componentDidMount() {
    pruebaSingleTable = DB.collection("restaurants")
      .doc(`${this.props.userLogin}`)
      .collection("tables").doc(this.props.match.params.idTable)
    pruebaSingleTable.onSnapshot(tableDoc => {
      this.setState({
        table: {
          clientActual: tableDoc.data().clientActual,
          number: tableDoc.data().number,
          orderActual: tableDoc.data().orderActual,
          secretCode: tableDoc.data().secretCode,
          state: tableDoc.data().state,
          waiter: tableDoc.data().waiter,
          pay: tableDoc.data().pay,
          orderStatus: tableDoc.data().orderStatus,
          id: tableDoc.id
        }
      })
      if (tableDoc.data().orderActual !== 0) {
        let stringy = (tableDoc.data().orderActual).toString()
        orderQuery = DB.collection("restaurants").doc(`${this.props.userLogin}`).collection("orders").doc(stringy)
        orderQuery.onSnapshot(docSnapshot => {
          this.setState({
            tableOrder: {
              status: docSnapshot.data().status,
              totalPrice: docSnapshot.data().totalPrice
            }
          })
          productsTable = orderQuery.collection('products')
          productsTable.onSnapshot(prodDoc => {
            let arrayHelper = []
            prodDoc.forEach(singleProd => {
              arrayHelper.push({
                name: singleProd.data().name,
                price: singleProd.data().price
              })
            })
            this.setState({
              productArray: arrayHelper
            })
          })
        })
      }

    })
  }

  componentWillUnmount() {
    pruebaSingleTable.onSnapshot(() => { });
    if (orderQuery && productsTable) {
      orderQuery.onSnapshot(() => { });
      productsTable.onSnapshot(() => { });
    }

  }

  orderHandler(e, id, string) {
    e.preventDefault();
    let stringy = id.toString()
    let doc = DB.collection('restaurants').doc(this.props.userLogin).collection('orders').doc(stringy)
    doc.update({ status: string })
    firebase.succesfullMsg(`Order ${string}`)
  }

  tableHandler(e, id, string) {
    e.preventDefault()
    let table = DB.collection('restaurants').doc(this.props.userLogin).collection('tables').doc(id)
    if (string === 'waiter') {
      table.update({
        waiter: false
      })
    } else {
      table.update({
        pay: false
      })
    }
  }

  handlerButton(e) {
    e.preventDefault();
    let TableActual = DB.collection("restaurants")
      .doc(`${this.props.userLogin}`)
      .collection("tables")
      .doc(`${this.props.match.params.idTable}`);
    TableActual.update({
      clientActual: 0,
      orderActual: 0,
      orderStatus: "",
      secretCode: 0,
      state: "free",
      pay: false,
      waiter: false
    });
    this.props.history.push(`/dashboard`);
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Sidebar />
        <SingleTable
          table={this.state.table}
          order={this.state.tableOrder}
          productArray={this.state.productArray}
          buttonClick={this.handlerButton}
          orderHandler={this.orderHandler}
          tableHandler={this.tableHandler}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(SingleTableContainer);
