const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

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
        }
    },
    {
        versionKey: false,
        timestamps: true
    }


);

adminSchema.methods.encryptPass = async (Contrasenna) =>{
    const salt = await bcrypt.genSalt(10);
    
    const hash = bcrypt.hash(Contrasenna, salt);
    return hash;
};
adminSchema.methods.matchPass = async function (Contrasenna){
    return await bcrypt.compare(Contrasenna, this.Contrasenna);
};


module.exports = mongoose.model('administradores', adminSchema)