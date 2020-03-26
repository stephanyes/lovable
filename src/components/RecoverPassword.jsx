import React from "react";
import firebase from "../services/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { withRouter } from "react-router-dom";

const RecoverPassword = props => {
  let email = "";
  const MySwal = withReactContent(Swal);

  const handleInput = e => {
    email = e.target.value;
  };
  const handlerClick = function(e) {
    e.preventDefault();
    let auth = firebase.auth;
    //let emailAddress = e.target.value;
    auth
      .sendPasswordResetEmail(email)
      .then(function() {
        MySwal.fire("Please go checkout your email");
        props.history.push("/");
      })
      .catch(function(error) {
        MySwal.fire(error.message);
      });
  };
  return (
    <div>
      <div
        className="row align-items-center"
        style={{
          backgroundColor: "#ffffff"
        }}
      >
        <div className="col">
          <img
            style={{
              height: "760px",
              opacity: "0.85"
            }}
            src="https://insideone.s3-sa-east-1.amazonaws.com/login-lovable-image.png"
            className="img-fluid"
            alt="Responsive"
          />
        </div>
        <div className="col">
          <form
            onSubmit={e => handlerClick(e)}
            style={{
              padding: "40px",
              marginRight: "20px"
            }}
          >
            <div className="form-group">
              <h1
                className="font-weight-bold"
                style={{
                  paddingBottom: "10px", 
                }}
              >
                Recover Password
              </h1>
              <p
                id="emailHelp"
                className="form-text text-muted"
                style={{ fontSize: "15px", marginBottom: "30px" }}
              >
                For restore your password, enter your email address. You may
                have to check your spam folder or unblock the address{" "}
                <i>no-reply@lovable.solutions</i>
              </p>
              <div
                className="form-group"
                style={{
                  paddingBottom: "20px"
                }}
              >
                <label>Email address</label>
                <input
                  onChange={e => handleInput(e)}
                  name="email"
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="email@lovable.solutions"
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
                Recover password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RecoverPassword);
