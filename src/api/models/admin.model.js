const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        "Usuario": {
            type: String,
            unique: true,
            required: true
        },
        "Contrasenna": {
            type: String,
            required: true
        },
        "Nombre":{
            type: String
        },
        "PrimerA":{
            type: String
        },
        "SegundoA":{
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }


);

module.exports = mongoose.model('administradores', adminSchema)