const express = require('express');
const service = require('../services/student.service');
const serviceclubs = require('../services/clubs.service');
const router = express.Router();
const passport = require('passport');
const path = 'student';
const {isAuthenticated} = require("../helpers/auth")

router.get(`/${path}/`, service.getData);
//router.get(`/${path}/:id`, service.getOne);
router.get(`/${path}/:Usuario`, service.getOneUser);
router.post(`/${path}/`, service.insertData);
router.put(`/${path}/:id`, service.updateStudent);
router.delete(`/${path}/:id`, service.deleteStudent);
router.get('/inicio/Estudiante',serviceclubs.pantallaInicioEstudiantes);
router.post('/inicio/Estudiante',serviceclubs.pantallaInicioEstudiantes);

//
router.post('/signin/Estudiantes',passport.authenticate('local-student',{
    successRedirect:'/inicio/Estudiante',
    failureRedirect:'/signin/Estudiantes',
    //failureFlash:true
}));

router.get('/signin/Estudiantes',(req,res)=>{
    res.render("./users/signin_estudiantes")
});

//
router.post('/signup/Estudiantes',service.insertData);


router.get('/signup/Estudiantes',(req,res)=>{
    res.render("./users/signup_estudiantes")
});

//
router.post('/agregarClubes/Estudiante', isAuthenticated, serviceclubs.insertData);

router.post('/agregarInteres/Estudiante', isAuthenticated ,serviceclubs.insertInteres);

//
router.get('/misClubes', isAuthenticated, serviceclubs.getClubesSugeridos);

router.post('/misClubes', isAuthenticated,(req,res)=>{
    res.render("./clubes/mis_clubes")
});

module.exports=router