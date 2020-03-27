import React from "react";
import Menu from "../components/Menu";
// const DB = firebase.db;

class MenuContainerCliente extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <Menu />
            </div>
        );
    }
}

export default MenuContainerCliente;