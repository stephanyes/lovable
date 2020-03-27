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
                <h1 className="font-weight-bold">Curreny Menues</h1>
                <Link to="/menu/createMenu">Create Menu</Link>

                <hr />
                {menuObject ? (
                    menuObject.map(menu => (
                        <div key={menu.id}>
                            <Link
                                to={`/menu/${menu.id}`}>
                                {menu.name}
                            </Link>
                            <div>
                                <button onClick={e => deleteFunc(e, menu.id)} type="button" className="btn btn-pill btn-danger">Delete Menu</button>
                            </div>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );
};
