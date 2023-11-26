import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {

  const [correo, setNombreE] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  

  const navigate = useNavigate();

  const parseToken = (token) => {
    const decodedToken = token.split('.')[1];
    const decodedData = JSON.parse(atob(decodedToken));
    return decodedData;
  };

  const datosLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8888/api/v1/front/users/login', {
        correo,
        password:password,
      });
      console.log('Después de la solicitud'); // Añade esta línea

      if (response.data && response.data.token) {
        const tokenPayload = parseToken(response.data.token);
        if (tokenPayload ) { 
        const { nombreE, token } = tokenPayload; 
            localStorage.setItem('token', token);
          localStorage.setItem('nombreE', nombreE);
          localStorage.setItem('email', tokenPayload.correo)
            navigate('/IndexA');
               }
               
          } 

          setError('');
        } catch (error) {
        console.error('Error en el registro:', error);
      }
    };

    

  return (
    <div>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
      <div className="body">
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
          <form autoComplete='off' onSubmit={datosLogin} className="form-l">
            <h2 className="form-title-l">Iniciar Sesión</h2>
            {error && (
            <div className='form-texto-l-mal'>
            {error}
            </div>
            )}
           
            <div className="form-container-l">
              <div className="form-group-l">
                <input type="email" id="email" name='email' required value={correo} onChange={(e) => setNombreE(e.target.value)} className="form-input-l" placeholder=" " />
                <label htmlFor="correo" className="form-label-l">Correo:</label>
                <span className="form-line" />
              </div>
              <div className="form-group-l">
                <input type="password" id="password" name='password' required value={password} onChange={(e) => setPassword(e.target.value)} className="form-input-l" placeholder=" " />
                <label htmlFor="password" className="form-label-l">Contraseña:</label>
                <span className="form-line-l" />
              </div>
              <center>
                <input type="submit" className="form-submit-l" value="Entrar" />
                <Link to={"/crear-cuenta"}><button className="button-l">Crear Cuenta</button></Link>
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

export default Login;