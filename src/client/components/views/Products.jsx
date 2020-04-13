import React from "react";

export default ({
  product,
  handleClick,
  handlerChange,
  addProd,
  value,
  lessProd,
}) => {
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
              marginBottom: "40px",
            }}
          >
            {product.name}
          </h1>
          <img src={product.imageProduct} className="card-img" alt="..." />
          <h5
            className="font-weight-normal"
            style={{
              margin: "40px",
            }}
          >
            {product.description}
          </h5>
          <hr></hr>

          <input
            style={{
              marginTop: "30px",
            }}
            type="text"
            placeholder="Comments..."
            className="font-weight-small"
            onChange={(e) => handlerChange(e)}
          />

          <div
            style={{
              margin: "50px",
              borderColor: "#ffffff",
            }}
          >
            {/* <div
              className="card-body"
              style={{
                padding: "20px",
                paddingBottom: "0px",
              }}
            ></div> */}
            <button
              type="button"
              className="btn btn-success btn-circle btn-xl"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "25px",
                fontSize: "20px",
                color: "white",
                backgroundColor: "#ff2068",
                borderColor: "#ff2068",
                marginRight: "20px",
              }}
              onClick={(e) => lessProd(e)}
            >
              −
            </button>
            <h7
              className="font-weight-bold"
              style={{
                paddingTop: "10px",
                marginBottom: "40px",
              }}
            >
              {value}
            </h7>
            <button
              type="button"
              className="btn btn-success btn-circle btn-xl"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "25px",
                fontSize: "20px",
                color: "white",
                backgroundColor: "#ff2068",
                borderColor: "#ff2068",
                marginLeft: "20px",
              }}
              onClick={(e) => addProd(e)}
            >
              +
            </button>
          </div>
        </div>
        <button
          style={{
            textDecoration: "none",
            color: "#ffffff",
            backgroundColor: "#ff2068",
            borderColor: "#ff2068",
            padding: "15px 100px",
            margin: "10px",
            marginBottom: "40px",
            fontSize: "20px",
          }}
          className="btn btn-primary"
          onClick={(e) => handleClick(e)}
        >
          Add {value} to Cart
          {/* Add {value} to Cart · ARS {`${product.price * value},00`} */}
        </button>
      </div>
    </div>
  );
};
