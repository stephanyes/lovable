import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../../services/firebase";
import { connect } from "react-redux";
import { saveLoginClient } from "../../../store/actions/loginClientAction";
import Login from "../../../client/components/views/Login";

const DB = firebase.db;
let ClientActualApp = 0;

class ClientLoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTable: "",
      code: "",
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value,
    });
  }

  handlerSubmit(e) {
    e.preventDefault();
    //Guardamos en la variable el RestaurantId que viene por URL
    let RestaurantId = this.props.match.params.idRestaurant;
    //Aca crea la variable para buscar todas las mesas y busca la ingresada
    let TablesRestaurant = DB.collection("restaurants")
      .doc(RestaurantId)
      .collection("tables");
    TablesRestaurant.get().then((result) => {
      result.forEach((doc) => {
        //Aca comparamos si el numero de mesa y el codigo secreto son correctos.
        if (
          doc.data().number == this.state.numberOfTable &&
          doc.data().secretCode == this.state.code
        ) {
          //Aca asigna el TableId a una variable para usarla despues.
          let TableIdActual = doc.id;

          // Va a la base de datos y pregunta si en la Table hay numero actual de cliente. Si no hay, crea y lo asigna.
          // Si ya hay uno asignado, lo que hace es enviar al Store de Redux el client de la DB.
          if (doc.data().clientActual !== 0) {
            ClientActualApp = doc.data().clientActual;
            const client = { RestaurantId, TableIdActual, ClientActualApp };
            this.props.saveLoginClient(client);
            //Le agrega a la URL la mesa ingresada si es correcto.
            this.props.history.push(`/${RestaurantId}/${doc.id}`);
          } else {
            //En esta parte, entramos al restaurante actual y buscamos el ultimo numero preparado para cliente. Le asignamos ese numero a la mesa actual. Y le sumamos 1 a ese indicador para dejarlo listo para el proximo cliente.
            let clientTotal;
            let arr = [];
            const RestaurantDoc = DB.collection("restaurants").doc(
              RestaurantId
            );
            RestaurantDoc.get().then((result) => {
              let res = result.data();
              //Esta variable toma el valor preparado para el proximo cliente
              clientTotal = res.clientTotalNumber;
              //Aca asignamos ese numero de cliente actual a la mesa actual.
              RestaurantDoc.update({ clientTotalNumber: clientTotal + 1 });
              //Aca buscamos otra vez todas las mesas con el numero de mesa ingresado en el form y le asignamos el numero de cliente.
              ClientActualApp = clientTotal;
              const client = { RestaurantId, TableIdActual, ClientActualApp };
              this.props.saveLoginClient(client);
              TablesRestaurant.get().then((result) => {
                result.forEach((doc) => {
                  if (doc.data().number == this.state.numberOfTable) {
                    //En esta variable creamos la ruta para actualizar la mesa actual.
                    const TableActual = DB.collection("restaurants")
                      .doc(RestaurantId)
                      .collection("tables")
                      .doc(TableIdActual);
                    //Actualizamos en la mesa actual el numero de cliente.
                    TableActual.update({ clientActual: clientTotal });
                  }
                });
              });
            });
            //Le agrega a la URL la mesa ingresada si es correcto.
            this.props.history.push(`/${RestaurantId}/${doc.id}`);
          }
        }
      });
    });
  }

  render() {
    return (
      <div>
        <Login
          handleClick={this.handleClick}
          handlerChange={this.handlerChange}
          handlerSubmit={this.handlerSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    saveLoginClient: (client) => dispatch(saveLoginClient(client)),
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(ClientLoginContainer)
);
