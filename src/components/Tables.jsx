import React from "react";

// let random1 = Math.floor(Math.random() * 10) //va del 0 - 9
export default ({ tables, buttonClick }) => {
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
          marginLeft: "20px",
          paddingTop: "20px"
        }}
      >
        <h1 className="font-weight-bold">Dashboard</h1>
      </div>

      <div class="row row-cols-1 row-cols-md-3">
        {tables.length ? (
          tables.map(table => (
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
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
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
                      {table.orderActual !== "" ? (
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
                      padding: "15px"
                    }}
                  >
                    <h6 className="font-weight-normal">
                      {table.state === "free" ? "Free" : "Busy"}
                    </h6>
                    <h3 className="font-weight-bold">Table {table.number}</h3>

                    <p
                      className="font-weight-normal"
                      style={{
                        margin: "0px"
                      }}
                    >
                      <small class="text-muted">
                        {table.orderActual !== "" ? (
                          "Order Pending"
                        ) : (
                          <div>
                            {table.waiter == true ? (
                              "Waiter"
                            ) : (
                              <div>{table.pay == true ? "Payment" : ""}</div>
                            )}
                          </div>
                        )}
                      </small>

                      {table.state === "free" ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            backgroundColor: "#ff2068",
                            borderColor: "#ff2068"
                            // height: "30%"
                          }}
                          onClick={e => buttonClick(e, table.id)}
                        >
                          New code
                        </button>
                      ) : (
                        <small class="text-muted">
                          Code {table.secretCode}
                        </small>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1> </h1>
        )}
      </div>
    </div>
  );
};
