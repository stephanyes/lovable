import React from "react";
import { Link } from "react-router-dom";
const QRCode = require("qrcode.react");

export default ({ restaurantId, restaurantInfo, quantityMesas }) => {
  let restaurantURL =
    "https://lovable-qr.firebaseapp.com/" + restaurantId + "/tables";

  return (
    <div
      style={{
        backgroundColor: "white",
        marginLeft: "250px",
        marginBottom: "30px",
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
        <h1 className="font-weight-bold">Configurations</h1>
        <Link
          style={{
            textDecoration: "none",
            color: "#ffffff",
            backgroundColor: "#ff2068",
            borderColor: "#ff2068",
            marginTop: "20px",
            marginBottom: "10px",
          }}
          className="btn btn-primary"
          to="/configuration/edit"
        >
          Edit Information
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "#ffffff",
            backgroundColor: "#ff2068",
            borderColor: "#ff2068",
            marginTop: "20px",
            marginLeft: "20px",
            marginBottom: "10px",
          }}
          className="btn btn-primary"
          to="/configuration/addTable"
        >
          Add Tables
        </Link>
        <hr />
        <ul
          className="list-group"
          style={{
            marginTop: "30px",
          }}
        >
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Name:</span>
            <span>{restaurantInfo.name}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Email:</span>
            <span>{restaurantInfo.mail}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Phone:</span>
            <span>{restaurantInfo.phone}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Password:</span>
            <span>
              {" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                  backgroundColor: "#000000",
                  borderColor: "#000000",
                }}
                className="btn btn-primary"
                to="/configurations/resetpassword"
              >
                Reset Password
              </Link>
            </span>
          </li>
        </ul>
        <h3
          style={{
            marginTop: "30px",
          }}
          className="font-weight-bold"
        >
          Images
        </h3>
        <ul
          className="list-group"
          style={{
            marginTop: "30px",
          }}
        >
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Logo:</span>
            <img
              style={{
                maxWidth: "100px",
                backgroundColor: "#000000",
              }}
              src={restaurantInfo.logoImage}
              alt="category img"
            />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Background:</span>
            <img
              style={{
                maxWidth: "100px",
              }}
              src={restaurantInfo.backgroundImage}
              alt="category img"
            />
          </li>
        </ul>
        <h3
          style={{
            marginTop: "30px",
          }}
          className="font-weight-bold"
        >
          Clients and Orders
        </h3>
        <ul
          className="list-group"
          style={{
            marginTop: "30px",
          }}
        >
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Clients:</span>
            <span>{restaurantInfo.clientTotalNumber}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Orders:</span>
            <span>{restaurantInfo.orderTotalNumber}</span>
          </li>
        </ul>
        <h3
          style={{
            marginTop: "30px",
          }}
          className="font-weight-bold"
        >
          Tables
        </h3>
        <ul
          className="list-group"
          style={{
            marginTop: "30px",
          }}
        >
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Tables:</span>
            <span>{quantityMesas}</span>
          </li>
        </ul>
        <h3
          style={{
            marginTop: "30px",
          }}
          className="font-weight-bold"
        >
          QR Code
        </h3>
        <QRCode size="128" includeMargin="true" value={restaurantURL} />
      </div>
    </div>
  );
};
