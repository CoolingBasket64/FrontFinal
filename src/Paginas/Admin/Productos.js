import React from "react";
import { Link } from 'react-router-dom';


const Productos = () => {
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
        <form className="form-l">
            <center>
          <h2 className="form-title-er">Que desea realizar</h2>
          </center>
          <div className="form-container-l">
            
            <center>
              <Link to={"/productosC"}><button className="button-l">Consultar Productos</button></Link>
              <Link to={"/RProductos"}><button className="button-l">Registrar Productos</button></Link>
            </center>
            
   
          </div>
        </form>
        </div>
        
      <div className="footer">
      <p> Creado por: Santiago Carreño | Aprendiz Sena </p><strong>©2023</strong>.
      </div>
      </div>
    </div>


  )
}

export default Productos;