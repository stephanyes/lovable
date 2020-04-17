import React from "react";
import Menues from "../../../client/components/views/Menues";
import firebase from "../../../services/firebase";
const DB = firebase.db;

class MenuContainerCliente extends React.Component {
  constructor(props) {
    super(props);
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
        <Menues
          idTable={this.props.match.params.idTable}
          idRestaurant={this.props.match.params.idRestaurant}
          menuObject={this.state.menuesAndNames}
        />
      </div>
    );
  }
}

export default MenuContainerCliente;
