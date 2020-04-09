import React from "react";

export default ({ productos, priceTotal, deleteClick, handlerSubmit }) => {
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
            Cart
          </h1>
        </div>
      </div>

      {productos
        ? productos.map((product) => {
            return (
              <div>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    padding: "12px",
                  }}
                >
                  <div>
                    <img
                      src={product.imageProduct}
                      className="card-img"
                      alt="..."
                      style={{
                        width: "60px",
                        marginRight: "10px",
                      }}
                    />
                    <span
                      style={{
                        margin: "20px",
                        marginLeft: "0px",
                      }}
                    >
                      {product.name}
                    </span>
                  </div>
                  <button
                    style={{
                      textDecoration: "none",
                      color: "#ffffff",
                      backgroundColor: "#ff2068",
                      borderColor: "#ff2068",
                      padding: "3px 12px",
                      fontSize: "15px",
                    }}
                    className="btn btn-primary"
                    onClick={(e) => deleteClick(e, product.id)}
                  >
                    Delete
                  </button>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    padding: "12px",
                    marginBottom: "30px",
                  }}
                >
                  <div>
                    <h6> ARS {`${product.price},00`}</h6>
                    <h6>Quantity: {product.quantity}</h6>

                    <h6>
                      {" "}
                      Subtotal: ARS {`${product.price * product.quantity},00`}
                    </h6>
                  </div>
                </li>
              </div>
            );
          })
        : null}

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
          <h2
            className="font-weight-bold"
            style={{
              marginBottom: "20px",
            }}
          >
            Total ARS {priceTotal}
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
              fontSize: "20px",
            }}
            className="btn btn-primary"
            onClick={(e) => handlerSubmit(e)}
          >
            Send Order
          </button>
        </div>
      </div>
    </div>
  );
};
