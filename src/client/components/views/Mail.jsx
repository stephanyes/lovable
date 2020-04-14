import React from "react";
import axios from "axios";
import firebase from "../../../services/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { withRouter, Link } from "react-router-dom";

const DB = firebase.db;
const MySwal = withReactContent(Swal);

class Mail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }

  handleInput = (e) => {
    this.setState({ email: e.target.value });
  };

  handlerClick(e) {
    e.preventDefault();
    MySwal.fire({
      title: "Thank you!",
      icon: "success",
      confirmButtonColor: "#ff2068",
      confirmButtonText: "Continue",
    });
    let RestaurantId = this.props.match.params.idRestaurant;
    let TableId = this.props.match.params.idTable;
    let TableActual = DB.collection("restaurants")
      .doc(RestaurantId)
      .collection("tables")
      .doc(TableId);
    TableActual.update({ mail: this.state.email })
    .then(() => {
      console.log("Enviando mail")
      // http://localhost:5000/lovable-qr/us-central1/app/api/mail
      axios.post("http://localhost:5000/lovable-qr/us-central1/app/api/mail", this.state)
      .then(res => console.log(res))
      .catch(err => console.error(err))
    })
    this.props.history.push(
      `/${this.props.match.params.idRestaurant}/${this.props.match.params.idTable}`
    );
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <div
          className="card text-center"
          style={{
            borderColor: "#ffffff",
          }}
        >
          <div
            className="card-body"
            style={{
              padding: "20px",
              paddingBottom: "0px",
            }}
          >
            <h1
              className="font-weight-bold"
              style={{
                marginTop: "100px",
                marginBottom: "40px",
              }}
            >
              Let your Mail
            </h1>
            <form onSubmit={(e) => this.handlerClick(e)}>
              <div className="form-group">
                <p
                  id="emailHelp"
                  className="form-text text-muted"
                  style={{ fontSize: "15px", marginBottom: "30px" }}
                >
                  For exclusive promotions and discount, you could give us your
                  email adress.
                </p>

                <input
                  style={{ marginBottom: "20px" }}
                  onChange={(e) => this.handleInput(e)}
                  name="email"
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  placeholder="your@email.com"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    textDecoration: "none",
                    color: "#ffffff",
                    backgroundColor: "#ff2068",
                    borderColor: "#ff2068",
                    padding: "15px 130px",
                    margin: "10px",
                    fontSize: "20px",
                  }}
                >
                  Done
                </button>
                <div
                  style={{
                    margin: "30px",
                  }}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                    }}
                    to={`/${this.props.match.params.idRestaurant}/${this.props.match.params.idTable}`}
                  >
                    <h5>I don't want</h5>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Mail);
