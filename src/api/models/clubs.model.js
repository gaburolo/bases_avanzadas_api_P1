const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
    {
        "NombreClub": {
            type: String,
            unique: true,
            required: true
        }, "Categoria": {
            type: String,
            required: true
        },
        "CantInters":{
            type: Number
        }
    },
    {
        versionKey: false,
        timestamps: true
    }


);

module.exports = mongoose.model('clubes', clubSchema)