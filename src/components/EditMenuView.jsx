import React from "react";
import { Link } from "react-router-dom";

export default ({ submit, inputs, menu }) => {
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
                <h1 className="font-weight-bold">Edit Menu</h1>
                <div className="col">
                    <form
                        onSubmit={(e) => submit(e)}
                        style={{
                            padding: "40px",
                            marginRight: "20px"
                        }}
                    >
                        <div
                            className="form-group"
                            style={{
                                paddingBottom: "20px"
                            }}
                        >
                            <label>Title</label>
                            <input
                                onChange={(e) => inputs(e)}
                                name="nameOfMenu"
                                type="text"
                                className="form-control"
                                placeholder="Menu name..."
                                required
                                value={menu.nameOfMenu}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                backgroundColor: "#FF2068",
                                borderColor: "#FF2068"
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};
