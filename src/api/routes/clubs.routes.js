const express = require('express');
const service = require('../services/clubs.service');

const router = express.Router();

const path = 'clubs';

router.get(`/${path}/`, service.getData);
router.get(`/${path}/category/`, service.getCategorys)
router.get(`/${path}/categorycount/`, service.getCategoryCount)
//router.get(`/${path}/:id`, service.getOne);
router.get(`/${path}/:NombreClub`, service.getOneUser);
router.post(`/${path}/`, service.insertData);
router.put(`/${path}/:id`, service.updateClub);
router.delete(`/${path}/:id`, service.deleteClub);

module.exports = router