const express = require('express');
const service = require('../services/admin.service');
const serviceclubs = require('../services/clubs.service');
const router = express.Router();
const passport = require('passport');
const path = 'admin';

router.get(`/${path}/`, service.getData);
//router.get(`/${path}/:id`, service.getOne);
router.get(`/${path}/:Usuario`, service.getOneUser);
router.post(`/${path}/`, service.insertData);
router.put(`/${path}/:id`, service.updateAdmin);
router.delete(`/${path}/:id`, service.deleteAdmin);
router.get('/consultas/Administrador',serviceclubs.getReporte);

//Ruta para el signing del administrador cuando se registre con su nombre, correo y contraseña
router.post('/signin/Administrador',passport.authenticate('local-admin',{
    successRedirect:'/consultas/Administrador',
    failureRedirect:'/signin/Administrador',
    //failureFlash:true
}));

router.get('/signin/Administrador',(req,res)=>{
    res.render('./users/signin_administrador')
});

router.post('/signout/Administrador',(req,res)=>{
    res.render('./users/signin_administrador')
});


//Ruta para el signup del administrador cuando ingrese con su usuario y contraseña
router.post('/singup/Administrador',service.insertData);

router.get('/singup/Administrador',(req,res)=>{
    res.render('./users/signup_administrador')
});

module.exports = router