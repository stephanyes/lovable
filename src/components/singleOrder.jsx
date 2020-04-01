import React from "react";

export default ({ order }) => {
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
        <h1 className="font-weight-bold">Order</h1>

        <hr />

        <ul
          class="list-group"
          style={{
            marginTop: "30px"
          }}
        >
          {order.productsArray
            ? order.productsArray.map(product => (
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
                      <h5 className="font-weight-bold">{product.name}</h5>
                    </div>

                    <h6 className="font-weight-normal">
                      Quantity: {product.quantity}
                    </h6>
                  </div>

                  <div>
                    <h6 className="font-weight-normal">
                      Price: ${product.price}
                    </h6>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};
