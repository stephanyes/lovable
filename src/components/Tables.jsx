import React from "react";
import { Link } from "react-router-dom";
// let random1 = Math.floor(Math.random() * 10) //va del 0 - 9
export default ({ products }) => {
  // console.log(products);
  return (
    <div
      style={{
        backgroundColor: "white"
      }}
    >
      <h1>Mesas</h1>

      <div class="row row-cols-1 row-cols-md-3">
        <div className="card mb-3" style={{ width: "500px", margin: "30px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src="..." className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">Libre</p>
                <h5 className="card-title">Mesa 1</h5>

                <p className="card-text">
                  <small class="text-muted">Mozo</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3" style={{ width: "500px", margin: "30px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src="..." className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">Libre</p>
                <h5 className="card-title">Mesa 1</h5>

                <p className="card-text">
                  <small class="text-muted">Mozo</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3" style={{ width: "500px", margin: "30px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src="..." className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">Libre</p>
                <h5 className="card-title">Mesa 1</h5>

                <p className="card-text">
                  <small class="text-muted">Mozo</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3" style={{ width: "500px", margin: "30px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src="..." className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">Libre</p>
                <h5 className="card-title">Mesa 1</h5>

                <p className="card-text">
                  <small class="text-muted">Mozo</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
