import React from "react";
import { Link } from "react-router-dom";

export default ({ handleClick, tables }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <img
        src="https://insideone.s3-sa-east-1.amazonaws.com/backgroundRestaurant-image.png"
        className="img-fluid"
        alt="Responsive image"
        style={{
          maxHeight: "660px"
        }}
      />
      <img
        src="https://insideone.s3-sa-east-1.amazonaws.com/logo-lovable.png"
        style={{
          position: "absolute",
          marginTop: "60px"
        }}
        height="50"
        alt=""
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          //   flexWrap: "wrap",
          position: "absolute",
          marginTop: "150px"
        }}
      >
        <Link
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            textDecoration: "none",
            color: "inherit",
            position: "absolute",
            marginTop: "70px",
            marginLeft: "-70px"
          }}
          to="/"
        >
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/icon-food-x2.png"
            style={{}}
            height="75"
            alt=""
          />
          {/* <h6
            style={{
              position: "center",
              marginTop: "10px",
              color: "white"
            }}
          >
            ORDER
          </h6> */}
        </Link>
        <Link
          onClick={() => handleClick()}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            textDecoration: "none",
            color: "inherit",
            position: "absolute",
            marginTop: "70px",
            marginLeft: "70px"
          }}
          to="/tables"
        >
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/icon-waiter-x2.png"
            style={{}}
            height="75"
            alt=""
          />
          {/* <h6
            style={{
              position: "center",
              marginTop: "10px",
              color: "white"
            }}
          >
            WAITER
          </h6> */}
        </Link>
        <Link
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            textDecoration: "none",
            color: "inherit",
            position: "absolute",
            marginTop: "200px",
            marginLeft: "-70px"
          }}
          to="/"
        >
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/icon-price-x2.png"
            style={{}}
            height="75"
            alt=""
          />
          {/* <h6
            style={{
              position: "center",
              marginTop: "10px",
              color: "white"
            }}
          >
            PAY
          </h6> */}
        </Link>
        <Link
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            textDecoration: "none",
            color: "inherit",
            position: "absolute",
            marginTop: "200px",
            marginLeft: "70px"
          }}
          to="/"
        >
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/icon-survey-x2.png"
            style={{}}
            height="75"
            alt=""
          />
          {/* <h6
            style={{
              position: "center",
              marginTop: "10px",
              color: "white"
            }}
          >
            SURVEY
          </h6> */}
        </Link>
        <h2
          className="font-weight-bold"
          style={{
            position: "center",
            marginTop: "350px",
            color: "white"
          }}
        >
          MESA 22
        </h2>
      </div>
    </div>
  );
};
