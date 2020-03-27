import React from "react";
import { Link } from "react-router-dom";

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
                    padding: "20px"
                }}
            >
                <h1 className="font-weight-bold">{nombre}</h1>
                <Link to={`/menu/${menuId}/createCategory`}>Create Category</Link>

                <Link to={`/menu/${menuId}/editMenu`}>Edit Menu</Link>
                <hr />
                {categories ? (
                    categories.map(individual => (
                        <div key={individual.categoryId}>
                            <div>
                                <h5>{individual.name}</h5>
                                <Link to={`/menu/${menuId}/${individual.categoryId}`}>
                                    <img src={individual.imageCategory} alt="category img"></img>
                                </Link>
                            </div>
                            <Link to={`/menu/${menuId}/${individual.categoryId}/editCategory`}>Edit Category</Link>
                            <button onClick={e => deleteFunc(e, individual.categoryId)} type="button" className="btn btn-pill btn-danger">Delete Category</button>
                        </div>
                    ))
                ) : null}

            </div>
        </div>
    );
};
