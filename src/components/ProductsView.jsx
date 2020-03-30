import React from "react";
import { Link } from "react-router-dom";

export default ({ products, menuId, catId, deleteFunc, handleStock }) => {
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
        <h1 className="font-weight-bold">Products</h1>
        <Link to={`/menu/${menuId}/${catId}/createProduct`}>Add Products</Link>

        <hr />
        {products
          ? products.map(individual =>
              !individual.stock ? (
                <div key={individual.name}>
                  <div>
                    <h5 style={{ textDecoration: "line-through" }}>
                      Name: {individual.name}
                    </h5>
                    <h5>No Stock</h5>
                    <p style={{ textDecoration: "line-through" }}>
                      Price: ${individual.price}
                    </p>
                    <p style={{ textDecoration: "line-through" }}>
                      Description: {individual.description}
                    </p>
                    <img src={individual.imageProduct} alt="category img"></img>
                  </div>
                  <Link
                    to={`/menu/${menuId}/${catId}/editProduct/${individual.id}`}
                  >
                    <button type="button" className="btn btn-pill btn-dark">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={e => deleteFunc(e, individual.id)}
                    type="button"
                    className="btn btn-pill btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={e => handleStock(e, individual.id)}
                    type="button"
                    className="btn btn-pill btn-primary"
                  >
                    Change stock
                  </button>
                </div>
              ) : (
                <div key={individual.name}>
                  <div>
                    <h5>Name: {individual.name}</h5>
                    <p>Price: ${individual.price}</p>
                    <p>Description: {individual.description}</p>
                    <img src={individual.imageProduct} alt="category img"></img>
                  </div>
                  <Link
                    to={`/menu/${menuId}/${catId}/editProduct/${individual.id}`}
                  >
                    <button type="button" className="btn btn-pill btn-dark">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={e => deleteFunc(e, individual.id)}
                    type="button"
                    className="btn btn-pill btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={e => handleStock(e, individual.id)}
                    type="button"
                    className="btn btn-pill btn-primary"
                  >
                    Change stock
                  </button>
                </div>
              )
            )
          : null}
      </div>
    </div>
  );
};
