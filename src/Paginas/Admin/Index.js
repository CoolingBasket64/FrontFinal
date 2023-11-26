import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const IndexA = () => {

  const getnombre = localStorage.getItem('nombreE');

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [tablaProductos, setTablaProductos]= useState([]);
  const [busqueda, setBusqueda]= useState("");
  const [productos, setProductos] = useState([]);
  const [nuevaInformacion, setNuevaInformacion] = useState({
    nombreP: "",
    categoria: "",
    precio: "",
    region: "",
    archivoInput: ""
  });
  const [mensajeExito, setMensajeExito] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/api/v1/front/products/empresa/${getnombre}`);
        setProductos(response.data.products);
        setTablaProductos(response.data.products);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaProductos.filter((elemento)=>{
      if(elemento.nombreP.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.precio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setProductos(resultadosBusqueda);
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }






  const EliminarProducto = async (productoId) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta cita?");
    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:8888/api/v1/front/products/${productoId}`);
        const updatedProductos = productos.filter((producto) => producto._id !== productoId);
        setProductos(updatedProductos);
        setMensajeExito("Producto eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const handleEditarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setNuevaInformacion({
      nombreP: producto.nombreP,
      categoria: producto.categoria,
      precio: producto.precio,
      region: producto.region,
      archivoInput: producto.archivoInput
    });
  };




  const handleActualizarProducto = async () => {
    try {
      await axios.put(`http://localhost:8888/api/v1/front/products/${productoSeleccionado._id}`, nuevaInformacion);
      const updatedProductos = productos.map((producto) => {
        if (producto._id === productoSeleccionado._id) {
          return {
            ...producto,
            ...nuevaInformacion
          };
        }
        return producto;
      });

      setProductos(updatedProductos);
  
      setMensajeExito("Producto actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleChangeNuevaInformacion = (e) => {
    setNuevaInformacion({
      ...nuevaInformacion,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
      e.preventDefault();
      handleActualizarProducto()
    };


 


  const handleCerrarMensajeExito = () => {
    setMensajeExito("");
  };
const [error, setError] = useState('');
const [successMessage, setSuccessMessage] = useState('');
 

  return (
<div>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
<div className="body-index-c">

<nav className="navA">
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fas fa-bars" />
          </label>
          <Link to={"#"} className="enlace">
            <img src="logos.png" alt className="logo" />
          </Link>
          <ul className="ulA">
            <li className="liA"><Link to={"/IndexA"} className="activeA" >Inicio</Link></li>
            <li className="liA"><Link to={"/Productos"}>Mis productos</Link></li>
            <li className="liA"><Link to={"/ConsP"}>Pedidos</Link></li>
            <li className="liA"><Link to={"/"} >Cerrar sesión</Link></li>

          </ul>
        </nav>
        <div className="container-c">
          <center>
          <header>
          <h1 className="tituloo">Mis productos</h1>

<div className='buscar'>

                <div className='BotonesC'>
                    
                    <input type='text' className='buscars'name='search'  value={busqueda} placeholder="Búsqueda por nombre o precio de Producto" onChange={handleChange} required  ></input><button className='buscarBoton'><i className="fas fa-search" /></button>
      
                </div>
            
            </div>



{mensajeExito && (
        <div className="form-texto-l-bien">
          <p>{mensajeExito}</p> <button onClick={handleCerrarMensajeExito}>&times;</button>
        </div>
      )}


      
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form autoComplete='off' onSubmit={onSubmit} className="form-r">
            <center>
              <h2 className="form-title-l">Registrar Productos</h2>
            </center>
            {mensajeExito && (
        <div className="form-texto-l-bien">
          <p>{mensajeExito}</p> <button onClick={handleCerrarMensajeExito}>&times;</button>
        </div>
      )}
           
            <div className="form-container-l">
              <div className="form-group-l">
                <input type="text" id="nombreP" name='nombreP' value={nuevaInformacion.nombreP} onChange={handleChangeNuevaInformacion} required className="form-input-l" placeholder=" " />
                <label htmlFor="nombreP" className="form-label-l">Nombre Producto:</label>
                <span className="form-line" />
              </div>
              <div className="form-group-l">
                <label htmlFor="categoria" className="form-label-select">Categoria:</label>
                <select name="categoria" value={nuevaInformacion.categoria} onChange={handleChangeNuevaInformacion} required id="lang">
                <option hidden value="elija">Elija un categoria</option>
                  <option value="Mentas">Mentas</option>
                  <option value="Ponques">Ponques</option>
                  <option value="Paletas">Paletas</option>
                  <option value="Dulces duros">Dulces duros</option>
                  <option value="Chocolates">Chocolates</option>
                  <option value="Chicles">Chicles</option>
                  <option value="Gomitas">Gomitas</option>
                  <option value="Masmelos">Masmelos</option>
                  <option value="Bocadillos">Bocadillos</option>
                </select>
                <span className="form-line" />
              </div>

              <div className="form-group-l">
                <input type="number" id="precio" name='precio' value={nuevaInformacion.precio} onChange={handleChangeNuevaInformacion} required className="form-input-l" placeholder=" " />
                <label htmlFor="precio" className="form-label-l">Precio:</label>
                <span className="form-line-l" />
              </div>
              <div className="form-group-l">
                <label htmlFor="region" className="form-label-select">Region:</label>
                <select className="select2" name="region" value={nuevaInformacion.region} onChange={handleChangeNuevaInformacion} required  id="lang">
                <option hidden value="elijas">Elija una region</option>
                  <option value="Caribe">Caribe</option>
                  <option value="Pacífica">Pacífica</option>
                  <option value="Andina">Andina</option>
                  <option value="Orinoquia ">Orinoquia </option>
                  <option value="Amazonia">Amazonia</option>
                  <option value="Insular">Insular</option>
                </select>
                <span className="form-line" />
              </div>
        
             


              <center>
                <br />
                <input type="submit" className="form-submit-l" value="Actualizar" />
              </center>


            </div>
          </form>
      </div>
      
    </div>
  </div>
</div>
</header>
</center>

<div className="catalogo">
  {
    productos.map((producto) => (
      <div className="producto" key={producto._id}>
        <img src="card.png" alt   />
        <h1>{producto.nombreP}</h1>
   
        <h5><p>Precio: ${producto.precio}</p> </h5>
        <button className="eliminar" onClick={() => EliminarProducto(producto._id)}>Eliminar</button>
        <button className="editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleEditarProducto(producto)}>
                    Editar
                  </button>
      </div>
    )) }
  
</div>

</div>

<div className="footer">
          <p> Creado por: Santiago Carreño | Aprendiz Sena </p><strong>©2023</strong>.
        </div>
</div>

</div>


  )
}

export default IndexA;