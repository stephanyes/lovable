import React from "react";
import { Link } from "react-router-dom";
const QRCode = require("qrcode.react");

export default ({ restaurantId }) => {
  let restaurantURL =
    "https://lovable-qr.firebaseapp.com/" + restaurantId + "/tables";

  return (
    <div
      style={{
        backgroundColor: "white",
        marginLeft: "250px",
        paddingBottom: "532px"
      }}
    >
      <div
        className="container"
        style={{
          marginLeft: "20px",
          paddingTop: "20px"
        }}
      >
        <h1 className="font-weight-bold">Configurations</h1>
        <h3
          style={{
            marginTop: "100px"
          }}
          className="font-weight-bold"
        >
          QR Code
        </h3>
        {/* reemplazar el ID del restaurante por el del Store de Redux! */}

        <QRCode size="256" includeMargin="true" value={restaurantURL} />
      </div>
    </div>
  );
};
