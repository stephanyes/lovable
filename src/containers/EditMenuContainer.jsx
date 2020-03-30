import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "../containers/SidebarContainer";
import EditMenuView from "../components/EditMenuView";
import { connect } from "react-redux";
const DB = firebase.db;

const mapStateToProps = state => {
    return {
        restoId: state.user.loginUser.restaurantID
    }
}

class EditMenuContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameOfMenu: ""
        }
        this.handleInputs = this.handleInputs.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    menuId = this.props.match.params.id
    componentDidMount() {
        let doc = DB.collection('restaurants').doc(this.props.restoId).collection("menu").doc(this.menuId)
        doc.get().then(menu => {
            this.setState({
                nameOfMenu: menu.data().nameOfMenu
            })
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let doc = DB.collection('restaurants').doc(this.props.restoId).collection("menu").doc(this.menuId)
        doc.update(this.state)
        firebase.succesfullMsg('Menu updated!')
        this.props.history.push(`/menu/${this.menuId}`)
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
                <EditMenuView inputs={this.handleInputs} submit={this.handleSubmit} menu={this.state} />
            </div>
        )
    }
}


export default connect(mapStateToProps)(EditMenuContainer)