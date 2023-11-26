const mongoose = require('mongoose')
const bcryptjs= require ('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        nombreE:{
            type:String,

        },
        nit:{
            type:String,
            unique:true,
        },
        telefono:{
            type:String,
            unique:true,
        },
        correo:{
            type: String,
            match: [
                /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
                "correo no valido"
            ],
            unique:true,
        },
        password:{
            type: String,
        }
        

    }
)
//crear la accion pre
userSchema.pre('save', async function(next){
    //crear la sal
    const sal = await bcryptjs.genSalt(10)
    //encriptar la contraseña
    this.password= await bcryptjs.
                   hash(this.password, sal)
})

//metodo construye el json web token (no)


userSchema.methods.ObtenerTokenJWT= function(){
    const JWT_SECRET_KEY = "los mejores dulces"
    return jwt.sign({
        id: this._id,
        nombreE: this.nombreE,
        password: this.password,
    }, 
        JWT_SECRET_KEY, 
        { 
            expiresIn: Date.now() + 10000
        }
    )
}

//comparar password del body
userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password)
}



const User =
module.exports = mongoose.model('User',userSchema)