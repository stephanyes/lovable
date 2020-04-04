import React from "react";
import { Link } from "react-router-dom";

export default ({ tables, buttonClick }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        marginLeft: "250px",
        paddingBottom: "400px",
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
        <h1 className="font-weight-bold">Dashboard</h1>
      </div>

      <div class="row row-cols-1 row-cols-md-3" style={{ margin: "0" }}>
        {tables.length ? (
          tables.map((table, index) => (
            <Link
              className="nav-link"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={`/tables/${table.id}`}
            >
              <div
                key={table.id}
                className="card mb-3"
                style={{
                  width: "300px",
                  height: "125px",
                  margin: "30px",
                  padding: "0px",
                  borderStyle: "none",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <div className="row no-gutters">
                  <div className="col-md-5">
                    {table.state === "free" ? (
                      <img
                        src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-free.png"
                        className="card-img"
                        alt="..."
                      />
                    ) : (
                      <div>
                        {table.orderStatus === "pending" ? (
                          <img
                            src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-order.png"
                            className="card-img"
                            alt="..."
                          />
                        ) : (
                          <div>
                            {table.waiter == true ? (
                              <img
                                src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-waiter.png"
                                className="card-img"
                                alt="..."
                              />
                            ) : (
                              <div>
                                {table.pay == true ? (
                                  <img
                                    src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-pay.png"
                                    className="card-img"
                                    alt="..."
                                  />
                                ) : (
                                  <div>
                                    <img
                                      src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-busy.png"
                                      className="card-img"
                                      alt="..."
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="col-md-7">
                    <div
                      className="card-body"
                      style={{
                        padding: "15px",
                      }}
                    >
                      <h6 className="font-weight-normal">
                        {table.state === "free" ? "Free" : "Busy"}
                      </h6>
                      <h3 className="font-weight-bold">Table {table.number}</h3>

                      <p
                        className="font-weight-normal"
                        style={{
                          margin: "0px",
                        }}
                      >
                        <small className="text-muted">
                          {table.state === "free" ? (
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{
                                backgroundColor: "#ffffff",
                                borderColor: "#ffffff",
                                color: "#000000",
                                padding: "0px",
                                // height: "30%"
                              }}
                              onClick={(e) => buttonClick(e, table.id)}
                            >
                              New code
                            </button>
                          ) : (
                            <div>
                              {table.orderStatus === "pending" ? (
                                "Order Pending"
                              ) : (
                                <div>
                                  {table.waiter == true ? (
                                    "Waiter"
                                  ) : (
                                    <div>
                                      {table.pay == true
                                        ? "Payment"
                                        : `Code ${table.secretCode}`}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1> </h1>
        )}
      </div>
    </div>
  );
};
