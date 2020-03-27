import React from "react";
import { Link } from "react-router-dom";

export default () => {
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
      <h3
        className="font-weight-bold"
        style={{
          margin: "20px",
          marginTop: "40px"
        }}
      >
        Sandwiches
      </h3>
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        style={{
          padding: "12px"
        }}
      >
        <div>
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-pay.png"
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
            Burger extreme
          </span>
        </div>

        <div>$150</div>
      </li>
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        style={{
          padding: "12px"
        }}
      >
        <div>
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-pay.png"
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
            Burger extreme
          </span>
        </div>

        <div>$150</div>
      </li>
      <h3
        className="font-weight-bold"
        style={{
          margin: "20px",
          marginTop: "40px"
        }}
      >
        Salads
      </h3>
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        style={{
          padding: "12px"
        }}
      >
        <div>
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-pay.png"
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
            Burger extreme
          </span>
        </div>

        <div>$150</div>
      </li>
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        style={{
          padding: "12px"
        }}
      >
        <div>
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/services-table-pay.png"
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
            Burger extreme
          </span>
        </div>

        <div>$150</div>
      </li>
    </div>
  );
};
