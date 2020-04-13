import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import AddTablesForm from "../../components/edit/AddTables";
import { connect } from "react-redux";
const DB = firebase.db;



class AddTables extends React.Component {

    render() {
        return (
            <div>
                <Sidebar />
                <AddTablesForm />
            </div>
        )
    }
}

export default connect(null)(AddTables)