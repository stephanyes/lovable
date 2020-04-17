import React from "react";

export default () => {
    return (
        <div
            style={{
                backgroundColor: "white",
                marginLeft: "250px",
                paddingBottom: "400px",
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
                <h1 className="font-weight-bold">Add Table</h1>
                <div className="col">
                    <form
                        // onSubmit={(e) => submit(e)}
                        style={{
                            padding: "40px",
                            marginRight: "20px",
                        }}
                    >
                        <div
                            className="form-group"
                            style={{
                                paddingBottom: "20px",
                            }}
                        >
                            <label>Number</label>
                            <input
                                // onChange={(e) => inputs(e)}
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Product name..."
                                required
                            // value={product.name}
                            />
                        </div>
                        <div
                            className="form-group"
                            style={{
                                paddingBottom: "20px",
                            }}
                        >
                            <label>Image display</label>
                            <input
                                // onChange={(e) => inputs(e)}
                                name="imageProduct"
                                type="text"
                                className="form-control"
                                placeholder="Image URL..."
                                required
                            // value={product.imageProduct}
                            />
                        </div>
                        <div
                            className="form-group"
                            style={{
                                paddingBottom: "20px",
                            }}
                        >
                            <label>Description</label>
                            <input
                                // onChange={(e) => inputs(e)}
                                name="description"
                                type="text"
                                className="form-control"
                                placeholder="Brief description of product..."
                                required
                            // value={product.description}
                            />
                        </div>
                        <div
                            className="form-group"
                            style={{
                                paddingBottom: "20px",
                            }}
                        >
                            <label>Price</label>
                            <input
                                // onChange={(e) => inputs(e)}
                                name="price"
                                type="text"
                                className="form-control"
                                placeholder="Price..."
                                required
                            // value={product.price}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                backgroundColor: "#FF2068",
                                borderColor: "#FF2068",
                            }}
                        >
                            Save
            </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
