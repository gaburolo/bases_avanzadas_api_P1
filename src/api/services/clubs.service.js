const { default: mongoose } = require('mongoose');
const model = require('../models/clubs.model')

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
    model.find({NombreClub: req.params.NombreClub}, (err,docs) => {
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
            //res.status(422).send({error:'Error'})
            this.addInt(req,res);
            //console.log(req.body.NombreClub)
        }else{
            res.send({data: docs})
        }
        
    })
};
exports.updateClub = (req, res) => {
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
exports.deleteClub = (req, res) => {
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

exports.getCategorys = (req, res) => {

    model.distinct("Categoria", (err,docs) => {
        res.send({
            docs
        })
    })
};

exports.getCategoryCount = (req, res) => {
    model.aggregate([{ "$group": {
        "_id": {"Categoria":"$Categoria"}, 
        "count": { "$sum": 1 }
      }}], (err,docs) =>{
        if(err){
            res.status(422).send({error:'Error'})
        }else{
            res.send({data: docs})
        }
    }
    )
};

exports.getTop = (req, res) => {
    model.aggregate([
        {$project:
            {"_id":0, "NombreClub":"$NombreClub", "CantInters":"$CantInters"}
        }
        ,
        {
            $sort:{"CantInters":-1}
        },
        {
            $limit:5
        }], (err,docs) =>{
        if(err){
            res.status(422).send({error:'Error'})
        }else{
            res.send({data: docs})
        }
    }
    )
};

exports.getBottom = (req, res) => {
    model.aggregate([
        {
            $project:{"_id":0, "NombreClub":"$NombreClub", "CantInters":"$CantInters"}
        },
        {
            $sort:{"CantInters":1}
        },
        {
            $limit:5
        }], (err,docs) =>{
        if(err){
            res.status(422).send({error:'Error'})
        }else{
            res.send({data: docs})
        }
    }
    )
};

exports.addInt = (req,res)=>{
    
    model.updateOne({NombreClub: req.body.NombreClub},{$inc:{CantInters:1}},(err,docs) =>{
        if(err){
            res.status(422).send({error:'Error'})
        }else{
            res.send({data: docs})
        }
    })

};