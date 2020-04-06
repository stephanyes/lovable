import React from "react";

export default ({ inputs, submit, restaurant }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        marginLeft: "250px",
        paddingBottom: "30px",
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
        <h1 className="font-weight-bold">Edit Configurations</h1>
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
                placeholder="Restaurant name..."
                required
                value={restaurant.name}
              />
            </div>
            <div
              className="form-group"
              style={{
                paddingBottom: "20px",
              }}
            >
              <label>Email</label>
              <input
                onChange={(e) => inputs(e)}
                name="mail"
                type="email"
                className="form-control"
                placeholder="hi@email.com"
                required
                value={restaurant.mail}
              />
            </div>
            <div
              className="form-group"
              style={{
                paddingBottom: "20px",
              }}
            >
              <label>Phone</label>
              <input
                onChange={(e) => inputs(e)}
                name="phone"
                type="number"
                className="form-control"
                placeholder="+54 305 ..."
                required
                value={restaurant.phone}
              />
            </div>
            <div
              className="form-group"
              style={{
                paddingBottom: "20px",
              }}
            >
              <label>Logo Image</label>
              <input
                onChange={(e) => inputs(e)}
                name="logoImage"
                type="text"
                className="form-control"
                placeholder="https://..."
                required
                value={restaurant.logoImage}
              />
            </div>
            <div
              className="form-group"
              style={{
                paddingBottom: "20px",
              }}
            >
              <label>Background Image</label>
              <input
                onChange={(e) => inputs(e)}
                name="backgroundImage"
                type="text"
                className="form-control"
                placeholder="ttps://..."
                required
                value={restaurant.backgroundImage}
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
