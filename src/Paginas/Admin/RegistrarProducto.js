import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { mostrarImagenSeleccionada } from '../../js/imagenRP';

const RegistrarProductos = () => {
  const [producto, setProducto] = useState({
    nombreE : '',
    nombreP: '',
    categoria: '',
    precio: '',
    region: '',
    archivoInput: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const getnombre = localStorage.getItem('nombreE'); // Mover la obtención del nombre aquí
  
  useEffect(() => {
    setProducto(prevProducto => ({
      ...prevProducto,
      nombreE: getnombre || '',
    }));
  }, [getnombre]);

  const registerProducto = async () => {
    try {
      const response = await axios.post('http://localhost:8888/api/v1/front/products/register', {
        ...producto,
        nombreE: getnombre, // Usar getnombre aquí
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });  
      setSuccessMessage('producto creado con éxito');
      setError('');
    } catch (error) {
      console.error('Error en el registro:', error);

      if (error.response) {
        console.log('Respuesta del servidor:', error.response);
        if (error.response.status === 500 && error.response.data && error.response.data.message) {
          setError('Error: ' + error.response.data.message);
        } else {
          setError('Error: Hubo un error al momento de registrar el producto, vuelve a intentarlo' );
        }
      } else {
        setError('Error en el : ' + error.message);
      }
    }
  };

  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
    mostrarImagenSeleccionada();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerProducto();
  };
  return (
    <div>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
      <div className="body-r">
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
          <form autoComplete='off' onSubmit={onSubmit} className="form-r">
            <center>
              <h2 className="form-title-l">Registrar Productos</h2>
            </center>
           
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
            <div className="form-container-l">
            <div className="form-group-l">
                <input type="text" id="nombreE" name='nombreE' onChange={onChange} value={getnombre} required className="form-input-l" placeholder=" " />
                <label htmlFor="nombreP" className="form-label-l">Nombre Empresa:</label>
                <span className="form-line" />
              </div>
              <div className="form-group-l">
                <input type="text" id="nombreP" name='nombreP' onChange={onChange} value={producto.nombreP} required className="form-input-l" placeholder=" " />
                <label htmlFor="nombreP" className="form-label-l">Nombre Producto:</label>
                <span className="form-line" />
              </div>
              <div className="form-group-l">
                <label htmlFor="categoria" className="form-label-select">Categoria:</label>
                <select name="categoria" value={producto.categoria} onChange={onChange} required id="lang">
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
                <input type="number" id="precio" name='precio' onChange={onChange} value={producto.precio} required className="form-input-l" placeholder=" " />
                <label htmlFor="precio" className="form-label-l">Precio:</label>
                <span className="form-line-l" />
              </div>
              <div className="form-group-l">
                <label htmlFor="region" className="form-label-select">Region:</label>
                <select className="select2" name="region" onChange={onChange} value={producto.region} required  id="lang">
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

              <div id="contenedorImg" className='contenedorImg'>
                                    <div className='textoImg'>
                                        <p>Imagen producto</p>
                                        <p className='blue'><u>Opcional</u></p>
                                    </div>
                                    <img id="imagenSeleccionada" className='imgR' src="#" width={150}/>
                                    
                                </div>
                                <div className="input-group mt-3">
                                    <input type="file" className='form-control' id="archivoInput" name='archivoInput' onChange={onChange} value={producto.archivoInput} />
                                </div>   

              <center>
                <br />
                <input type="submit" className="form-submit-l" value="Registrar" />
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

export default RegistrarProductos;