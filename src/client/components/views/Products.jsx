import React from "react";

export default ({ product, handleClick }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff"
      }}
    >
      <div
        className="card text-center"
        style={{
          borderColor: "#ffffff"
        }}
      >
        <div
          className="card-body"
          style={{
            padding: "20px",
            paddingBottom: "0px"
          }}
        >
          <h1
            className="font-weight-bold"
            style={{
              //padding: "10px",
              paddingTop: "10px",
              marginBottom: "40px"
            }}
          >
            {product.name}
          </h1>
          <img src={product.imageProduct} className="card-img" alt="..." />
          <h5
            className="font-weight-normal"
            style={{
              margin: "40px"
            }}
          >
            {product.description}
          </h5>
          <h2
            className="font-weight-bold"
            style={{
              margin: "40px"
            }}
          >
            ${product.price}
          </h2>

          <button
            style={{
              textDecoration: "none",
              color: "#ffffff",
              backgroundColor: "#ff2068",
              borderColor: "#ff2068",
              padding: "15px 110px",
              margin: "10px",
              marginBottom: "40px",
              fontSize: "20px"
            }}
            className="btn btn-primary"
            onClick={e => handleClick(e)}
          >
            {" "}
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
