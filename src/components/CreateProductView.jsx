import React from "react";

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
                <h1 className="font-weight-bold">Add Product</h1>
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
                                placeholder="Product name..."
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
                                name="imageProduct"
                                type="text"
                                className="form-control"
                                placeholder="Image URL..."
                                required
                            />
                        </div>
                        <div
                            className="form-group"
                            style={{
                                paddingBottom: "20px"
                            }}
                        >
                            <label>Description</label>
                            <input
                                onChange={(e) => inputs(e)}
                                name="description"
                                type="text"
                                className="form-control"
                                placeholder="Brief description of product..."
                                required
                            />
                        </div>
                        <div
                            className="form-group"
                            style={{
                                paddingBottom: "20px"
                            }}
                        >
                            <label>Price</label>
                            <input
                                onChange={(e) => inputs(e)}
                                name="price"
                                type="text"
                                className="form-control"
                                placeholder="Price..."
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
