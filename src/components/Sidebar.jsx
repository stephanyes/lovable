import React from "react";
import { Link } from "react-router-dom";

export default ({}) => {
  return (
    <div class="wrapper">
      <nav
        id="sidebar"
        style={{
          //backgroundColor: "#909090"
          backgroundImage:
            "https://insideone.s3-sa-east-1.amazonaws.com/experience-extreme-bridge-x3.png"
        }}
      >
        <div id="dismiss">
          <i class="fas fa-arrow-left"></i>
        </div>

        <div class="sidebar-header">
          <img
            src="https://insideone.s3-sa-east-1.amazonaws.com/logo-lovable.png"
            height="50"
            alt=""
          />
        </div>

        <ul class="list-unstyled components">
          {/* // <p>Dashboard</p> */}
          <li class="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#">Orders</a>
          </li>
          <li>
            <a href="#">Configuration</a>
          </li>
        </ul>
      </nav>

      {/* <div id="content">

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">

                <button type="button" id="sidebarCollapse" class="btn btn-info">
                    <i class="fas fa-align-left"></i>
                    <span>Toggle Sidebar</span>
                </button>
            </div>
        </nav>
    </div> */}

      <div class="overlay"></div>
    </div>
  );
};
