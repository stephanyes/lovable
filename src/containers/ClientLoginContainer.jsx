import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "../services/firebase";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import ClientLogin from "../components/ClientLogin";
import {
  saveClient,
  saveTable,
  saveRestaurant
} from "../store/actions/loginClientAction";
const DB = firebase.db;

const mapDispatchToProps = (dispatch, state) => {
  return {
    saveClientID: client => dispatch(saveClient(client)),
    saveTableID: table => dispatch(saveTable(table)),
    saveRestaurantID: restaurant => dispatch(saveRestaurant(restaurant))
  };
};

class ClientLoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTable: "",
      code: ""
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  }

  handlerSubmit(e) {
    e.preventDefault();
    //Guardamos en la variable el RestaurantId que viene por URL
    let RestaurantId = this.props.match.params.idRestaurant;
    //Aca lo envia el RestaurantId al Store
    this.props.saveRestaurantID(RestaurantId);
    //Aca crea la variable para buscar todas las mesas y busca la ingresada
    let TablesRestaurant = DB.collection("restaurants")
      .doc(RestaurantId)
      .collection("tables");
    TablesRestaurant.get().then(result => {
      result.forEach(doc => {
        //Aca comparamos si el numero de mesa y el codigo secreto son correctos.
        if (
          doc.data().number == this.state.numberOfTable &&
          doc.data().secretCode == this.state.code
        ) {
          //Aca envia el TableId actual al Store
          this.props.saveTableID(doc.id);
          //Aca asigna el TableId a una variable para usarla despues.
          let TableIdActual = doc.id;

          ////
          ////
          //// 1. ELIMINAR LAS SUBIDAS AL STORE INDIVIDUALES.
          //// 2. CAMBIAR EL TIPO DE SUBIDA A UN SOLO OBJETO INDIVIDUAL.
          //// 3. CAMBIAR REDUCER Y TODO ESO!
          //// 4. Ir al Store. Preguntar en cada objeto si las propiedad Table y Restaurant son iguales a las actuales.
          ////
          ////(REMPLAZAR POR IF)
          //// SI NO ENCUENTRA NINGUN OBJETO CON LA TABLE Y EL RESTAURANT HACE EL IF.
          ////
          ////
          ////
          ////

          //En esta parte, entramos al restaurante actual y buscamos el ultimo numero preparado para cliente. Le asignamos ese numero a la mesa actual. Y le sumamos 1 a ese indicador para dejarlo listo para el proximo cliente.
          let RestaurantDoc = DB.collection("restaurants").doc(RestaurantId);
          RestaurantDoc.get().then(result => {
            let res = result.data();
            //Esta variable toma el valor preparado para el proximo cliente
            let clientTotal = res.clientTotalNumber;
            //Aca enviamos el Client ID nuevo al Store de Redux.
            this.props.saveClientID(clientTotal);
            //Aca asignamos ese numero de cliente actual a la mesa actual.
            RestaurantDoc.update({ clientTotalNumber: clientTotal + 1 });
            //Aca buscamos otra vez todas las mesas con el numero de mesa ingresado en el form y le asignamos el numero de cliente.
            TablesRestaurant.get().then(result => {
              result.forEach(doc => {
                if (doc.data().number == this.state.numberOfTable) {
                  //En esta variable creamos la ruta para actualizar la mesa actual.
                  let TableActual = DB.collection("restaurants")
                    .doc(RestaurantId)
                    .collection("tables")
                    .doc(TableIdActual);
                  //Actualizamos en la mesa actual el numero de cliente.
                  TableActual.update({ clientActual: clientTotal });
                }
              });
            });

            ///
            ///SI ENTRO EN EL IF (ES DECIR QUE NO HAY CLIENTE ACTUAL), DISPATCHEAR EL OBJETO CON LOS 3 PARAMETROS
            ///

            /////
            /////
            /////
            /////CERRAR EL IF DE ARRIBA
            /////
            /////
            /////
          });
          //Le agrega a la URL la mesa ingresada si es correcto.
          this.props.history.push(`/${RestaurantId}/${doc.id}`);
        }
      });
    });
  }

  render() {
    return (
      <div>
        <ClientLogin
          handleClick={this.handleClick}
          handlerChange={this.handlerChange}
          handlerSubmit={this.handlerSubmit}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(null, mapDispatchToProps)(ClientLoginContainer)
);
