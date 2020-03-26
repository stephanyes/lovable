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
                width: "475px",
                height: "200px",
                margin: "30px",
                padding: "0px",
                borderStyle: "none",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              }}
            >
              <div className="row no-gutters">
                <div className="col-md-5">
                  {table.waiter ? (
                    <img
                      src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-waiter.png"
                      className="card-img"
                      alt="..."
                    />
                  ) : (
                    <img
                      src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-busy.png"
                      className="card-img"
                      alt="..."
                    />
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

                    <hr></hr>
                   
                    {table.state !== "busy" ?
                      (<div className="row">
                        <div className="col-md-6">
                          <small class="text-muted">
                            {table.waiter ? "Waiter" : ""}
                          </small>
                        </div>
                        <div className="col-md-6">
                          {table.state === "free" ? (
                            <button
                              type="button"
                              className="btn btn-sm"
                              style={{
                                backgroundColor: "#ff2068",
                                borderColor: "#ff2068",
                                color: "white",
                                marginLeft: "25px"
                              }}
                              onClick={e => buttonClick(e, table.id)}
                            >
                              New code
                            </button>
                          ) : (
                            <small class="text-muted">
                              <strong>Code: {table.secretCode}</strong>
                            </small>
                          )} 
                        </div>
                      </div>)
                    :
                    (<div className="row">
                        <div className="col-md-3">
                          <small class="text-muted">
                            {table.waiter ? "Waiter" : ""}
                          </small>
                        </div>
                        <div className="col-md-5">
                          {table.state === "free" ? (
                            <button
                              type="button"
                              className="btn btn-sm"
                              style={{
                                backgroundColor: "#ff2068",
                                borderColor: "#ff2068",
                                color: "white",
                                marginRight: "2px",
                              }}
                              onClick={e => buttonClick(e, table.id)}
                            >
                              New code
                            </button>
                          ) : (
                            <small className="text-muted"
                            style={{
                              justifyItems: "center"
                            }}>
                              <strong>Code: {table.secretCode}</strong>
                            </small>
                          )} 
                        </div>

                        <div className="col-md-4">
                          {table.state === "busy" ? (
                            <button
                              type="button"
                              className="btn btn-sm"
                              style={{
                                backgroundColor: "#ff2068",
                                borderColor: "#ff2068",
                                color: "white",
                                marginRight: "10px"
                              }}
                              // onClick={e => buttonClick(e, table.id)}
                            >
                              Details
                            </button>
                          ) : (
                            null
                          )} 
                        </div>
                      </div>)
                  }
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
