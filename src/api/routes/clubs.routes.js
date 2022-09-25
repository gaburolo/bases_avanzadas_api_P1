const express = require('express');
const service = require('../services/clubs.service');
const club = require('../models/clubs.model');
const {isAuthenticated} = require("../helpers/auth")

const router = express.Router();

const path = 'clubs';

router.get(`/${path}/`, isAuthenticated, service.getData);
router.get(`/${path}/nombreclub/:NombreClub`, isAuthenticated,service.getOneUser);
router.post(`/${path}/`, isAuthenticated, service.insertData);
router.get(`/${path}/id/:id`, isAuthenticated, service.getOne);
router.put(`/${path}/:id`, isAuthenticated, service.updateClub);
router.delete(`/${path}/:id`, isAuthenticated, service.deleteClub);
router.get(`/${path}/categorias/`, isAuthenticated, service.getCategorys);
router.get(`/${path}/reporte1/`, isAuthenticated, service.getCategoryCount);
router.get(`/${path}/reporte3/`, isAuthenticated, service.getTop);
router.get(`/${path}/reporte4/`, isAuthenticated, service.getBottom);


router.get(`/${path}/reportes/`,(req,res)=>{
    const c=service.getPrueba;
    console.log(c);
});




module.exports = router