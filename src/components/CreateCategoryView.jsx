import React from "react";
import { Link } from "react-router-dom";

export default ({ submit, inputs }) => {
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
                <h1 className="font-weight-bold">Create Category</h1>
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
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Category name..."
                                required
                            />
                        </div>
                        <div
                            className="form-group"
                            style={{
                                paddingBottom: "20px"
                            }}
                        >
                            <label>Image display</label>
                            <input
                                onChange={(e) => inputs(e)}
                                name="imageCategory"
                                type="text"
                                className="form-control"
                                placeholder="Image URL..."
                                required
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
