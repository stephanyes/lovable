import React from "react";
import { Link } from "react-router-dom";

export default ({ handlerSubmit, handlerChange }) => {
  return (
    <div>
      <div
        className="row align-items-center"
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <div className="col">
          <img
            style={{
              height: "760px",
              opacity: "0.85",
            }}
            src="https://insideone.s3-sa-east-1.amazonaws.com/login-lovable-image.png"
            className="img-fluid"
            alt="Responsive"
          />
        </div>
        <div className="col">
          <form
            style={{
              padding: "40px",
              marginRight: "20px",
            }}
          >
            <div className="form-group">
              <h1
                className="font-weight-bold"
                style={{
                  paddingBottom: "20px",
                }}
              >
                Login
              </h1>
              <label>Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handlerChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div
              className="form-group"
              style={{
                paddingBottom: "20px",
              }}
            >
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handlerChange}
              />
            </div>
            <button
              onClick={(e) => handlerSubmit(e)}
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#FF2068",
                borderColor: "#FF2068",
              }}
            >
              Log in
            </button>

            <Link
              style={{
                marginLeft: "20px",
              }}
              to="/recover"
            >
              Forgot password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
