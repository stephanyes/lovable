import React from "react";

// let random1 = Math.floor(Math.random() * 10) //va del 0 - 9
export default ({ tables }) => {
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
          padding: "20px"
        }}
      >
        <h1 className="font-weight-bold">Tables</h1>
      </div>

      <div class="row row-cols-1 row-cols-md-3">
        {tables.length ? (
          tables.map(table => (
            <div
              //  key={table.id}
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
                      {table.state === "free" ? "Libre" : "Ocupada"}
                    </h6>
                    <h3 className="font-weight-bold">Mesa {table.number}</h3>

                    <p
                      className="font-weight-normal"
                      style={{
                        margin: "0px"
                      }}
                    >
                      <small class="text-muted">
                        {table.waiter ? "Mozo" : ""}
                      </small>
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
