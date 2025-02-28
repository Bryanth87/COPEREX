import { Schema, model } from 'mongoose';

const userSchema = Schema ({
    name:{
        type: String,
        required: [true, "El nombre es requerido"]
    },
    surname:{
        type: String,
        required: [true, "El apellido es requerido"],
    },
    email:{
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, "Se necesita 8 números"]
    },
    role:{
        type: String,
        required: true,
        enum: "ADMIN_ROLE",
        default: "ADMIN_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)
