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
          padding: "40px",
          marginRight: "20px"
        }}
      >
        <h1 className="font-weight-bold">Create Category</h1>
        <div className="col">
          <form
            onSubmit={e => submit(e)}
            style={{
              marginLeft: "20px",
              paddingTop: "20px"
            }}
          >
            <div
              className="form-group"
              style={{
                paddingBottom: "20px"
              }}
            >
              <label>Name</label>
              <input
                onChange={e => inputs(e)}
                name="name"
                type="text"
                className="form-control"
                placeholder="Pizza, burgers, etc..."
                required
              />
            </div>
            <div
              className="form-group"
              style={{
                paddingBottom: "20px"
              }}
            >
              <label>Image URL</label>
              <input
                onChange={e => inputs(e)}
                name="imageCategory"
                type="text"
                className="form-control"
                placeholder="https://..."
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
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
