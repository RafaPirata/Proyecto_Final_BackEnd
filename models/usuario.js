const {Schema, model} = require("mongoose");

const usuariosCollection = "usuarios"

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: { 
        type: String,
        required: true,
        maxlength: 100,
        unique: true,
    },
    username: { 
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //admin: {
     //   type: Boolean,
     //   required: false,
//value: true
  //  }
}, {versionKey: false}) //Para que no agregue '__v'

const usuarios = model(usuariosCollection, usuarioSchema)
module.exports = usuarios