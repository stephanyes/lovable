import React from "react";
import { Link } from "react-router-dom";

export default ({ menuObject, idRestaurant }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        marginLeft: "250px",
        paddingBottom: "400px"
      }}
    >
      <div
        className="container"
        style={{
          padding: "20px"
        }}
      >
        {menuObject
          ? menuObject.map(menu => (
              <div key={menu.id}>
                <Link to={`/${idRestaurant}/menu/${menu.id}`}>{menu.name}</Link>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
