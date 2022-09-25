const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* Creating a schema for the database. */
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
/* Encrypting the password. */
studentSchema.methods.encryptPass = async (Contrasenna) =>{
    const salt = await bcrypt.genSalt(10);
    
    const hash = bcrypt.hash(Contrasenna, salt);
    return hash;
};
/* Comparing the password that the user inputs with the one that is stored in the database. */
studentSchema.methods.matchPass = async function (Contrasenna){
    return await bcrypt.compare(Contrasenna, this.Contrasenna);
};

module.exports = mongoose.model('estudiantes', studentSchema)