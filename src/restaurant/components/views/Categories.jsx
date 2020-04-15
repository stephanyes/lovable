import React from "react";
import { Link } from "react-router-dom";
import "@brainhubeu/react-carousel/lib/style.css";

export default ({ nombre, categories, menuId, deleteFunc }) => {
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
        <h1 className="font-weight-bold">{nombre}</h1>

        <Link
          style={{
            textDecoration: "none",
            color: "#ffffff",
            backgroundColor: "#ff2068",
            borderColor: "#ff2068",
            marginTop: "20px",
            marginBottom: "10px",
          }}
          className="btn btn-primary"
          to={`/menu/${menuId}/createCategory`}
        >
          Create Category
        </Link>
        <hr />

        <ul
          class="list-group"
          style={{
            marginTop: "30px",
          }}
        >
          {categories.length
            ? categories.map((individual) => {
                return (
                  <li
                    key={individual.categoryId}
                    style={{ padding: "20px" }}
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <img
                        style={{ maxWidth: "100px", marginRight: "20px" }}
                        src={individual.imageCategory}
                        alt="category img"
                      />
                      <Link to={`/menu/${menuId}/${individual.categoryId}`}>
                        {individual.name}
                      </Link>
                    </div>
                    <div>
                      <Link
                        to={`/menu/${menuId}/${individual.categoryId}/editCategory`}
                      >
                        <button
                          style={{
                            backgroundColor: "#2EC4B6",
                            borderColor: "#2EC4B6",
                            marginRight: "20px",
                          }}
                          className="btn btn-primary btn-lg"
                        >
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={(e) => deleteFunc(e, individual.categoryId)}
                        style={{
                          backgroundColor: "#ff2068",
                          borderColor: "#ff2068",
                        }}
                        className="btn btn-primary btn-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};
