const mongoose = require('mongoose')
const bcryptjs= require ('bcryptjs')
const jwt = require('jsonwebtoken')

const compraSchema = new mongoose.Schema(
    {
        nombreE:{
            type:String,
        },
        nombreP:{
            type:String,
            unique: false,
        },
        nombre:{
            type:String,
         
        },
        apellido:{
            type:String,
          
        },
        correo:{
            type: String,
            match: [
                /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
                "correo no valido"
            ],
            unique:true,
        },
        numero:{
            type:String,
            unique:true,
        },
        direccion:{
            type:String,
        }
        
        

    }
)



const Compra =
module.exports = mongoose.model('Compra',compraSchema)