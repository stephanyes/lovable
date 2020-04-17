import React from "react";

export default ({
  buttonClick,
  table,
  order,
  productArray,
  orderHandler,
  tableHandler,
  orderId,
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        marginLeft: "250px",
        marginBottom: "30px",
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
            padding: "40px",
          }}
        >
          <h1
            className="font-weight-bold"
            style={{
              padding: "10px",
            }}
          >
            {`Table ${table.number}`}
          </h1>
          {table.state === "busy" ? (
            <h5 className="font-weight-normal">
              This is the resume of the table.
            </h5>
          ) : (
            <h5 className="font-weight-normal">This table is closed.</h5>
          )}
        </div>
      </div>

      <div
        className="container"
        style={{
          paddingLeft: "35px",
          paddingRight: "35px",
          paddingTop: "20px",
        }}
      >
        {table.state === "busy" ? (
          <div>
            {table.orderActual !== 0 ? (
              <h3 className="font-weight-bold">{`Order ${orderId}`}</h3>
            ) : (
              <h3 className="font-weight-bold">{`Order`}</h3>
            )}

            <div>
              {table.orderStatus !== "" && table.orderStatus !== "draft" ? (
                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <table className="table table-bordered">
                    <thead>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Comments</th>
                    </thead>
                    <tbody>
                      {productArray
                        ? productArray.map((product, index) => {
                            return (
                              <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td>{product.comments}</td>
                              </tr>
                            );
                          })
                        : null}
                      <tr>
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td>{order.totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div
                    class="card text-center"
                    style={{
                      borderColor: "#ffffff",
                    }}
                  >
                    <h3
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      Status: <strong>{order.status}</strong>
                    </h3>

                    <div className="card-body">
                      {table.orderStatus === "pending" ? (
                        <div>
                          <button
                            onClick={(e) =>
                              orderHandler(
                                e,
                                table.orderActual,
                                "accepted",
                                table.number
                              )
                            }
                            style={{
                              backgroundColor: "#2EC4B6",
                              borderColor: "#2EC4B6",
                              marginRight: "20px",
                            }}
                            className="btn btn-primary btn-lg"
                          >
                            Confirm Order
                          </button>

                          <button
                            onClick={(e) =>
                              orderHandler(e, table.orderActual, "canceled")
                            }
                            style={{
                              backgroundColor: "#ff2068",
                              borderColor: "#ff2068",
                            }}
                            className="btn btn-primary btn-lg"
                          >
                            Cancel Order
                          </button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <ul
                  className="list-group"
                  style={{
                    marginTop: "30px",
                  }}
                >
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    No orders.
                  </li>
                </ul>
              )}
            </div>

            <h3
              style={{
                marginTop: "30px",
              }}
              className="font-weight-bold"
            >
              Alerts
            </h3>

            <ul
              className="list-group"
              style={{
                marginTop: "30px",
              }}
            >
              {table.waiter && table.pay ? (
                <div>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Customer is asking for his waiter
                    <button
                      onClick={(e) => tableHandler(e, table.id, "waiter")}
                      style={{
                        backgroundColor: "#ff2068",
                        borderColor: "#ff2068",
                        width: "250px",
                      }}
                      className="btn btn-primary btn-lg"
                    >
                      Remove Waiter Alert
                    </button>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Customer wants to pay his bill
                    <button
                      onClick={(e) => tableHandler(e, table.id, "pay")}
                      style={{
                        backgroundColor: "#ff2068",
                        borderColor: "#ff2068",
                        width: "250px",
                      }}
                      className="btn btn-primary btn-lg"
                    >
                      Remove Bill Alert
                    </button>
                  </li>
                </div>
              ) : (
                <div>
                  {" "}
                  {table.waiter ? (
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Customer is asking for his waiter
                      <button
                        onClick={(e) => tableHandler(e, table.id, "waiter")}
                        style={{
                          backgroundColor: "#ff2068",
                          borderColor: "#ff2068",
                          width: "250px",
                        }}
                        className="btn btn-primary btn-lg"
                      >
                        Remove Waiter Alert
                      </button>
                    </li>
                  ) : (
                    <div>
                      {table.pay ? (
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Customer wants to pay his bill
                          <button
                            onClick={(e) => tableHandler(e, table.id, "pay")}
                            style={{
                              backgroundColor: "#ff2068",
                              borderColor: "#ff2068",
                              width: "250px",
                            }}
                            className="btn btn-primary btn-lg"
                          >
                            Remove Bill Alert
                          </button>
                        </li>
                      ) : (
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          No service being called.
                        </li>
                      )}
                    </div>
                  )}
                </div>
              )}
            </ul>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div
        className="card text-center"
        style={{
          borderColor: "#ffffff",
        }}
      >
        <div
          className="card-body"
          style={{
            marginTop: "40px",
          }}
        >
          {table.state === "busy" ? (
            <button
              onClick={(e) => buttonClick(e, "completed")}
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: "#ff2068",
                borderColor: "#ff2068",
                marginBottom: "100px",
                width: "200px",
              }}
            >
              Close Table
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
