import { useQuery } from "react-query";
import React, { useState } from "react";


const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const getProductos = async () =>{
        const response = await fetch('http://localhost:8888/api/v1/front/products/buscar?nombreP=Veleño')
        return response.json();
        setProductos(response.data.results);
    }
   

    

    return <div>
        <h2>Lista de productos</h2>
       
       
        
        <div className="catalogo">
{productos.map((producto) => (
<div className="producto">
<img src={producto.archivoInput} alt="Producto 1" />
<h2>{producto.nombreP}</h2>
<p>Descripción del Producto 1. Precio: ${producto.precio}</p>

</div>
 ))}


</div>
    </div>
}
 export default ProductList;