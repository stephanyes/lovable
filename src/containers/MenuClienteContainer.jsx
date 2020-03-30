import React from "react";
import MenuCategoriasClient from "../components/MenuCategoriasClient";
import firebase from "../services/firebase";
const DB = firebase.db;

class MenuContainerCliente extends React.Component {
  constructor(props) {
    super();
    this.state = {
      menuesAndNames: []
    };
  }

  componentDidMount() {
    let doc = DB.collection("restaurants")
      .doc(this.props.match.params.idRestaurant)
      .collection("menu");
    doc.get().then(algo => {
      algo.forEach(menuesFB => {
        //Aca traemos los dos id's de los menu de un restaurant(testeando2) y el nombre
        this.setState({
          menuesAndNames: [
            ...this.state.menuesAndNames,
            { name: menuesFB.data().nameOfMenu, id: menuesFB.id }
          ]
        });
      });
    });
  }

  render() {
    return (
      <div>
        <MenuCategoriasClient
          idRestaurant={this.props.match.params.idRestaurant}
          menuObject={this.state.menuesAndNames}
        />
      </div>
    );
  }
}

export default MenuContainerCliente;
