const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
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
        },
        "Sección":{
            type: String
        },
        "ClubesInteres":{
            type: Array
        }
    },
    {
        versionKey: false,
        timestamps: true
    }


);

module.exports = mongoose.model('estudiantes', studentSchema)