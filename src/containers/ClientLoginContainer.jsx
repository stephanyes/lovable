import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "../services/firebase";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
//import { loginUser } from "../store/actions/loginAction";
import ClientLogin from "../components/ClientLogin";

const DB = firebase.db;

let docs = DB.collection("restaurants")
  .doc("QtLVkjHLnXZPDj4pbWKw")
  .collection("tables");

const mapStateToProps = (state, ownprops) => {
  //     return {
  //       userLogin: state.user.loginUser
  //     };
};

const mapDispatchToProps = (dispatch, state) => {
  //     return {
  //       loggeado: user => dispatch(loginUser(user))
  //     };
};

class ClientLoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTable: "",
      code: "",
      orderActual: 0
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  componentDidMount() {
    // docs.onSnapshot(docSnapshot => {
    //   let tables = [];
    //   docSnapshot.forEach(doc => {
    //     tables.push(doc.data());
    //     this.setState({ tables });
    //   });
    // });
  }

  componentWillUnmount() {
    // docs.onSnapshot(() => {});
  }

  handlerChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  }

  //   algo.get().then(algo => {
  //     console.log(algo);
  //     algo.forEach(doc => {
  //       tables.push(doc.data());
  //       this.setState({ tables });
  //     });
  //   })

  asignNewClient() {}

  handlerSubmit(e) {
    e.preventDefault();
    docs.get().then(result => {
      result.forEach(doc => {
        if (
          doc.data().number == this.state.numberOfTable &&
          doc.data().secretCode == this.state.code
        ) {
          //En esta parte le sumamos 1 al indicador total de clientes en la info. del restaurante.
          //REEMPLAZAR esta comparacion por el numero de restaurante que trae Redux del Store!
          DB.collection("restaurants")
            .doc("QtLVkjHLnXZPDj4pbWKw")
            .get()
            .then(result => {
              let res = result.data();
              let pasaNumero = res.orderTotalNumber;
              let doc2 = DB.collection("restaurants").doc(
                "QtLVkjHLnXZPDj4pbWKw"
              );
              doc2.update({ orderTotalNumber: pasaNumero + 1 });

              console.log("doc es", doc);
              //doc.update({ clientActual: pasaNumero - 1 });

              //DEBERIAMOS REEMPLAZAR EL PATH ENTERO POR UNA VARIABLE QUE LO CONTENGO Y QUE NO SEA HARDCODE!
              docs.get().then(result => {
                result.forEach(doc => {
                  if (doc.data().number == this.state.numberOfTable) {
                    let doc3 = DB.collection("restaurants")
                      .doc("QtLVkjHLnXZPDj4pbWKw")
                      .collection("tables")
                      .doc("EFqFXqnq7N1eZ3hFHzdO");

                    //     console.log("doc.ref es", doc.ref.path);
                    //  let doc3 = DB.collection(toString(doc.ref.path));

                    doc3.update({ clientActual: pasaNumero });
                  }
                });
              });

              //data().clientactual

              //     result3.forEach(doc => {
              //       //  if (doc.data().number == this.state.numberOfTable) {
              //       console.log("Llegue re bien!");
              //       //}
              //     });
              //   });
            });

          this.props.history.push(`/tables/${doc.id}`);
        }
        // tables.push(doc.data());
        // this.setState({ tables });
      });
    });
  }

  //   handlerSubmit(e) {
  //     e.preventDefault();
  //     const auth = firebase.auth;
  //     const promise = auth.signInWithEmailAndPassword(
  //         this.state.email,
  //         this.state.password
  //     );
  //     promise
  //       .then(user => {
  //         DB_users.doc(user.user.uid)
  //           .get()
  //           .then(rest => {
  //             this.props.loggeado(rest.data());
  //             this.props.history.push("/dashboard");
  //           });
  //       })
  //       .catch(e => MySwal.fire(e.message));
  //   }

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
  connect(mapStateToProps, mapDispatchToProps)(ClientLoginContainer)
);
