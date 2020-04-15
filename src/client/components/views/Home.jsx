import React from "react";
import { Link } from "react-router-dom";

export default ({
  handleClick,
  table,
  restaurant,
  propsOfRestaurantId,
  propsOfTabletId,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {restaurant.backgroundImage ? (
        <img
          src={restaurant.backgroundImage}
          className="img-fluid"
          alt="Responsive image"
          style={{
            maxHeight: "660px",
          }}
        />
      ) : (
        <img
          src="https://insideone.s3-sa-east-1.amazonaws.com/backgroundRestaurant-image.png"
          className="img-fluid"
          alt="Responsive image"
          style={{
            maxHeight: "660px",
          }}
        />
      )}
      {restaurant.backgroundImage ? (
        <img
          src={restaurant.logoImage}
          style={{
            position: "absolute",
            marginTop: "60px",
          }}
          height="50"
          alt=""
        />
      ) : (
        <img
          src="https://insideone.s3-sa-east-1.amazonaws.com/logo-lovable.png"
          style={{
            position: "absolute",
            marginTop: "60px",
          }}
          height="50"
          alt=""
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          marginTop: "150px",
        }}
      >
        <Link
          to={`/${propsOfRestaurantId}/${propsOfTabletId}/menu`}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            textDecoration: "none",
            color: "inherit",
            position: "absolute",
            marginTop: "70px",
            marginLeft: "-70px",
          }}
        >
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/icon-food-x2.png"
            style={{}}
            height="75"
            alt=""
          />
        </Link>
        <Link
          onClick={() => handleClick("waiter")}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            textDecoration: "none",
            color: "inherit",
            position: "absolute",
            marginTop: "70px",
            marginLeft: "70px",
          }}
          to={`/${propsOfRestaurantId}/${propsOfTabletId}`}
        >
          {table.waiter === true ? (
            <img
              src="https://insideone.s3-sa-east-1.amazonaws.com/icon-waiter-red.png"
              style={{}}
              height="75"
              alt=""
            />
          ) : (
            <img
              src="https://insideone.s3-sa-east-1.amazonaws.com/icon-waiter-x2.png"
              style={{}}
              height="75"
              alt=""
            />
          )}
        </Link>
        <Link
          onClick={() => handleClick("payment")}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            textDecoration: "none",
            color: "inherit",
            position: "absolute",
            marginTop: "200px",
            marginLeft: "-70px",
          }}
          to={`/${propsOfRestaurantId}/${propsOfTabletId}`}
        >
          {table.pay === true ? (
            <img
              src="https://insideone.s3-sa-east-1.amazonaws.com/icon-price-red.png"
              style={{}}
              height="75"
              alt=""
            />
          ) : (
            <img
              src="https://insideone.s3-sa-east-1.amazonaws.com/icon-price-x2.png"
              style={{}}
              height="75"
              alt=""
            />
          )}
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
            marginLeft: "70px",
          }}
          to="/forms"
        >
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/icon-survey-x2.png"
            style={{}}
            height="75"
            alt=""
          />
        </Link>
        <h2
          className="font-weight-bold"
          style={{
            position: "center",
            marginTop: "350px",
            color: "white",
          }}
        >
          MESA {table.number}
        </h2>
      </div>
    </div>
  );
};
