import React from "react";

export default ({ product, handleClick, handlerChange, addProd, value, lessProd}) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff"
      }}
    >
      <div
        className="card text-center"
        style={{
          borderColor: "#ffffff"
        }}
      >
        <div
          className="card-body"
          style={{
            padding: "20px",
            paddingBottom: "0px"
          }}
        >
          <h1
            className="font-weight-bold"
            style={{
              paddingTop: "10px",
              marginBottom: "40px"
            }}
          >
            {product.name}
          </h1>
          <img src={product.imageProduct} className="card-img" alt="..." />
          <h5
            className="font-weight-normal"
            style={{
              margin: "40px"
            }}
          >
            {product.description}
          </h5>
          <hr></hr>


          <div className="panel-heading"> 
          
            <h5>Special Comments</h5>

            <input type="text" placeholder="Add to note (aditional sauce, without onion)" className="font-weight-small"
            style={{
              weight : "400px",
              heigth : "400px"
            }}
            onChange={(e => handlerChange(e))}
            />
            <small id="passwordHelpBlock" className="form-text text-muted">
              Completar con alguna info de explicacion
            </small>
            <div className= "row" >
              <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="col-md-4" style={{margin: "0 auto"}}>
                    <button type="button" className="btn btn-success btn-circle btn-xl"
                        style={{
                          width: "50px", 
                          height: "50px", 
                          paddingBottom: "2px",
                          borderRadius: "25px", 
                          fontSize: "25px", 
                          textAlign: "center",
                          color: "white"
                        }} onClick={(e) => addProd(e)}> + </button> 
                  </div>
                  <div className="col-md-4" style={{margin: "0 auto"}}>
                    <h7
                    className="font-weight-bold"
                    style={{
                      paddingTop: "10px",
                      marginBottom: "40px"
                    }}
                    > {value}
                    </h7>
                  </div>
                  <div className="col-md-4" style={{margin: "0 auto"}}>
                    <button type="button" className="btn btn-success btn-circle btn-xl"
                        style={{
                          width: "50px", 
                          height: "50px", 
                          paddingBottom: "2px",
                          borderRadius: "25px", 
                          fontSize: "25px", 
                          textAlign: "center",
                          color: "white"
                        }} onClick={(e) => lessProd(e)}> − </button> 
                  </div>
                </div>
              <div className="col-md-4"></div>
            </div>
          </div>
          <button
            style={{
              textDecoration: "none",
              color: "#ffffff",
              backgroundColor: "#ff2068",
              borderColor: "#ff2068",
              padding: "15px 110px",
              margin: "10px",
              marginBottom: "40px",
              fontSize: "20px"
            }}
            className="btn btn-primary"
            onClick={e => handleClick(e)}
          >
          Add {value} to Cart · ARS {`${product.price * value},00`}
          </button>
        </div>
      </div>
    </div>
  );
};
