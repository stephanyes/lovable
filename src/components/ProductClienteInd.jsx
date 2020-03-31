import React from "react";

export default ({ product, handleClick }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={product.imageProduct} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">
              <small className="text-muted">$ {product.price}</small>
            </p>
          </div>
        </div>
      </div>
      <button onClick={e => handleClick(e)}> carrito</button>
    </div>
  );
};
