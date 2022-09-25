const { default: mongoose } = require('mongoose');
const model = require('../models/admin.model')
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
};
exports.getData = async(req, res) => {
    const consulta = await model.find().lean(); 
    res.render('./principal/prueba', {consulta}); 
};
exports.getOne = async (req, res) => {
    const consulta = await model.find({_id: parseId(req.params.id)}).lean(); 
    res.render('./principal/prueba', consulta); 
};
exports.getOneUser = async(req, res) => {
    const consulta = await model.find({Usuario: req.params.Usuario}).lean(); 
    res.render('./principal/prueba', consulta); 
};
exports.insertData = async (req,res) => {
    const {Usuario,Contrasenna,Nombre} = req.body;
    
    const validacion = await model.findOne({Usuario:Usuario});
    if(validacion){
        //Se podria poner algun mensaje
        res.redirect('/singup/Administrador');
    }else{
        const newAdmin = new model({Usuario, Contrasenna, Nombre});
        newAdmin.Contrasenna = await newAdmin.encryptPass(Contrasenna);
        await model.create(newAdmin);
        res.redirect('/signin/Administrador');
    }
};
exports.updateAdmin =  async (req, res) => {
    const body = req.body
    await model.updateOne({_id: parseId(req.params.id)},
        body,
    ); 
    res.redirect('./principal/prueba');
};
exports.deleteAdmin = async(req, res) => {
    const body = req.body
    await model.deleteOne({_id: parseId(req.params.id)})
    res.redirect('./principal/prueba');
};