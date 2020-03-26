import React from "react";
import { Link } from "react-router-dom";
import firebase from "../services/firebase";

export default ({ buttonClick }) => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff"
          // display: "flex",
          // justifyContent: "space-between"
          // backgroundColor: "#999999",
          // marginLeft: "250px",
          // flexWrap: "wrap"

            // height: "100%",
            // minHeight: "100%",
            // display: "flex",
            // flexDirection: "column",
            // textAlign: "center",
            // color: "white",
            // fontFamily: "sans-serif",
            // fontSize: "36px",
            // padding: "20px", 
            // justifyContent: "center"
        }}
      >
        {/* <Link className="navbar-brand" to="/">
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/flyapp-logo.png"
            height="40"
            alt=""
          />
        </Link> */}
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"></li>
          </ul>
          <form
            //onSubmit={handleSubmit}
            className="form-inline my-2 my-lg-0"
          >
            <input
              //onChange={handleChange}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#ff2068",
                    borderColor: "#ff2068"
                  }}
                  onClick={e => buttonClick(e)}
                >
                  Log out
                </button>
              </li>
            </ul>
          </form>
        </div>
      </nav>
    </div>
  );
};
