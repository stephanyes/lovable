import React from "react";

export default ({ productos, priceTotal, deleteClick, handlerSubmit, quantity }) => {
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
      <div className="row">
        <div className="col-md-4" style={{margin: "0 auto"}}>
          <h5>Products</h5>
        </div>
        <div className="col-md-2" style={{margin: "0 auto"}}>
          <h5>Quantity</h5>
        </div>
        <div className="col-md-2" style={{margin: "0 auto"}}>
          <h5>Single Price</h5>
        </div>
        <div className="col-md-2" style={{margin: "0 auto"}}>
          <h5>Subtotal</h5>
        </div>
        <div className="col-md-2" style={{margin: "0 auto"}}>
          <h5>Trash</h5>
        </div>
      </div>
      <hr></hr>
      {productos
        ? productos.map(product => {
            return (
              // <li
              //   className="list-group-item d-flex justify-content-between align-items-center"
              //   style={{
              //     padding: "12px"
              //   }}
              // >
              <div>
                <div className="row">
                  <div className="col-md-4">
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

                  <div className="col-md-2">
                    <h6>{quantity}</h6>
                  </div>

                  <div className="col-md-2">
                    <h6> ARS {`${product.price},00`}</h6>
                  </div>

                  <div className="col-md-2">
                    <h6> ARS {`${product.price * quantity},00`}</h6>
                  </div>
               
                  <div className="col-md-2">
                    <button
                      style={{
                        textDecoration: "none",
                        color: "#ffffff",
                        backgroundColor: "#ff2068",
                        borderColor: "#ff2068",
                        padding: "3px 12px",
                        fontSize: "15px"
                      }}
                      className="btn btn-primary"
                      onClick={e => deleteClick(e, product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                  <hr></hr>
                {/* </li> */}
              </div>
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
              fontSize: "20px"
            }}
            className="btn btn-primary"
            onClick={e => handlerSubmit(e)}
          >
            Send Order
          </button>
        </div>
      </div>
    </div>
  );
};
