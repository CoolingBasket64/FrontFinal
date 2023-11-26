const express = require('express')
const router = express.Router()
const moongose = require ('mongoose')
const empresaModel = require('../models/userModels')
const compraModel = require ('../models/compraModels')



router.get('/',
    async(request, response)=>{

        try {
            const compra = await compraModel.find()

            if (compra.length === 0) {
                return response.
                status(404).
                json({
                    success: false,
                    msg:"No hay pedidos disponibles"
                })
            }

            response
                .status(200)
                .json({
                    "success": true, 
                    "results":compra
                })

        } catch (error) {
            response
                .status(500)
                .json({
                    success: false,
                    msg: error.message
                })
        }
})

router.post('/register', 
            async(req, res)=>{
                const {nombreP, nombreE, nombre, apellido, correo, numero, direccion} = req.body;
                try {
                    const compra = 
                    await compraModel.create({
                        nombreP, 
                        nombreE, 
                        nombre, 
                        apellido, 
                        correo, 
                        numero, 
                        direccion
                    })
            res
                .status(201)
                .json({
                    sucess: true,
                    msg: "comprar registrada exitosamente",
                })
                } catch (error) {
                    res
                        .status(400)
                        .json({
                            sucess: false,
                            message: error.message
                        })
                    
                }

            })

            router.get('/pedido/:nombreE', async(req, res)=>{

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
                    const products = await compraModel.find({ nombreE: user.nombreE });
              
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

            router.put('/:id',
            async (request, response)=>{
               try {
                   const compraId= request.params.id
           
                   if(!moongose.Types.ObjectId.isValid(compraId)){
                       response
                       .status(500)
                       .json({
                           success: false,
                           msg: "Id invalido"
                       })
                   }else{
                       const updateCompra = await compraModel.findByIdAndUpdate(
                           compraId, 
                           request.body,
                           {
                               new:true
                           }  
                       )
           
                       if (!updateCompra) {
                           return response
                               .status(404)
                               .json({
                                   success: false,
                                   msg:`No se encuentra el pedido con id: ${compraId}`
                               })
                           
                       }
                       else{
                           response
                           .status(200)
                           .json({
                               "success": true, 
                               "results": updateCompra
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
           
                   const compraId= request.params.id
                   if(!moongose.Types.ObjectId.isValid(compraId)){
                       response
                       .status(500)
                       .json({
                           success: false,
                           msg: "Id invalido"
                       })
                   }else{
                      const delCompra = await compraModel.findByIdAndDelete(compraId)
           
                      if (!delCompra) {
                           return response
                               .status(404)
                               .json({
                                   success: false,
                                   msg:`No se encuentra el pedido con id: ${compraId}`
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
                               msg: error.message
                           })
               }
           })


module.exports = router