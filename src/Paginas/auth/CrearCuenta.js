import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


const CrearCuenta = () => {
  const[usuario, setUsuario] =useState({
    nombreE:'',
    nit:'',
    telefono:'',
    correo:'',
    password:''
})

const{nombreE, nit, telefono, correo, password} =usuario;
const [error, setError] = useState('');
const [successMessage, setSuccessMessage] = useState('');


const handleRegister = async () => {
  try {

    const response = await axios.post('http://localhost:8888/api/v1/front/users/register', usuario, {
headers: {
'Content-Type': 'application/json',
},
});  
  setSuccessMessage('Usuario creado con éxito');
  setError('');
  } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Aquí accedes al mensaje específico del servidor
        setError('Error: ' + error.response.data.message);
      } else {
        setError('Error en el registro: ' + error.message);
      }
      console.error('Error:', error);
    }
};

const onChange = (e) => {
  setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
  });
}
useEffect(() =>{document.getElementById("nombreE").focus();}, [])


const onSubmit = (e) => {
  e.preventDefault();
  handleRegister()
};


  return (

    <div>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
     
    <div className="body-r">
     <nav>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fas fa-bars" />
          </label>
          <Link to={"#"} className="enlace">
            <img src="logos.png" alt className="logo" />
          </Link>
          <ul>
          <li><Link to={"/index"} className="active" >Inicio</Link></li>
            <li><Link to={"/Catalogo"}>Catalogo</Link></li>
            <li><Link to={"/login"}>Iniciar sesión</Link></li>
          </ul>
        </nav>
      <div className="container">
        <form autoComplete='off' onSubmit={onSubmit} className="form-r">
          <h2 className="form-title-l">Registrar Empresa</h2>

          {successMessage && (
        <div className='form-texto-l-bien'>
            {successMessage}
        </div>
        )}
        {error && (
            <div className='form-texto-l-mal'>
            {error}
            </div>
        )}
          
          <div className="form-container-l">
            <div className="form-group-l">
              <input type="text" id="nombreE" name="nombreE" onChange={onChange} value={nombreE} required  className="form-input-l" placeholder=" " />
              <label htmlFor="nombreE" className="form-label-l">Nombre de la empresa:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="text" id="nit" name="nit" onChange={onChange} value={nit} required  className="form-input-l" placeholder=" " />
              <label htmlFor="nit" className="form-label-l">Nit:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="number" id="telefono" name="telefono" onChange={onChange} value={telefono} required  className="form-input-l" placeholder=" " />
              <label htmlFor="telefono" className="form-label-l">Telefono:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="email" id="correo" name="correo" onChange={onChange} value={correo} required  className="form-input-l" placeholder=" " />
              <label htmlFor="correo" className="form-label-l">Correo:</label>
              <span className="form-line-l" />
            </div>
            <div className="form-group-l">
              <input type="password" id="password" name="password" onChange={onChange} value={password} required  className="form-input-l" placeholder=" " />
              <label htmlFor="password" className="form-label-l">Contraseña:</label>
              <span className="form-line" />
            </div>
            <center>
              <input type="submit" className="form-submit-l" value="Registrarse" />
              <Link to={"/login"}><button className="button-l">Iniciar sesión</button></Link>
            </center>

          </div>
        </form>
      </div>
      <div className="footer-r">
        <p> Creado por: Santiago Carreño | Aprendiz Sena </p><strong>©2023</strong>.
      </div>
    </div>
    </div>





  )
}

export default CrearCuenta;