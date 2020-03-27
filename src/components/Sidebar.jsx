import React from "react";
import { Link } from "react-router-dom";

export default ({ }) => {
  return (
    <div className="wrapper">
      <nav
        id="sidebar"
        style={{
          backgroundColor: "#000000"
        }}
      >
        <div id="dismiss">
          <i className="fas fa-arrow-left"></i>
        </div>

        <div className="sidebar-header">
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/logo-lovable.png"
            height="50"
            alt=""
          />
        </div>

        <ul className="list-unstyled components">
          {/* // <p>Dashboard</p> */}
          {/* <li class="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
              Dashboard
            </a>
          </li> */}
          <li>
            <Link
              className="nav-link"
              style={{
                padding: "20px",
                paddingLeft: "20px"
              }}
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>

          <li className="nav-item active">
            <Link
              className="nav-link"
              style={{
                padding: "20px",
                paddingLeft: "20px"
              }}
              to="/orders"
            >
              Orders
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              className="nav-link"
              style={{
                padding: "20px",
                paddingLeft: "20px"
              }}
              to="/menu"
            >
              Menu
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              className="nav-link"
              style={{
                padding: "20px",
                paddingLeft: "20px"
              }}
              to="/configuration"
            >
              Configuration
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
