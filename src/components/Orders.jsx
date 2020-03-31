import React from "react";
import { Link } from "react-router-dom";

export default ({ orders, handleClickStatus }) => {
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
        <h1 className="font-weight-bold">Orders</h1>

        <hr />

        <table className="table table-striped table-bordered">
          <thead>
            <th>idUser</th>
            <th>numberOfOrder</th>
            <th>numberOfTable</th>
            <th>status</th>
            <th>totalPrice</th>
            <th>Options</th>
          </thead>
          <tbody>
            {orders
              ? orders.map(order => (
                  <tr key={order.idUser}>
                    <Link to={`/orders/${order.id}`}>
                      <td>{order.id}</td>
                    </Link>
                    <td>{order.numberOfOrder}</td>
                    <td>{order.numberOfTable}</td>
                    <td>{order.status}</td>
                    <td>{order.totalPrice}</td>
                    <td className="pull-right">
                      <button
                        onClick={e =>
                          handleClickStatus(e, order.id, "completed")
                        }
                        type="button"
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                        className="btn btn-pill btn-success"
                      >
                        Complete
                      </button>
                      <button
                        onClick={e =>
                          handleClickStatus(e, order.id, "canceled")
                        }
                        type="button"
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                        className="btn btn-pill btn-danger"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
