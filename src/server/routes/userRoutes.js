const express = require('express')
const router = express.Router()
const userModel = require ('../models/userModels')

router.post('/register', 
            async(req, res)=>{
                const {nombreE, nit, telefono, correo, password} = req.body;
                try {
                    const user = 
                    await userModel.create({
                        nombreE,
                        nit,
                        telefono,
                        correo,
                        password
                    })
            res
                .status(201)
                .json({
                    sucess: true,
                    msg: "usuario creado exitosamente",
                    token:user.ObtenerTokenJWT()
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

router.post('/login', async (req, res) => {
    
    const {correo,password}=req.body;

    //si no llega email o password
    if(!correo || !password){
        res.status(400).json({
            success:false,
            message: "Debe ingresar el correo o la contraseña"
        })
    }else{
        try {
            //encontrar usuario con el password
            const user = await userModel.findOne({ correo }).select("+password")
            
            //console.log(user)
            if (!user) {
                res.status(400).json({
                    success:false,
                    msg:"no se encontro el usuario"
                })
            }
            else{
                //comparar
                const isMatch = await user.comparePassword(password)
                if(!isMatch){
                    res.status(400).json({
                        success: false,
                        msg:"contraseña incorrecta"
                        
                    })
                }else{
                    res.status(200).json({
                        success: true,
                        msg:"la contraseña es correcta",
                        token: user.ObtenerTokenJWT()
                    })
                }
            }
        } catch (error) {
            
        }
    }
})

module.exports = router