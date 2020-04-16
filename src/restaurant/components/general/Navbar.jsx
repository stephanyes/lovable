import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default ({ buttonClick, mesas, isOpen, dropdown }) => {
  const menuClass = `dropdown-menu${dropdown ? " show" : ""}`;
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"></li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <ul className="navbar-nav mr-auto">
                  {mesas.length ? (
                    <div
                      className="dropdown"
                      onClick={isOpen}
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      <button
                        className="btn btn-secondary"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        style={{
                          backgroundColor: "#2EC4B6",
                          borderColor: "#2EC4B6",
                        }}
                      >
                        <label htmlFor="cars">
                          <FontAwesomeIcon
                            style={{
                              paddingRight: "0px",
                              fontSize: "2.7rem",
                              height: "20px",
                            }}
                            icon={faBell}
                          />
                          <b
                            style={{
                              paddingRight: "10px",
                            }}
                          >
                            {mesas.length}
                          </b>
                        </label>
                      </button>
                      <div
                        className={`${menuClass} dropdown-menu-right`}
                        aria-labelledby="dropdownMenuButton"
                      >
                        {mesas.map((tableProperty, index) =>
                          tableProperty.pay === true &&
                          tableProperty.waiter === true ? (
                            <div key={index}>
                              <Link
                                className="dropdown-item"
                                to={`/tables/${tableProperty.id}`}
                              >
                                Table {tableProperty.number} wants to pay and
                                wants the waiter.
                              </Link>
                              <div className="dropdown-divider"></div>
                            </div>
                          ) : (tableProperty.orderStatus === "pending") ===
                              true && tableProperty.waiter === true ? (
                            <div key={index}>
                              <Link
                                className="dropdown-item"
                                to={`/tables/${tableProperty.id}`}
                              >
                                Table {tableProperty.number} wants to order and
                                wants the waiter.
                              </Link>
                              <div className="dropdown-divider"></div>
                            </div>
                          ) : tableProperty.pay === true ? (
                            <div key={index}>
                              <Link
                                className="dropdown-item"
                                to={`/tables/${tableProperty.id}`}
                              >
                                Table {tableProperty.number} wants to pay.
                              </Link>
                              <div className="dropdown-divider"></div>
                            </div>
                          ) : tableProperty.waiter === true ? (
                            <div key={index}>
                              {" "}
                              <Link
                                className="dropdown-item"
                                to={`/tables/${tableProperty.id}`}
                              >
                                Table {tableProperty.number} is requesting the
                                waiter.
                              </Link>
                              <div className="dropdown-divider"></div>
                            </div>
                          ) : tableProperty.orderStatus === "pending" ? (
                            <div key={index}>
                              <Link
                                className="dropdown-item"
                                to={`/tables/${tableProperty.id}`}
                              >
                                Table {tableProperty.number} is ordering.
                              </Link>
                              <div className="dropdown-divider"></div>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  ) : null}
                </ul>
              </li>
              <li className="nav-item active">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#ff2068",
                    borderColor: "#ff2068",
                  }}
                  onClick={(e) => buttonClick(e)}
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
