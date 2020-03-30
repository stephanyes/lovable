import React from "react";
import { Link } from "react-router-dom";

export default ({ menuObject, deleteFunc }) => {
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
                <h1 className="font-weight-bold">Current Menues</h1>
                <Link to="/menu/createMenu">Create Menu</Link>

                <hr />

                <table className="table table-striped table-bordered">
                    <thead>
                        <th>Menu</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {menuObject ? (menuObject.map(menu => (
                            <tr key={menu.id} >
                                <td >
                                    <Link
                                        to={`/menu/${menu.id}`}>
                                        {menu.name}
                                    </Link>
                                </td>
                                <td className="pull-right">
                                    <button onClick={e => deleteFunc(e, menu.id)} type="button" style={{ marginLeft: "10px", marginRight: "10px" }} className="btn btn-pill btn-danger">Delete Menu</button>
                                    <Link to={`/menu/${menu.id}/editMenu`}><button type="button" style={{ marginLeft: "10px", marginRight: "10px" }} className="btn btn-pill btn-warning">Edit Menu</button></Link>
                                </td>
                            </tr>
                        ))) : null}
                    </tbody>
                </table>
            </div>
        </div >
    );
};
