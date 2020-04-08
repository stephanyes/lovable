import React from "react";
import { Link } from "react-router-dom";

export default ({ pending, acepted, canceled, handleClickStatus }) => {
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
          paddingLeft: "35px",
          paddingRight: "35px",
          paddingTop: "20px"
        }}
      >
        <h1 className="font-weight-bold">Orders</h1>

        <hr />

        <ul
          class="list-group"
          style={{
            marginTop: "30px"
          }}
        >
          <h4>Pending</h4>
          {pending
            ? pending.map(order => (
                <li
                  key={order.idUser}
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div
                    style={{
                      marginTop: "10px"
                    }}
                  >
                    <div
                      style={{
                        paddingBottom: "10px"
                      }}
                    >
                      <Link to={`/orders/${order.id}`}>Pedido #{order.id}</Link>
                    </div>
                    {/* <td>{order.numberOfOrder}</td> */}

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
                      onClick={e => handleClickStatus(e, order.id, "completed")}
                      style={{
                        backgroundColor: "#2EC4B6",
                        borderColor: "#2EC4B6",
                        marginRight: "20px"
                      }}
                      className="btn btn-primary btn-lg"
                    >
                      Accept
                    </button>

                    <button
                      onClick={e => handleClickStatus(e, order.id, "canceled")}
                      style={{
                        backgroundColor: "#ff2068",
                        borderColor: "#ff2068"
                        //marginRight: "20px"
                      }}
                      className="btn btn-primary btn-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </li>
              ))
            : null}
        </ul>
        <ul
          class="list-group"
          style={{
            marginTop: "30px"
          }}
        >
          <h4>Acepted</h4>
          {acepted
            ? acepted.map(order => (
                <li
                  key={order.idUser}
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div
                    style={{
                      marginTop: "10px"
                    }}
                  >
                    <div
                      style={{
                        paddingBottom: "10px"
                      }}
                    >
                      {/*<Link to={`/orders/${order.id}`}>Pedido #{order.id}</Link> */}
                    </div>
                    {/* <td>{order.numberOfOrder}</td> */}

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
            : null}
        </ul>
        <ul
          class="list-group"
          style={{
            marginTop: "30px"
          }}
        >
          {" "}
          <h4>Canceled</h4>
          {canceled
            ? canceled.map(order => (
                <li
                  key={order.idUser}
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div
                    style={{
                      marginTop: "10px"
                    }}
                  >
                    <div
                      style={{
                        paddingBottom: "10px"
                      }}
                    >
                      {/*<Link to={`/orders/${order.id}`}>Pedido #{order.id}</Link> */}
                    </div>
                    {/* <td>{order.numberOfOrder}</td> */}

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
            : null}
        </ul>
      </div>
    </div>
  );
};
