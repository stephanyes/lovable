import React from "react";
import firebase from "../services/firebase";
import ViewCart from "../components/ViewCart";

const DB = firebase.db;
let newOrder;

class ViewCartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        productos : [],
        priceTotal: 0,
        idOrder:""
  }
  this.deleteClick = this.deleteClick.bind(this)
  this.handlerSubmit = this.handlerSubmit.bind(this)
}
    
    componentDidMount(){
        const doc = DB.collection("restaurants")
        .doc(this.props.match.params.idRestaurant)
        .collection("tables")
        .doc(this.props.match.params.idTable)

        doc.get()
        .then( data => {
           let orderId = data.data().orderActual
           const order = DB.collection("restaurants")
           .doc(this.props.match.params.idRestaurant)
           .collection("orders")
           .doc(`${orderId}`)
           .collection("products")

           this.setState({
               idOrder : orderId
           })

           order.get().then(

               result => { result.forEach(product => {
                    let total = this.state.priceTotal
                    total += parseInt(product.data().price)
                    this.setState({ priceTotal: total})

                    let orderPrice = DB.collection("restaurants")
                    .doc(this.props.match.params.idRestaurant)
                    .collection("orders")
                    .doc(`${orderId}`)
                    orderPrice.update({totalPrice: this.state.priceTotal})
            

                    this.setState({ 
                        productos: [...this.state.productos, {
                            id: product.id,
                            imageProduct: product.data().imageProduct,
                            name: product.data().name,
                            price: product.data().price, 
                            description: product.data().description
                    }]})
                })
            }) 
        })

        newOrder = DB.collection("restaurants")
        .doc(this.props.match.params.idRestaurant)
        .collection("orders")
        .doc(`${this.props.match.params.orderId}`)
        .collection("products")

        newOrder.onSnapshot(docSnapshot => {
            docSnapshot.forEach(product => {

                    let orderPrice = DB.collection("restaurants")
                    .doc(this.props.match.params.idRestaurant)
                    .collection("orders")
                    .doc(`${this.state.idOrder}`)
                    orderPrice.update({totalPrice: this.state.priceTotal})

                    this.setState({ 
                        productos: [...this.state.productos, {
                            id: product.id,
                            imageProduct: product.data().imageProduct,
                            name: product.data().name,
                            price: product.data().price, 
                            description: product.data().description
                    }]
                })
            })    
        })
    }

    componentWillUnmount() {
        newOrder.onSnapshot(() => {});
    }

    deleteClick(e, id){
        e.preventDefault()
        const order = DB.collection("restaurants")
        .doc(this.props.match.params.idRestaurant)
        .collection("orders")
        .doc(`${this.state.idOrder}`)
        .collection("products")
        order.doc(`${id}`).delete()
        .then(() => {
            console.log("Document successfully deleted!")
            })
        .catch(error => 
             console.error("Error removing document: ", error)
        )
    }

    // this.props.history.push(`/${this.props.match.params.idRestaurant}/${this.props.match.params.idTable}/menu`)


    handlerSubmit(e){
        e.preventDefault()
        const order = DB.collection("restaurants")
        .doc(this.props.match.params.idRestaurant)
        .collection("orders")
        .doc(`${this.state.idOrder}`)

        order.update({status: "pending"})
        
        const tables = DB.collection("restaurants")
        .doc(this.props.match.params.idRestaurant)
        .collection("tables")
        .doc(`${this.props.match.params.idTable}`)

        tables.update({orderStatus: "pending"})
    }




    render() {
        return (
            <div>
                <ViewCart deleteClick={this.deleteClick} handlerSubmit={this.handlerSubmit} productos={this.state.productos} priceTotal={this.state.priceTotal}/>
            </div>
        );
    } 
}

export default ViewCartContainer