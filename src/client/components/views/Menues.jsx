import React from "react";
import { Link } from "react-router-dom";

export default ({ menuObject, idRestaurant, idTable }) => {
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
              paddingTop: "10px",
              marginBottom: "80px",
            }}
          >
            Menu´s
          </h1>
          {menuObject
            ? menuObject.map((menu) => (
                <div key={menu.id}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "grey",
                    }}
                    to={`/${idRestaurant}/menu/${menu.id}/${idTable}`}
                  >
                    <h4
                      className="font-weight-bold"
                      style={{
                        margin: "30px",
                      }}
                    >
                      {menu.name}
                    </h4>
                  </Link>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
