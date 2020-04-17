import React from "react";
import { Link } from "react-router-dom";

export default ({
  completedToday,
  completedOld,
  pending,
  accepted,
  canceled,
  handleClickStatus,
  showHistory,
  history,
  total,
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
        className="container"
        style={{
          paddingLeft: "35px",
          paddingRight: "35px",
          paddingTop: "20px",
        }}
      >
        <h1 className="font-weight-bold">Orders</h1>

        <div>
          <div>
            {/* <Link
              to="/orders/history"
              style={{
                textDecoration: "none",
                color: "#ffffff",
                backgroundColor: "#ff2068",
                borderColor: "#ff2068",
                marginTop: "20px",
                marginBottom: "10px",
              }}
              className="btn btn-primary"
              // onClick={(e) => {
              //   showHistory(e);
              // }}
            >
              Past Orders
            </Link> */}

            <hr />
            <h3
              style={{
                marginTop: "30px",
              }}
              className="font-weight-bold"
            >
              Pending
            </h3>
            <ul
              class="list-group"
              style={{
                marginTop: "30px",
              }}
            >
              {pending.length ? (
                pending.map((order) => (
                  <li
                    key={order.idUser}
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          paddingBottom: "10px",
                        }}
                      >
                        <Link to={`/tables/${order.tableID}`}>
                          Pedido #{order.id}
                        </Link>
                      </div>

                      <h5 className="font-weight-bold">
                        Table {order.numberOfTable}
                      </h5>
                      <h6 className="font-weight-normal">
                        Status: {order.status}
                      </h6>
                      <h6 className="font-weight-normal">
                        Price: ${order.totalPrice}
                      </h6>
                    </div>

                    <div>
                      <button
                        onClick={(e) =>
                          handleClickStatus(
                            e,
                            order.id,
                            "accepted",
                            order.numberOfTable
                          )
                        }
                        style={{
                          backgroundColor: "#2EC4B6",
                          borderColor: "#2EC4B6",
                          marginRight: "20px",
                        }}
                        className="btn btn-primary btn-lg"
                      >
                        Accept
                      </button>

                      <button
                        onClick={(e) =>
                          handleClickStatus(e, order.id, "canceled")
                        }
                        style={{
                          backgroundColor: "#ff2068",
                          borderColor: "#ff2068",
                        }}
                        className="btn btn-primary btn-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  No orders here.
                </li>
              )}
            </ul>
            <h3
              style={{
                marginTop: "30px",
              }}
              className="font-weight-bold"
            >
              Accepted
            </h3>
            <ul
              class="list-group"
              style={{
                marginTop: "30px",
              }}
            >
              {accepted.length ? (
                accepted.map((order) => (
                  <li
                    key={order.idUser}
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          paddingBottom: "10px",
                        }}
                      ></div>

                      <h5 className="font-weight-bold">
                        Table {order.numberOfTable}
                      </h5>
                      <h6 className="font-weight-normal">
                        Status: {order.status}
                      </h6>
                      <h6 className="font-weight-normal">
                        Price: ${order.totalPrice}
                      </h6>
                    </div>

                    <div></div>
                  </li>
                ))
              ) : (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  No orders here.
                </li>
              )}
            </ul>
            <h3
              style={{
                marginTop: "30px",
              }}
              className="font-weight-bold"
            >
              Canceled
            </h3>
            <ul
              class="list-group"
              style={{
                marginTop: "30px",
              }}
            >
              {canceled.length ? (
                canceled.map((order) => (
                  <li
                    key={order.idUser}
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          paddingBottom: "10px",
                        }}
                      ></div>

                      <h5 className="font-weight-bold">
                        Table {order.numberOfTable}
                      </h5>
                      <h6 className="font-weight-normal">
                        Status: {order.status}
                      </h6>
                      <h6 className="font-weight-normal">
                        Price: ${order.totalPrice}
                      </h6>
                    </div>

                    <div></div>
                  </li>
                ))
              ) : (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  No orders here.
                </li>
              )}
            </ul>
            <h3
              style={{
                marginTop: "30px",
              }}
              className="font-weight-bold"
            >
              Completed Today
            </h3>
            <ul
              class="list-group"
              style={{
                marginTop: "30px",
              }}
            >
              {completedToday.length ? (
                completedToday.map((order) => (
                  <li
                    key={order.idUser}
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          paddingBottom: "10px",
                        }}
                      ></div>

                      <h5 className="font-weight-bold">
                        Table {order.numberOfTable}
                      </h5>
                      <h6 className="font-weight-normal">
                        Status: {order.status}
                      </h6>
                      <h6 className="font-weight-normal">
                        Price: ${order.totalPrice}
                      </h6>
                    </div>

                    <div></div>
                  </li>
                ))
              ) : (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  No orders here.
                </li>
              )}
            </ul>
          </div>
        </div>
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
          <h2 className="font-weight-bold">{"Today: $" + total}</h2>
        </div>
      </div>
    </div>
  );
};
