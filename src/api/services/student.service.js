const { default: mongoose } = require('mongoose');
const model = require('../models/student.model')
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
};

exports.getData = (req, res) => {
    model.find({}, (err,docs) => {
        res.send({
            docs
        })
    })
};

exports.getOne = (req, res) => {
    model.find({_id: parseId(req.params.id)}, (err,docs) => {
        if(err){
            res.status(422).send({error:'Error'})
        }else{
            res.send({docs : docs})
        }
        
    })
};
exports.getOneUser = (req, res) => {
    model.find({Usuario: req.params.Usuario}, (err,docs) => {
        if(err){
            res.status(422).send({error:'Error'})
        }else{
            res.send({docs : docs})
        }
        
    })
};

exports.insertData = (req,res) => {
    const data = req.body
    model.create(data, (err,docs) =>{
        if(err){
            res.status(422).send({error:'Error'})
        }else{
            res.send({data: docs})
        }
        
    })
};
exports.updateStudent = (req, res) => {
    const body = req.body

    model.updateOne({_id: parseId(req.params.id)},
        body,
        (err,docs) =>{
            if(err){
                res.status(422).send({error:'Error'})
            }else{
                res.send({data: docs})
            }
        }
    )

};
exports.deleteStudent = (req, res) => {
    const body = req.body
    model.deleteOne({_id: parseId(req.params.id)},
        (err,docs) =>{
            if(err){
                res.status(422).send({error:'Error'})
            }else{
                res.send({data: docs})
            }
        }
    )

};

exports.getMostSugg= (req, res) => {
    model.aggregate([
        {
           $project: {
              "_id":0,
            "NombreC": {
             "Nombre": "$Nombre",
             "PrimerA": "$PrimerA",
             "SegundoA": "$SegundoA"
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