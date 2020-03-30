import React from "react";
import { Link } from "react-router-dom";
import ProductsContainer from "../containers/ProductsContainer";

export default ({ productos, categoria }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff"
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
            padding: "20px",
            paddingBottom: "0px"
          }}
        >
          <h1
            className="font-weight-bold"
            style={{
              padding: "10px",
              paddingBottom: "0px",
              marginBottom: "0px"
            }}
          >
            Menu
          </h1>
        </div>
      </div>
      <div>
        {categoria ? (
          categoria.map(categ => {
            return (
              <div>
                <h3
                  className="font-weight-bold"
                  style={{
                    margin: "20px",
                    marginTop: "40px"
                  }}
                >
                  {categ.nameCategoria} :
                </h3>
                {productos ? (
                  productos.map(product => {
                    return (
                      <div>
                        {product.nameCateg === categ.nameCategoria ? (
                          <li
                            class="list-group-item d-flex justify-content-between align-items-center"
                            style={{
                              padding: "12px"
                            }}
                          >
                            <div>
                              <img
                                src={product.imageProduct}
                                className="card-img"
                                alt="..."
                                style={{
                                  width: "60px",
                                  marginRight: "10px"
                                }}
                              />
                              <span
                                style={{
                                  margin: "20px",
                                  marginLeft: "0px"
                                }}
                              >
                                {product.name}
                              </span>
                            </div>

                            <div>$ {product.price}</div>
                          </li>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <h1> No hay Productos</h1>
                )}
              </div>
            );
          })
        ) : (
          <h1>---</h1>
        )}
      </div>
    </div>
  );
};
