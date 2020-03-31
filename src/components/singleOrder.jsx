import React from "react";

export default ({ order }) => {
  console.log(order.order);
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
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </thead>
          <tbody>
            {order.productsArray
              ? order.productsArray.map(product => (
                  <tr key={product.idUser}>
                    <td>{product.nameOfProduct}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
