import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "../containers/SidebarContainer";
import CreateProductView from "../components/CreateProductView";
import { connect } from "react-redux";
const DB = firebase.db;

const mapStateToProps = (state) => {
    return {
        userLogin: state.user.loginUser.restaurantID
    }
}

class CreateProductContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            imageProduct: "",
            price: "",

        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputs = this.handleInputs.bind(this)
    }
    menuId = this.props.match.params.id
    categoryId = this.props.match.params.categoryId

    handleSubmit(e) {
        e.preventDefault()
        let doc = DB.collection('restaurants').doc(this.props.userLogin).collection("menu").doc(this.menuId).collection('categories').doc(this.categoryId).collection('products').doc()
        doc.set(this.state)
        firebase.succesfullMsg('Product successfully added!')
        this.props.history.push(`/menu/${this.menuId}/${this.categoryId}`)
    }
    handleInputs(e) {
        let key = e.target.name;
        let input = e.target.value;
        this.setState({
            [key]: input
        })
    }
    render() {
        return (
            <div>
                <SidebarContainer />
                <CreateProductView submit={this.handleSubmit} inputs={this.handleInputs} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(CreateProductContainer)