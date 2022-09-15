const model = require('../models/student.model')

exports.getData = (req, res) => {
    model.find({}, (err,docs) => {
        res.send({
            docs
        })
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