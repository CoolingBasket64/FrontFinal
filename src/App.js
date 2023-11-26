import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Paginas/auth/login';
import CrearCuenta from './Paginas/auth/CrearCuenta';
import Index from './Paginas/auth/Index';
import IndexA from './Paginas/Admin/Index';
import Productos from './Paginas/Admin/Productos';
import RegistrarProductos from './Paginas/Admin/RegistrarProducto';
import Catalogo from './Paginas/auth/Catalogo';
import ProductosC from './Paginas/Admin/consultaP';
import ConsP from './Paginas/Admin/consultaPedi';



function App() {
  return (
 
     
    
    <Fragment>
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/crear-cuenta' exact element={<CrearCuenta/>}/>
          <Route path='/' exact element={<Index/>}/>
          <Route path='/IndexA' exact element={<IndexA/>}/>
          <Route path='/Productos' exact element={<Productos/>}/>
          <Route path='/RProductos' exact element={<RegistrarProductos/>}/>
          <Route path='/consultarP' exact element={<consultarP/>}/>
          <Route path='/Catalogo' exact element={<Catalogo/>}/>
          <Route path='/productosC' exact element={<ProductosC/>}/>
          <Route path='/ConsP' exact element={<ConsP/>}/>
         
          
          
        </Routes>
      </Router>
    </Fragment>
 
 
    
  );
}

export default App;
