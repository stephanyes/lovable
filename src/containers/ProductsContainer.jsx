import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "../containers/SidebarContainer";
import ProductsView from "../components/ProductsView";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const DB = firebase.db;

const mapStateToProps = (state) => {
    return {
        userLogin: state.user.loginUser.restaurantID
    }
}
const MySwal = withReactContent(Swal);
class ProductsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsArray: []
        };
        this.handleDelete = this.handleDelete.bind(this)
    }
    menuId = this.props.match.params.id
    categoryId = this.props.match.params.categoryId

    componentDidMount() {
        let doc = DB.collection('restaurants').doc(this.props.userLogin).collection("menu").doc(this.menuId).collection('categories').doc(this.categoryId).collection('products')
        //Doc en este container es un array de IDS en referencia a todos los productos que van a haber
        doc.get().then(name => {
            name.forEach(ind => {
                //ind.id me da el id de cada producto que vaya a haber
                //Eventualmente el id de cada producto lo vamos a necesitar para reflejarlo en el carrito y editar 
                this.setState({
                    productsArray: [...this.state.productsArray, { id: ind.id, name: ind.data().name, imageProduct: ind.data().imageProduct, price: ind.data().price, description: ind.data().description }]
                })
            })
        })

    }

    handleDelete(e, id) {
        e.preventDefault()
        let doc = DB.collection('restaurants').doc(this.props.userLogin).collection("menu").doc(this.menuId).collection('categories').doc(this.categoryId).collection('products').doc(id)
        //Refactorizar este mensaje de abajo, pasarlo a la clase Firebase. Quizas con Async Await se puede
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.value) {
                MySwal.fire(
                    'Deleted!',
                    `Your product has been deleted.`,
                    'success'
                )
                doc.delete()
            }
            this.props.history.push(`/menu/${this.menuId}`)
        })
    }
    render() {
        return (
            <div>
                <SidebarContainer />
                <ProductsView products={this.state.productsArray} menuId={this.props.match.params.id} catId={this.props.match.params.categoryId} deleteFunc={this.handleDelete} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProductsContainer)