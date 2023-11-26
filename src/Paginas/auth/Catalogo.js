import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


const Catalogo = () => {
  const [productos, setProductos] = useState([]);
   const [tablaProductos, setTablaProductos]= useState([]);
  const [busqueda, setBusqueda]= useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [nuevaInformacion, setNuevaInformacion] = useState({
    nombreE: "",
    nombreP: "",
    categoria: "",
    precio: "",
    region: "",
    archivoInput: ""
  });
  const [mensajeExito, setMensajeExito] = useState("");


  const fetchProducts = async () => {

    await axios.get("http://localhost:8888/api/v1/front/products")
  .then(response=>{
    setProductos(response.data.results);
    setTablaProductos(response.data.results);
  }).catch(error=>{
    console.log(error);
  })
   }
   

  useEffect(() => {
 fetchProducts()
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
 
  const handleEditarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setNuevaInformacion({
      nombreE: producto.nombreE,
      nombreP: producto.nombreP,
      categoria: producto.categoria,
      precio: producto.precio,
      region: producto.region,
      archivoInput: producto.archivoInput
    });
  };


  const handleChangeNuevaInformacion = (e) => {
    setNuevaInformacion({
      ...nuevaInformacion,
      [e.target.name]: e.target.value
    });
  };


  const [compra, setCompra] = useState({
    nombreP: '',
    nombreE: '',
    nombre: '',
    apellido: '',
    correo: '',
    numero: '',
    direccion: ''
  });

  const parseToken = (token) => {
    const decodedToken = token.split('.')[1];
    const decodedData = JSON.parse(atob(decodedToken));
    return decodedData;
  };

  const{nombreP, nombreE, nombre, apellido, correo, numero, direccion} =compra;
const [error, setError] = useState('');
const [successMessage, setSuccessMessage] = useState('');
 

  const registerCompra = async () => {
    try {

      const response = await axios.post('http://localhost:8888/api/v1/front/compras/register',  {
        ...compra,
            nombreP: llamarP, 
            nombreE: llamarE, 
headers: {
'Content-Type': 'application/json',
},


});  

if (response.data && response.data.token) {
  const tokenPayload = parseToken(response.data.token);
  if (tokenPayload ) { 
  const { nombreE, token } = tokenPayload; 
      localStorage.setItem('token', token);
    localStorage.setItem('nombreE', nombreE);
     
         }
    } 

    setSuccessMessage('compra registrada con éxito');
    setError('');
    } catch (error) {
    console.error('Error en el registro:', error);

    if (error.response) {
      console.log('Respuesta del servidor:', error.response);
      if (error.response.status === 500 && error.response.data && error.response.data.message) {
        setError('Error: ' + error.response.data.message);
      } else {
        setError('Error: Hubo un error al momento de registrar la venta, vuelve a intentarlo' );
      }
    } else {
      setError('Error en el : ' + error.message);
    }
  }


};

  const onChange = (e) => {
    setCompra({
      ...compra,
      [e.target.name]: e.target.value
    });
  };


const onSubmit = (e) => {
    e.preventDefault();
    registerCompra()
  };

  const llamarP = nuevaInformacion.nombreP
  const llamarE = nuevaInformacion.nombreE




  return (

<div>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
<div className="body-index-c">

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
        <div className="container-cat">
          <center>
<header>
<h1 className="tituloo">Catálogo de Compra</h1>

<div className='buscar'>

                <div className='BotonesC'>
                    
                    <input type='text' className='buscars'name='search'  value={busqueda} placeholder="Búsqueda por nombre o precio de Producto" onChange={handleChange} required  ></input><button className='buscarBoton'><i className="fas fa-search" /></button>
      
                </div>
            
            </div>


<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form autoComplete='off' onSubmit={onSubmit} className="form-r">
          <h2 className="form-title-l">Registrar Compra</h2>
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
              <input type="text" id="nombreE" name="nombreE" hidden  onChange={onChange} value={llamarE} required className="form-input-l" placeholder=" " />
              <label htmlFor="nombre" hidden className="form-label-l">Nombre Empresa:</label>
              <span className="form-line" />
            </div>
          <div className="form-group-l">
              <input type="text" id="nombreP" name="nombreP"  onChange={onChange} value={llamarP} required className="form-input-l" placeholder=" " />
              <label htmlFor="nombre" className="form-label-l">Nombre Producto:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="text" id="nombre" name="nombre" onChange={onChange} value={nombre} required className="form-input-l" placeholder=" " />
              <label htmlFor="nombre" className="form-label-l">Nombres:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="text" id="apellido" name="apellido" onChange={onChange} value={apellido} required className="form-input-l" placeholder=" " />
              <label htmlFor="apellido" className="form-label-l">Apellidos:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="email" id="correo" name="correo" onChange={onChange} value={correo} required className="form-input-l" placeholder=" " />
              <label htmlFor="correo" className="form-label-l">Correo:</label>
              <span className="form-line" />
            </div>
            <div className="form-group-l">
              <input type="text" id="numero" name="numero" onChange={onChange} value={numero} required className="form-input-l" placeholder=" " />
              <label htmlFor="numero" className="form-label-l">Numero de contacto:</label>
              <span className="form-line" />
            </div>
            
            <div className="form-group-l">
              <input type="text" id="direccion" name="direccion" onChange={onChange} value={direccion} className="form-input-l" placeholder=" " />
              <label htmlFor="direccion" className="form-label-l">Direccion:</label>
              <span className="form-line" />
            </div>
            <center>
              <input type="submit" className="form-submit-le" value="Registrar" />

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
{productos && productos.map((producto) => (
<div className="producto">
<img src="card.png" alt="Producto 1" />
<h1>{producto.nombreP}</h1>
   
        <h5><p>Precio: ${producto.precio}</p> </h5>
<button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleEditarProducto(producto)}>Agregar al Carrito</button>
</div>
 ))}


</div>

</div>

<div className="footer">
          <p> Creado por: Santiago Carreño | Aprendiz Sena </p><strong>©2023</strong>.
        </div>
</div>

</div>


)
}

export default Catalogo;