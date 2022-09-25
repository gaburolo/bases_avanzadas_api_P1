const { default: mongoose } = require('mongoose');
const model = require('../models/student.model')
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
};

exports.getData = async (req, res) => {
    const consulta = await model.find().lean(); 
    res.render('.principal/prueba', {consulta}); 
};

exports.getOne = async(req, res) => {
    const consulta = await model.find({_id: parseId(req.params.id)}).lean(); 
    res.render('.principal/prueba', {consulta}); 
};

exports.getOneUser =async (req, res) => {
    const consulta= await model.find({Usuario: req.params.Usuario}).lean(); 
    consulta
};
 
exports.insertData = async(req,res) => {
    const {Usuario,Contrasenna,Nombre,Seccion} = req.body;

    
    const validacion = await model.findOne({Usuario:Usuario});
    if(validacion){
        //Se podria poner algun mensaje
        res.redirect('/signup/Estudiantes');
    }else{
        const newStudent = new model({Usuario, Contrasenna, Nombre, Seccion});
        
        newStudent.Contrasenna = await newStudent.encryptPass(Contrasenna);
        await model.create(newStudent);
        res.redirect('/signin/Estudiantes');
    }
    
};

exports.updateStudent = async (req, res) => {
    const body = req.body

    await model.updateOne({_id: parseId(req.params.id)},
        body,
    ); 
    res.redirect('./principal/prueba');
};

exports.deleteStudent = async(req, res) => {
    const body = req.body
    await model.deleteOne({_id: parseId(req.params.id)}); 
    res.redirect('./principal/prueba');
};

exports.getMostSugg= (req, res) => {
    model.aggregate([
        {
           $project: {
              "_id":0,
            "NombreC": {
             "Nombre": "$Nombre",
         },
         
              numberOfCurse: { $cond: { if: { $isArray: "$ClubesInteres" }, then: { $size: "$ClubesInteres" }, else: "NA"} }
           }
        },
     { $sort: {"numberOfCurse": -1}},{ $limit:4}
     ], (err,docs) =>{
        if(err){
            res.status(422).send({error:'Error'})
        }else{
            res.send({data: docs})
        }
    }
    )
};