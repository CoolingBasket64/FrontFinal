const express = require('express')
const router = express.Router()
const moongose = require('mongoose')
const empresaModel = require('../models/userModels')
const productsModel = require ('../models/productModels')


router.get('/',
    async(request, response)=>{

        try {
            const productos = await productsModel.find()

            if (productos.length === 0) {
                return response.
                status(404).
                json({
                    success: false,
                    msg:"No hay productos disponibles"
                })
            }

            response
                .status(200)
                .json({
                    "success": true, 
                    "results":productos
                })

        } catch (error) {
            response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })
        }
})


router.get('/buscar/:id',
    async(request, response)=>{

        try {
            //traer el parametro id de la uri
            
            const productoId = request.params.id 
            
            if(!moongose.Types.ObjectId.isValid(productoId)){
                response
                .status(500)
                .json({
                    success: false,
                    msg: "Producto no registrado"
                })
            }else{
                const selected_productoId = await productsModel.findById(productoId)

                if (!selected_productoId) {
                    return response
                        .status(404)
                        .json({
                            success: false,
                            msg:`No se encuentra el producto con id: ${productoId}`
                        })
                    
                }
                else{
                    response
                        .status(200)
                        .json({
                            "success": true, 
                            "results": selected_productoId
                        })
                }
            }
            
            
        } catch (error) {
            response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })
        }
})


router.get('/empresa/:nombreE', async(req, res)=>{

    const nombreEmpresa = req.params.nombreE;
    try {
        // Buscar el usuario por su correo electrónico
        const user = await empresaModel.findOne({ nombreE: nombreEmpresa });
  
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada',
            });
        }
  
        // Filtrar los productos asociados al usuario
        const products = await productsModel.find({ nombreE: user.nombreE });
  
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
  });


  router.get('/buscarN/:nombreP', async(req, res)=>{

    const nombrePro = req.params.nombreP;
    try {
        // Buscar el usuario por su correo electrónico
        const nombre = await productsModel.findOne({ nombreP: nombrePro });
  
        if (!nombre) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado',
            });
        }
  
        // Filtrar los productos asociados al usuario
        const nombres = await productsModel.find({ nombreP: nombre.nombreP });
  
        res.status(200).json({
            success: true,
            nombres,
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
  });


  router.get('/buscarP/:precio', async(req, res)=>{

    const precioP = req.params.precio;
    try {
        // Buscar el usuario por su correo electrónico
        const precio = await productsModel.findOne({ precio: precioP });
  
        if (!precio) {
            return res.status(404).json({
                success: false,
                message: 'Precio no encontrado',
            });
        }
  
        // Filtrar los productos asociados al usuario
        const precios = await productsModel.find({ precio: precio.precio });
  
        res.status(200).json({
            success: true,
            precios,
        });
    } catch (error) {
        console.error('Error al obtener los precios:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
  });


  router.post('/register', async (req, res) => {
    const { nombreP, nombreE, categoria, precio, region, archivoInput } = req.body;

    try {
        // Verificar si la empresa ya existe
        const empresas = await empresaModel.findOne({ nombreE });

        if (!empresas) {
            // Si la empresa no existe, crear una nueva
           const empresa = await empresaModel.create({ nombreE });
        }

        // Crear el producto asociado a la empresa (ya sea existente o nueva)
        const product = await productsModel.create({
            nombreP,
            nombreE: empresas.nombreE, // Asociar al nombre de la empresa existente o recién creada
            categoria,
            precio,
            region,
            archivoInput
        });

        res.status(201).json({
            success: true,
            msg: "Producto creado exitosamente",
            product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.put('/:id',
 async (request, response)=>{
    try {
        const productoId= request.params.id

        if(!moongose.Types.ObjectId.isValid(productoId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
            const updProducto = await productsModel.findByIdAndUpdate(
                productoId, 
                request.body,
                {
                    new:true
                }  
            )

            if (!updProducto) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encuentra el producto con id: ${productoId}`
                    })
                
            }
            else{
                response
                .status(200)
                .json({
                    "success": true, 
                    "results": updProducto
                })
            }
        }
        
    } catch (error) {
        response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })   
    }
})



router.delete('/:id',
   async (request, response)=>{

    try {

        const productoId= request.params.id
        if(!moongose.Types.ObjectId.isValid(productoId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
           const delProducto = await productsModel.findByIdAndDelete(productoId)

           if (!delProducto) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encuentra el producto con id: ${productoId}`
                    })
           }else{
            response
                .status(200)
                .json({
                    "success": true, 
                    "results":[]
                })
           }
        }
        
    } catch (error) {
        response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })
    }
})

            module.exports = router