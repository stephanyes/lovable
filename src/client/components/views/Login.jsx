import React from "react";

export default ({ handlerSubmit, handlerChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src="https://insideone.s3-sa-east-1.amazonaws.com/backgroundRestaurant-image.png"
        className="img-fluid"
        alt="Responsive image"
        style={{
          maxHeight: "660px",
        }}
      />
      <img
        src="https://insideone.s3-sa-east-1.amazonaws.com/logo-lovable.png"
        style={{
          position: "absolute",
          marginTop: "60px",
        }}
        height="50"
        alt=""
      />
      <div
        style={{
          display: "column",
          justifyContent: "center",
          position: "absolute",
          marginTop: "150px",
        }}
      >
        <form
          onSubmit={(e) => handlerSubmit(e)}
          style={{
            padding: "40px",
            marginRight: "20px",
          }}
        >
          <div className="form-group">
            <label
              style={{
                color: "#ffffff",
              }}
            >
              Number of Table
            </label>
            <input
              name="numberOfTable"
              type="text"
              className="form-control"
              id="numberOfTable"
              onChange={handlerChange}
            />
          </div>
          <div
            className="form-group"
            style={{
              paddingBottom: "20px",
            }}
          >
            <label
              style={{
                color: "#ffffff",
              }}
            >
              Code
            </label>
            <input
              name="code"
              type="text"
              className="form-control"
              id="code"
              onChange={handlerChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#FF2068",
              borderColor: "#FF2068",
              width: "100%",

              marginTop: "20px",
            }}
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
};
