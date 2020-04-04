import React from "react";
import firebase from "../../../services/firebase";
import Swal from "sweetalert2";
import Sidebar from "../../../restaurant/containers/general/Sidebar";
import withReactContent from "sweetalert2-react-content";
import { withRouter } from "react-router-dom";

const RecoverPassword = (props) => {
  let email = "";
  const MySwal = withReactContent(Swal);

  const handleInput = (e) => {
    email = e.target.value;
  };
  const handlerClick = function (e) {
    e.preventDefault();
    let auth = firebase.auth;
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        MySwal.fire("Please go checkout your email");
        props.history.push("/configurations");
      })
      .catch(function (error) {
        MySwal.fire(error.message);
      });
  };
  return (
    <div>
      <Sidebar />
      <div
        style={{
          backgroundColor: "white",
          marginLeft: "250px",
          paddingBottom: "30px",
        }}
      >
        <div
          className="container"
          style={{
            paddingLeft: "35px",
            paddingRight: "35px",
            paddingTop: "20px",
          }}
        >
          <h1 className="font-weight-bold">Reset Password</h1>

          <form
            onSubmit={(e) => handlerClick(e)}
            style={{
              padding: "40px",
              marginRight: "20px",
            }}
          >
            <div
              className="form-group"
              style={{
                paddingBottom: "20px",
              }}
            >
              <label>Email</label>
              <input
                onChange={(e) => handleInput(e)}
                name="mail"
                type="email"
                className="form-control"
                placeholder="reset@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#FF2068",
                borderColor: "#FF2068",
              }}
            >
              Send Mail
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RecoverPassword);
