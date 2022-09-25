const { default: mongoose } = require('mongoose');
const model = require('../models/clubs.model')
const modelStudent = require('../models/student.model')

const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
};

exports.getData = async (req, res) => {
    const consulta=await model.find().lean();
    res.render('./principal/prueba', {consulta});
};

exports.pantallaInicioEstudiantes = async (req, res) => {
    const consulta=await model.find().lean();
    res.render("./principal/inicio_estudiantes", {consulta});
};

exports.pantallaInicioAdministradores = async (req, res) => {
    const consulta=await model.find().lean();
    res.render("./principal/inicio_administradores", {consulta});
};

exports.getOne = async (req, res) => {
    const consulta= await model.find({_id: parseId(req.params.id)}).lean();
    res.render('./principal/prueba', {consulta})
};


exports.getOneUser =async (req, res) => {
    const consulta=await model.find({NombreClub: req.params.NombreClub}).lean();
    res.render('./principal/prueba', {consulta});
};

exports.insertInteres = async (req,res) => {
    
    const UsuarioLogeado=req.user.Usuario;
    const data=req.body.selectpicker;

    const cursoSeleccionado= await model.find({_id: parseId(data)}).lean();
    const student= await modelStudent.find({Usuario:UsuarioLogeado}).lean();
    var intereses=student[0].ClubesInteres;

    intereses.push(cursoSeleccionado[0])
    //console.log(intereses);

    await modelStudent.findOneAndUpdate({Usuario:UsuarioLogeado},{ClubesInteres:intereses});
    await model.updateOne({_id: parseId(data)},{$inc:{"CantInters":1}});

    res.redirect('/inicio/Estudiante');
}

exports.getClubesSugeridos = async (req,res) => {
    const UsuarioLogeado=req.user.Usuario;
    const Consulta1 = await modelStudent.findOne({Usuario:UsuarioLogeado},{_id:0,ClubesInteres:1}).lean();
    const Consulta = Consulta1.ClubesInteres
    //const Consulta = await model.find({Usuario:UsuarioLogeado}).lean();
    
    res.render("./clubes/mis_clubes",{Consulta});
}


exports.insertData = async (req,res) => {
    const UsuarioLogeado=req.user.Usuario;
    const {NombreClub} = req.body;

    const consulta=await model.find({NombreClub: NombreClub}).lean();
    
    if (consulta.length!=0){
        await model.updateOne({NombreClub: NombreClub},{$inc:{"CantInters":1}});
        res.redirect('/inicio/Estudiante');
        return;
    }

    const data = req.body;
    data.CantInters=1;
    data.Sujerido=UsuarioLogeado;
    await model.create(data);

    const student = await modelStudent.find({Usuario:UsuarioLogeado}).lean();
    var intereses=student[0].ClubesInteres;
    const cursoSeleccionado=await model.find({NombreClub: NombreClub}).lean();
    intereses.push(cursoSeleccionado[0])
    await modelStudent.findOneAndUpdate({Usuario:UsuarioLogeado},{ClubesInteres:intereses});

    res.redirect('/inicio/Estudiante');
};

exports.updateClub =async (req, res) => {
    const body = req.body

    await model.updateOne({_id: parseId(req.params.id)},
        body
    );
    res.redirect('./principal/prueba');

};
exports.deleteClub =async (req, res) => {
    const body = req.body
    await model.deleteOne({_id: parseId(req.params.id)});
    res.redirect('./principal/prueba');

};

exports.getCategorys = async (req, res) => {
    const consulta=await model.distinct("Categoria").lean();
    res.render('./principal/prueba', {consulta});
};

exports.getCategoryCount =async (req, res) => {
    var consulta=await model.aggregate([
        { "$group": {
        "_id": {"Categoria":"$Categoria"}, 
        "count": { "$sum": 1 }
      }}]
    );
    res.render('./principal/prueba', {consulta});
};

exports.getTop = async (req, res) => {
    const consulta= await model.aggregate([
        {$project:
            {"_id":0, "NombreClub":"$NombreClub", "CantInters":"$CantInters"}
        }
        ,
        {
            $sort:{"CantInters":-1}
        },
        {
            $limit:5
        }]
    );
    res.render('./principal/prueba', {consulta});
};

exports.getBottom = async (req, res) => {
    const consulta=await model.aggregate([
        {
            $project:{"_id":0, "NombreClub":"$NombreClub", "CantInters":"$CantInters"}
        },
        {
            $sort:{"CantInters":1}
        },
        {
            $limit:5
        }]
    );
    res.render('./principal/prueba', {consulta});
};

exports.getReporte = async (req, res) => {
    const consulta1=await model.aggregate([
        { "$group": {
        "_id": {"Categoria":"$Categoria"}, 
        "count": { "$sum": 1 }
      }}]
    );
    const consulta2= await modelStudent.aggregate([
        {
           $project: {
              "_id":0,
            "NombreC": {
             "Nombre": "$Nombre",
         },

              numberOfCurse: { $cond: { if: { $isArray: "$ClubesInteres" }, then: { $size: "$ClubesInteres" }, else: "NA"} }
           }
        },
     { $sort: {"numberOfCurse": -1}},{ $limit:3}
     ]);
    const consulta3= await model.aggregate([
        {$project:
            {"_id":0, "NombreClub":"$NombreClub", "Categoria":"$Categoria","CantInters":"$CantInters"}
        }
        ,
        {
            $sort:{"CantInters":-1}
        },
        {
            $limit:5
        }]
    );
    const consulta4=await model.aggregate([
        {
            $project:{"_id":0, "NombreClub":"$NombreClub", "Categoria":"$Categoria","CantInters":"$CantInters"}
        },
        {
            $sort:{"CantInters":1}
        },
        {
            $limit:5
        }]
    );
    
    res.render('./principal/inicio_administradores',{consulta1,consulta2,consulta3,consulta4})

};