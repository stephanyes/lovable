import React from "react";

export default ({productos, priceTotal, deleteClick, handlerSubmit}) => {
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
                  padding: "10px",
                  paddingBottom: "0px",
                  marginBottom: "0px"
                }}
              >
                Cart
              </h1>
            
            </div>
          </div>
          {productos ? (
            productos.map(product => {
            return (
                    
                    <li
                    class="list-group-item d-flex justify-content-between align-items-center"
                    style={{
                        padding: "12px"
                    }}
                    >
                    <div>
                        <img
                        src={product.imageProduct}
                        className="card-img"
                        alt="..."
                        style={{
                            width: "60px",
                            marginRight: "10px"
                        }}
                        />
                        <span
                        style={{
                            margin: "20px",
                            marginLeft: "0px"
                        }}
                        >
                        {product.name}
                        </span>
                    </div>

                    <div>$ {product.price}</div>
                        <button onClick={(e)=> deleteClick(e,product.id)}>Delete</button>
                    </li>
                )
            })
        ) : null }
            <h2>{priceTotal}</h2>
            <button onClick={(e)=> handlerSubmit(e)}>Send</button>
        </div>
      );
}

//------------------> 1- Cuando creo una orden de 0 ("" --> Draft) --> cambia el estado en orders y en tables
//------------------> 2- Listado de los productos + en c/u boton de eliminar indiviadual (elimina de la order Firebase + state)
//------------------> 3- Indicador de total --> <h2></h2>
//------------------> 4- Boton --> enviar orden (Draft --> Pending) --> cambia el estado en orders y en tables

//------------------> 5 - stephan - totalPrice