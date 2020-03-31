import React from "react";
import { Link } from "react-router-dom";

export default ({ buttonClick, table }) => {
  //   {
  //     console.log(table);
  //   }
  return (
    <div
      style={{
        backgroundColor: "white",
        marginLeft: "250px",
        paddingBottom: "400px"
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
            padding: "40px"
          }}
        >
          <h1
            className="font-weight-bold"
            style={{
              padding: "10px"
            }}
          >
            {`Table ${table.number}`}
          </h1>

          <h5 className="font-weight-normal">
            This are the resume of the table.
          </h5>
        </div>
      </div>
      <div
        class="card text-center"
        style={{
          borderColor: "#ffffff"
        }}
      >
        <div class="card-body">
          {table.state === "busy" ? (
                      <button
                      onClick={e => buttonClick(e)}
                      // onClick={() => buttonClick(order.id)}
                      className="btn btn-primary btn-lg"
                      style={{
                        backgroundColor: "#ff2068",
                        borderColor: "#ff2068",
                        marginBottom: "100px",
                        width: "200px"
                      }}
                    >
                      Close Table
                    </button>
                    ) : (<div></div>)}
        </div>
      </div>
    </div>
  );
};