import React from "react";
import { Link } from "react-router-dom";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

export default ({ nombre, categories, menuId, deleteFunc }) => {
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
          marginLeft: "20px",
          paddingTop: "20px"
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
            marginBottom: "10px"
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
            marginTop: "30px"
          }}
        >
          {categories.length
            ? categories.map(individual => {
                return (
                  <li
                    key={individual.categoryId}
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {/* <h5 style={{ textAlign: "center" }}>{individual.name}</h5> */}
                    <div>
                      <Link to={`/menu/${menuId}/${individual.categoryId}`}>
                        {individual.name}
                      </Link>

                      {/* <img
                          style={{ width: "100px" }}
                          src={individual.imageCategory}
                          alt="category img"
                        /> */}
                    </div>
                    <div>
                      <Link
                        to={`/menu/${menuId}/${individual.categoryId}/editCategory`}
                      >
                        <button
                          style={{
                            backgroundColor: "#2EC4B6",
                            borderColor: "#2EC4B6",
                            marginRight: "20px"
                          }}
                          className="btn btn-primary btn-lg"
                        >
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={e => deleteFunc(e, individual.categoryId)}
                        style={{
                          backgroundColor: "#ff2068",
                          borderColor: "#ff2068"
                          //marginRight: "20px"
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

// {categories.length ? (
//     <Carousel centered infinite arrows slidesPerPage={1}>
//       {categories.map(individual => (
//         <div key={individual.categoryId}>
//           <h5 style={{ textAlign: "center" }}>{individual.name}</h5>
//           <ul>
//             <li>
//               <Link
//                 to={`/menu/${menuId}/${individual.categoryId}/editCategory`}
//               >
//                 Edit Category
//               </Link>
//             </li>
//             <li>
//               <button
//                 onClick={e => deleteFunc(e, individual.categoryId)}
//                 type="button"
//                 className="btn btn-pill btn-danger"
//               >
//                 Delete Category
//               </button>
//             </li>
//           </ul>
//           <Link to={`/menu/${menuId}/${individual.categoryId}`}>
//             <img
//               style={{ width: "auto", height: "auto" }}
//               src={individual.imageCategory}
//               alt="category img"
//             ></img>
//           </Link>
//         </div>
//       ))}
//     </Carousel>
//   ) : null}
