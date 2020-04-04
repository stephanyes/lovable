import React from "react";

export default ({ submit, inputs, category }) => {
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
        <h1 className="font-weight-bold">Edit Category</h1>
        <div className="col">
          <form
            onSubmit={(e) => submit(e)}
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
              <label>Name</label>
              <input
                onChange={(e) => inputs(e)}
                name="name"
                type="text"
                className="form-control"
                placeholder="Category name..."
                required
                value={category.name}
              />
            </div>
            <div
              className="form-group"
              style={{
                paddingBottom: "20px",
              }}
            >
              <label>Image URL</label>
              <input
                onChange={(e) => inputs(e)}
                name="imageCategory"
                type="text"
                className="form-control"
                placeholder="Image URL..."
                required
                value={category.imageCategory}
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
