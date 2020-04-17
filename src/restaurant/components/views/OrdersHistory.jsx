import React from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";


export default ({ completedOld }) => {

    //console.log(completedOld)
    return (
        <div
            style={{
                backgroundColor: "white",
                marginLeft: "250px",
                marginBottom: "30px",
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
                <h1 className="font-weight-bold">Past Orders</h1>
                <div>
                    <Link
                        to="/orders"
                        style={{
                            textDecoration: "none",
                            color: "#ffffff",
                            backgroundColor: "#ff2068",
                            borderColor: "#ff2068",
                            marginTop: "20px",
                            marginBottom: "10px",
                        }}
                        className="btn btn-primary"
                    >
                        Current Orders
            </Link>

                    <hr />
                    <ul
                        class="list-group"
                        style={{
                            marginTop: "30px",
                        }}
                    >
                        <h4>Orders Completed</h4>
                        {completedOld
                            ? completedOld.map((order) => (
                                <li
                                    key={order.idUser}
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div
                                        style={{
                                            marginTop: "10px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                paddingBottom: "10px",
                                            }}
                                        ></div>

                                        <h5 className="font-weight-bold">
                                            Table {order.numberOfTable}
                                        </h5>
                                        <h6 className="font-weight-normal">
                                            Status: {order.status}
                                        </h6>
                                        <h6 className="font-weight-normal">
                                            Order#: {order.id}
                                        </h6>
                                        <h6 className="font-weight-normal">
                                            Date: {order.date}
                                        </h6>
                                        <h6 className="font-weight-normal">
                                            Price: ${order.totalPrice}
                                        </h6>
                                    </div>

                                    <div></div>
                                </li>
                            ))
                            : null}
                    </ul>

                </div>
            </div>
        </div>
    )

}
