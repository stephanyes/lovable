import React from "react";
import { Link } from "react-router-dom";

export default ({ buttonClick, table, order, productArray, orderHandler, tableHandler }) => {
  //let total = 0;
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
            This is the resume of the table.
          </h5>
          {/* Estado de la order */}

          <div>
            <div>

              <table className="table table-bordered">
                <thead>
                  <th>Product</th>
                  <th>Price</th>
                </thead>
                <tbody>
                  {productArray
                    ? productArray.map((product, index) => {
                      return (<tr key={index}>
                        <td>
                          {product.name}
                        </td>
                        <td>
                          {product.price}
                        </td>
                      </tr>)
                    })
                    : null}
                  <tr>
                    <td>Total</td>
                    {/* {productArray ? productArray.reduce((misc, currentIndex) => (
                      <td>{total += currentIndex.price}</td>
                    ), 0) : null} */}
                    <td>{order.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      <div class="card text-center"
        style={{
          borderColor: "#ffffff"
        }}
      >
        <h3>Payment: <strong>{order.status}</strong></h3>
      </div>

      <div
        className="card text-center"
        style={{
          borderColor: "#ffffff"
        }}
      >
        <div className="card-body">
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


          ) : (
              <div></div>
            )}
        </div>
      </div>
      <div
        className="card text-center"
        style={{
          borderColor: "#ffffff"
        }}>
        <div className="card-body">
          <button
            onClick={(e) => orderHandler(e, table.orderActual, "completed")}
            style={{
              backgroundColor: "#2EC4B6",
              borderColor: "#2EC4B6",
              marginRight: "20px"
            }}
            className="btn btn-primary btn-lg">
            Confirm Order
                      </button>

          <button
            onClick={(e) => orderHandler(e, table.orderActual, "canceled")}
            style={{
              backgroundColor: "#ff2068",
              borderColor: "#ff2068"
              //marginRight: "20px"
            }}
            className="btn btn-primary btn-lg">
            Cancel Button
                      </button>
        </div>
      </div>
      <div>
        <div>
          <h3
            style={{
              marginTop: "30px",
            }}
            className="font-weight-bold"
          >Services</h3>
          <ul
            className="list-group"
            style={{
              marginTop: "30px",
            }}>
            {/* Aca tiene que haber una logica dependiendo de si llama al Mozo o LLama para pagar o ambos */}
            {/* waiter: false
            pay: false */}
            {table.waiter && table.pay ?
              (<div>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Customer is asking for his waiter! :)
                  <button
                    onClick={(e) => tableHandler(e, table.id, "waiter")}
                    style={{
                      backgroundColor: "#2EC4B6",
                      borderColor: "#2EC4B6",
                      marginRight: "20px"
                    }}
                    className="btn btn-primary btn-lg">
                    Remove Waiter Alert
                      </button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Customer wants to pay his bill! :)
                  <button
                    onClick={(e) => tableHandler(e, table.id, "pay")}
                    style={{
                      backgroundColor: "#ff2068",
                      borderColor: "#ff2068"
                      //marginRight: "20px"
                    }}
                    className="btn btn-primary btn-lg">
                    Remove Bill Alert
                      </button>
                </li>
              </div>)
              :
              table.waiter ?
                (<li className="list-group-item d-flex justify-content-between align-items-center">
                  Customer is asking for his waiter! :)
                  <button
                    onClick={(e) => tableHandler(e, table.id, "waiter")}
                    style={{
                      backgroundColor: "#2EC4B6",
                      borderColor: "#2EC4B6",
                      marginRight: "20px"
                    }}
                    className="btn btn-primary btn-lg">
                    Remove Waiter Alert
                      </button>
                </li>)
                :
                table.pay ?
                  (<li className="list-group-item d-flex justify-content-between align-items-center">
                    Customer wants to pay his bill! :)
                    <button
                      onClick={(e) => tableHandler(e, table.id, "pay")}
                      style={{
                        backgroundColor: "#ff2068",
                        borderColor: "#ff2068"
                        //marginRight: "20px"
                      }}
                      className="btn btn-primary btn-lg">
                      Remove Bill Alert
                      </button>
                  </li>)
                  :
                  (<li className="list-group-item d-flex justify-content-between align-items-center">
                    No service being called :)
                  </li>)}

          </ul>
        </div>
      </div>
    </div>
  );
};
