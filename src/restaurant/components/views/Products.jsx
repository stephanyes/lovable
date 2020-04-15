import React from "react";
import { Link } from "react-router-dom";

export default ({ products, menuId, catId, deleteFunc, handleStock }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        marginLeft: "250px",
        paddingBottom: "400px",
      }}
    >
      <div
        className="container"
        style={{
          paddingLeft: "35px",
          paddingRight: "35px",
          paddingTop: "20px",
        }}
      >
        <h1 className="font-weight-bold">Products</h1>
        <Link
          style={{
            textDecoration: "none",
            color: "#ffffff",
            backgroundColor: "#ff2068",
            borderColor: "#ff2068",
            marginTop: "20px",
            marginBottom: "10px",
          }}
          className="btn btn-primary"
          to={`/menu/${menuId}/${catId}/createProduct`}
        >
          Add Products
        </Link>

        <hr />

        <ul
          class="list-group"
          style={{
            marginTop: "30px",
          }}
        >
          {products
            ? products.map((individual) =>
                !individual.stock ? (
                  <li
                    key={individual.name}
                    class="list-group-item d-flex justify-content-between align-items-center"
                    style={{ padding: "20px" }}
                  >
                    <img
                      style={{
                        maxWidth: "100px",
                        flexGrow: "1",
                        marginRight: "20px",
                      }}
                      src={individual.imageProduct}
                      alt="category img"
                    />
                    <div
                      style={{
                        marginTop: "10px",
                        flexGrow: "4",
                      }}
                    >
                      <h5 className="font-weight-bold">{individual.name}</h5>
                      <h6 className="font-weight-normal">
                        {individual.description}
                      </h6>
                      <h5 className="font-weight-normal">Disable</h5>
                      <h6
                        className="font-weight-normal"
                        style={{ textDecoration: "line-through" }}
                      >
                        Price: ${individual.price}
                      </h6>
                    </div>

                    <div>
                      <Link
                        to={`/menu/${menuId}/${catId}/editProduct/${individual.id}`}
                      >
                        <button
                          style={{
                            backgroundColor: "#2EC4B6",
                            borderColor: "#2EC4B6",
                            marginRight: "20px",
                          }}
                          className="btn btn-primary btn-lg"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={(e) => handleStock(e, individual.id)}
                        style={{
                          backgroundColor: "#2EC4B6",
                          borderColor: "#2EC4B6",
                          marginRight: "20px",
                        }}
                        className="btn btn-primary btn-lg"
                      >
                        Enable
                      </button>
                      <button
                        onClick={(e) => deleteFunc(e, individual.id)}
                        style={{
                          backgroundColor: "#ff2068",
                          borderColor: "#ff2068",
                        }}
                        className="btn btn-primary btn-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ) : (
                  <li
                    key={individual.name}
                    style={{ padding: "20px" }}
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <img
                      style={{
                        maxWidth: "100px",
                        flexGrow: "1",
                        marginRight: "20px",
                      }}
                      src={individual.imageProduct}
                      alt="category img"
                    />
                    <div
                      style={{
                        marginTop: "10px",
                        flexGrow: "4",
                      }}
                    >
                      <h5 className="font-weight-bold">{individual.name}</h5>
                      <h6 className="font-weight-normal">
                        {individual.description}
                      </h6>
                      <h6 className="font-weight-normal">
                        Price: ${individual.price}
                      </h6>
                    </div>
                    <div>
                      <Link
                        to={`/menu/${menuId}/${catId}/editProduct/${individual.id}`}
                      >
                        <button
                          style={{
                            backgroundColor: "#2EC4B6",
                            borderColor: "#2EC4B6",
                            marginRight: "20px",
                          }}
                          className="btn btn-primary btn-lg"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={(e) => handleStock(e, individual.id)}
                        style={{
                          backgroundColor: "#ff2068",
                          borderColor: "#ff2068",
                          marginRight: "20px",
                        }}
                        className="btn btn-primary btn-lg"
                      >
                        Disable
                      </button>
                      <button
                        onClick={(e) => deleteFunc(e, individual.id)}
                        style={{
                          backgroundColor: "#ff2068",
                          borderColor: "#ff2068",
                        }}
                        className="btn btn-primary btn-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                )
              )
            : null}
        </ul>
      </div>
    </div>
  );
};
