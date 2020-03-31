import React from "react";

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

      <div class="row row-cols-1 row-cols-md-3"
          style={{margin: "0"}}
      >
        {tables.length ? (
          tables.map((table, index) => (
            <div
              key={table.id}
              className="card md-3 remark"
              style={{
                width: "400px",
                height: "167px",
                margin: "30px",
                padding: "0px",
                borderStyle: "none",
                boxShadow:
                  "0 20px 40px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
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
                      {/* //aca tengo que cambiar el condicional a que si la orden
                      esta en 'pending' */}
                      {table.orderActual !== 0 ? (
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
                        {table.state === "free" ? (
                          ""
                        ) : (
                          <div>
                            {table.orderActual !== "" ? (
                              "Order Pending"
                            ) : (
                              <div>
                                {table.waiter == true ? (
                                  "Waiter"
                                ) : (
                                  <div>
                                    {table.pay == true ? "Payment" : ""}
                                  </div>
                                )}
                              </div>
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
