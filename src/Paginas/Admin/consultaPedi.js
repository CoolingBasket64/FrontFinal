
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const ConsP = () => {

  const getnombre = localStorage.getItem('nombreE');
  
    const [compras, setCompras] = useState([]);
    const [compraSeleccionada, setCompraSeleccionada] = useState(null);
    const [nuevaInformacion, setNuevaInformacion] = useState({
        nombreP: '',
        nombre: '',
        apellido: '',
        correo: '',
        numero: '',
        direccion: ''
    });
    const [mensajeExito, setMensajeExito] = useState("");
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorP, setErrorP] = useState('');
    const [successMessageP, setSuccessMessageP] = useState('');
  
    useEffect(() => {
      const fetchCompra = async () => {
        try {
          const response = await axios.get(`http://localhost:8888/api/v1/front/compras/pedido/${getnombre}`);
          setCompras(response.data.products);
        } catch (error) {
          console.error("Error al obtener pedidos:", error);
        }
      };
  
      fetchCompra();
    }, []);
  
  
  
    const delCompra = async (compraId) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este pedido?");
        if (confirmacion) {
          try {
            await axios.delete(`http://localhost:8888/api/v1/front/compras/${compraId}`);
            const updatedCompras = compras.filter((compra) => compra._id !== compraId);
            setCompras(updatedCompras);
            setSuccessMessage('pedido eliminado con exito');
            setMensajeExito("pedido eliminado con éxito.");
        } catch (error) {
          console.error("Error al eliminar el pedido:", error);
          }
        }
      };
  
    const handleEditarCompra = (compra) => {
      setCompraSeleccionada(compra);
      setNuevaInformacion({
        nombreP: compra.nombreP,
      nombre: compra.nombre,
      apellido: compra.apellido,
      correo: compra.correo,
      numero: compra.numero,
      direccion: compra.direccion
      });
    };
  


  
    const handleActualizarCompra = async () => {
      try {
        await axios.put(`http://localhost:8888/api/v1/front/compras/${compraSeleccionada._id}`, nuevaInformacion);
        const updatedCompras = compras.map((compra) => {
          if (compra._id === compraSeleccionada._id) {
            return {
              ...compra,
              ...nuevaInformacion
            };
          }
          return compra;
        });
  
        setCompras(updatedCompras);
    
        setMensajeExito("Pedido actualizado con éxito.");
      } catch (error) {
        console.error("Error al actualizar el pedido:", error);
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
        handleActualizarCompra()
      };
  
    const handleCerrarMensajeExito = () => {
      setMensajeExito("");
    };





  return (
    <div>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
    <div className="body">
    <nav className="navA">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars" />
        </label>
        <Link to={"#"} className="enlace">
          <img src="logos.png" alt className="logo" />
        </Link>
        <ul className="ulA">
        <li><Link to={"/IndexA"} className="active" >Inicio</Link></li>
          <li><Link to={"/Productos"}>Mis productos</Link></li>
          <li><Link to={"/ConsP"}>Pedidos</Link></li>
          <li><Link to={"/"}>Cerrar sesión</Link></li>
      
        </ul>
      </nav>
      <div className="container">
      
          
      <h1>Tabla de Consulta</h1>
      {error && (
            <div className='form-texto-l-mal'>
            {error}
            </div>
            )}
            {successMessage && (
            <div className='form-texto-l-bien'>
                {successMessage}
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
          <h2 className="form-title-l">Editar Compra</h2>
          {mensajeExito && (
        <div className="form-texto-l-bien">
          <p>{mensajeExito}</p> <button onClick={handleCerrarMensajeExito}>&times;</button>
        </div>
      )}
          
          <div className="form-container-l">
          <div className="form-group-l">
              <input type="text" id="nombreP" name="nombreP"  value={nuevaInformacion.nombreP} onChange={handleChangeNuevaInformacion} className="form-input-l" placeholder=" " />
              <label htmlFor="nombre" className="form-label-l">Nombre Producto:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="text" id="nombre" name="nombre" value={nuevaInformacion.nombre} onChange={handleChangeNuevaInformacion}  className="form-input-l" placeholder=" " />
              <label htmlFor="nombre" className="form-label-l">Nombres:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="text" id="apellido" name="apellido" value={nuevaInformacion.apellido} onChange={handleChangeNuevaInformacion}  className="form-input-l" placeholder=" " />
              <label htmlFor="apellido" className="form-label-l">Apellidos:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="email" id="correo" name="correo" value={nuevaInformacion.correo} onChange={handleChangeNuevaInformacion}   className="form-input-l" placeholder=" " />
              <label htmlFor="correo" className="form-label-l">Correo:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="text" id="numero" name="numero" value={nuevaInformacion.numero} onChange={handleChangeNuevaInformacion}  className="form-input-l" placeholder=" " />
              <label htmlFor="numero" className="form-label-l">Numero de contacto:</label>
              <span className="form-line" />
            </div>
            
            <div className="form-group-l">
              <input type="text" id="direccion" name="direccion" value={nuevaInformacion.direccion} onChange={handleChangeNuevaInformacion}  className="form-input-l" placeholder=" " />
              <label htmlFor="direccion" className="form-label-l">Direccion:</label>
              <span className="form-line" />
            </div>
            <center>
              <input type="submit" className="form-submit-le" value="Editar" />

            </center>

          </div>
        </form>
      </div>
      
    </div>
  </div>
</div>

<table>
  <thead>
    <tr>
    <th>#</th>
      <th>Nombre Producto</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Correo</th>
      <th>Numero</th>
      <th>Direccion</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
  {compras.map((compra, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{compra.nombreP}</td>
                <td>{compra.nombre}</td>
                <td>{compra.apellido}</td>
                <td>{compra.correo}</td>
                <td>{compra.numero}</td>
                <td>{compra.direccion}</td>
                <td>
                  <button className="eliminar" onClick={() => delCompra(compra._id)}>
                    Eliminar
                  </button>
                </td>
                <td>
                  <button className="editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleEditarCompra(compra)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
  </tbody>
</table>  

          
      </div>
      
    <div className="footer">
    <p> Creado por: Santiago Carreño | Aprendiz Sena </p><strong>©2023</strong>.
    </div>
    </div>
  </div>


  )
}

export default ConsP;