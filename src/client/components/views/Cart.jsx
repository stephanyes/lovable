import React from "react";

export default ({ productos, priceTotal, deleteClick, handlerSubmit }) => {
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
              paddingTop: "10px",
              marginBottom: "40px"
            }}
          >
            Cart
          </h1>
        </div>
      </div>
      {productos
        ? productos.map(product => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  padding: "12px"
                }}
              >
                <div>
                  <img
                    src={product.imageProduct}
                    className="card-img"
                    alt="..."
                    style={{
                      width: "60px",
                      marginRight: "10px"
                    }}
                  />
                  <span
                    style={{
                      margin: "20px",
                      marginLeft: "0px"
                    }}
                  >
                    {product.name}
                  </span>
                </div>

                <div>
                  <h6>$ {product.price}</h6>
                </div>
                <div>
                  <button
                    style={{
                      textDecoration: "none",
                      color: "#ffffff",
                      backgroundColor: "#ff2068",
                      borderColor: "#ff2068",
                      padding: "3px 12px",
                      fontSize: "20px"
                    }}
                    className="btn btn-primary"
                    onClick={e => deleteClick(e, product.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            );
          })
        : null}

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
          <h2
            className="font-weight-bold"
            style={{
              margin: "40px"
            }}
          >
            Total ${priceTotal}
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
            onClick={e => handlerSubmit(e)}
          >
            {" "}
            Send Order
          </button>
        </div>
      </div>
    </div>
  );
};
