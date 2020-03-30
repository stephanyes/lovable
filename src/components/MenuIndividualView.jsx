import React from "react";
import { Link } from "react-router-dom";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

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
                <div>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={`/menu/${menuId}/createCategory`}>Create Category</Link>
                        </li>

                    </ul>
                </div>

                <hr />
                {categories.length ?
                    (<Carousel
                        centered
                        infinite
                        arrows
                        slidesPerPage={1}
                    >

                        {categories.map(individual => (
                            <div key={individual.categoryId}>
                                <h5 style={{ textAlign: "center" }}>{individual.name}</h5>
                                <ul>
                                    <li>
                                        <Link to={`/menu/${menuId}/${individual.categoryId}/editCategory`}>Edit Category</Link>
                                    </li>
                                    <li>
                                        <button onClick={e => deleteFunc(e, individual.categoryId)} type="button" className="btn btn-pill btn-danger">Delete Category</button>

                                    </li>
                                </ul>
                                <Link to={`/menu/${menuId}/${individual.categoryId}`}>
                                    <img style={{ width: "auto", height: "auto" }} src={individual.imageCategory} alt="category img"></img>
                                </Link>
                            </div>
                        ))}

                    </Carousel>
                    )
                    : null}
            </div>
        </div>
    );
};
