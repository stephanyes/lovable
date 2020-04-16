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
        <div
          className="col"
          style={{
            width: "100%",
            height: "1050px",
            backgroundImage: `url(${"https://insideone.s3-sa-east-1.amazonaws.com/login-lovable-x1.png"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            //backgroundSize: "100% auto",
            //  border: "1px solid red",
          }}
        ></div>
        <div className="col">
          <form
            onSubmit={(e) => handlerSubmit(e)}
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
      <div></div>
    </div>
  );
};
